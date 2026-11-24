'use client'

import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { budgets, projectTypes, timelines } from '@/data/framework'
import { profile } from '@/data/profile'
import {
  MEETING_MINUTES,
  emailRequestProvider as provider,
  type Slot,
} from '@/lib/booking/availability'

/**
 * DISCOVERY CALL — three steps and a confirmation, in one dialog.
 *
 * A booking is a REQUEST: Confirm posts the answers and chosen time to
 * /api/booking, which emails Rafat; he replies with the Google Meet
 * invitation. Nothing is stored in the browser. If sending fails the
 * visitor keeps everything they typed and sees the direct email address.
 * Times and sending both live in lib/booking/availability.ts, the one
 * place a Calendly / Google Calendar provider would plug in later.
 *
 * Accessibility: role=dialog + aria-modal, focus moves in on open and is
 * trapped while open, Escape closes, focus returns to the trigger (handled
 * by BookingProvider). Each step validates on Continue, marks invalid
 * fields with aria-invalid + a described-by message, and moves focus to the
 * first problem.
 */

type Form = {
  name: string
  email: string
  company: string
  website: string
  country: string
  types: string[]
  budget: string
  timeline: string
  notes: string
  slot: Slot | null
}

const EMPTY: Form = {
  name: '',
  email: '',
  company: '',
  website: '',
  country: '',
  types: [],
  budget: '',
  timeline: '',
  notes: '',
  slot: null,
}

type Errors = Partial<Record<keyof Form, string>>
const STEPS = ['About you', 'Your project', 'Schedule'] as const

