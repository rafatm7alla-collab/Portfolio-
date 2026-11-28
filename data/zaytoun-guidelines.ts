/**
 * Al Zaytoun Terraces — brand guideline structure (DRAFT).
 *
 * Only the Al Zaytoun project uses this. Every banner points at a file in
 * public/projects/al-zaytoun-terraces/. When the file is there it shows;
 * when it is not, the page draws an empty, labelled holder so it is clear
 * how many banners exist and how many are still to be made.
 *
 * Text inside {{double braces}} is a placeholder Rafat still has to confirm.
 */

export type BannerShape = 'wide' | 'tall'

export type Banner = {
  id: string
  title: string
  file: string
  /** wide = 2400 × 1350 (16:9), tall = 1200 × 1500 (4:5) */
  shape?: BannerShape
}

export type Swatch = { name: string; hex: string; role: string; group: 'primary' | 'secondary' }

export type GuideBlock =
  | { kind: 'text'; body: string }
  | { kind: 'banners'; items: Banner[] }
  | { kind: 'rules'; do: string[]; dont: string[] }
  | { kind: 'specs'; rows: [string, string][] }
  /** Project facts, shown like the meta bar on the other project pages. */
  | { kind: 'meta'; rows: [string, string][] }
  | { kind: 'cards'; items: { title: string; body: string }[] }
  | { kind: 'swatches'; group: Swatch['group'] }
  | { kind: 'contrast'; pairs: [fg: string, bg: string][] }
  /** Tints and shades of every brand colour, worked out from its hex. */
  | { kind: 'tonal' }
  /** The colour balance as one bar, e.g. 60 / 30 / 10. */
  | { kind: 'proportion'; parts: [name: string, percent: number][] }

export type GuideSection = { num: string; title: string; blocks: GuideBlock[] }
export type GuideChapter = { num: string; title: string; intro: string; sections: GuideSection[] }

export const SLUG = 'al-zaytoun-terraces'

export const swatches: Swatch[] = [
  { name: 'Bleu Oxford', hex: '#0C1828', role: 'Authority. The deep ground of the identity.', group: 'primary' },
  { name: 'Verde Selva', hex: '#2A3B26', role: 'The olive grove. Legacy, resilience, peace.', group: 'primary' },
  { name: 'Terracotta', hex: '#A26E50', role: 'Baghdad clay and weathered gold. The accent.', group: 'primary' },
  { name: 'Sable Doux', hex: '#CBBDAF', role: 'Warm sand. Softens and separates.', group: 'secondary' },
  { name: 'Areia Fina', hex: '#F3F2ED', role: 'Fine sand. The main light ground.', group: 'secondary' },
  { name: 'Perola', hex: '#F0E9E1', role: 'Pearl. A warmer light ground.', group: 'secondary' },
]

export const cover: Banner = {
  id: '00',
  title: 'Cover banner — the development in its setting',
  file: 'hero.jpg',
}

