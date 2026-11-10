'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from '@studio-freight/lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

/**
 * Smooth wheel scrolling for desktop mice/trackpads only.
 *
 * Touch devices (phones, tablets, touch laptops in tablet mode) keep the
 * browser's native momentum scrolling — it is always smoother than any JS
 * emulation there, and replacing it was the main source of "scroll feels
 * wrong" reports on mobile.
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    const noHover = window.matchMedia('(hover: none)').matches
    if (prefersReduced || coarsePointer || noHover) return

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    // Keep a reference to the exact callback so cleanup removes the same
    // function. Previously an anonymous arrow was added and a different
    // function removed, so every remount left an extra ticker running.
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // New page → start at the top instantly, so Lenis doesn't animate from the
  // previous page's position.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  return lenisRef
}
