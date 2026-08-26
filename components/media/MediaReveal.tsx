'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/**
 * MEDIA REVEAL — the single scroll-reveal wrapper for case-study media.
 *
 * Enters view → opacity 0→1 over 700ms, scale 1.06→1 over 1200ms.
 *
 * The two durations are deliberately NOT synced. Opacity finishes first, so
 * the image is fully visible while still settling for another half second.
 * That offset is the entire effect — collapse it to one duration and it
 * reads as a plain fade.
 *
 * No translateY: this is a settle, not a slide.
 *
 * NOT for type. Headings and body copy keep the house Reveal (opacity +
 * 24px rise). Nav, logo and UI chrome are never wrapped.
 */

const OPACITY_MS = 700
const SCALE_MS = 1200
const SCALE_FROM = 1.06

export function MediaReveal({
  children,
  /** ms. 100 per item for side-by-side pairs; 0 for a full-bleed single. */
  delay = 0,
  /**
   * Above-the-fold media renders in its final state immediately — no
   * observer, no animation, nothing to wait for.
   */
  immediate = false,
  className = '',
  style,
}: {
  children: ReactNode
  delay?: number
  immediate?: boolean
  className?: string
  /** Carries the frame's aspect-ratio, so layout is reserved before load. */
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(immediate)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (immediate) return

    // Final state instantly, no animation.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }

    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setAnimating(true)
        setShown(true)
        // Plays once. Unobserve immediately so scrolling back up never
        // replays it and the observer stops costing anything.
        observer.unobserve(entry.target)
      },
      { rootMargin: '0px 0px -20% 0px', threshold: 0.1 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [immediate])

  // will-change is a promise to the compositor, not a free win — held only
  // for the length of the run, then released.
  useEffect(() => {
    if (!animating) return
    const done = window.setTimeout(() => setAnimating(false), SCALE_MS + delay + 50)
    return () => window.clearTimeout(done)
  }, [animating, delay])

  return (
    <div
      ref={ref}
      // overflow-hidden so the 1.06 scale never bleeds past the frame.
      className={`overflow-hidden ${className}`}
      style={style}
    >
      <div
        // relative + full size so a `fill` image inside still measures
        // against the frame rather than escaping to the page.
        className="relative h-full w-full"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? 'scale(1)' : `scale(${SCALE_FROM})`,
          transformOrigin: 'center',
          willChange: animating ? 'opacity, transform' : undefined,
          transition: immediate
            ? undefined
            : [
                `opacity ${OPACITY_MS}ms var(--ease-editorial) ${delay}ms`,
                `transform ${SCALE_MS}ms var(--ease-editorial) ${delay}ms`,
              ].join(', '),
        }}
      >
        {children}
      </div>
    </div>
  )
}
