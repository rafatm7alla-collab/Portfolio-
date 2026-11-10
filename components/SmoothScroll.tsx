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
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight
      if (Math.abs(h - lastHeight) < 2) return
      lastHeight = h
      window.clearTimeout(timer)
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 150)
    })
    ro.observe(document.body)
    return () => {
      ro.disconnect()
      window.clearTimeout(timer)
    }
  }, [])

  return <>{children}</>
}
