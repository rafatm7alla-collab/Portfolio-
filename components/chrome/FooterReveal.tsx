'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function FooterReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) return

    const items = el.querySelectorAll<HTMLElement>('[data-footer-item]')
    if (items.length === 0) return

    gsap.set(items, { opacity: 0, y: 16 })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.48,
          stagger: 0.06,
          ease: 'power3.out',
          clearProps: 'transform',
        })
      },
    })

    return () => { trigger.kill() }
  }, [])

  return <div ref={ref}>{children}</div>
}
