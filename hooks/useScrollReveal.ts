'use client'

import { useEffect, type RefObject } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

type Options = {
  delay?: number
  y?: number
  duration?: number
}

export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  { delay = 0, y = 24, duration = 640 }: Options = {},
) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReduced) return

    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const actualY = isTouch ? 0 : y

    gsap.set(el, { opacity: 0, y: actualY })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: Math.min(duration, 800) / 1000,
          delay: delay / 1000,
          ease: 'power3.out',
          clearProps: 'transform',
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [ref, delay, y, duration])
}
