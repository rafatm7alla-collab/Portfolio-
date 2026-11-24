import type { ReactElement } from 'react'
import type { StageId } from '@/data/framework'

/**
 * The five stage marks — ONE CIRCLE, FIVE STATES (approved: option B).
 *
 *   01 Discover  — an open ring around a point of focus
 *   02 Define    — cut in half, one side filled: a clear direction
 *   03 Design    — a triangle drawn inside: structure becomes form
 *   04 Activate  — a solid centre in its ring: live
 *   05 Evolve    — circles growing from one shared point
 *
 * Same house language as the Work category symbols: 40 × 40 box, one
 * stroke weight, round caps, black only. Stacked on top of one another
 * (outlines only, see .fw-hero-mark in framework.css) they make the hero
 * figure.
 */

const STROKE = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  vectorEffect: 'non-scaling-stroke' as const,
}
const FILL = { fill: 'currentColor', stroke: 'none' } as const

export const SYMBOL_LAYERS: Record<StageId, () => ReactElement> = {
  discover: () => (
    <>
      <circle cx="20" cy="20" r="12" pathLength={100} strokeDasharray="18 7" strokeDashoffset="-3.5" {...STROKE} />
      <circle cx="20" cy="20" r="2" {...FILL} />
    </>
  ),
  define: () => (
    <>
      <path d="M8 20 A12 12 0 0 1 32 20 Z" {...FILL} />
      <circle cx="20" cy="20" r="12" {...STROKE} />
      <line x1="5" y1="20" x2="35" y2="20" {...STROKE} />
    </>
  ),
  design: () => (
    <>
      <circle cx="20" cy="20" r="12" {...STROKE} />
      <polygon points="20,8 30.4,26 9.6,26" {...STROKE} />
    </>
  ),
  activate: () => (
    <>
      <circle cx="20" cy="20" r="6" {...FILL} />
      <circle cx="20" cy="20" r="12" {...STROKE} />
    </>
  ),
  evolve: () => (
    <>
      {/* all three touch at the same lower-left point */}
      <circle cx="12.6" cy="27.4" r="3.5" {...FILL} />
      <circle cx="16.1" cy="23.9" r="8.5" {...STROKE} />
      <circle cx="20" cy="20" r="14" {...STROKE} />
    </>
  ),
}

export function FrameworkSymbol({ id, className = '' }: { id: StageId; className?: string }) {
  const Layer = SYMBOL_LAYERS[id]
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false" className={className}>
      <Layer />
    </svg>
  )
}
