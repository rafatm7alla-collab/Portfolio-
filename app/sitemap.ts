import type { MetadataRoute } from 'next'
import { profile } from '@/data/profile'
import { projects } from '@/data/work'
import { getManifest } from '@/lib/manifest'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl

  const staticRoutes = ['', '/work', '/about', '/contact'].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Every project listed on the Work page, at its live URL. Projects marked
  // work-in-progress (`wip: true`) stay out until they are published.
  const projectRoutes = projects
    .filter((p) => {
      const slug = p.href.replace('/projects/', '')
      return !getManifest(slug)?.wip
    })
    .map((p) => ({
      url: `${base}${p.href}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.9,
    }))

  return [...staticRoutes, ...projectRoutes]
}
