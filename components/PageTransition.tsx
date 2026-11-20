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
        // 'none' (not translateY(0)) once settled: any transform left on
        // this wrapper makes it the containing block for position: fixed
        // and breaks pinned scroll sections. It still animates from 8px.
        transform:
          phase === 'entering'
            ? 'translateY(8px)'
            : 'none',
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
