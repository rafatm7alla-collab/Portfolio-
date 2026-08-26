'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import {
  DEFAULT_MOTION_MODE,
  SCROLL_SCALE_FROM,
  type MotionMode,
} from '@/data/motion'

/**
 * SCROLL-LINKED SCALE
 *
 * The image enters at 1.12 and settles to 1.0 by the time its centre reaches
 * the centre of the viewport, then holds. One direction, one settle — it is
 * the MASK primitive extended across scroll rather than fired once.
 *
 * Deliberately NOT parallax: nothing translates against the page, scroll speed
 * is untouched, and no scroll event is intercepted. That distinction is what
 * makes it compatible with §08's ban on scroll-jacking.
 *
 * Off below the md breakpoint — transform-on-scroll is exactly where cheap
 * Android devices drop frames, and a 1.12 → 1.0 settle is not worth jank.
 * Off entirely under prefers-reduced-motion.
 */
export function ScrollScale({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [mode, setMode] = useState<MotionMode>(DEFAULT_MOTION_MODE)
  const [wideEnough, setWideEnough] = useState(false)

  useEffect(() => {
    // Read from location rather than useSearchParams: this sits inside a
    // statically rendered page, and useSearchParams would force it dynamic.
    const param = new URLSearchParams(window.location.search).get('motion')
    if (param === 'static' || param === 'scroll') setMode(param)

    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setWideEnough(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [SCROLL_SCALE_FROM, 1])

  const active = mode === 'scroll' && wideEnough && !reduced

  return (
    <div ref={ref} className={className}>
      <motion.div style={active ? { scale } : undefined}>{children}</motion.div>
    </div>
  )
}
