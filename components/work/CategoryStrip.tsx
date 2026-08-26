'use client'

import { useState } from 'react'
import type { Category, CategoryId } from '@/data/work'
import { CategorySymbol } from '@/components/work/CategorySymbol'
import { Micro } from '@/components/type/Type'

/**
 * Symbol + index + name + count + arrow — six units of one composition,
 * not six cards. No fill, no border, no shadow: the grid is whitespace and
 * a top/bottom rule, the same framing device ProjectRows uses below it.
 *
 * Each tile is still a real <button aria-pressed>, unchanged from before —
 * the redesign is the content inside it, not the filtering contract. See
 * WorkBrowser for the URL-as-state logic this plugs into.
 *
 * Clicking the ACTIVE tile clears the filter — there is no separate "All"
 * tile, the active one already is the way back.
 *
 * Hovering one tile quietens its siblings by a few points of opacity,
 * which is the one thing CSS :hover can't do on its own without :has()
 * support everywhere — tracked in state instead.
 */
export function CategoryStrip({
  categories,
  counts,
  active,
  onSelect,
}: {
  categories: Category[]
  counts: Record<CategoryId, number>
  active: CategoryId | null
  onSelect: (id: CategoryId) => void
}) {
  const [hovered, setHovered] = useState<CategoryId | null>(null)

  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="page border-t"
      style={{ borderColor: 'var(--hairline)' }}
    >
      <ul className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 lg:grid-cols-6 lg:gap-x-8">
        {categories.map((category) => {
          const isActive = active === category.id
          const isQuiet = hovered !== null && hovered !== category.id
          const count = counts[category.id] ?? 0

          return (
            <li
              key={category.id}
              className="border-b md:border-b-0 lg:border-b-0"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(category.id)}
                onMouseEnter={() => setHovered(category.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(category.id)}
                onBlur={() => setHovered(null)}
                className="group flex w-full flex-row items-center gap-6 py-7 text-left md:flex-col md:items-start md:gap-0 md:py-10"
                style={{
                  opacity: isQuiet ? 0.4 : 1,
                  transition: 'opacity 400ms var(--ease-editorial)',
                }}
              >
                {/* Mobile: index + symbol sit left of the text block.
                    Tablet/desktop: stacked, index above symbol. */}
                <span className="flex shrink-0 flex-row items-center gap-4 md:flex-col md:items-start md:gap-0">
                  <Micro as="span" className="block text-xs tabular-nums md:text-sm" style={{ opacity: 0.5 }}>
                    {category.index}
                  </Micro>
                  <span className="text-current md:mt-6">
                    <CategorySymbol id={category.id} />
                  </span>
                </span>

                <span className="min-w-0 flex-1 md:mt-7">
                  <span className="t-body block text-lg font-bold uppercase md:text-2xl">
                    {category.label}
                  </span>

                  <Micro as="span" className="mt-2 block text-xs tabular-nums md:text-sm" style={{ opacity: 0.5 }}>
                    {String(count).padStart(2, '0')} {count === 1 ? 'PROJECT' : 'PROJECTS'}
                  </Micro>

                  {/* The house underline, drawn left to right — but bound to
                      the whole tile's hover, not just the text run under
                      the cursor, since the symbol and count sit outside it. */}
                  <span className="mt-4 flex items-center justify-between md:mt-5">
                    <span
                      className="h-px flex-1 origin-left scale-x-0 bg-current transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                      style={isActive ? { transform: 'scaleX(1)' } : undefined}
                    />
                    <Micro
                      as="span"
                      className="ml-4 block transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
                      style={{ opacity: isActive ? 1 : 0.5 }}
                    >
                      ↗
                    </Micro>
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
