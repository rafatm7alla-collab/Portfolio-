'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'

export function MastheadEntrance({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const title = el.querySelector('[data-masthead="title"]')
    const summary = el.querySelector('[data-masthead="summary"]')
    const meta = el.querySelector('[data-masthead="meta"]')
    const metaItems = meta
      ? Array.from(meta.querySelectorAll('[data-masthead="meta-item"]'))
      : []

    const targets = [title, summary, ...metaItems].filter(Boolean) as HTMLElement[]

    if (prefersReduced) {
      gsap.fromTo(targets, { opacity: 0 }, { opacity: 1, duration: 0.12 })
      return
    }

    const tl = gsap.timeline()

    // Title
    if (title) {
      gsap.set(title, { opacity: 0, y: 24 })
      tl.to(title, { opacity: 1, y: 0, duration: 0.64, ease: 'power3.out' }, 0)
    }

    // Summary
    if (summary) {
      gsap.set(summary, { opacity: 0, y: 24 })
      tl.to(summary, { opacity: 1, y: 0, duration: 0.64, ease: 'power3.out' }, 0.1)
    }

    // Metadata items staggered
    metaItems.forEach((item, i) => {
      gsap.set(item, { opacity: 0, y: 16 })
      tl.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.48,
        ease: 'power3.out',
      }, 0.18 + i * 0.06)
    })

    return () => { tl.kill() }
  }, [])

  return <div ref={ref}>{children}</div>
}
