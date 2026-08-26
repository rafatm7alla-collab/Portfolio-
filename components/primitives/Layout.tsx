import type { ReactNode } from 'react'

/** Page container — max width, outer margins. */
export function Page({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`page ${className}`}>{children}</div>
}

/** 12 / 8 / 4 column editorial grid. */
export function Grid({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`grid-page ${className}`}>{children}</div>
}

/** Vertical rhythm block — clamp(96px, 14vh, 224px). */
export function Section({
  children,
  className = '',
  invert = false,
  id,
}: {
  children: ReactNode
  className?: string
  invert?: boolean
  id?: string
}) {
  return (
    <section
      id={id}
      className={`section ${className}`}
      {...(invert ? { 'data-invert': 'true', 'data-nav': 'dark' } : {})}
    >
      {children}
    </section>
  )
}

/** 1px hairline. The only border in the system. */
export function Rule({ className = '' }: { className?: string }) {
  return <hr className={`rule ${className}`} />
}
