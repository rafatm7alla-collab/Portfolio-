/**
 * ─────────────────────────────────────────────────────────────────
 * THE WORK INDEX — single source of truth for /work.
 *
 * Two exports: the category taxonomy, and every project that appears in
 * the index. Counts are NEVER stored — they are derived from `projects`
 * at render time, so a category can never claim a number the list does
 * not actually contain.
 *
 * `href` is stored per project rather than derived, because the site
 * currently has two detail-page systems: manifest-driven case studies at
 * /projects/{slug}, and the older TS ones at /work/{slug}. As each project
 * migrates, only its href changes here. Detail pages are untouched.
 * ─────────────────────────────────────────────────────────────────
 */

export type CategoryId =
  | 'brand-identity-guidelines'
  | 'campaigns'
  | 'logofolio'
  | 'packaging'
  | 'tvc'
  | 'art'

export type Category = {
  id: CategoryId
  label: string
  /** Authored order, 01–06. Displayed on the tile. */
  index: string
  /**
   * Optional. Until a cover is designed the tile is a black plate with
   * white type — which is the intended look, not a fallback.
   */
  coverImage?: string
  /** One line. [DRAFT] — Rafat to approve or replace. */
  descriptor: string
}

export type WorkProject = {
  id: string
  title: string
  /** null renders as an em dash. Never invented. */
  client: string | null
  year: string | null
  /** categories[0] is the primary — it is the tag shown on the row. */
  categories: CategoryId[]
  cover: string | null
  href: string
}

/* ─── Categories ─────────────────────────────────────────────────── */

export const categories: Category[] = [
  {
    id: 'brand-identity-guidelines',
    label: 'Brand Identity & Guidelines',
    index: '01',
    descriptor: '[DRAFT] Marks, systems, and the rules that keep them intact.',
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    index: '02',
    descriptor: '[DRAFT] One idea, carried across every place it has to live.',
  },
  {
    id: 'logofolio',
    label: 'Logofolio',
    index: '03',
    descriptor: '[DRAFT] Marks, collected.',
  },
  {
    id: 'packaging',
    label: 'Product Design & Packaging',
    index: '04',
    descriptor: '[DRAFT] Identity where it is held in the hand.',
  },
  {
    id: 'tvc',
    label: 'TVC',
    index: '05',
    descriptor: '[DRAFT] Film, direction, and the cut.',
  },
  {
    id: 'art',
    label: 'Art',
    index: '06',
    descriptor: '[DRAFT] Work made for its own sake.',
  },
]

/* ─── Projects ───────────────────────────────────────────────────── */

export const projects: WorkProject[] = [
  {
    id: 'toyota-crown-launch',
    title: 'Toyota Crown — Launch Campaign',
    client: 'Toyota Iraq — Sardar Group',
    year: '2023',
    categories: ['campaigns'],
    cover: '/projects/toyota-crown-launch/crown-cover.jpg',
    href: '/projects/toyota-crown-launch',
  },
  {
    id: 'lexus-lx-2024',
    title: 'Lexus Iraq — LX 2024 Launch',
    client: 'Lexus Iraq',
    year: '2024',
    categories: ['campaigns'],
    cover: '/projects/lexus-lx-launch/lx-cover.jpg',
    href: '/projects/lexus-lx-launch',
  },
  {
    id: 'land-rover-kurdistan',
    title: 'Land Rover — Iraq Kurdistan',
    client: 'Land Rover Iraq',
    year: '2024',
    categories: ['campaigns'],
    cover: '/projects/land-rover-kurdistan/homepage-cover.jpg',
    href: '/projects/land-rover-kurdistan',
  },
  {
    id: 'dubairaq',
    title: 'DUBIRAQ — Brand Identity',
    client: 'DUBIRAQ',
    year: '2024',
    categories: ['brand-identity-guidelines'],
    cover: '/projects/dubiraq/dubiraq-cover.jpg',
    href: '/projects/dubiraq',
  },
  {
    id: 'vision-house',
    title: 'Vision House — Brand Identity',
    client: 'Vision House',
    year: '2024',
    categories: ['brand-identity-guidelines'],
    cover: null,
    href: '/projects/vision-house',
  },
  {
    id: 'al-zaytoun-terraces',
    title: 'Al Zaytoun Terraces',
    client: null, // ⚠️ not supplied
    year: null, // ⚠️ not supplied
    categories: ['brand-identity-guidelines'],
    cover: null,
    href: '/projects/al-zaytoun-terraces',
  },
  {
    id: 'praline',
    title: 'Praline',
    client: null, // ⚠️ not supplied
    year: null, // ⚠️ not supplied
    // Branding first (the primary tag), also shown under packaging.
    categories: ['brand-identity-guidelines', 'packaging'],
    cover: null,
    href: '/projects/praline',
  },
  {
    id: 'logofolio',
    title: 'Logofolio',
    client: null,
    year: null,
    categories: ['logofolio'],
    cover: '/projects/logofolio/logofolio-01.jpg',
    href: '/projects/logofolio',
  },
  {
    id: 'state-of-chaos',
    title: 'State of Chaos',
    client: null,
    year: '2017',
    categories: ['art'],
    cover: '/projects/state-of-chaos/hero.jpg',
    href: '/projects/state-of-chaos',
  },
  {
    id: 'fm-power',
    title: 'FM Power',
    client: 'FM Power (powered by Trokadero)',
    year: '2022',
    categories: ['packaging'],
    cover: '/projects/fm-power/hero.jpg',
    href: '/projects/fm-power',
  },
]

/* ─── Derived ────────────────────────────────────────────────────── */

export const projectsIn = (id: CategoryId) =>
  projects.filter((p) => p.categories.includes(id))

export const countIn = (id: CategoryId) => projectsIn(id).length

export const isCategoryId = (value: string | null | undefined): value is CategoryId =>
  Boolean(value) && categories.some((c) => c.id === value)

export const categoryLabel = (id: CategoryId) =>
  categories.find((c) => c.id === id)?.label ?? id
