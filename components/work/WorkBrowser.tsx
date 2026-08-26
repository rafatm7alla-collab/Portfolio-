'use client'

import { useCallback, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Category, CategoryId, WorkProject } from '@/data/work'
import { CategoryStrip } from '@/components/work/CategoryStrip'
import { ProjectRows } from '@/components/work/ProjectRows'
import { Page } from '@/components/primitives/Layout'
import { Micro } from '@/components/type/Type'

/**
 * Owns the filter state, which lives in the URL rather than in React.
 *
 *   /work                          all projects
 *   /work?category=campaigns       filtered, deep-linkable
 *
 * Because the URL is the state, browser back and forward move between
 * filters for free, and a shared link opens pre-filtered. An unknown or
 * missing param falls through to all projects — never an error page.
 *
 * `scroll: false` on navigation: changing a filter is not a new page, and
 * jumping to the top would throw away the reader's position in the strip.
 */
export function WorkBrowser({
  categories,
  projects,
}: {
  categories: Category[]
  projects: WorkProject[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const raw = params.get('category')
  const active: CategoryId | null = useMemo(
    () => (categories.some((c) => c.id === raw) ? (raw as CategoryId) : null),
    [raw, categories],
  )

  const counts = useMemo(() => {
    const out = {} as Record<CategoryId, number>
    for (const category of categories) {
      out[category.id] = projects.filter((p) =>
        p.categories.includes(category.id),
      ).length
    }
    return out
  }, [categories, projects])

  const visible = useMemo(
    () => (active ? projects.filter((p) => p.categories.includes(active)) : projects),
    [active, projects],
  )

  // Selecting the active tile clears the filter — that is the way back.
  const onSelect = useCallback(
    (id: CategoryId) => {
      const next = id === active ? pathname : `${pathname}?category=${id}`
      router.push(next, { scroll: false })
    },
    [active, pathname, router],
  )

  const activeLabel = categories.find((c) => c.id === active)?.label

  return (
    <>
      <section data-invert data-nav="dark" className="pb-[clamp(24px,4vh,48px)]">
        <div className="mt-[clamp(40px,7vh,88px)]">
          <CategoryStrip
            categories={categories}
            counts={counts}
            active={active}
            onSelect={onSelect}
          />
        </div>

        <Page>
          <div className="flex items-baseline justify-between py-5">
            <Micro as="p" secondary aria-live="polite">
              {activeLabel
                ? `${activeLabel} — ${visible.length} ${visible.length === 1 ? 'project' : 'projects'}`
                : `All projects — ${visible.length}`}
            </Micro>
            {active && (
              <button type="button" onClick={() => onSelect(active)} className="t-meta link">
                Clear filter ×
              </button>
            )}
          </div>
        </Page>
      </section>

      <ProjectRows projects={visible} />
    </>
  )
}
