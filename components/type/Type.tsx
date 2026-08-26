import type { CSSProperties, ElementType, ReactNode } from 'react'
import { Reveal } from '@/components/primitives/Reveal'

type TypeProps = {
  children: ReactNode
  as?: ElementType
  secondary?: boolean
  className?: string
  style?: CSSProperties
  /** For aria-describedby wiring on form errors. */
  id?: string
  /**
   * Forwarded to the DOM. Without this, spreading directionProps() onto Meta
   * or Micro silently dropped `dir` — TSX does not excess-check spreads — and
   * Arabic captions and video titles rendered left-to-right.
   */
  dir?: 'rtl' | 'ltr'
}

/** 11px uppercase +0.14em — the quiet half of every typographic pair. */
export function Meta({
  children,
  as: Tag = 'p',
  secondary = false,
  className = '',
  style,
  id,
  dir,
}: TypeProps) {
  return (
    <Tag
      id={id}
      dir={dir}
      className={`t-meta ${secondary ? 'ink-secondary' : ''} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  )
}

/** 10px uppercase +0.2em — numbers, captions, credits. */
export function Micro({
  children,
  as: Tag = 'p',
  secondary = false,
  className = '',
  style,
  id,
  dir,
}: TypeProps) {
  return (
    <Tag
      id={id}
      dir={dir}
      className={`t-micro ${secondary ? 'ink-secondary' : ''} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  )
}

/**
 * The signature pair: BOLD word over light word.
 *
 *   SELECTED     ← 700
 *   work         ← 300, indented
 */
export function SectionHeader({
  bold,
  light,
  count,
  as: Tag = 'h2',
}: {
  bold: string
  light: string
  count?: string
  as?: ElementType
}) {
  return (
    <header className="flex items-start justify-between gap-6">
      <Tag className="t-display-l">
        <Reveal as="span" className="block uppercase">
          {bold}
        </Reveal>
        {/* The light half is set as authored — no transform. The weight
            and the indent carry the contrast, not a case change. */}
        <Reveal as="span" delay={80} className="t-light block pl-[0.32em]">
          {light}
        </Reveal>
      </Tag>
      {count && (
        <Reveal delay={160} className="shrink-0 pt-[0.6em]">
          <Micro secondary>({count})</Micro>
        </Reveal>
      )}
    </header>
  )
}

/**
 * The same pair at display-xl. Used by the homepage hero and the contact
 * statement — the two largest pieces of type on the site.
 *
 * `boldFirst` controls which half leads. The hero opens on the bold half;
 * the contact statement closes on it.
 */
export function DisplayPair({
  bold,
  light,
  boldFirst = true,
  uppercaseBold = true,
  /**
   * 900 is permitted exactly once on the entire site — the homepage hero.
   * If it appears twice it stops being an event.
   */
  black = false,
  as: Tag = 'h2',
  delay = 0,
  size = 'xl',
}: {
  bold: string
  light: string
  boldFirst?: boolean
  uppercaseBold?: boolean
  black?: boolean
  as?: ElementType
  delay?: number
  /** Step down when the pair shares a row, e.g. beside the contact form. */
  size?: 'xl' | 'l' | 'm'
}) {
  const boldHalf = (
    <Reveal
      as="span"
      delay={boldFirst ? delay : delay + 80}
      className={`block ${uppercaseBold ? 'uppercase' : ''} ${black ? 't-hero-black' : ''}`}
    >
      {bold}
    </Reveal>
  )

  const lightHalf = (
    <Reveal
      as="span"
      delay={boldFirst ? delay + 80 : delay}
      className="t-light block"
      // A hair of optical indent so the light half reads as a second
      // voice rather than a second line of the same sentence.
      style={{ paddingLeft: '0.06em' }}
    >
      {light}
    </Reveal>
  )

  return (
    <Tag
      className={
        size === 'xl' ? 't-display-xl' : size === 'l' ? 't-display-l' : 't-display-m'
      }
    >
      {boldFirst ? boldHalf : lightHalf}
      {boldFirst ? lightHalf : boldHalf}
    </Tag>
  )
}

/**
 * A stack of display-xl lines, each at its own weight, revealed 80ms apart.
 *
 * Used for the name lockup in the homepage hero. Unlike DisplayPair this
 * permits a three-step gradation (700 → 300 → 400); the ≥300 weight-jump law
 * governs pairs of different sizes, not the internal steps of a single
 * wordmark set at one size.
 */
export function DisplayStack({
  lines,
  as: Tag = 'h1',
  delay = 0,
  uppercase = true,
  size = 'xl',
}: {
  lines: readonly { text: string; weight: number }[]
  as?: ElementType
  delay?: number
  uppercase?: boolean
  /** 'l' when the stack shares a row with something else, e.g. the logo. */
  size?: 'xl' | 'l'
}) {
  return (
    <Tag
      className={`${size === 'xl' ? 't-display-xl' : 't-display-l'} ${
        uppercase ? 'uppercase' : ''
      }`}
    >
      {lines.map((line, i) => (
        <Reveal
          key={line.text + i}
          as="span"
          delay={delay + i * 80}
          className="block"
          style={{ fontWeight: line.weight }}
        >
          {line.text}
        </Reveal>
      ))}
    </Tag>
  )
}

/**
 * Renders wherever a project has not been confirmed as real.
 * Content rule §37 — nothing unverified is ever presented as work.
 */
export function PlaceholderTag({ className = '' }: { className?: string }) {
  return (
    <span
      className={`t-micro inline-block border border-current px-[6px] py-[3px] align-middle ${className}`}
      style={{ letterSpacing: '0.2em' }}
    >
      Placeholder
    </span>
  )
}
