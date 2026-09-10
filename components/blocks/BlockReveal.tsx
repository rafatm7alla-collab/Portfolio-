'use client'

import { useRef, type ReactNode } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function BlockReveal({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useScrollReveal(ref, { y: 24, duration: 640 })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
