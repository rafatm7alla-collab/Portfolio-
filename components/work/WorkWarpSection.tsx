'use client'

import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from '@/lib/gsap'
import { WarpCarousel, type WarpItem } from '@/components/work/WarpCarousel'

/**
 * Project preview between the Work banner and the category list.
 *
 * Desktop: the section pins and the page's scroll drives the warp
 * carousel — every scroll step holds a project, then curls it away to the
 * next. When the last project has passed, the pin releases and the page
 * scrolls on, so nothing traps the reader.
 * Phone: no pin (pinned sections feel broken on touch); the carousel plays
 * by itself (one still card under reduced motion).
 */
/** Scroll per project, in % of the viewport — higher = slower. */
const PER_CARD_VH = 38

export function WorkWarpSection({ items }: { items: WarpItem[] }) {
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const counter = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  const progress = useRef(0)
  const runway = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<'scroll' | 'auto' | null>(null)
  const n = items.length

  useEffect(() => {
    // Scroll-driven on desktop for everyone: the carousel only moves when
    // the visitor scrolls, so it is motion they control — kept even with
    // "Reduce motion" on. Phones get the self-playing version (which
    // WarpCarousel freezes to one still under reduced motion).
    const desktop = window.matchMedia('(min-width: 768px)').matches
    setMode(desktop ? 'scroll' : 'auto')
  }, [])

  useEffect(() => {
    if (mode !== 'scroll' || !section.current || !runway.current) return
    // No GSAP pin: the stage is CSS position: sticky inside a section made
    // tall by a fixed-height runway. Pinning inserts and removes spacers on
    // every refresh, which changed the page height, which triggered another
    // refresh — the page flip-flopped and the scroll position jumped.
    // Sticky never changes layout, so there is nothing to loop.
    const html = document.documentElement
    const prevAnchor = html.style.overflowAnchor
    html.style.overflowAnchor = 'none'
    const st = ScrollTrigger.create({
      trigger: section.current,
      // the stage starts sticking when the section top reaches 10 % …
      start: 'top 10%',
      // … and stays for exactly the runway's height
      end: () => `+=${runway.current?.offsetHeight ?? 0}`,
      onUpdate: (self) => {
        progress.current = self.progress
        const i = Math.round(self.progress * (n - 1)) + 1
        if (counter.current) counter.current.textContent = `${String(i).padStart(2, '0')} / ${String(n).padStart(2, '0')}`
        if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`
      },
    })
    return () => {
      st.kill()
      html.style.overflowAnchor = prevAnchor
    }
  }, [mode, n])

  return (
    <section ref={section} className="ww-section" aria-label="Project preview">
      <div ref={stage} className={`ww-stage ${mode === 'scroll' ? 'ww-stage--sticky' : ''}`}>
        <div className="page ww-head">
          <p className="ww-label">Selected projects</p>
          {mode === 'scroll' && (
            <p className="ww-meta">
              <span ref={counter}>01 / {String(n).padStart(2, '0')}</span>
              <span className="ww-hint">Scroll to browse</span>
            </p>
          )}
        </div>

        {/* Same frame as the homepage banner: page margins, radius, height. */}
        <div className="page ww-canvas-wrap">
          <div className="ww-frame">
            {mode && (
              <WarpCarousel
                items={items}
                className="ww-canvas"
                progress={mode === 'scroll' ? progress : undefined}
              />
            )}
          </div>
        </div>

        {mode === 'scroll' && (
          <div className="page">
            <span className="ww-track" aria-hidden="true">
              <span ref={bar} className="ww-bar" />
            </span>
          </div>
        )}
      </div>
      {/* The scroll distance the stage stays stuck for: one step per project. */}
      {mode === 'scroll' && (
        <div ref={runway} aria-hidden="true" style={{ height: `${(n - 1) * PER_CARD_VH}vh` }} />
      )}
    </section>
  )
}
