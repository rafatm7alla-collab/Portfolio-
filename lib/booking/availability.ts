/**
 * ─────────────────────────────────────────────────────────────────
 * DISCOVERY CALL: times offered and how a request is sent.
 *
 * Current set-up: a booking is a REQUEST. The pop-up offers Rafat's
 * weekly call hours (below, in his time zone, shown to the visitor in
 * theirs) and posts the chosen time to /api/booking, which emails it to
 * Rafat. He confirms by replying with the Google Meet invitation.
 *
 * To move to live calendar booking later, implement `BookingProvider`
 * against the chosen service and swap it in DiscoveryCallModal:
 *   - Calendly: getSlots → event_type_available_times; book → Calendly
 *     creates the invitee and sends the Meet link.
 *   - Google Calendar: getSlots → a server route calling freebusy.query;
 *     book → a server route inserting the event with conferenceData.
 * ─────────────────────────────────────────────────────────────────
 */

export type Slot = { start: Date; end: Date }

export type BookingRequest = {
  slot: Slot
  timeZone: string
  name: string
  email: string
  company: string
  website?: string
  country?: string
  projectTypes: string[]
  budget: string
  timeline: string
  notes?: string
  model?: string
  /** honeypot — always empty for people */
  fax?: string
}

export interface BookingProvider {
  /** Times on offer between `from` and `to` (inclusive days). */
  getSlots(from: Date, to: Date): Promise<Slot[]>
  /** Sends the request. Throws an Error with a visitor-readable message. */
  book(req: BookingRequest): Promise<void>
}

export const MEETING_MINUTES = 30
export const HOST_TIME_ZONE = 'Europe/Belgrade'

/** Weekly call hours (HH:MM in HOST_TIME_ZONE), Monday–Friday. */
const WEEKLY = ['10:00', '11:30', '14:00', '15:30', '17:00']

/** Offset of `tz` from UTC at `date`, in minutes. */
function tzOffset(date: Date, tz: string) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  )
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second)
  return (asUtc - date.getTime()) / 60000
}

/** A wall-clock time in `tz` → the real instant. */
function zoned(y: number, m: number, d: number, hh: number, mm: number, tz: string) {
  const guess = new Date(Date.UTC(y, m, d, hh, mm))
  return new Date(guess.getTime() - tzOffset(guess, tz) * 60000)
}

export const emailRequestProvider: BookingProvider = {
  async getSlots(from, to) {
    const out: Slot[] = []
    const earliest = Date.now() + 24 * 3600 * 1000 // at least a day's notice
    const day = new Date(from)
    day.setHours(12, 0, 0, 0)
    while (day <= to) {
      const y = day.getFullYear(),
        m = day.getMonth(),
        d = day.getDate()
      const dow = new Date(Date.UTC(y, m, d)).getUTCDay()
      if (dow >= 1 && dow <= 5) {
        for (const t of WEEKLY) {
          const [hh, mm] = t.split(':').map(Number)
          const start = zoned(y, m, d, hh, mm, HOST_TIME_ZONE)
          if (start.getTime() < earliest) continue
          out.push({ start, end: new Date(start.getTime() + MEETING_MINUTES * 60000) })
        }
      }
      day.setDate(day.getDate() + 1)
    }
    return out
  },

  async book(req) {
    let res: Response
    try {
      res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...req,
          slot: undefined,
          start: req.slot.start.toISOString(),
        }),
      })
    } catch {
      throw new Error('Could not reach the server. Please check your connection and try again.')
    }
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.error || 'Could not send your request.')
    }
  },
}
