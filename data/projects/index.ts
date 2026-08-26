import type { Project } from '@/types/project'
import { toyotaCrown } from './toyota-crown'
// import { landRoverKurdistan } from './land-rover-kurdistan'
import { draftProjects } from './drafts'

/**
 * Running order is deliberate, not chronological.
 * See DIRECTION.md §11 — six projects, six different jobs:
 *   1 strongest image · 2 strongest idea · 3 most recognisable client
 *   4 widest scope    · 5 most recent    · 6 most personal
 */
export const projects: Project[] = [toyotaCrown, ...draftProjects].sort(
  (a, b) => a.order - b.order,
)

export const featuredProjects = projects.filter((p) => p.featured)

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)

export const getNextProject = (slug: string) => {
  const current = getProject(slug)
  if (!current) return undefined
  return getProject(current.next) ?? projects[0]
}

export const projectSlugs = projects.map((p) => p.slug)

/**
 * Flattened image list for the homepage "closer look" gallery: the cover
 * first, then every image the case study declares, de-duplicated.
 *
 * Slots with no file on disk come back with src '' and render as
 * proportioned grey blocks, so the gallery is reviewable before the
 * photography lands.
 */
export const getGalleryImages = (slug: string, count = 6) => {
  const project = getProject(slug)
  if (!project) return []

  const fromSections = project.sections.flatMap((section) =>
    section.type === 'image' ? section.images : [],
  )
  const all = [project.hero.image, ...fromSections].filter(
    (image): image is NonNullable<typeof image> => Boolean(image),
  )

  // Dedupe on src only. Empty slots are distinct placeholders even when they
  // share alt text — keying on alt collapsed two separate slots into one.
  const seen = new Set<string>()
  return all
    .filter((image) => {
      if (!image.src) return true
      if (seen.has(image.src)) return false
      seen.add(image.src)
      return true
    })
    .slice(0, count)
}
