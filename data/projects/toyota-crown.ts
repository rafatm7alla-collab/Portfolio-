import type { Project } from '@/types/project'
import { projectImage } from '@/lib/projectImages'

/**
 * ─────────────────────────────────────────────────────────────────
 * TOYOTA CROWN — IRAQ LAUNCH
 *
 * Confirmed by Rafat: the title, the market, and that it is a launch
 * campaign. Everything below marked [DRAFT] is not yet approved copy and
 * is why isPlaceholder is still true.
 *
 * IMAGES — drop them in public/work/toyota-crown/ as hero, 01, 02, 03, 04.
 * Extension and capitalisation do not matter (hero.jpg, COVER.JPG, 01.png
 * all resolve — see lib/projectImages). Missing slots render a
 * proportioned grey block rather than a broken image.
 * ─────────────────────────────────────────────────────────────────
 */

const SLUG = 'toyota-crown'

/** Slot → Img. Matches hero.jpg / COVER.jpg / 01.png etc. See lib/projectImages. */
const img = (slot: string, w: number, h: number, alt: string) =>
  projectImage(SLUG, slot, w, h, alt)

export const toyotaCrown: Project = {
  slug: 'toyota-crown',
  index: '01',
  title: 'Iraq | Toyota Crown Launching Campaign',
  client: null, // ⚠️ not supplied — omitted rather than assumed
  year: null, // ⚠️ not supplied — omitted rather than assumed
  location: 'Iraq',
  sector: 'Automotive',
  category: 'Campaign',
  // ⚠️ inferred from "launching campaign" — confirm or correct
  services: ['Creative Direction', 'Art Direction', 'Campaign Development'],
  role: 'Creative Director',

  shortDescription:
    '[DRAFT] Launch campaign for the Toyota Crown in the Iraqi market.',

  /**
   * Supplied by Rafat, exactly as written. Renders large and light above
   * "The Brief", so it reads as the heading that introduces the rationale.
   * ⚠️ "RATIONAL" — likely intended as "Rationale". Not corrected without a
   * decision; it is set at headline size, where a typo is very visible.
   */
  lede: 'RATIONAL BEHIND',

  /**
   * Supplied by Rafat, verbatim. Blank line = paragraph break.
   *
   * ~180 words against the 60–90 the direction calls for. Left at his length
   * on purpose — it is his voice and his call. A tightened alternative is on
   * the table; see the note in the handover.
   */
  brief: `This car Model is known for its cultural connection with Iraqi society, and sentimental meaning to many generations, first of which, it has been known as the long life car in the country in the last 40 years in Iraq and it has been called several lovely names, names come from the deep side of the street and the relationship between the user's emotion, memories and the stabilities of the car through all this decade.

Iraq is a land rich in religious diversity and historical roots. The country serves as a testament to the coexistence and intermingling of various faiths throughout its history. Additionally, Iraq is home to ancient religious communities, such as Christians, Yazidis, Mandaeans, and Sabians, who have preserved their distinct beliefs and traditions for centuries. this variety made the challenge big in our brainstorming to create a mutual point between all this parts to find mutual thing and relate it with automotive campaign.`,

  idea: {
    headline: '[DRAFT] Idea headline — six words maximum.',
    body: '[DRAFT — 50–70 words] State the central idea plainly, then explain the mechanism: how it translates into the art direction, the shoot, the edit. Close on what it did for the brand that another idea would not have.',
  },

  nextCover: img('next-cover', 1400, 881, 'Toyota Crown — next project cover'),

  hero: {
    // 2800 × 1867 — the real file. The campaign typography is part of the
    // artwork and sits low in the frame, so this must not be cropped to 16:9.
    image: img(
      'hero',
      2800,
      1867,
      'Toyota Crown parked outside a showroom — Iraq launch campaign key visual',
    ),
    variant: 'cover',
  },

  sections: [
    {
      type: 'text',
      label: 'The Brief',
      body: '[DRAFT — see `brief` above.]',
    },
    {
      type: 'image',
      layout: 'bleed',
      // Explicit filename rather than the 01 slot — the file is named for
      // what it is, and the resolver matches exact names before prefixes.
      images: [img('2nd cover', 2800, 1621, 'Campaign key visual')],
    },
    /**
     * Supplied by Rafat, exactly as written.
     * ⚠️ "CINAMOGRAPH" — the technique is spelled "cinemagraph". It is set
     * at display-l bold, the largest type on the page. Not corrected without
     * a decision. Same word again in the body, plus "they are all emotionally".
     */
    {
      type: 'idea',
      headline: 'TEASER CINAMOGRAPH',
      // Sits between the headline and the paragraph: the old city and the
      // heritage the campaign is reaching back to.
      image: img('hereitage', 2800, 1171, 'Baghdad old city — heritage reference'),
      body: 'Adding some old music and make some motion and cinamograph effect will add more flash back feelings to the campaign and it will touch the people feelings in the Middle East as they are all emotionally.',
    },
    {
      type: 'embed',
      provider: 'vimeo',
      id: '855979221',
      title: 'Toyota Crown Iraq — teaser cinemagraph',
      layout: 'inset',
    },
    {
      type: 'image',
      layout: 'pair',
      offsetY: true,
      images: [
        img('02', 1400, 1750, 'Campaign photography'),
        img('03', 1200, 900, 'Campaign photography'),
      ],
    },
    {
      type: 'image',
      layout: 'bleed',
      images: [img('04', 2400, 1600, 'Out of home')],
    },
  ],

  credits: [{ role: 'Creative Direction', name: 'Rafat Mhalla' }],

  featured: true,
  order: 1,
  next: 'dubairaq',

  // ⚠️ Copy is unapproved. While true: a visible PLACEHOLDER tag renders,
  // the page is noindex, and it stays out of the sitemap.
  isPlaceholder: true,
}
