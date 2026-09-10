'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReduced) return

    const isTouch =
      'ontouchstart' in window || navigator.maxTouchPoints > 0

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      ...(isTouch ? {} : { touchMultiplier: 2 }),
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(lenis.raf as any)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