export const chapters: GuideChapter[] = [
  {
    num: '01',
    title: 'Overview',
    intro:
      'Al Zaytoon Residences is a luxury residential development in Baghdad’s Green Zone, powered by Mövenpick Hotels & Resorts. This guideline sets out how the brand looks, speaks and behaves, so every touchpoint feels like the same place.',
    sections: [
      {
        num: '01.1',
        title: 'The project',
        blocks: [
          {
            kind: 'meta',
            rows: [
              ['Client', 'Al Zaytoon Residences · Powered by Mövenpick Hotels & Resorts'],
              ['Developer', 'International Free Company (IFC)'],
              ['Architect', 'Manhal Habboubi Architectural Office'],
              ['Location', 'Green Zone, Baghdad, Iraq'],
              ['Sector', 'Real estate · Luxury residential'],
              ['Scope', 'Brand identity, guidelines, brochure, applications'],
              ['Role', 'Brand identity & art direction'],
              ['Year', '2026'],
            ],
          },
          {
            kind: 'banners',
            items: [{ id: '01.1', title: 'Brand vision — Where the elite belong', file: 'brand-vision.jpg' }],
          },
        ],
      },
      {
        num: '01.2',
        title: 'Project teaser',
        blocks: [
          {
            kind: 'banners',
            items: [{ id: '01.2', title: 'Project teaser', file: 'alzaytoon-teaser.mp4' }],
          },
        ],
      },
    ],
  },

  {
    num: '02',
    title: 'Brand foundations',
    intro:
      'The idea behind everything: reviving the Hanging Gardens of Babylon in modern Baghdad. Nature is not added as decoration. Architecture is built around it.',
    sections: [
      {
        num: '02.1',
        title: 'Brand concept',
        blocks: [
          {
            kind: 'text',
            body: 'The brand starts from one question: how can the relationship between architecture and nature become the defining character of a residential brand? The answer comes from Baghdad’s own memory, the Hanging Gardens of Babylon. Greenery is not a feature of the building. It is the building’s reason to exist.',
          },
          {
            kind: 'banners',
            items: [{ id: '02.1', title: 'Concept board — Hanging Gardens to modern terraces', file: 'concept-board.jpg' }],
          },
        ],
      },
      {
        num: '02.2',
        title: 'Brand values',
        blocks: [
          {
            kind: 'cards',
            items: [
              { title: 'Heritage', body: 'Rooted in Baghdad’s history, never nostalgic.' },
              { title: 'Nature', body: 'Green is a daily experience, not a view.' },
              { title: 'Refinement', body: 'Quiet luxury. Detail over decoration.' },
              { title: 'Privacy', body: 'Calm, secure, and personal.' },
              { title: 'Permanence', body: 'Built to last for generations, like the olive tree.' },
            ],
          },
        ],
      },
    ],
  },

  {
    num: '03',
    title: 'Logo',
    intro:
      'The logo is the brand’s signature. It is made of an emblem, a wordmark and a tagline, and it is only ever used as supplied in the master artwork files.',
    sections: [
      {
        num: '03.1',
        title: 'Primary logo',
        blocks: [
          {
            kind: 'banners',
            items: [{ id: '03.1', title: 'Primary logo — full horizontal lockup', file: 'logo-main.jpg' }],
          },
          {
            kind: 'specs',
            rows: [
              ['Emblem', 'An olive tree inside a closed circle.'],
              ['Wordmark', 'AL ZAYTOUN / RESIDENCES in classical capitals.'],
              ['Tagline', 'WHERE THE ELITE BELONG, widely tracked.'],
              ['Master colour', 'Terracotta on Bleu Oxford.'],
            ],
          },
        ],
      },
      {
        num: '03.2',
        title: 'Logo rationale',
        blocks: [
          {
            kind: 'text',
            body: 'Zaytoun is Arabic for olive. The olive tree is the oldest symbol of peace, continuity and a home that lasts for generations. Its branches rise in tiers, like the terraces of the Hanging Gardens and the stepped green balconies of the towers. The circle is the garden wall: a protected, private world. The single trunk roots the mark in its ground, Baghdad. The capitals of the wordmark bring classical authority, and the open spacing of the tagline adds air and quiet confidence.',
          },
          {
            kind: 'banners',
            items: [
              { id: '03.2-A', title: 'Rationale — from olive tree to emblem (sketch to final)', file: 'logo-rationale.jpg' },
              { id: '03.2-B', title: 'Anatomy — emblem, wordmark, tagline labelled', file: 'logo-anatomy.jpg' },
            ],
          },
        ],
      },
      {
        num: '03.3',
        title: 'Construction & grid',
        blocks: [
          {
            kind: 'text',
            body: 'The emblem is drawn on a circular grid. Branch angles, leaf sizes and the ring weight are fixed and must never be redrawn. Always use the master artwork.',
          },
          {
            kind: 'banners',
            items: [
              { id: '03.3-A', title: 'Clear space — the exclusion zone', file: 'logo-clear-space.jpg' },
              { id: '03.3-B', title: 'Logo grid', file: 'logo-grid.jpg' },
              { id: '03.3-C', title: 'Rotation — horizontal and vertical', file: 'logo-rotation.jpg' },
              { id: '03.3-D', title: 'Logo variations', file: 'logo-variations.jpg' },
              { id: '03.3-E', title: 'Partners & sponsors', file: 'logo-partners.jpg' },
              { id: '03.3-F', title: 'Black & white', file: 'logo-black-white.jpg' },
              { id: '03.3-G', title: 'Slogan', file: 'logo-slogan.jpg' },
              { id: '03.3-H', title: 'Logo on backgrounds', file: 'logo-backgrounds.jpg' },
              { id: '03.3-I', title: 'Logo placement', file: 'logo-placement.jpg' },
              { id: '03.3-J', title: 'Incorrect usage', file: 'logo-incorrect-usage.jpg' },
              { id: '03.3-K', title: 'Misuse', file: 'logo-misuse.jpg' },
            ],
          },
        ],
      },
    ],
  },

  {
    num: '04',
    title: 'Colour',
    intro:
      'Three deep primaries carry the identity: the olive grove, Baghdad clay and the night sky. Three soft neutrals give it room to breathe.',
    sections: [
      {
        num: '04.1',
        title: 'Primary palette',
        blocks: [
          { kind: 'swatches', group: 'primary' },
          {
            kind: 'banners',
            items: [{ id: '04.1', title: 'Primary palette', file: 'colour-primary.jpg' }],
          },
        ],
      },
      {
        num: '04.2',
        title: 'Secondary palette',
        blocks: [
          { kind: 'swatches', group: 'secondary' },
        ],
      },
      {
        num: '04.3',
        title: 'Colour values',
        blocks: [
          {
            kind: 'text',
            body: 'Each brand colour extends into a controlled tonal scale for backgrounds, type, UI states and depth. Use tints and shades for hierarchy; never introduce hues outside these ramps.',
          },
          { kind: 'tonal' },
        ],
      },
      {
        num: '04.4',
        title: 'Proportion',
        blocks: [
          {
            kind: 'text',
            body: 'Every layout follows a 60 / 30 / 10 balance: 60% Verde Selva, 30% Bleu Oxford, 10% Terracotta. Terracotta is precious. Use it for the logo, rules and highlights, never as a large flat field.',
          },
          {
            kind: 'proportion',
            parts: [
              ['Verde Selva', 60],
              ['Bleu Oxford', 30],
              ['Terracotta', 10],
            ],
          },
        ],
      },
    ],
  },

  {
    num: '05',
    title: 'Typography',
    intro:
      'A heritage serif for the voice, a clear sans-serif for the information. Together they cover every surface, from a hoarding to a price list.',
    sections: [
      {
        num: '05.1',
        title: 'Typefaces — Playfair Display & Inter',
        blocks: [
          {
            kind: 'text',
            body: 'Two typefaces carry the brand. Playfair Display, a high-contrast serif, carries the heritage connection and sets ultra headlines (Black) and headlines (Medium). Inter, a clear and accessible sans-serif, handles sub-headlines (Medium), body copy, UI and supporting text (Regular, SemiBold, Bold).',
          },
          {
            kind: 'banners',
            items: [
              { id: '05.1-A', title: 'Playfair Display specimen', file: 'type-primary.jpg' },
              { id: '05.1-B', title: 'Type style', file: 'type-style.jpg' },
              { id: '05.1-C', title: 'Inter specimen', file: 'type-secondary.jpg' },
            ],
          },
        ],
      },
    ],
  },

  {
    num: '06',
    title: 'Graphic elements',
    intro: 'Supporting elements drawn from the emblem and the gardens. They decorate with restraint and never compete with the logo.',
    sections: [
      { num: '06.1', title: 'Pattern & texture', blocks: [{ kind: 'banners', items: [{ id: '06.1', title: 'Olive-leaf pattern and textures', file: 'pattern-textures.jpg' }] }] },
      { num: '06.2', title: 'Iconography', blocks: [{ kind: 'banners', items: [{ id: '06.2', title: 'Amenity icon set', file: 'icons.jpg' }] }] },
    ],
  },

  {
    num: '07',
    title: 'Lifestyle',
    intro:
      'Life at Al Zaytoun moves at its own pace: mornings on a private terrace, afternoons among the gardens, evenings above the lights of Baghdad.',
    sections: [
      {
        num: '07.1',
        title: 'Life at Al Zaytoun',
        blocks: [
          {
            kind: 'text',
            body: 'Al Zaytoun is designed around how people live, not only where they live. Hanging gardens soften every level, terraces open each home to light and air, and the calm of the Green Zone sets the rhythm of the day.',
          },
          {
            kind: 'text',
            body: 'With hotel-grade service powered by Mövenpick Hotels & Resorts, everyday life feels effortless. Families, couples and professionals share one private address where privacy, comfort and community sit side by side. This is the quality of life the residence promises, and every image of the brand should feel like it.',
          },
          {
            kind: 'banners',
            items: [
              { id: '07.1-A', title: 'Morning on the terrace', file: 'lifestyle-01.jpg' },
              { id: '07.1-B', title: 'Family time in the gardens', file: 'lifestyle-02.jpg' },
              { id: '07.1-C', title: 'Living with the view', file: 'lifestyle-view.jpg' },
              { id: '07.1-D', title: 'Wellness & leisure', file: 'lifestyle-03.jpg' },
              { id: '07.1-E', title: 'Interiors in daily use', file: 'lifestyle-04.jpg' },
              { id: '07.1-F', title: 'Swimming pool', file: 'lifestyle-05.jpg' },
              { id: '07.1-G', title: 'Swimming pool 2', file: 'lifestyle-06.jpg' },
              { id: '07.1-H', title: 'Fitness & gym', file: 'lifestyle-07.jpg' },
              { id: '07.1-I', title: 'Dining & hospitality', file: 'lifestyle-08.jpg' },
              { id: '07.1-J', title: 'The future looks like home', file: 'lifestyle-airplane.jpg' },
              { id: '07.1-K', title: 'Terraces at dusk', file: 'lifestyle-dusk.jpg' },
              { id: '07.1-L', title: 'Luxury app & banner', file: 'lifestyle-09.jpg' },
              { id: '07.1-M', title: 'Evening above the city', file: 'lifestyle-10.jpg' },
            ],
          },
        ],
      },
    ],
  },

  {
    num: '08',
    title: 'Applications',
    intro: 'The identity in use, from the business card to the building. Each set runs as one continuous strip of mockups.',
    sections: [
      {
        num: '08.1',
        title: 'Stationery',
        blocks: [
          {
            kind: 'banners',
            items: [
              { id: '08.1-A', title: 'Stationery suite overview', file: 'stationery-overview.jpg' },
              { id: '08.1-B', title: 'Business card — front and back', file: 'stationery-card.jpg' },
              { id: '08.1-C', title: 'Letterhead', file: 'stationery-letterhead.jpg' },
              { id: '08.1-D', title: 'Envelope', file: 'stationery-envelope.jpg' },
              { id: '08.1-E', title: 'Compliment card', file: 'stationery-compliment.jpg' },
              { id: '08.1-F', title: 'Presentation folder', file: 'stationery-folder.jpg' },
              { id: '08.1-G', title: 'Notebook', file: 'stationery-notebook.jpg' },
              { id: '08.1-H', title: 'Stationery detail — foil and emboss', file: 'stationery-detail.jpg' },
            ],
          },
        ],
      },
      {
        num: '08.2',
        title: 'Brochure',
        blocks: [
          {
            kind: 'banners',
            items: [
              { id: '08.2-A', title: 'Brochure cover', file: 'brochure-cover.jpg' },
              { id: '08.2-B', title: 'Brochure spread 01', file: 'brochure-spread-01.jpg' },
              { id: '08.2-C', title: 'Brochure spread 02', file: 'brochure-spread-02.jpg' },
              { id: '08.2-D', title: 'Brochure spread 03', file: 'brochure-spread-03.jpg' },
              { id: '08.2-E', title: 'Brochure spread 04', file: 'brochure-spread-04.jpg' },
              { id: '08.2-F', title: 'Brochure spread 05', file: 'brochure-spread-05.jpg' },
            ],
          },
        ],
      },
      {
        num: '08.3',
        title: 'Signage & wayfinding',
        blocks: [
          {
            kind: 'banners',
            items: [
              { id: '08.3-A', title: 'Building signage', file: 'env-signage.jpg' },
              { id: '08.3-B', title: 'Entrance and lobby', file: 'env-lobby.jpg' },
              { id: '08.3-C', title: 'Wayfinding 01', file: 'env-wayfinding-01.jpg' },
              { id: '08.3-D', title: 'Wayfinding 02', file: 'env-wayfinding-02.jpg' },
              { id: '08.3-E', title: 'Site hoarding', file: 'env-hoarding.jpg' },
              { id: '08.3-F', title: 'Environmental installation', file: 'env-installation.jpg' },
            ],
          },
        ],
      },
      {
        num: '08.4',
        title: 'Digital',
        blocks: [
          {
            kind: 'banners',
            items: [
              { id: '08.4-A', title: 'Website — desktop', file: 'app-website.jpg' },
              { id: '08.4-B', title: 'Website — mobile', file: 'app-website-mobile.jpg' },
              { id: '08.4-C', title: 'Social media grid', file: 'app-social-grid.jpg' },
              { id: '08.4-D', title: 'Instagram posts', file: 'app-social-instagram.jpg' },
              { id: '08.4-E', title: 'LinkedIn and Facebook', file: 'app-social-linkedin.jpg' },
              { id: '08.4-F', title: 'Email template', file: 'app-email-template.jpg' },
            ],
          },
        ],
      },
      {
        num: '08.5',
        title: 'Merchandise',
        blocks: [
          {
            kind: 'banners',
            items: [
              { id: '08.5-A', title: 'T-shirt', file: 'merch-tshirt.jpg' },
              { id: '08.5-B', title: 'Hoodie', file: 'merch-hoodie.jpg' },
              { id: '08.5-C', title: 'Cap', file: 'merch-cap.jpg' },
              { id: '08.5-D', title: 'Accessories', file: 'merch-accessories.jpg' },
              { id: '08.5-E', title: 'Branded packaging', file: 'merch-packaging.jpg' },
            ],
          },
        ],
      },
    ],
  },

  {
    num: '09',
    title: 'The development',
    intro:
      'Two residential towers joined by bridges, cascading terraces and green spaces, directly behind the Mövenpick Zaitoun Hotel in the Green Zone.',
    sections: [
      { num: '09.1', title: 'Architecture', blocks: [{ kind: 'banners', items: [{ id: '09.1', title: 'Twin towers and connecting bridges', file: 'arch-towers.jpg' }] }] },
      {
        num: '09.2',
        title: 'Residences',
        blocks: [
          { kind: 'banners', items: [{ id: '09.2', title: 'The six residences', file: 'unit-portfolio.jpg' }] },
        ],
      },
      { num: '09.3', title: 'Location', blocks: [{ kind: 'banners', items: [{ id: '09.3', title: 'Location map — Green Zone, Baghdad', file: 'location-map.jpg' }] }] },
    ],
  },
]
