'use client'

import { useEffect, type ReactNode } from 'react'
import { useLenis } from '@/hooks/useLenis'
import { ScrollTrigger } from '@/lib/gsap'

export function SmoothScroll({ children }: { children: ReactNode }) {
  useLenis()

  // Page height changes after first paint (images load, a Work category
  // expands, a video mounts). Re-measure scroll triggers when it does, so
  // reveal animations fire at the right place instead of leaving content
  // hidden until the visitor scrolls back up.
  useEffect(() => {
    let timer = 0
    let lastHeight = document.body.scrollHeight
    let refreshing = false
    const ro = new ResizeObserver(() => {
      // A refresh briefly removes pin spacers and puts them back; that is
      // a height change we caused ourselves, not new content. Reacting to
      // it re-triggered refresh forever (page height flip-flopping, the
      // scroll position dragged with it) on any page with a pinned section.
      if (refreshing) return
      const h = document.body.scrollHeight
      if (Math.abs(h - lastHeight) < 2) return
      lastHeight = h
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        refreshing = true
        ScrollTrigger.refresh()
        lastHeight = document.body.scrollHeight
        // Let the observer's callback for this refresh's own layout pass go by.
        requestAnimationFrame(() => requestAnimationFrame(() => (refreshing = false)))
      }, 150)
    })
    ro.observe(document.body)
    return () => {
      ro.disconnect()
      window.clearTimeout(timer)
    }
  }, [])

  return <>{children}</>
}
