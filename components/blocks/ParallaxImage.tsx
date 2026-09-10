'use client'

import { useRef, type ReactNode } from 'react'
import { useParallax } from '@/hooks/useParallax'

export function ParallaxImage({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useParallax(containerRef, imageRef)

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={imageRef} style={{ height: '110%', marginTop: '-5%' }}>
        {children}
      </div>
    </div>
  )
}
