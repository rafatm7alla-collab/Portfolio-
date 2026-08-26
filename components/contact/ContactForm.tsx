'use client'

import { useState } from 'react'
import { profile } from '@/data/profile'
import { Meta, Micro } from '@/components/type/Type'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/**
 * CONTACT FORM
 *
 * The one piece of product UI on the site, so it is built from the same parts
 * as everything else: hairline underlines instead of boxes, 11px uppercase
 * labels, zero radius, and a submit that is a bordered rectangle inverting on
 * hover rather than a filled button.
 *
 * Submission posts to /api/contact. If no mail provider is configured the
 * endpoint says so plainly and this form surfaces the direct email address —
 * a message is never silently swallowed.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>

    const nextErrors: Record<string, string> = {}
    if (!data.name?.trim()) nextErrors.name = 'Required'
    if (!data.email?.trim()) nextErrors.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = 'Not a valid address'
    }
    if (!data.message?.trim()) nextErrors.message = 'Required'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('sending')
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const body = await response.json().catch(() => ({}))

      if (!response.ok) {
        setStatus('error')
        setError(body.error ?? 'Something went wrong.')
        return
      }

      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
      setError('Could not reach the server.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="border-t pt-8" style={{ borderColor: 'var(--hairline)' }}>
        <p className="t-headline">Message sent.</p>
        <Meta as="p" secondary className="mt-6">
          Thank you — I&apos;ll come back to you shortly.
        </Meta>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="t-meta link mt-8"
        >
          Send another →
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* Honeypot — real people never fill this in. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2">
        <Field
          name="name"
          label="Name"
          placeholder="Your name"
          error={errors.name}
          autoComplete="name"
        />
        <Field
          name="email"
          label="Email"
          type="email"
          placeholder="your@email.com"
          error={errors.email}
          autoComplete="email"
        />
      </div>

      <div className="mt-10">
        <label htmlFor="subject" className="block">
          <Meta as="span" secondary>
            Subject
          </Meta>
        </label>
        <select
          id="subject"
          name="subject"
          defaultValue={profile.enquiryTypes[0]}
          className="mt-4 w-full appearance-none border-0 border-b bg-transparent pb-3 text-[clamp(1rem,1.4vw,1.125rem)] outline-none focus-visible:border-current"
          style={{ borderColor: 'var(--hairline)', borderRadius: 0 }}
        >
          {profile.enquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-10">
        <label htmlFor="message" className="block">
          <Meta as="span" secondary>
            Message
          </Meta>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell me about your project…"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className="mt-4 w-full resize-y border-0 border-b bg-transparent pb-3 text-[clamp(1rem,1.4vw,1.125rem)] outline-none placeholder:text-[color:var(--ink-secondary)] focus-visible:border-current"
          style={{ borderColor: 'var(--hairline)', borderRadius: 0 }}
        />
        {errors.message && (
          <Micro as="p" id="message-error" className="mt-3">
            {errors.message}
          </Micro>
        )}
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="t-meta invert-hover border border-current px-10 py-5 hover:bg-[color:var(--ink)] hover:text-[color:var(--paper)] disabled:opacity-40"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>

        {status === 'error' && error && (
          <div>
            <Micro as="p">{error}</Micro>
            <a href={`mailto:${profile.email}`} className="t-meta link mt-2 inline-block">
              {profile.email}
            </a>
          </div>
        )}
      </div>
    </form>
  )
}

/* ─── Field ──────────────────────────────────────────────────────── */

function Field({
  name,
  label,
  placeholder,
  error,
  type = 'text',
  autoComplete,
}: {
  name: string
  label: string
  placeholder: string
  error?: string
  type?: string
  autoComplete?: string
}) {
  return (
    <div>
      <label htmlFor={name} className="block">
        <Meta as="span" secondary>
          {label}
        </Meta>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="mt-4 w-full border-0 border-b bg-transparent pb-3 text-[clamp(1rem,1.4vw,1.125rem)] outline-none placeholder:text-[color:var(--ink-secondary)] focus-visible:border-current"
        style={{ borderColor: 'var(--hairline)', borderRadius: 0 }}
      />
      {error && (
        <Micro as="p" id={`${name}-error`} className="mt-3">
          {error}
        </Micro>
      )}
    </div>
  )
}
