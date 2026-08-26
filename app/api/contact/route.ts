import { NextResponse } from 'next/server'
import { profile } from '@/data/profile'

/**
 * CONTACT ENDPOINT
 *
 * Validates server-side (never trust the client) and forwards via Resend's
 * REST API — called with plain fetch, so no extra dependency.
 *
 * TO ENABLE, set three environment variables in .env.local:
 *
 *   RESEND_API_KEY=re_...            from resend.com
 *   CONTACT_TO_EMAIL=you@domain.com  where enquiries land
 *   CONTACT_FROM_EMAIL=site@domain   must be on a domain verified with Resend
 *
 * Until then this returns 501 with a clear message and the form shows the
 * direct email address. A message is never accepted and then dropped.
 */

export const runtime = 'nodejs'

type Payload = {
  name?: string
  email?: string
  subject?: string
  message?: string
  company?: string // honeypot
}

const MAX = { name: 120, email: 200, subject: 120, message: 5000 }

export async function POST(request: Request) {
  let body: Payload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 })
  }

  // Honeypot: silently accept so bots do not learn anything.
  if (body.company) return NextResponse.json({ ok: true })

  const name = body.name?.trim() ?? ''
  const email = body.email?.trim() ?? ''
  const subject = body.subject?.trim() || 'General'
  const message = body.message?.trim() ?? ''

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Please complete every field.' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'That email address looks wrong.' }, { status: 400 })
  }
  if (
    name.length > MAX.name ||
    email.length > MAX.email ||
    subject.length > MAX.subject ||
    message.length > MAX.message
  ) {
    return NextResponse.json({ error: 'That message is too long.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      {
        error: `The form is not connected to a mail provider yet. Please write to ${profile.email} directly.`,
      },
      { status: 501 },
    )
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `${subject} — ${name}`,
        text: [
          `Name:    ${name}`,
          `Email:   ${email}`,
          `Subject: ${subject}`,
          '',
          message,
        ].join('\n'),
      }),
    })

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      console.error('Resend rejected the message:', response.status, detail)
      return NextResponse.json(
        { error: `Could not send. Please write to ${profile.email} directly.` },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (cause) {
    console.error('Contact endpoint failed:', cause)
    return NextResponse.json(
      { error: `Could not send. Please write to ${profile.email} directly.` },
      { status: 502 },
    )
  }
}
