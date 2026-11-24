/**
 * ─────────────────────────────────────────────────────────────────
 * BRAND FRAMEWORK — CONTENT (/framework)
 *
 * Every line of copy below is Rafat's own, from the Framework brief,
 * approved for the live page.
 * ─────────────────────────────────────────────────────────────────
 */

export type StageId = 'discover' | 'define' | 'design' | 'activate' | 'evolve'

export type Stage = {
  id: StageId
  index: string
  title: string
  tagline: string
  description: string
  services: string[]
  outcome: string
}

export const stages: Stage[] = [
  {
    id: 'discover',
    index: '01',
    title: 'Discover',
    tagline: 'Understanding before creating.',
    description:
      'Understand the business, market, audience and challenges to uncover meaningful opportunities.',
    services: [
      'Business discovery workshops',
      'Market research',
      'Competitor analysis',
      'Audience definition',
      'Brand audit',
    ],
    outcome: 'A clear understanding of where the brand stands and where it needs to go.',
  },
  {
    id: 'define',
    index: '02',
    title: 'Define',
    tagline: 'Strategy before aesthetics.',
    description:
      'Establish a clear strategic foundation that gives the brand direction, relevance and differentiation.',
    services: [
      'Brand positioning',
      'Brand purpose and values',
      'Brand personality',
      'Naming and messaging',
      'Brand architecture',
      'Strategic direction',
    ],
    outcome: 'A focused brand strategy that guides every future decision.',
  },
  {
    id: 'design',
    index: '03',
    title: 'Design',
    tagline: 'Turning strategy into experience.',
    description:
      'Translate strategic thinking into a distinctive, consistent and memorable visual language.',
    services: [
      'Visual identity',
      'Logo systems',
      'Art direction',
      'Typography and color systems',
      'Brand guidelines',
      'Packaging design',
      'Digital brand experiences',
    ],
    outcome: 'A cohesive brand identity built to communicate, differentiate and scale.',
  },
  {
    id: 'activate',
    index: '04',
    title: 'Activate',
    tagline: 'Bringing the brand to life.',
    description:
      'Connect the brand with its audience through integrated creative communication and relevant touchpoints.',
    services: [
      'Brand launch concepts',
      'Creative campaigns',
      'Advertising',
      'Digital communication',
      'Social media creative direction',
      'TVC concepts',
      'Environmental and experiential branding',
    ],
    outcome: 'A consistent and compelling brand presence across relevant channels.',
  },
  {
    id: 'evolve',
    index: '05',
    title: 'Evolve',
    tagline: 'Building beyond the launch.',
    description: 'Support the brand as it develops, adapts and grows over time.',
    services: [
      'Ongoing creative direction',
      'Brand consultancy',
      'Brand consistency management',
      'Campaign development',
      'Creative performance reviews',
      'Long-term creative partnerships',
    ],
    outcome: 'A brand that remains relevant, consistent and adaptable.',
  },
]

/** The six capabilities, each tied to the stage(s) it lives in. */
export const capabilities: { index: string; title: string; stages: StageId[] }[] = [
  { index: '01', title: 'Brand Intelligence', stages: ['discover'] },
  { index: '02', title: 'Brand Strategy', stages: ['define'] },
  { index: '03', title: 'Brand Identity', stages: ['design'] },
  { index: '04', title: 'Creative Direction', stages: ['design', 'activate'] },
  { index: '05', title: 'Brand Communication', stages: ['activate'] },
  { index: '06', title: 'Brand Development', stages: ['evolve'] },
]

/** Three ways to work together. No pricing at this stage. */
export const engagements: {
  index: string
  title: string
  forWhom: string
  scope: string
  stages: StageId[]
}[] = [
  {
    index: 'A',
    title: 'Brand Foundation',
    forWhom: 'For businesses launching a new brand or repositioning an existing one.',
    scope: 'Strategy, positioning and visual identity.',
    stages: ['discover', 'define', 'design'],
  },
  {
    index: 'B',
    title: 'Brand Transformation',
    forWhom:
      'For established businesses requiring a comprehensive strategic and creative transformation.',
    scope: 'Strategy, identity, creative direction and market activation.',
    stages: ['discover', 'define', 'design', 'activate'],
  },
  {
    index: 'C',
    title: 'Ongoing Creative Partnership',
    forWhom:
      'For businesses looking for consistent creative leadership and long-term brand development.',
    scope: 'Creative consultancy, campaigns, brand management and ongoing creative direction.',
    stages: ['activate', 'evolve'],
  },
]

/**
 * "Strategy in Action" — existing, published projects only. The stage tags
 * follow each project's own category in data/work.ts (identity → Define /
 * Design, campaigns and film → Activate, packaging → Design). No results,
 * metrics or testimonials are added.
 */
export const selectedWorkIds = [
  'vision-house',
  'toyota-crown-launch',
  'al-zaytoun-terraces',
  'nbi-credit-card-campaign',
] as const

export const categoryStages: Record<string, StageId[]> = {
  'brand-identity-guidelines': ['define', 'design'],
  campaigns: ['activate'],
  tvc: ['activate'],
  packaging: ['design'],
  logofolio: ['design'],
  art: ['design'],
}

/* ─── Discovery call form options ─────────────────────────────── */

export const projectTypes = [
  'New brand development',
  'Rebranding',
  'Brand strategy',
  'Visual identity',
  'Creative campaign',
  'Ongoing creative partnership',
  'Other',
]

export const budgets = [
  'Under €3,000',
  '€3,000–€5,000',
  '€5,000–€10,000',
  '€10,000–€25,000',
  '€25,000+',
  'Open to discussion',
]

export const timelines = [
  'As soon as possible',
  'Within one month',
  'Within three months',
  'Flexible',
]
