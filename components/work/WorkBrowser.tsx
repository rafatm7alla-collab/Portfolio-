'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import type { Category, CategoryId, WorkProject } from '@/data/work'
import { categoryLabel } from '@/data/work'
import { CategoryStrip } from '@/components/work/CategoryStrip'
import { ProjectRows } from '@/components/work/ProjectRows'
import { CategorySymbol } from '@/components/work/CategorySymbol'
import { Page } from '@/components/primitives/Layout'
import { Meta, Micro } from '@/components/type/Type'

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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

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

  const onSelect = useCallback(
    (id: CategoryId) => {
      const next = id === active ? pathname : `${pathname}?category=${id}`
      router.push(next, { scroll: false })
    },
    [active, pathname, router],
  )

  const activeLabel = categories.find((c) => c.id === active)?.label

  if (isMobile) {
    return (
      <MobileAccordion
        categories={categories}
        projects={projects}
        counts={counts}
      />
    )
  }

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

/* ─── Mobile accordion ──────────────────────────────────────────── */

function MobileAccordion({
  categories,
  projects,
  counts,
}: {
  categories: Category[]
  projects: WorkProject[]
  counts: Record<CategoryId, number>
}) {
  const [expanded, setExpanded] = useState<CategoryId | null>(null)

  const toggle = (id: CategoryId) => {
    setExpanded((prev) => (prev === id ? null : id))
  }

  return (
    <section data-invert data-nav="dark" className="mt-[clamp(40px,7vh,88px)] pb-8">
      <div
        className="page border-t"
        style={{ borderColor: 'var(--hairline)' }}
      >
        {categories.map((category) => {
          const isOpen = expanded === category.id
          const count = counts[category.id] ?? 0
          const categoryProjects = projects.filter((p) =>
            p.categories.includes(category.id),
          )

          return (
            <div
              key={category.id}
              className="border-b"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggle(category.id)}
                className="flex w-full items-center gap-5 py-6 text-left"
              >
                <Micro
                  as="span"
                  className="shrink-0 text-xs tabular-nums"
                  style={{ opacity: 0.5 }}
                >
                  {category.index}
                </Micro>

                <span className="shrink-0 text-current">
                  <CategorySymbol id={category.id} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="t-body block text-lg font-bold uppercase">
                    {category.label}
                  </span>
                  <Micro
                    as="span"
                    className="mt-1 block text-xs tabular-nums"
                    style={{ opacity: 0.5 }}
                  >
                    {String(count).padStart(2, '0')}{' '}
                    {count === 1 ? 'PROJECT' : 'PROJECTS'}
                  </Micro>
                </span>

                <span
                  className="shrink-0 text-lg transition-transform duration-300"
                  style={{
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  +
                </span>
              </button>

              {/* Accordion content */}
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                }}
              >
                <div className="overflow-hidden">
                  {categoryProjects.length > 0 ? (
                    <ul className="pb-4">
                      {categoryProjects.map((project, i) => (
                        <li key={project.id}>
                          <Link
                            href={project.href}
                            className="group flex items-baseline gap-4 py-3"
                          >
                            <Micro
                              as="span"
                              className="shrink-0 text-xs tabular-nums"
                              style={{ opacity: 0.4 }}
                            >
                              {String(i + 1).padStart(2, '0')}
                            </Micro>
                            <span className="flex-1">
                              <span
                                className="block text-[15px] font-medium leading-snug transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2"
                              >
                                {project.title}
                              </span>
                              {project.year && (
                                <Meta
                                  as="span"
                                  className="mt-0.5 block"
                                  style={{ opacity: 0.5 }}
                                >
                                  {project.year}
                                </Meta>
                              )}
                            </span>
                            <Micro
                              as="span"
                              style={{ opacity: 0.5 }}
                            >
                              ↗
                            </Micro>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="pb-4">
                      <Micro as="p" style={{ opacity: 0.5 }}>
                        No projects yet.
                      </Micro>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
