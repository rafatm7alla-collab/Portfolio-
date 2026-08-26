import type { MetadataRoute } from 'next'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl

  const staticRoutes = ['', '/work', '/about', '/contact'].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Unapproved placeholder projects stay out of the sitemap entirely.
  const projectRoutes = projects
    .filter((p) => !p.isPlaceholder)
    .map((p) => ({
      url: `${base}/work/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.9,
    }))

  return [...staticRoutes, ...projectRoutes]
}
