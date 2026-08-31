'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Category, CategoryId, WorkProject } from '@/data/work'
import { CategorySymbol } from '@/components/work/CategorySymbol'
import { Meta, Micro } from '@/components/type/Type'

export function WorkBrowser({
  categories,
  projects,
}: {
  categories: Category[]
  projects: WorkProject[]
}) {
  const counts = useMemo(() => {
    const out = {} as Record<CategoryId, number>
    for (const category of categories) {
      out[category.id] = projects.filter((p) =>
        p.categories.includes(category.id),
      ).length
    }
    return out
  }, [categories, projects])

  return (
    <CategoryAccordion
      categories={categories}
      projects={projects}
      counts={counts}
    />
  )
}

/* ─── Accordion ─────────────────────────────────────────────────── */

function CategoryAccordion({
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
    <section data-invert data-nav="dark" className="mt-[clamp(40px,7vh,88px)] pb-[clamp(24px,4vh,48px)]">
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
                className="group flex w-full items-center gap-5 py-6 text-left md:gap-8 md:py-10"
              >
                <Micro
                  as="span"
                  className="shrink-0 text-xs tabular-nums md:text-sm"
                  style={{ opacity: 0.5 }}
                >
                  {category.index}
                </Micro>

                <span className="shrink-0 text-current md:mt-0">
                  <CategorySymbol id={category.id} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="t-body block text-lg font-bold uppercase md:text-2xl lg:text-3xl">
                    {category.label}
                  </span>
                  <Micro
                    as="span"
                    className="mt-1 block text-xs tabular-nums md:mt-2 md:text-sm"
                    style={{ opacity: 0.5 }}
                  >
                    {String(count).padStart(2, '0')}{' '}
                    {count === 1 ? 'PROJECT' : 'PROJECTS'}
                  </Micro>
                </span>

                <span
                  className="shrink-0 text-lg transition-transform duration-300 md:text-2xl"
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
                    <ul
                      className="rounded-lg px-5 py-2 md:px-8 md:py-4"
                      style={{ background: '#fff', color: '#000' }}
                    >
                      {categoryProjects.map((project, i) => (
                        <li
                          key={project.id}
                          className="border-t"
                          style={{ borderColor: 'rgba(0,0,0,0.1)' }}
                        >
                          <Link
                            href={project.href}
                            className="group flex items-baseline gap-4 py-3 md:gap-6 md:py-5"
                          >
                            <Micro
                              as="span"
                              className="shrink-0 text-xs tabular-nums md:text-sm"
                              style={{ opacity: 0.35, color: '#000' }}
                            >
                              {String(i + 1).padStart(2, '0')}
                            </Micro>
                            <span className="flex-1">
                              <span
                                className="block text-[15px] font-medium leading-snug transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 md:text-lg lg:text-xl"
                                style={{ color: '#000' }}
                              >
                                {project.title}
                              </span>
                              {project.year && (
                                <Meta
                                  as="span"
                                  className="mt-0.5 block md:mt-1"
                                  style={{ opacity: 0.5, color: '#000' }}
                                >
                                  {project.year}
                                </Meta>
                              )}
                            </span>

                            {/* Client — desktop only */}
                            <Meta
                              as="span"
                              className="hidden shrink-0 lg:block"
                              style={{ opacity: 0.5, color: '#000' }}
                            >
                              {project.client ?? '—'}
                            </Meta>

                            <Micro
                              as="span"
                              className="shrink-0 transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
                              style={{ opacity: 0.5, color: '#000' }}
                            >
                              ↗
                            </Micro>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="pb-4 md:pb-8">
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
