import type { ReactElement } from 'react'
import type { CategoryId } from '@/data/work'

/**
 * Six marks, one language. Every category gets an abstract geometric
 * construction rather than a literal pictogram — a ring, not a logo; a
 * frame, not a camera. Same stroke weight, same viewBox, same easing on
 * the hover transform, so the set reads as one system rather than six
 * unrelated icons borrowed from a library.
 *
 * Driven directly off the category's own id — there is no separate
 * "symbol" field to keep in sync with data/work.ts. Exported so the same
 * mark can appear again wherever that category shows up next (a project
 * header, eventually), per the brief: this is meant to become a second
 * graphic language for the site, not a one-off for this section.
 */

const TRANSFORM =
  'origin-center transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]'

const STROKE = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function CategorySymbol({
  id,
  className = '',
}: {
  id: CategoryId
  className?: string
}) {
  const Symbol = SYMBOLS[id]
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
      className={`h-11 w-11 md:h-14 md:w-14 ${className}`}
    >
      <Symbol />
    </svg>
  )
}

/** 01 — a ring with one deliberate interruption. Opens on hover. */
function BrandIdentity() {
  return (
    <circle
      cx="20"
      cy="20"
      r="12.5"
      pathLength={100}
      strokeDasharray="82 18"
      strokeDashoffset="14"
      className={`${TRANSFORM} group-hover:rotate-[26deg]`}
      {...STROKE}
    />
  )
}

/** 02 — a radial construction of uneven spokes. Extends outward on hover. */
function Campaigns() {
  const spokes = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <g className={`${TRANSFORM} group-hover:scale-[1.14]`}>
      {spokes.map((angle, i) => (
        <line
          key={angle}
          x1="20"
          y1={i % 2 === 0 ? 6 : 8.5}
          x2="20"
          y2="17"
          transform={`rotate(${angle} 20 20)`}
          {...STROKE}
        />
      ))}
    </g>
  )
}

/**
 * 03 — two intersecting forms. Separate a few px on hover.
 *
 * The diamond's 45° rotation is on its own <g>, never the element that also
 * carries the hover translate: a CSS `transform` and an SVG `transform`
 * attribute on the same element don't compose, the CSS one wins outright and
 * silently cancels the rotation. Splitting them onto parent/child keeps both.
 */
function Logofolio() {
  return (
    <>
      <rect
        x="10.5"
        y="10.5"
        width="15"
        height="15"
        className={`${TRANSFORM} group-hover:-translate-x-[2px] group-hover:-translate-y-[2px]`}
        {...STROKE}
      />
      <g transform="rotate(45 22.5 22.5)">
        <rect
          x="15"
          y="15"
          width="15"
          height="15"
          className={`${TRANSFORM} group-hover:translate-x-[2px] group-hover:translate-y-[2px]`}
          {...STROKE}
        />
      </g>
    </>
  )
}

/** 04 — a square with a second, offset square. The offset grows on hover. */
function Packaging() {
  return (
    <>
      <rect x="9.5" y="13.5" width="16" height="16" {...STROKE} />
      <rect
        x="14.5"
        y="9.5"
        width="16"
        height="16"
        className={`${TRANSFORM} group-hover:translate-x-[2px] group-hover:-translate-y-[2px]`}
        {...STROKE}
      />
    </>
  )
}

/** 05 — frame corners around a centre mark, like a calibration guide. */
function TVC() {
  const corners = [
    { d: 'M12,16 L12,12 L16,12', hover: 'group-hover:-translate-x-[2px] group-hover:-translate-y-[2px]' },
    { d: 'M24,12 L28,12 L28,16', hover: 'group-hover:translate-x-[2px] group-hover:-translate-y-[2px]' },
    { d: 'M28,24 L28,28 L24,28', hover: 'group-hover:translate-x-[2px] group-hover:translate-y-[2px]' },
    { d: 'M16,28 L12,28 L12,24', hover: 'group-hover:-translate-x-[2px] group-hover:translate-y-[2px]' },
  ]
  return (
    <>
      {corners.map((c) => (
        <path key={c.d} d={c.d} className={`${TRANSFORM} ${c.hover}`} {...STROKE} />
      ))}
      <path d="M20,18.5 L20,21.5 M18.5,20 L21.5,20" {...STROKE} />
    </>
  )
}

/** 06 — an asymmetric triangle. Rotates a few degrees on hover. */
function Art() {
  return (
    <polygon
      points="15,28 21,9 29,25"
      className={`${TRANSFORM} group-hover:rotate-[7deg]`}
      {...STROKE}
    />
  )
}

const SYMBOLS: Record<CategoryId, () => ReactElement> = {
  'brand-identity-guidelines': BrandIdentity,
  campaigns: Campaigns,
  logofolio: Logofolio,
  packaging: Packaging,
  tvc: TVC,
  art: Art,
}
