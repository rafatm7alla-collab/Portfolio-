import type { Project, Category, Service } from '@/types/project'
import { projectImage } from '@/lib/projectImages'

/**
 * ─────────────────────────────────────────────────────────────────
 * DRAFT PROJECTS — real names, unwritten case studies.
 *
 * Every title, sector and location below came from Rafat. Everything
 * marked [DRAFT] is unwritten, which is why each still carries
 * isPlaceholder: true — visible tag, noindex, kept out of the sitemap.
 *
 * `category` is set ONLY where the project's own name states it:
 *   "…LX 2024 Launch"      → Campaign
 *   "…Agency Identity"     → Brand Identity
 * Everywhere else it is null and simply does not render. Guessing
 * whether DubaIraq was an identity or a campaign is the same class of
 * invention as guessing a client.
 *
 * IMAGES — drop a cover at public/work/<slug>/hero.jpg and it appears.
 * Further images: 01.jpg, 02.jpg, 03.jpg, 04.jpg.
 *
 * As each case study gets written, lift that project out of this file
 * into its own — see toyota-crown.ts for the shape.
 * ─────────────────────────────────────────────────────────────────
 */

type Draft = {
  slug: string
  index: string
  title: string
  /** Only when Rafat stated it. */
  category: Category | null
  sector: string
  location: string
  services: Service[]
  heroVariant: 'cover' | 'typographic'
  order: number
  next: string
}

const drafts: Draft[] = [
  {
    slug: 'dubairaq',
    index: '02',
    title: 'DubaIraq',
    category: null,
    sector: 'Real Estate',
    location: '[Location]',
    services: ['Creative Direction'],
    heroVariant: 'typographic',
    order: 2,
    next: 'lexus-lx-2024',
  },
  {
    slug: 'lexus-lx-2024',
    index: '03',
    title: 'Lexus Iraq LX 2024 Launch',
    category: 'Campaign',
    sector: 'Automotive',
    location: 'Iraq',
    services: ['Creative Direction', 'Art Direction', 'Campaign Development'],
    heroVariant: 'cover',
    order: 3,
    next: 'al-zaytoun-terraces',
  },
  {
    slug: 'al-zaytoun-terraces',
    index: '04',
    title: 'Al Zaytoun Terraces',
    category: null,
    sector: 'Real Estate',
    location: 'Baghdad',
    services: ['Creative Direction'],
    heroVariant: 'cover',
    order: 4,
    next: 'vision-house',
  },
  {
    slug: 'vision-house',
    index: '05',
    title: 'Vision House Agency Identity',
    category: 'Brand Identity',
    sector: '[Sector]',
    location: '[Location]',
    services: ['Visual Identity', 'Creative Direction'],
    heroVariant: 'cover',
    order: 5,
    next: 'praline',
  },
  {
    slug: 'praline',
    index: '06',
    title: 'Praline',
    category: null,
    sector: '[Sector]',
    location: '[Location]',
    services: ['Creative Direction'],
    heroVariant: 'typographic',
    order: 6,
    next: 'toyota-crown',
  },
]

const img = (slug: string, slot: string, w: number, h: number, alt: string) =>
  projectImage(slug, slot, w, h, alt)

const build = (d: Draft): Project => ({
  slug: d.slug,
  index: d.index,
  title: d.title,
  client: null,
  year: null,
  location: d.location,
  sector: d.sector,
  category: d.category,
  services: d.services,
  role: '[Role]',

  shortDescription: `[DRAFT] One sentence about ${d.title}, maximum twenty words.`,
  lede: '[DRAFT] One sentence, maximum twenty words, set in Light.',
  brief:
    '[DRAFT — 60–90 words] Situation and constraint, written so it could not be pasted onto a different project.',
  idea: {
    headline: '[DRAFT] Idea headline — six words maximum.',
    body: '[DRAFT — 50–70 words] The central idea and the mechanism by which it works.',
  },

  nextCover: img(d.slug, 'next-cover', 1400, 881, `${d.title} — next project cover`),

  hero: {
    image: img(d.slug, 'hero', 2400, 1600, `${d.title} — cover`),
    variant: d.heroVariant,
  },

  sections: [
    { type: 'text', label: 'The Brief', body: '[DRAFT — 60–90 words.]' },
    {
      type: 'image',
      layout: 'bleed',
      images: [img(d.slug, '01', 2400, 1350, `${d.title} — image`)],
    },
    {
      type: 'idea',
      headline: '[DRAFT] Idea headline',
      body: '[DRAFT — 50–70 words.]',
    },
    {
      type: 'image',
      layout: 'pair',
      offsetY: true,
      images: [
        img(d.slug, '02', 1400, 1750, `${d.title} — image`),
        img(d.slug, '03', 1200, 900, `${d.title} — image`),
      ],
    },
    {
      type: 'image',
      layout: 'bleed',
      images: [img(d.slug, '04', 2400, 1600, `${d.title} — image`)],
    },
  ],

  credits: [{ role: 'Creative Direction', name: 'Rafat Mhalla' }],

  featured: true,
  order: d.order,
  next: d.next,
  isPlaceholder: true,
})

export const draftProjects: Project[] = drafts.map(build)
