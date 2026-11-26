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
        title: 'Project film',
        blocks: [
          {
            kind: 'banners',
            items: [{ id: '01.2', title: 'Project teaser film', file: 'alzaytoon-teaser.mp4' }],
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
      {
        num: '02.3',
        title: 'Tone of voice',
        blocks: [
          {
            kind: 'text',
            body: 'Calm, assured and warm. The brand never shouts and never oversells. It speaks about how life feels, not about square metres.',
          },
          {
            kind: 'rules',
            do: [
              'Short, confident sentences.',
              'Speak about feeling, light, gardens and time.',
              'Use the unit names in full: The Avenue Suite, The Crown Penthouse.',
            ],
            dont: [
              'Exclamation marks, “best ever”, “once in a lifetime”.',
              'Lead with price or discounts.',
              'Technical jargon in headlines.',
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
            items: [{ id: '03.3', title: 'Construction grid of the emblem and lockup', file: 'logo-construction.jpg' }],
          },
        ],
      },
      {
        num: '03.4',
        title: 'Logo variations',
        blocks: [
          {
            kind: 'banners',
            items: [
              { id: '03.4-A', title: 'Horizontal and stacked lockups', file: 'logo-variation-01.jpg' },
              { id: '03.4-B', title: 'Emblem and wordmark alone', file: 'logo-variation-02.jpg' },
            ],
          },
        ],
      },
      {
        num: '03.5',
        title: 'Colour versions',
        blocks: [
          {
            kind: 'banners',
            items: [{ id: '03.5', title: 'All approved colour versions', file: 'logo-colour-versions.jpg' }],
          },
        ],
      },
      {
        num: '03.6',
        title: 'Clear space & minimum size',
        blocks: [
          {
            kind: 'banners',
            items: [{ id: '03.6', title: 'Clear space and minimum sizes', file: 'logo-clear-space.jpg' }],
          },
        ],
      },
      {
        num: '03.7',
        title: 'Orientation & rotation',
        blocks: [
          {
            kind: 'text',
            body: 'The logo always stands upright at 0°. It is never rotated, tilted, mirrored, or set on an angle or a curve to fit a layout. On tall, narrow formats such as flags, poles and spines, use the stacked lockup instead of turning the horizontal one on its side. {{In approved motion graphics only, the emblem may turn as part of the logo reveal and must come to rest upright.}}',
          },
          {
            kind: 'banners',
            items: [{ id: '03.7', title: 'Orientation — correct vs rotated, tilted, mirrored', file: 'logo-orientation.jpg' }],
          },
        ],
      },
      {
        num: '03.8',
        title: 'Logo on backgrounds',
        blocks: [
          {
            kind: 'rules',
            do: [
              'Bleu Oxford, Verde Selva, Areia Fina or Perola grounds.',
              'Calm, even areas of photography, such as sky, wall or water.',
              'Enough contrast to read the tagline.',
            ],
            dont: [
              'Busy areas of a photo, such as leaves, people or patterns.',
              'Terracotta logo on Terracotta or Sable Doux.',
              'Mid-tone grounds where neither light nor dark version reads.',
            ],
          },
          {
            kind: 'banners',
            items: [{ id: '03.8', title: 'Approved and unapproved backgrounds', file: 'logo-backgrounds.jpg' }],
          },
        ],
      },
      {
        num: '03.9',
        title: 'Do’s & don’ts',
        blocks: [
          {
            kind: 'banners',
            items: [
              { id: '03.9-A', title: 'Correct use — four examples', file: 'logo-usage-do.jpg' },
              { id: '03.9-B', title: 'Misuse — eight examples crossed out', file: 'logo-usage-rules.jpg' },
            ],
          },
        ],
      },
      {
        num: '03.10',
        title: 'Co-branding',
        blocks: [
          {
            kind: 'text',
            body: 'Al Zaytoon Residences leads. The “Powered by Mövenpick Hotels & Resorts” endorsement sits {{to the right, after a thin vertical rule}}, at {{no more than 60%}} of the Al Zaytoun logo’s height, and always follows Mövenpick’s own brand rules.',
          },
          {
            kind: 'banners',
            items: [{ id: '03.10', title: 'Co-branding lockup with Mövenpick', file: 'logo-cobranding.jpg' }],
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
          {
            kind: 'banners',
            items: [{ id: '04.2', title: 'Secondary palette', file: 'colour-secondary.jpg' }],
          },
        ],
      },
      {
        num: '04.3',
        title: 'Colour values',
        blocks: [
          {
            kind: 'banners',
            items: [{ id: '04.3', title: 'Tonal range — tints and shades of each colour', file: 'colour-supporting.jpg' }],
          },
        ],
      },
      {
        num: '04.4',
        title: 'Proportion',
        blocks: [
          {
            kind: 'text',
            body: 'Every layout follows a 60 / 30 / 10 balance: {{60% light neutrals (Areia Fina, Perola), 30% deep colour (Bleu Oxford or Verde Selva), 10% Terracotta accent}}. Terracotta is precious. Use it for the logo, rules and highlights, never as a large flat field.',
          },
          {
            kind: 'banners',
            items: [{ id: '04.4', title: 'Colour proportion 60 / 30 / 10', file: 'colour-usage.jpg' }],
          },
        ],
      },
      {
        num: '04.5',
        title: 'Combinations & legibility',
        blocks: [
          {
            kind: 'contrast',
            pairs: [
              ['Areia Fina', 'Bleu Oxford'],
              ['Terracotta', 'Bleu Oxford'],
              ['Areia Fina', 'Verde Selva'],
              ['Terracotta', 'Verde Selva'],
              ['Bleu Oxford', 'Perola'],
              ['Terracotta', 'Areia Fina'],
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
        title: 'Primary typeface — Playfair Display',
        blocks: [
          {
            kind: 'text',
            body: 'A high-contrast serif that carries the heritage connection. Used for ultra headlines (Black) and headlines (Medium).',
          },
          { kind: 'banners', items: [{ id: '05.1', title: 'Playfair Display specimen', file: 'type-primary.jpg' }] },
        ],
      },
      {
        num: '05.2',
        title: 'Secondary typeface — Inter',
        blocks: [
          {
            kind: 'text',
            body: 'A clear, accessible sans-serif for sub-headlines (Medium), body copy, UI and supporting text (Regular, SemiBold, Bold).',
          },
          { kind: 'banners', items: [{ id: '05.2', title: 'Inter specimen', file: 'type-secondary.jpg' }] },
        ],
      },
      {
        num: '05.3',
        title: 'Arabic typeface',
        blocks: [
          {
            kind: 'text',
            body: 'Arabic is set in {{Arabic typeface to confirm}}, chosen to match Playfair’s contrast in headlines and Inter’s clarity in text. Arabic and English never mix in one line; in bilingual layouts the two languages mirror each other.',
          },
          { kind: 'banners', items: [{ id: '05.3', title: 'Arabic typeface and bilingual layout', file: 'type-arabic.jpg' }] },
        ],
      },
      {
        num: '05.4',
        title: 'Hierarchy',
        blocks: [
          {
            kind: 'specs',
            rows: [
              ['Ultra headline', 'Playfair Display Black'],
              ['Headline', 'Playfair Display Medium'],
              ['Sub-headline', 'Inter Medium'],
              ['Body', 'Inter Regular'],
              ['Labels & captions', '{{Inter SemiBold, uppercase, tracked}}'],
            ],
          },
          { kind: 'banners', items: [{ id: '05.4', title: 'Type hierarchy in use', file: 'type-hierarchy.jpg' }] },
        ],
      },
      {
        num: '05.5',
        title: 'Do’s & don’ts',
        blocks: [
          {
            kind: 'rules',
            do: [
              'Use Playfair for emotion, Inter for information.',
              'Generous line spacing and margins.',
              'Sentence case for headlines and body.',
            ],
            dont: [
              'Any other typeface.',
              'Playfair for long body text or small sizes.',
              'Stretch, outline or add effects to type.',
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
      { num: '06.3', title: 'Dividers & ornaments', blocks: [{ kind: 'banners', items: [{ id: '06.3', title: 'Dividers and ornamental details', file: 'dividers-ornaments.jpg' }] }] },
    ],
  },

  {
    num: '07',
    title: 'Photography',
    intro: 'Images show life between gardens: natural light, greenery, architecture and calm people living well.',
    sections: [
      {
        num: '07.1',
        title: 'Photography style',
        blocks: [
          {
            kind: 'rules',
            do: [
              'Warm, natural daylight and golden hour.',
              'Greenery and architecture in the same frame.',
              'People in calm, real moments.',
            ],
            dont: [
              'Hard flash, cold blue grading, heavy saturation.',
              'Generic stock clichés.',
              'Crowded, busy compositions.',
            ],
          },
          { kind: 'banners', items: [{ id: '07.1', title: 'Photography style guide', file: 'photo-style-guide.jpg' }] },
        ],
      },
      { num: '07.2', title: 'Image treatment', blocks: [{ kind: 'banners', items: [{ id: '07.2', title: 'Colour grading and treatment', file: 'photo-treatment.jpg' }] }] },
    ],
  },

  {
    num: '08',
    title: 'Layout',
    intro: 'A calm grid with generous margins. Space is part of the luxury.',
    sections: [
      { num: '08.1', title: 'Grid system', blocks: [{ kind: 'banners', items: [{ id: '08.1', title: 'Grid for print and digital', file: 'grid-system.jpg' }] }] },
      { num: '08.2', title: 'Spacing & proportions', blocks: [{ kind: 'banners', items: [{ id: '08.2', title: 'Spacing and proportions', file: 'spacing-proportions.jpg' }] }] },
    ],
  },

  {
    num: '09',
    title: 'Applications',
    intro: 'The identity in use, from the business card to the building. Each set runs as one continuous strip of mockups.',
    sections: [
      {
        num: '09.1',
        title: 'Stationery',
        blocks: [
          {
            kind: 'banners',
            items: [
              { id: '09.1-A', title: 'Stationery suite overview', file: 'stationery-overview.jpg' },
              { id: '09.1-B', title: 'Business card — front and back', file: 'stationery-card.jpg' },
              { id: '09.1-C', title: 'Letterhead', file: 'stationery-letterhead.jpg' },
              { id: '09.1-D', title: 'Envelope', file: 'stationery-envelope.jpg' },
              { id: '09.1-E', title: 'Compliment card', file: 'stationery-compliment.jpg' },
              { id: '09.1-F', title: 'Presentation folder', file: 'stationery-folder.jpg' },
              { id: '09.1-G', title: 'Notebook', file: 'stationery-notebook.jpg' },
              { id: '09.1-H', title: 'Stationery detail — foil and emboss', file: 'stationery-detail.jpg' },
            ],
          },
        ],
      },
      {
        num: '09.2',
        title: 'Brochure',
        blocks: [
          {
            kind: 'banners',
            items: [
              { id: '09.2-A', title: 'Brochure cover', file: 'brochure-cover.jpg' },
              { id: '09.2-B', title: 'Brochure spread 01', file: 'brochure-spread-01.jpg' },
              { id: '09.2-C', title: 'Brochure spread 02', file: 'brochure-spread-02.jpg' },
              { id: '09.2-D', title: 'Brochure spread 03', file: 'brochure-spread-03.jpg' },
              { id: '09.2-E', title: 'Brochure spread 04', file: 'brochure-spread-04.jpg' },
              { id: '09.2-F', title: 'Brochure spread 05', file: 'brochure-spread-05.jpg' },
            ],
          },
        ],
      },
      {
        num: '09.3',
        title: 'Signage & wayfinding',
        blocks: [
          {
            kind: 'banners',
            items: [
              { id: '09.3-A', title: 'Building signage', file: 'env-signage.jpg' },
              { id: '09.3-B', title: 'Entrance and lobby', file: 'env-lobby.jpg' },
              { id: '09.3-C', title: 'Wayfinding 01', file: 'env-wayfinding-01.jpg' },
              { id: '09.3-D', title: 'Wayfinding 02', file: 'env-wayfinding-02.jpg' },
              { id: '09.3-E', title: 'Site hoarding', file: 'env-hoarding.jpg' },
              { id: '09.3-F', title: 'Environmental installation', file: 'env-installation.jpg' },
            ],
          },
        ],
      },
      {
        num: '09.4',
        title: 'Digital',
        blocks: [
          {
            kind: 'banners',
            items: [
              { id: '09.4-A', title: 'Website — desktop', file: 'app-website.jpg' },
              { id: '09.4-B', title: 'Website — mobile', file: 'app-website-mobile.jpg' },
              { id: '09.4-C', title: 'Social media grid', file: 'app-social-grid.jpg' },
              { id: '09.4-D', title: 'Instagram posts', file: 'app-social-instagram.jpg' },
              { id: '09.4-E', title: 'LinkedIn and Facebook', file: 'app-social-linkedin.jpg' },
              { id: '09.4-F', title: 'Email template', file: 'app-email-template.jpg' },
            ],
          },
        ],
      },
      {
        num: '09.5',
        title: 'Merchandise',
        blocks: [
          {
            kind: 'banners',
            items: [
              { id: '09.5-A', title: 'T-shirt', file: 'merch-tshirt.jpg' },
              { id: '09.5-B', title: 'Hoodie', file: 'merch-hoodie.jpg' },
              { id: '09.5-C', title: 'Cap', file: 'merch-cap.jpg' },
              { id: '09.5-D', title: 'Accessories', file: 'merch-accessories.jpg' },
              { id: '09.5-E', title: 'Branded packaging', file: 'merch-packaging.jpg' },
            ],
          },
        ],
      },
    ],
  },

  {
    num: '10',
    title: 'The development',
    intro:
      'Two residential towers joined by bridges, cascading terraces and green spaces, directly behind the Mövenpick Zaitoun Hotel in the Green Zone.',
    sections: [
      { num: '10.1', title: 'Architecture', blocks: [{ kind: 'banners', items: [{ id: '10.1', title: 'Twin towers and connecting bridges', file: 'arch-towers.jpg' }] }] },
      {
        num: '10.2',
        title: 'Residences',
        blocks: [
          { kind: 'banners', items: [{ id: '10.2', title: 'The six residences', file: 'unit-portfolio.jpg' }] },
        ],
      },
      { num: '10.3', title: 'Location', blocks: [{ kind: 'banners', items: [{ id: '10.3', title: 'Location map — Green Zone, Baghdad', file: 'location-map.jpg' }] }] },
    ],
  },
]
