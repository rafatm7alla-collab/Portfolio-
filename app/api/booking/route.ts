import { NextResponse } from 'next/server'
import { profile } from '@/data/profile'
import { budgets, projectTypes, timelines } from '@/data/framework'
import { HOST_TIME_ZONE, MEETING_MINUTES } from '@/lib/booking/availability'

/**
 * DISCOVERY CALL REQUEST
 *
 * The Framework page's booking pop-up posts here. The request is checked
 * again on the server (never trust the client) and emailed to Rafat
 * through Resend, with the same three environment variables as the
 * contact form (see app/api/contact/route.ts):
 *
 *   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 *
 * Nothing is stored. No calendar event is created: Rafat replies to the
 * email (Reply-To is the client) with the Google Meet invitation.
 * Until the variables are set this returns 501 and the pop-up shows the
 * direct email address, so a request is never accepted and then dropped.
 */

export const runtime = 'nodejs'

type Payload = {
  name?: string
  email?: string
  company?: string
  website?: string
  country?: string
  projectTypes?: unknown
  budget?: string
  timeline?: string
  notes?: string
  model?: string
  start?: string
  timeZone?: string
  fax?: string // honeypot
}

const str = (v: unknown, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max + 1) : ''

function fmt(date: Date, timeZone: string) {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone,
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    }).format(date)
  } catch {
    return date.toISOString()
  }
}

export async function POST(request: Request) {
  let body: Payload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 })
  }

  // Honeypot: accept silently so bots learn nothing.
  if (body.fax) return NextResponse.json({ ok: true })

  const name = str(body.name, 120)
  const email = str(body.email, 200)
  const company = str(body.company, 160)
  const website = str(body.website, 200)
  const country = str(body.country, 100)
  const budget = str(body.budget, 60)
  const timeline = str(body.timeline, 60)
  const notes = str(body.notes, 3000)
  const model = str(body.model, 80)
  const clientTz = str(body.timeZone, 80) || 'UTC'
  const types = Array.isArray(body.projectTypes)
    ? body.projectTypes.filter((t): t is string => typeof t === 'string' && projectTypes.includes(t))
    : []
  const start = new Date(str(body.start, 40))

  const tooLong =
    name.length > 120 || email.length > 200 || company.length > 160 || website.length > 200 ||
    country.length > 100 || notes.length > 3000
  const now = Date.now()
  const badSlot =
    Number.isNaN(start.getTime()) || start.getTime() < now || start.getTime() > now + 90 * 86400000

  if (!name || !company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please check your name, email and company.' }, { status: 400 })
  }
  if (!types.length || !budgets.includes(budget) || !timelines.includes(timeline)) {
    return NextResponse.json({ error: 'Please complete the project details.' }, { status: 400 })
  }
  if (badSlot) {
    return NextResponse.json({ error: 'Please choose another time.' }, { status: 400 })
  }
  if (tooLong) {
    return NextResponse.json({ error: 'Some answers are too long.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { error: `Booking is not connected yet. Please write to ${profile.email} directly.` },
      { status: 501 },
    )
  }

  const hostTime = fmt(start, HOST_TIME_ZONE)
  const clientTime = fmt(start, clientTz)
  const text = [
    'NEW DISCOVERY CALL REQUEST',
    '',
    `Requested time:  ${hostTime}`,
    `Client's time:   ${clientTime} (${clientTz})`,
    `Length:          ${MEETING_MINUTES} minutes · Google Meet`,
    '',
    `Name:      ${name}`,
    `Email:     ${email}`,
    `Company:   ${company}`,
    `Website:   ${website || '—'}`,
    `Country:   ${country || '—'}`,
    '',
    `Project type:  ${types.join(', ')}`,
    `Budget:        ${budget}`,
    `Timeline:      ${timeline}`,
    ...(model ? [`Interested in: ${model}`] : []),
    '',
    'About the project:',
    notes || '—',
    '',
    '—',
    'Reply to this email to confirm and send the Google Meet invitation.',
  ].join('\n')

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Discovery call request — ${name}, ${company} — ${fmt(start, HOST_TIME_ZONE)}`,
        text,
      }),
    })
    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      console.error('Resend rejected the booking:', response.status, detail)
      return NextResponse.json(
        { error: `Could not send. Please write to ${profile.email} directly.` },
        { status: 502 },
      )
    }
    return NextResponse.json({ ok: true })
  } catch (cause) {
    console.error('Booking endpoint failed:', cause)
    return NextResponse.json(
      { error: `Could not send. Please write to ${profile.email} directly.` },
      { status: 502 },
    )
  }
}
