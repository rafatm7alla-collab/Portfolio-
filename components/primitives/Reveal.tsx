'use client'

import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useInView } from '@/lib/useInView'

type Props = {
  children: ReactNode
  /** ms — used to stagger sibling blocks. 80ms between headline lines. */
  delay?: number
  as?: ElementType
  className?: string
  threshold?: number
  style?: CSSProperties
}

/**
 * REVEAL — opacity 0→1 + translateY 24px→0, 700ms.
 * One of the three motion primitives. See globals.css.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  threshold,
  style,
}: Props) {
  const { ref, visible } = useInView<HTMLDivElement>(threshold)

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      data-visible={visible}
      style={
        {
          ...style,
          ...(delay ? { '--reveal-delay': `${delay}ms` } : {}),
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  )
}

/**
 * Multi-line display type is staggered by composing Reveal directly — see
 * DisplayPair in components/type/Type.tsx.
 *
 * Deliberately no overflow:hidden line wrapper anywhere in the codebase.
 * Clipping each line to its own box looks correct until a descender appears:
 * at line-height 0.86 the "g" in "something" gets sliced off. The REVEAL
 * primitive is opacity + translate, and that is enough.
 *
 * Stagger by line, never by character — character stagger is the tell of a
 * template.
 */
