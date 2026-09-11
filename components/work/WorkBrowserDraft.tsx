'use client'

import { useCallback, useMemo, useState } from 'react'
import Link from 'next/link'
import type { Category, CategoryId, WorkProject } from '@/data/work'
import { CategorySymbol } from '@/components/work/CategorySymbol'
import { Micro } from '@/components/type/Type'
import { useInView } from '@/lib/useInView'
import '@/components/work/WorkBrowserDraft.css'

/* ─── Stagger wrapper ──────────────────────────────────────────── */

function Stagger({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, visible } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`wbd-stagger ${className}`}
      data-visible={visible}
      style={{ '--stagger-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

/* ─── Thumbnail with clip reveal ───────────────────────────────── */

function EmptyThumb() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#1a1a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Micro as="span" style={{ opacity: 0.25 }}>—</Micro>
    </div>
  )
}

function Thumbnail({ src, alt }: { src: string | null; alt: string }) {
  const { ref, visible } = useInView<HTMLDivElement>()
  const [errored, setErrored] = useState(false)

  if (!src || errored) {
    return (
      <div ref={ref} className="wbd-thumb-wrap" data-revealed={visible}>
        <EmptyThumb />
      </div>
    )
  }

  return (
    <div ref={ref} className="wbd-thumb-wrap" data-revealed={visible}>
      {/* Plain <img> avoids Next Image optimizer 400s on missing/mismatched files */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="wbd-thumb-img"
        onError={() => setErrored(true)}
      />
      <div className="wbd-thumb-label">
        <span>VIEW</span>
      </div>
    </div>
  )
}

/* ─── Project card (expanded view) ─────────────────────────────── */

function ProjectCard({ project }: { project: WorkProject }) {
  const [imgErr, setImgErr] = useState(false)

  return (
    <Link href={project.href} className="wbd-project-card group">
      <div className="wbd-project-card-img-wrap">
        {project.cover && !imgErr ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.cover}
            alt={project.title}
            loading="lazy"
            className="wbd-project-card-img"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: '#1a1a1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Micro as="span" style={{ opacity: 0.25, color: '#fff' }}>
              {project.title}
            </Micro>
          </div>
        )}
      </div>
      <div className="wbd-project-card-meta">
        <div>
          <div className="wbd-project-card-title">{project.title}</div>
          {project.year && (
            <Micro as="div" className="wbd-project-card-sub">
              {project.year}
              {project.client ? ` · ${project.client}` : ''}
            </Micro>
          )}
        </div>
        <span className="wbd-project-card-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
        </span>
      </div>
    </Link>
  )
}

/* ─── Category row ─────────────────────────────────────────────── */

function CategoryRow({
  category,
  count,
  projects,
  isOpen,
  onToggle,
  featuredCover,
}: {
  category: Category
  count: number
  projects: WorkProject[]
  isOpen: boolean
  onToggle: () => void
  featuredCover: string | null
}) {
  return (
    <div className="wbd-row">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="wbd-row-btn group"
      >
        <Stagger delay={0} className="wbd-num wbd-num-sticky">
          <Micro as="span" className="tabular-nums">
            {category.index}
          </Micro>
        </Stagger>

        <Stagger delay={50} className="wbd-icon">
          <CategorySymbol id={category.id} />
        </Stagger>

        <Stagger delay={100} className="wbd-content">
          <div className="wbd-title">{category.label}</div>
          <Micro as="div" className="wbd-count tabular-nums">
            {String(count).padStart(2, '0')}{' '}
            {count === 1 ? 'PROJECT' : 'PROJECTS'}
          </Micro>
        </Stagger>

        <Stagger delay={150}>
          <span className="wbd-plus" data-open={isOpen} aria-hidden="true">
            +
          </span>
        </Stagger>
      </button>

      <div className="wbd-panel" data-open={isOpen}>
        <div className="wbd-panel-inner">
          {projects.length > 0 ? (
            <div className="wbd-projects">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="wbd-empty">
              <Micro as="p">No projects yet.</Micro>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Main export ──────────────────────────────────────────────── */

export function WorkBrowserDraft({
  categories,
  projects,
}: {
  categories: Category[]
  projects: WorkProject[]
}) {
  const [expanded, setExpanded] = useState<CategoryId | null>(null)

  const counts = useMemo(() => {
    const out = {} as Record<CategoryId, number>
    for (const cat of categories) {
      out[cat.id] = projects.filter((p) => p.categories.includes(cat.id)).length
    }
    return out
  }, [categories, projects])

  const featuredCovers = useMemo(() => {
    const out = {} as Record<CategoryId, string | null>
    for (const cat of categories) {
      const first = projects.find(
        (p) => p.categories.includes(cat.id) && p.cover,
      )
      out[cat.id] = first?.cover ?? null
    }
    return out
  }, [categories, projects])

  const toggle = useCallback((id: CategoryId) => {
    setExpanded((prev) => (prev === id ? null : id))
  }, [])

  return (
    <section
      data-invert
      data-nav="dark"
      className="wbd mt-[clamp(40px,7vh,88px)] pb-[clamp(24px,4vh,48px)]"
    >
      <div
        className="page border-t"
        style={{ borderColor: 'var(--hairline)' }}
      >
        {categories.map((category) => (
          <CategoryRow
            key={category.id}
            category={category}
            count={counts[category.id] ?? 0}
            projects={projects.filter((p) =>
              p.categories.includes(category.id),
            )}
            isOpen={expanded === category.id}
            onToggle={() => toggle(category.id)}
            featuredCover={featuredCovers[category.id]}
          />
        ))}
      </div>
    </section>
  )
}
