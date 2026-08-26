export type Service =
  | 'Creative Direction'
  | 'Art Direction'
  | 'Brand Strategy'
  | 'Visual Identity'
  | 'Campaign Development'
  | 'Digital'
  | 'Visual Systems'

export type Category =
  | 'Brand Identity'
  | 'Campaign'
  | 'Art Direction'
  | 'Digital'
  | 'Visual System'

export type Img = {
  /**
   * Empty string = no asset supplied yet. The Image component renders a
   * correctly-proportioned placeholder block instead of a broken <img>,
   * so layout and rhythm stay reviewable before the photography lands.
   */
  src: string
  alt: string
  /** Intrinsic dimensions. Required — prevents layout shift. */
  width: number
  height: number
  /** base64 blur placeholder, generated at build by scripts/blur.ts */
  blurDataURL?: string
  /**
   * Skip Next's image optimizer. Set automatically for GIFs — the optimizer
   * flattens an animated GIF to its first frame, so an animated cover would
   * silently become a still.
   */
  unoptimized?: boolean
}

export type ImageLayout =
  | 'bleed' // edge to edge
  | 'inset' // inside the grid, large margins
  | 'split-l' // image left, runs off the left edge
  | 'split-r' // image right, runs off the right edge
  | 'pair' // two images, uneven, vertically offset
  | 'triptych' // three up — the only place a 3-up is permitted

export type CaseSection =
  | {
      type: 'image'
      layout: ImageLayout
      images: Img[]
      caption?: string
      /** vertical displacement on the second item of a pair */
      offsetY?: boolean
    }
  | { type: 'text'; label: string; body: string }
  | {
      type: 'idea'
      headline: string
      body: string
      /** Optional, sits between the headline and the body copy. */
      image?: Img
    }
  | { type: 'video'; src: string; poster: string; layout: 'bleed' | 'inset' }
  /**
   * Third-party player. Never autoplays — the viewer presses play.
   * `id` is the bare video id, not a URL.
   */
  | {
      type: 'embed'
      provider: 'vimeo'
      id: string
      title: string
      layout: 'bleed' | 'inset'
    }
  | { type: 'spacer'; size: 'md' | 'lg' | 'xl' }

export type Project = {
  slug: string
  /** "01" — rendered as a display number, so it is a string */
  index: string
  title: string
  /** null → the field is omitted entirely. Never invented. */
  client: string | null
  /** null → omitted, same rule as client. A year is a claim like any other. */
  year: number | null
  location: string
  sector: string
  /** null → omitted. Same rule as client and year. */
  category: Category | null
  /** Only the services that actually applied to THIS project. */
  services: Service[]
  role: string

  /** ≤ 20 words. Used on the index and as the meta description. */
  shortDescription: string
  /** ≤ 20 words. The case study's opening line. */
  lede: string
  /** 60–90 words. Situation and constraint. */
  brief: string
  idea: {
    /** ≤ 6 words. Set at display-l. */
    headline: string
    /** 50–70 words. */
    body: string
  }

  /**
   * Shown when this project is the "Next project" at the end of another
   * case study. Keeps that block from repeating the cover you have just
   * scrolled past. Falls back to `hero.image` when no file exists.
   */
  nextCover?: Img

  hero: {
    image: Img | null
    /** Alternates across the set so no two case studies open alike. */
    variant: 'cover' | 'typographic'
  }

  /** The sequence IS the case study. Order is the art direction. */
  sections: CaseSection[]
  credits?: { role: string; name: string }[]

  featured: boolean
  order: number
  /** slug of the next project */
  next: string

  /**
   * TRUE until Rafat supplies real content for this entry.
   * Renders a visible PLACEHOLDER tag in the UI and blocks the
   * project from being presented as real work.
   */
  isPlaceholder: boolean
}
