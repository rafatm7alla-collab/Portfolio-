'use client'

import { useEffect, useRef } from 'react'

/**
 * Client name ticker. Drifts left on its own; can be dragged or swiped
 * (mouse or touch) to scrub through the names, and a flick carries on with
 * momentum before easing back to the idle drift.
 */
export function ClientTicker({ names }: { names: readonly string[] }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    const IDLE = -40 // px per second, leftwards
    let x = 0
    let velocity = IDLE
    let half = track.scrollWidth / 2
    let dragging = false
    let lastX = 0
    let lastT = 0
    let hovering = false
    let raf = 0
    let prev = performance.now()

    const wrapX = () => {
      if (half <= 0) return
      x = ((x % half) - half) % half // keep in [-half, 0)
    }

    const frame = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05)
      prev = now
      if (!dragging) {
        const target = hovering ? 0 : IDLE
        // ease any flick velocity back to the idle drift
        velocity += (target - velocity) * Math.min(1, dt * 2.5)
        x += velocity * dt
      }
      wrapX()
      track.style.transform = `translate3d(${x}px,0,0)`
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    const onDown = (e: PointerEvent) => {
      dragging = true
      lastX = e.clientX
      lastT = performance.now()
      velocity = 0
      wrap.setPointerCapture(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      const now = performance.now()
      const dx = e.clientX - lastX
      x += dx
      const dt = Math.max((now - lastT) / 1000, 0.001)
      velocity = dx / dt
      lastX = e.clientX
      lastT = now
    }
    const onUp = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      if (wrap.hasPointerCapture(e.pointerId)) wrap.releasePointerCapture(e.pointerId)
      // cap the flick so it never blurs past illegibly
      velocity = Math.max(-2500, Math.min(2500, velocity))
    }
    const onEnter = () => { hovering = true }
    const onLeave = () => { hovering = false }
    const onResize = () => { half = track.scrollWidth / 2 }

    wrap.addEventListener('pointerdown', onDown)
    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerup', onUp)
    wrap.addEventListener('pointercancel', onUp)
    wrap.addEventListener('mouseenter', onEnter)
    wrap.addEventListener('mouseleave', onLeave)
    const ro = new ResizeObserver(onResize)
    ro.observe(track)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      wrap.removeEventListener('pointerdown', onDown)
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerup', onUp)
      wrap.removeEventListener('pointercancel', onUp)
      wrap.removeEventListener('mouseenter', onEnter)
      wrap.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const items = [...names, ...names]
  return (
    <div ref={wrapRef} className="client-ticker" aria-label="Selected clients">
      <ul ref={trackRef} className="client-ticker__track">
        {items.map((name, i) => (
          <li key={i} aria-hidden={i >= names.length || undefined}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
}
