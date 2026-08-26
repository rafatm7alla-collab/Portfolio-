'use client'

import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { WorkProject } from '@/data/work'
import { categoryLabel } from '@/data/work'
import { Meta, Micro } from '@/components/type/Type'

/**
 * The filtered list.
 *
 * Rows are renumbered 01..n on every change, so the numbering always
 * describes what is visible rather than a project's position in the
 * source array.
 *
 * TRANSITION — the outgoing set fades and drops away on a tight stagger,
 * the incoming set is already arriving before the last row has left. The
 * two phases overlap on purpose: run them end to end and six rows take
 * ~670ms, which reads as a page reload rather than a filter.
 *
 *   out   130ms, 18ms stagger   swap at 150ms
 *   in    190ms, 22ms stagger   last row settles ~450ms
 *
 * The container's height is animated across the swap so the page below
 * never jumps.
 *
 * Under prefers-reduced-motion this is a 120ms cross-fade with no
 * transform and no stagger.
 */

const OUT_MS = 130
const OUT_STAGGER = 18
const SWAP_MS = 150
const IN_MS = 190
const IN_STAGGER = 22
/** Stagger caps at six so a long list does not ripple for a second. */
const MAX_STAGGER_ITEMS = 6

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function ProjectRows({ projects }: { projects: WorkProject[] }) {
  const [displayed, setDisplayed] = useState(projects)
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle')
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Swap sets, animating the wrapper height across the change.
  useIsomorphicLayoutEffect(() => {
    if (projects === displayed) return

    const wrap = wrapRef.current
    const inner = innerRef.current
    if (wrap && inner) wrap.style.height = `${inner.offsetHeight}px`

    setPhase('out')
    const swap = window.setTimeout(
      () => {
        setDisplayed(projects)
        setPhase('in')
      },
      reduced.current ? 120 : SWAP_MS,
    )
    return () => window.clearTimeout(swap)
    // `displayed` is intentionally excluded: this must run when the incoming
    // set changes, not when the swap completes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects])

  // After the new set paints, ease the wrapper to its natural height.
  useIsomorphicLayoutEffect(() => {
    if (phase !== 'in') return
    const wrap = wrapRef.current
    const inner = innerRef.current
    if (!wrap || !inner) return

    const target = inner.offsetHeight
    requestAnimationFrame(() => {
      wrap.style.height = `${target}px`
    })

    const done = window.setTimeout(() => {
      wrap.style.height = 'auto'
      setPhase('idle')
    }, IN_MS + IN_STAGGER * MAX_STAGGER_ITEMS)

    return () => window.clearTimeout(done)
  }, [phase, displayed])

  if (displayed.length === 0) {
    return (
      <div ref={wrapRef} className="overflow-hidden transition-[height] duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div ref={innerRef}>
          <EmptyState />
        </div>
      </div>
    )
  }

  return (
    <div
      ref={wrapRef}
      className="overflow-hidden transition-[height] duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
    >
      <div ref={innerRef}>
        <ul className="border-t" style={{ borderColor: 'var(--hairline)' }}>
          {displayed.map((project, i) => {
            const step = Math.min(i, MAX_STAGGER_ITEMS)
            const leaving = phase === 'out'
            const delay = leaving ? step * OUT_STAGGER : step * IN_STAGGER

            return (
              <li
                key={project.id}
                className="border-b"
                style={{
                  borderColor: 'var(--hairline)',
                  opacity: leaving ? 0 : 1,
                  transform: reduced.current
                    ? undefined
                    : leaving
                      ? 'translateY(8px)'
                      : 'translateY(0)',
                  transition: reduced.current
                    ? `opacity 120ms linear ${delay}ms`
                    : `opacity ${leaving ? OUT_MS : IN_MS}ms var(--ease-editorial) ${delay}ms, transform ${leaving ? OUT_MS : IN_MS}ms var(--ease-editorial) ${delay}ms`,
                }}
              >
                <Row project={project} number={i + 1} />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

/* ─── Row ────────────────────────────────────────────────────────── */

function Row({ project, number }: { project: WorkProject; number: number }) {
  const primary = project.categories[0]

  return (
    <Link href={project.href} className="group block">
      <div className="page">
        <div className="grid-page items-baseline py-5 md:py-6">
          <Micro as="span" className="col-span-1 block" style={{ opacity: 0.6 }}>
            {String(number).padStart(2, '0')}
          </Micro>

          {/* t-display-s at 70% size — bold stays, but the row's job is to
              list, not headline; the category strip above should carry the
              visual weight of the page. */}
          <h3
            className="t-display-s col-span-3 transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[12px] md:col-span-4 lg:col-span-5"
            style={{ fontSize: 'clamp(1.1375rem, 2.38vw, 2.275rem)' }}
          >
            {project.title}
          </h3>

          {/* Primary category — categories[0] when a project sits in several. */}
          <Meta
            as="span"
            className="hidden md:col-span-2 md:block lg:col-span-2 lg:col-start-7"
          >
            {primary ? categoryLabel(primary) : ''}
          </Meta>

          {/* Client and year. An em dash where the value has not been
              supplied — never a guess, and never a blank cell. */}
          <Meta
            as="span"
            className="hidden lg:col-span-2 lg:col-start-9 lg:block"
            style={{ opacity: 0.62 }}
          >
            {project.client ?? '—'}
          </Meta>

          <Meta
            as="span"
            className="hidden text-right lg:col-span-2 lg:col-start-11 lg:block"
            style={{ opacity: 0.62 }}
          >
            {project.year ?? '—'}
          </Meta>
        </div>
      </div>
    </Link>
  )
}

/* ─── Empty ──────────────────────────────────────────────────────── */

function EmptyState() {
  return (
    <div className="border-t" style={{ borderColor: 'var(--hairline)' }}>
      <div className="page">
        <div className="py-[clamp(56px,10vh,120px)]">
          <p className="t-headline">Nothing here yet.</p>
          <Micro as="p" secondary className="mt-5">
            This category is waiting on its first project. Choose the tile again
            to see everything.
          </Micro>
        </div>
      </div>
    </div>
  )
}
