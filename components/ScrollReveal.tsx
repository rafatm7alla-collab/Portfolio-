'use client'

import { useRef, type ElementType, type ReactNode } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  as?: ElementType
}

export function ScrollReveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLElement>(null)
  useScrollReveal(ref, { delay })

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
