'use client'

/**
 * EXPERIMENTAL — editorial mosaic version of "Selected Work".
 *
 * Toggle via the SELECTED_WORK_VARIANT constant in app/page.tsx.
 * Drop this file (plus its .css) to fully revert; the previous
 * PortfolioShowcase component is untouched.
 *
 * Interaction: hover reveals a black overlay with project title,
 * category and a short descriptor. Full tile remains a link to the
 * existing project-detail URL.
 */

import Link from 'next/link'
import NextImage from 'next/image'
import type { Project } from '@/types/project'
import './SelectedWorkMosaic.css'

const manifestHrefs: Record<string, string> = {
  'toyota-crown': '/projects/toyota-crown-launch',
  'dubairaq': '/projects/dubiraq',
  'lexus-lx-2024': '/projects/lexus-lx-launch',
  'al-zaytoun-terraces': '/projects/al-zaytoun-terraces',
  'vision-house': '/projects/vision-house',
  'land-rover-kurdistan': '/projects/land-rover-kurdistan',
  'praline': '/projects/praline',
}

function projectHref(slug: string): string {
  return manifestHrefs[slug] ?? `/work/${slug}`
}

/**
 * Art-directed layout, keyed by slug. Each project gets an intentional
 * named slot; the CSS drives all sizing per breakpoint.
 * Fallback slot 'praline' for anything unknown.
 */
const slotBySlug: Record<string, string> = {
  'toyota-crown': 'toyota',
  'dubairaq': 'dubairaq',
  'lexus-lx-2024': 'lexus',
  'vision-house': 'vision',
  'al-zaytoun-terraces': 'zaytoun',
  'praline': 'praline',
  'land-rover-kurdistan': 'landrover',
}

/**
 * Desktop reading order for the mosaic. This is the DOM order too —
 * CSS positions each named slot regardless.
 */
const slotOrder = [
  'toyota-crown',
  'dubairaq',
  'lexus-lx-2024',
  'vision-house',
  'praline',
  'al-zaytoun-terraces',
  'land-rover-kurdistan',
]

function Tile({ project }: { project: Project }) {
  const slot = slotBySlug[project.slug] ?? 'praline'
  const img = project.hero.image
  const category = project.category ?? 'Project'

  return (
    <Link
      href={projectHref(project.slug)}
      className="swm-tile"
      data-slot={slot}
      aria-label={`${project.title} — ${category}`}
    >
      <div className="swm-image-wrap">
        {img?.src && (
          <NextImage
            src={img.src}
            alt={img.alt || project.title}
            fill
            sizes="(min-width: 1024px) 60vw, (min-width: 640px) 50vw, 100vw"
            quality={85}
            className="swm-image"
          />
        )}
      </div>

      <div className="swm-overlay" aria-hidden="true" />

      <div className="swm-info">
        <div className="swm-info-category">{category}</div>
        <h3 className="swm-info-title">{project.title}</h3>
        {project.shortDescription && (
          <p className="swm-info-desc">{project.shortDescription}</p>
        )}
      </div>

      <div className="swm-mobile-caption">
        <p className="swm-mobile-title">{project.title}</p>
        <p className="swm-mobile-category">{category}</p>
      </div>
    </Link>
  )
}

export function SelectedWorkMosaic({ projects }: { projects: Project[] }) {
  const bySlug = new Map(projects.map((p) => [p.slug, p]))
  const ordered = slotOrder
    .map((s) => bySlug.get(s))
    .filter((p): p is Project => Boolean(p))
  // Any featured project not in the slot map — append at the end.
  const extras = projects.filter((p) => !slotOrder.includes(p.slug))

  return (
    <div className="swm-root">
      <div className="swm-grid">
        {[...ordered, ...extras].map((p) => (
          <Tile key={p.slug} project={p} />
        ))}
      </div>
    </div>
  )
}
