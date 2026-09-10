'use client'

import { useEffect, type RefObject } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function useParallax(
  containerRef: RefObject<HTMLElement | null>,
  imageRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const container = containerRef.current
    const image = imageRef.current
    if (!container || !image) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) return

    const isMobile = window.innerWidth < 768
    const range = isMobile ? 2.5 : 5

    gsap.set(image, { willChange: 'transform' })

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress
        const y = (progress - 0.5) * 2 * range
        gsap.set(image, { yPercent: y })
      },
      onLeave: () => {
        gsap.set(image, { willChange: 'auto' })
      },
      onLeaveBack: () => {
        gsap.set(image, { willChange: 'auto' })
      },
      onEnter: () => {
        gsap.set(image, { willChange: 'transform' })
      },
      onEnterBack: () => {
        gsap.set(image, { willChange: 'transform' })
      },
    })

    return () => {
      trigger.kill()
      gsap.set(image, { clearProps: 'willChange,yPercent' })
    }
  }, [containerRef, imageRef])
}