export function DiscoveryCallModal({ model, onClose }: { model?: string; onClose: () => void }) {
  const [mounted, setMounted] = useState(false)
  const [closing, setClosing] = useState(false)
  const [step, setStep] = useState(0) // 0,1,2 → 3 = confirmation
  const [form, setForm] = useState<Form>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const honeypot = useRef<HTMLInputElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const titleId = useId()

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const requestClose = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setClosing(true)
    window.setTimeout(onClose, reduced ? 0 : 220)
  }

  useEffect(() => setMounted(true), [])

  // Scroll lock + Escape + focus trap
  useEffect(() => {
    if (!mounted) return
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        requestClose()
        return
      }
      if (e.key !== 'Tab' || !panel.current) return
      const f = panel.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])',
      )
      if (!f.length) return
      const first = f[0],
        last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      html.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted])

  // Each step: focus its heading, scroll the panel to the top
  useEffect(() => {
    if (!mounted) return
    panel.current?.scrollTo({ top: 0 })
    panel.current?.querySelector<HTMLElement>('[data-step-title]')?.focus()
  }, [step, mounted])

  const focusFirstError = (errs: Errors) => {
    const first = Object.keys(errs)[0]
    if (!first) return
    requestAnimationFrame(() =>
      panel.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus(),
    )
  }

  const next = () => {
    const errs: Errors = {}
    if (step === 0) {
      if (!form.name.trim()) errs.name = 'Please add your full name.'
      if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errs.email = 'Please add a valid email address.'
      if (!form.company.trim()) errs.company = 'Please add your company or brand name.'
    }
    if (step === 1) {
      if (!form.types.length) errs.types = 'Choose at least one project type.'
      if (!form.budget) errs.budget = 'Choose an estimated budget.'
      if (!form.timeline) errs.timeline = 'Choose a preferred timeline.'
    }
    if (step === 2) {
      if (!form.slot) errs.slot = 'Choose a date and time.'
    }
    setErrors(errs)
    if (Object.keys(errs).length) return focusFirstError(errs)
    if (step === 2) {
      if (sending) return
      setSending(true)
      setSendError('')
      provider
        .book({
          slot: form.slot!,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          name: form.name,
          email: form.email,
          company: form.company,
          website: form.website || undefined,
          country: form.country || undefined,
          projectTypes: form.types,
          budget: form.budget,
          timeline: form.timeline,
          notes: form.notes || undefined,
          model,
          fax: honeypot.current?.value || undefined,
        })
        .then(() => setStep(3))
        .catch((e: Error) => setSendError(e.message))
        .finally(() => setSending(false))
      return
    }
    setStep(step + 1)
  }

  if (!mounted) return null

  return createPortal(
    <div
      className="fwm-overlay"
      data-closing={closing || undefined}
      data-lenis-prevent
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) requestClose()
      }}
    >
      <div
        ref={panel}
        className="fwm-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="fwm-top">
          <span className="t-micro ink-secondary">Discovery call · {MEETING_MINUTES} min</span>
          <button type="button" className="fwm-close t-meta link" onClick={requestClose}>
            Close <span aria-hidden="true">×</span>
          </button>
        </div>

        {step < 3 && (
          <div className="fwm-progress" aria-label={`Step ${step + 1} of 3: ${STEPS[step]}`}>
            <p className="t-micro ink-secondary" aria-hidden="true">
              Step {String(step + 1).padStart(2, '0')} / 03 — {STEPS[step]}
            </p>
            <div className="fwm-bars" aria-hidden="true">
              {STEPS.map((s, i) => (
                <span key={s} data-on={i <= step || undefined} />
              ))}
            </div>
          </div>
        )}

        <div key={step} className="fwm-step">
          {step === 0 && (
            <>
              <StepTitle id={titleId}>Let&rsquo;s Get to Know Each Other.</StepTitle>
              <div className="fwm-grid">
                <Field label="Full name" name="name" value={form.name} onChange={(v) => set('name', v)} error={errors.name} autoComplete="name" required />
                <Field label="Email address" name="email" type="email" value={form.email} onChange={(v) => set('email', v)} error={errors.email} autoComplete="email" required />
                <Field label="Company or brand name" name="company" value={form.company} onChange={(v) => set('company', v)} error={errors.company} autoComplete="organization" required />
                <Field label="Company website" optional name="website" type="url" value={form.website} onChange={(v) => set('website', v)} autoComplete="url" placeholder="https://" />
                <Field label="Country" optional name="country" value={form.country} onChange={(v) => set('country', v)} autoComplete="country-name" />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <StepTitle id={titleId}>What Are We Building?</StepTitle>
              {model && (
                <p className="t-micro ink-secondary mb-8">Interested in: {model}</p>
              )}
              <Choice
                legend="Project type"
                hint="Select all that apply"
                name="types"
                multiple
                options={projectTypes}
                value={form.types}
                error={errors.types}
                onChange={(v) => set('types', v as string[])}
              />
              <Choice
                legend="Estimated project budget"
                name="budget"
                options={budgets}
                value={form.budget}
                error={errors.budget}
                onChange={(v) => set('budget', v as string)}
              />
              <Choice
                legend="Preferred project timeline"
                name="timeline"
                options={timelines}
                value={form.timeline}
                error={errors.timeline}
                onChange={(v) => set('timeline', v as string)}
              />
              <div className="fwm-field">
                <label htmlFor="fwm-notes" className="t-meta">
                  Additional information <span className="ink-secondary">— optional</span>
                </label>
                <textarea
                  id="fwm-notes"
                  rows={4}
                  className="fwm-input"
                  placeholder="Tell me briefly about your business, your challenges and what you would like to achieve."
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <StepTitle id={titleId}>Let&rsquo;s Find a Time to Talk.</StepTitle>
              <Scheduler value={form.slot} onChange={(s) => set('slot', s)} error={errors.slot} />
            </>
          )}

          {step === 3 && (
            <div className="fwm-done">
              <StepTitle id={titleId}>The Conversation Starts Here.</StepTitle>
              <p className="t-lede">
                Thank you, {form.name.trim().split(/\s+/)[0]}. Your request has been sent.
              </p>
              {form.slot && (
                <p className="fwm-done-slot">
                  {fmtDay(form.slot.start)} · {fmtTime(form.slot.start)}–{fmtTime(form.slot.end)} · Google Meet
                </p>
              )}
              <p className="fwm-notice t-body">
                I&rsquo;ll confirm this time by email at {form.email.trim()} and send you the
                Google Meet invitation.
              </p>
              <div className="fwm-actions">
                <button type="button" className="fw-btn" onClick={requestClose}>
                  Back to Website
                </button>
              </div>
            </div>
          )}

          {step === 2 && sendError && (
            <p className="fwm-send-error t-body" role="alert">
              Your request could not be sent ({sendError.split(' Please write')[0].replace(/\.$/, '')}).
              Nothing you typed is lost: try again, or write to{' '}
              <a href={`mailto:${profile.email}`} className="link">
                {profile.email}
              </a>
              .
            </p>
          )}

          {/* honeypot: hidden from people and assistive tech, bots fill it */}
          <div aria-hidden="true" className="fwm-hp">
            <label htmlFor="fwm-fax">Fax</label>
            <input id="fwm-fax" ref={honeypot} tabIndex={-1} autoComplete="off" />
          </div>

          {step < 3 && (
            <div className="fwm-actions">
              {step > 0 ? (
                <button type="button" className="t-meta link" onClick={() => setStep(step - 1)}>
                  ← Back
                </button>
              ) : (
                <span />
              )}
              <button type="button" className="fw-btn" onClick={next} disabled={sending} aria-busy={sending || undefined}>
                {step === 2 ? (sending ? 'Sending…' : 'Confirm Discovery Call') : 'Continue →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}

/* ─── pieces ─────────────────────────────────────────────────────── */

function StepTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} data-step-title tabIndex={-1} className="fwm-title">
      {children}
    </h2>
  )
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  optional,
  required,
  autoComplete,
  placeholder,
}: {
  label: string
  name: string
  value: string
  onChange: (v: string) => void
  error?: string
  type?: string
  optional?: boolean
  required?: boolean
  autoComplete?: string
  placeholder?: string
}) {
  const id = `fwm-${name}`
  return (
    <div className="fwm-field">
      <label htmlFor={id} className="t-meta">
        {label} {optional && <span className="ink-secondary">— optional</span>}
      </label>
      <input
        id={id}
        data-field={name}
        type={type}
        className="fwm-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        aria-required={required || undefined}
        autoComplete={autoComplete}
        placeholder={placeholder}
      />
      {error && (
        <p id={`${id}-err`} className="fwm-error t-micro" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

function Choice({
  legend,
  hint,
  name,
  options,
  value,
  onChange,
  error,
  multiple,
}: {
  legend: string
  hint?: string
  name: string
  options: string[]
  value: string | string[]
  onChange: (v: string | string[]) => void
  error?: string
  multiple?: boolean
}) {
  const errId = `fwm-${name}-err`
  return (
    <fieldset className="fwm-fieldset" aria-describedby={error ? errId : undefined}>
      <legend className="t-meta">
        {legend} {hint && <span className="ink-secondary">— {hint}</span>}
      </legend>
      <div className="fwm-chips">
        {options.map((o, i) => {
          const checked = multiple ? (value as string[]).includes(o) : value === o
          return (
            <label key={o} className="fwm-chip" data-checked={checked || undefined}>
              <input
                type={multiple ? 'checkbox' : 'radio'}
                name={`fwm-${name}`}
                value={o}
                checked={checked}
                data-field={i === 0 ? name : undefined}
                aria-invalid={!!error || undefined}
                onChange={() => {
                  if (!multiple) return onChange(o)
                  const arr = value as string[]
                  onChange(checked ? arr.filter((x) => x !== o) : [...arr, o])
                }}
              />
              <span>{o}</span>
            </label>
          )
        })}
      </div>
      {error && (
        <p id={errId} className="fwm-error t-micro" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  )
}

/* ─── scheduler ──────────────────────────────────────────────────── */

const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
const fmtTime = (d: Date) => d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
const fmtDay = (d: Date) =>
  d.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })

function Scheduler({
  value,
  onChange,
  error,
}: {
  value: Slot | null
  onChange: (s: Slot) => void
  error?: string
}) {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])
  const horizon = useMemo(() => new Date(today.getTime() + 42 * 86400000), [today])
  const [slots, setSlots] = useState<Slot[]>([])
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [day, setDay] = useState<string | null>(value ? dayKey(value.start) : null)

  useEffect(() => {
    provider.getSlots(today, horizon).then(setSlots)
  }, [today, horizon])

  const byDay = useMemo(() => {
    const m = new Map<string, Slot[]>()
    slots.forEach((s) => {
      const k = dayKey(s.start)
      m.set(k, [...(m.get(k) ?? []), s])
    })
    return m
  }, [slots])

  // Month grid, Monday first
  const cells = useMemo(() => {
    const first = new Date(month)
    const lead = (first.getDay() + 6) % 7
    const daysIn = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
    return [
      ...Array.from({ length: lead }, () => null),
      ...Array.from({ length: daysIn }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1)),
    ]
  }, [month])

  const canPrev = month > new Date(today.getFullYear(), today.getMonth(), 1)
  const canNext = new Date(month.getFullYear(), month.getMonth() + 1, 1) <= horizon
  const tzLabel = new Intl.DateTimeFormat(undefined, { timeZoneName: 'short' })
    .formatToParts(new Date())
    .find((p) => p.type === 'timeZoneName')?.value

  const daySlots = day ? byDay.get(day) ?? [] : []

  return (
    <div className="fwm-sched">
      <div className="fwm-sched-info">
        <p className="t-micro ink-secondary">Duration</p>
        <p className="fwm-sched-val">{MEETING_MINUTES} minutes</p>
        <p className="t-micro ink-secondary">Platform</p>
        <p className="fwm-sched-val">Google Meet</p>
        <p className="t-micro ink-secondary">Your time zone</p>
        <p className="fwm-sched-val">
          {tz.replace(/_/g, ' ')} {tzLabel && <span className="ink-secondary">({tzLabel})</span>}
        </p>
        <p className="t-micro ink-secondary fwm-sim">
          Your chosen time is sent as a request. I confirm by email with the Google Meet
          invitation.
        </p>
      </div>

      <div className="fwm-cal">
        <div className="fwm-cal-head">
          <button type="button" className="t-meta link" disabled={!canPrev} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} aria-label="Previous month">
            ←
          </button>
          <p className="t-meta" aria-live="polite">
            {month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
          </p>
          <button type="button" className="t-meta link" disabled={!canNext} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} aria-label="Next month">
            →
          </button>
        </div>
        <div className="fwm-cal-grid" role="group" aria-label="Choose a date">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
            <span key={d} className="fwm-cal-dow t-micro ink-secondary" aria-hidden="true">
              {d}
            </span>
          ))}
          {cells.map((d, i) => {
            if (!d) return <span key={`e${i}`} />
            const k = dayKey(d)
            const has = byDay.has(k)
            return (
              <button
                key={k}
                type="button"
                className="fwm-cal-day"
                disabled={!has}
                data-selected={day === k || undefined}
                data-field={i === cells.findIndex((c) => c && byDay.has(dayKey(c))) ? 'slot' : undefined}
                aria-pressed={day === k}
                aria-label={`${fmtDay(d)}${has ? `, ${byDay.get(k)!.length} times available` : ', unavailable'}`}
                onClick={() => setDay(k)}
              >
                {d.getDate()}
              </button>
            )
          })}
        </div>
      </div>

      <div className="fwm-times">
        <p className="t-micro ink-secondary">
          {day ? fmtDay(daySlots[0]?.start ?? new Date()) : 'Choose a date'}
        </p>
        {day && (
          <div className="fwm-time-list" role="group" aria-label="Available times">
            {daySlots.map((s) => {
              const sel = value?.start.getTime() === s.start.getTime()
              return (
                <button
                  key={s.start.toISOString()}
                  type="button"
                  className="fwm-time"
                  data-selected={sel || undefined}
                  aria-pressed={sel}
                  onClick={() => onChange(s)}
                >
                  {fmtTime(s.start)}
                </button>
              )
            })}
          </div>
        )}
        {error && (
          <p className="fwm-error t-micro" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
