'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type ReactNode } from 'react'

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [phase, setPhase] = useState<'visible' | 'exiting' | 'entering'>('visible')
  const prevPath = useRef(pathname)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (pathname === prevPath.current) return
    prevPath.current = pathname

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) return

    setPhase('entering')
    timeoutRef.current = setTimeout(() => setPhase('visible'), 350)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [pathname])

  return (
    <div
      style={{
        opacity: phase === 'entering' ? 0 : 1,
        transform:
          phase === 'entering'
            ? 'translateY(8px)'
            : 'translateY(0)',
        transition:
          phase === 'visible'
            ? 'opacity 350ms var(--ease-out), transform 350ms var(--ease-out)'
            : undefined,
      }}
    >
      {children}
    </div>
  )
}
