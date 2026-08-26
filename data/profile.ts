/**
 * ─────────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for everything about Rafat.
 *
 * Every value marked PLACEHOLDER is unconfirmed and must not ship.
 * Nothing here is invented beyond what was supplied in the brief.
 * ─────────────────────────────────────────────────────────────────
 */

/** Two bases, primary first. Confirmed by Rafat. */
const LOCATIONS = [
  { city: 'Belgrade', country: 'Serbia' },
  { city: 'Erbil', country: 'Iraq' },
] as const

export const profile = {
  name: 'Rafat Mhalla',
  title: 'Creative Director / Art Director',
  /** Confirmed in the brief: "more than 12 years of experience" */
  yearsExperience: 12,

  /**
   * Two bases, primary first. Confirmed by Rafat.
   *
   * `location` is the compact form for tight contexts — the hero baseline
   * row and the About meta stack — where the full "City, Country" pair twice
   * over would crowd an 11px line. The full pair is used on Contact.
   */
  locations: LOCATIONS,

  /** Derived: "Belgrade · Erbil" */
  location: LOCATIONS.map((l) => l.city).join(' · '),

  /**
   * The hero is the name itself, set as a three-weight stack.
   *
   * This is the one place the system uses a three-step gradation rather than
   * the two-weight pair: 700 → 300 → 400. Read top to bottom it lands hard,
   * thins out, then settles. The role line above it carries the job title, so
   * the name does not have to.
   */
  heroName: [
    { text: 'Rafat', weight: 700 },
    { text: 'Jhd', weight: 300 },
    { text: 'Mhalla', weight: 400 },
  ] as const,

  /**
   * Hero portrait — 3136 × 1024, subject right, open space left.
   *
   * The composition depends on that asymmetry: the type occupies the empty
   * left side, the portrait owns the right. If this image is ever replaced,
   * the replacement needs the same weighting or the type will land on the
   * face. `objectPosition` is the focal point as the crop tightens.
   */
  /**
   * The About page banner. Deliberately a separate entry pointing at the same
   * file, so the homepage can be swapped for the logo design without touching
   * About. Drop a different file at aboutPortrait.src to split them.
   */
  aboutPortrait: {
    src: '/hero/portrait.jpg',
    alt: 'Rafat Mhalla, photographed behind fluted glass',
    objectPosition: '85% center',
  },

  /**
   * The homepage intro band's mark.
   *
   * mark.jpg is cropped to 3800 × 2000 — the 8000 × 6877 original is kept as
   * mark-source.jpg. The original's baked-in white margins made the mark
   * render tiny inside any fixed box; cropping lets CSS size it directly.
   */
  heroLogo: {
    src: '/hero/mark.jpg',
    alt: 'Rafat Mhalla monogram',
  },

  /** The photograph, used on About. */
  heroPhoto: {
    src: '/hero/portrait.jpg',
    alt: 'Rafat Mhalla, photographed behind fluted glass',
    /**
     * The panel is roughly square while the source is 3.06:1, so only about a
     * third of the photograph's width is ever visible. 'right center' framed
     * the beard and shoulder; 85% centres the head in that window.
     */
    objectPosition: '85% center',
  },

  /** PLACEHOLDER — Rafat to supply or approve */
  heroSupporting:
    'Branding, visual systems and campaigns for brands that want to be remembered.',

  /** PLACEHOLDER — Rafat to supply or approve */
  aboutStatement:
    'Twelve years directing brands across identity, campaign and digital.',

  /** PLACEHOLDER — Rafat to supply 80–120 words */
  aboutBody: [
    'Rafat Mhalla is a Creative Director and Art Director with more than twelve years of experience across branding, visual identity, advertising, campaigns and digital experiences.',
    'I build premium brand identities and digital experiences that feel inevitable, not accidental. From strategy to execution, I solve the problems that sit between "what the brand is" and "how people experience it." You get a creative partner who thinks systematically who connects your business goals to visual and narrative strategy, and delivers work that\'s both beautiful and built to convert.',
  ],

  /**
   * PLACEHOLDER — Rafat to supply or approve.
   *
   * Set as the light/bold pair rather than four bold lines: four lines of
   * display-xl bold closed the page with a wall of black, and the pair is
   * the site's signature move. The statement now lands on the bold half.
   */
  contactStatement: {
    light: "Let's make something",
    bold: 'worth remembering.',
  },

  /** PLACEHOLDER — real address required before launch */
  email: 'hello@rafatmhalla.com',

  /**
   * null means the field is omitted from the contact page entirely.
   * Set a real number to show it. Never invented.
   */
  phone: null as string | null,

  /** PLACEHOLDER — Rafat to confirm or replace */
  availableFor: ['Creative Direction', 'Art Direction', 'Brand Identity', 'Remote'],

  /** The subject options offered in the contact form. */
  enquiryTypes: ['Commission', 'Collaboration', 'General'],

  /** PLACEHOLDER — real URLs required before launch */
  social: [
    { label: 'Behance', short: 'BE', href: 'https://www.behance.net/' },
    { label: 'LinkedIn', short: 'LI', href: 'https://www.linkedin.com/' },
    { label: 'Instagram', short: 'IG', href: 'https://www.instagram.com/' },
  ],

  /** PLACEHOLDER — required for metadata, OG tags and sitemap */
  siteUrl: 'https://rafatmhalla.com',
} as const

export const navigation = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const
