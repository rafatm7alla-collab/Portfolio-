'use client'

import { useEffect, useRef } from 'react'

/**
 * The hero figure: the five stage marks (option B, circles) drawn as one
 * construction, with a slow ambient motion.
 *
 *   Triangle (Design)     turns anticlockwise, one turn a minute
 *   Line (Define)         turns clockwise, twice as fast
 *   Big circle (Evolve)   rolls around the inside of the outer ring
 *   Small circle (Evolve) keeps trying to climb the wall of the big
 *                         circle: up, a hesitation near the top, slips
 *                         back, settles, tries again
 *
 * One rAF loop writes four SVG `transform` attributes, which costs next
 * to nothing. It pauses while the figure is off screen. By Rafat's
 * decision it is always in motion: no pause control, and it also plays
 * under prefers-reduced-motion (the motion is slow and small).
 *
 * Each moving part sits in an inner <g>, so the CSS entrance on the outer
 * .fw-mark-layer (which ends at transform: none) never overrides it.
 */

const C = 20 // centre of the 40 × 40 box
const BIG = { x: 16.1, y: 23.9, r: 8.5 } // tangent to the outer ring, lower left
const SMALL = { x: 12.6, y: 27.4, r: 3.5 } // tangent to both, same point

const TRIANGLE_S = 60 // seconds per turn
const LINE_S = 30
const ORBIT_S = 40
const CLIMB_S = 5.5 // one attempt

const easeOutSine = (x: number) => Math.sin((x * Math.PI) / 2)
const easeInCubic = (x: number) => x * x * x

/** Degrees up the wall of the big circle for one attempt, p in [0, 1). */
function climb(p: number) {
  const TOP = 78
  if (p < 0.55) return TOP * easeOutSine(p / 0.55) // the climb, slowing as it nears the top
  if (p < 0.68) return TOP + 5 * Math.sin(((p - 0.55) / 0.13) * Math.PI) // straining for the top
  if (p < 0.86) return TOP * (1 - easeInCubic((p - 0.68) / 0.18)) // slips back down
  const q = (p - 0.86) / 0.14
  return -9 * Math.sin(q * Math.PI) * (1 - q) // rocks past the bottom and settles
}

export function HeroFigure() {
  const svg = useRef<SVGSVGElement>(null)
  const tri = useRef<SVGGElement>(null)
  const line = useRef<SVGGElement>(null)
  const orbit = useRef<SVGGElement>(null)
  const small = useRef<SVGGElement>(null)
  const time = useRef(0) // kept while off screen

  useEffect(() => {
    const el = svg.current
    if (!el) return
    let raf = 0
    let visible = false
    let last = 0

    const frame = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0
      last = now
      const t = (time.current += dt)
      tri.current?.setAttribute('transform', `rotate(${(-t * 360) / TRIANGLE_S} ${C} ${C})`)
      line.current?.setAttribute('transform', `rotate(${(t * 360) / LINE_S} ${C} ${C})`)
      orbit.current?.setAttribute('transform', `rotate(${(t * 360) / ORBIT_S} ${C} ${C})`)
      small.current?.setAttribute(
        'transform',
        `rotate(${climb((t % CLIMB_S) / CLIMB_S)} ${BIG.x} ${BIG.y})`,
      )
      if (visible) raf = requestAnimationFrame(frame)
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) {
        last = 0
        raf = requestAnimationFrame(frame)
      }
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  const layer = (i: number) => ({ className: 'fw-mark-layer', style: { animationDelay: `${300 + i * 90}ms` } })

  return (
    <svg ref={svg} viewBox="0 0 40 40" focusable="false" aria-hidden="true">
      {/* 01 Discover — the point of focus */}
      <g {...layer(0)}>
        <circle cx={C} cy={C} r="2" />
      </g>
      {/* 02 Define — the dividing line, turning */}
      <g {...layer(1)}>
        <g ref={line}>
          <line x1="5" y1={C} x2="35" y2={C} />
        </g>
      </g>
      {/* 03 Design — the ring and its triangle, turning */}
      <g {...layer(2)}>
        <circle cx={C} cy={C} r="12" />
        <g ref={tri}>
          <polygon points="20,8 30.4,26 9.6,26" />
        </g>
      </g>
      {/* 04 Activate — the core */}
      <g {...layer(3)}>
        <circle cx={C} cy={C} r="6" />
      </g>
      {/* 05 Evolve — outer ring; the big circle rolls round it, the small one climbs */}
      <g {...layer(4)}>
        <circle cx={C} cy={C} r="14" />
        <g ref={orbit}>
          <circle cx={BIG.x} cy={BIG.y} r={BIG.r} />
          <g ref={small}>
            <circle cx={SMALL.x} cy={SMALL.y} r={SMALL.r} />
          </g>
        </g>
      </g>
    </svg>
  )
}
