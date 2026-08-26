/**
 * Manifest schema — see /docs/BLOCKS.md.
 *
 * Every field here comes from that spec. Nothing is added speculatively: a
 * manifest is hand-authored, so an unknown key is far more likely to be a
 * typo than an intention, and the loader reports it rather than ignoring it.
 */

export type MosaicLayout =
  | 'teaser-posts'
  | 'launch-posts'
  | 'invitation-details'
  | 'outdoor-details'

export type VideoProvider = 'youtube' | 'vimeo'

export type Block =
  | { type: 'sectionHeader'; title: string; subtitle?: string }
  | {
      type: 'text'
      body: string
      heading?: string
      list?: string[]
      /** Sets the body in the light (300) weight instead of the default
       *  regular — for a statement that reads better as quiet type than
       *  as a standard case-study paragraph. */
      light?: boolean
    }
  | {
      type: 'fullBleed'
      image: string
      caption?: string
      size?: 'full' | 'contained'
      widthPercent?: number
      /** Sits flush against the block above it — no vertical gap. */
      noGap?: boolean
    }
  | { type: 'grid'; columns: 2 | 3; images: string[] }
  /**
   * Two or three images side by side, each at its own natural ratio — the
   * uncropped counterpart to `grid`, which crops every cell to a common 4:3
   * so its rows line up. Use this when the images are their own distinct
   * shapes (a portrait next to a landscape) and cropping either would lose
   * the shot. Same frame options as fullBleed; stacks to one column below
   * `md`, since a natural-ratio image at a third of the viewport is a
   * thumbnail, not a photograph.
   */
  | {
      type: 'twoUp' | 'threeUp' | 'fourUp'
      images: string[]
      size?: 'full' | 'contained'
      widthPercent?: number
      captions?: string[]
    }
  | { type: 'mosaic'; layout: MosaicLayout; images: string[] }
  | {
      type: 'videoEmbed'
      provider: VideoProvider
      id: string
      title: string
      size?: 'full' | 'contained'
      widthPercent?: number
    }
  /**
   * A portrait image beside its own provider video — left and right, one
   * pair, centred as a single unit. For a storyteller shot next to their
   * documentary, where the two belong side by side rather than one after
   * the other down the page.
   */
  | {
      type: 'imageVideoPair'
      image: string
      caption?: string
      provider: VideoProvider
      id: string
      title: string
      size?: 'full' | 'contained'
      widthPercent?: number
    }
  /**
   * A video file the project itself owns — not a Vimeo/YouTube id. For
   * banner-style footage (a loop, an OOH screen mockup) rather than a film
   * meant to be pressed play on: muted, looped, plays as soon as it is in
   * view. Same frame options as fullBleed.
   */
  | {
      type: 'video'
      file: string
      title: string
      poster?: string
      /** Defaults to 16/9 — set this when the footage is a different shape. */
      aspect?: string
      size?: 'full' | 'contained'
      widthPercent?: number
      /** Sits flush against the block above it — no vertical gap. */
      noGap?: boolean
    }
  | { type: 'credits'; items: { label: string; value: string }[] }
  /**
   * A custom-skinned SoundCloud track — never the default orange widget
   * chrome. Driven by the SoundCloud Widget JS API against a hidden iframe,
   * so play/pause, the progress bar and the track/artist labels are all
   * ours. `soundcloudUrl` prefixed `REPLACE_` (same idiom as videoEmbed's
   * `id`) renders an honest "not supplied yet" frame instead of pointing
   * the widget at a URL that does not exist.
   */
  | { type: 'audioEmbed'; soundcloudUrl: string; title: string; artist: string }
  /**
   * A full-bleed ~80vh opener with the title/subtitle set over the image,
   * bottom-aligned. Replaces the page's own masthead for a project that
   * wants to open on a picture rather than a heading — pair with
   * `Manifest.noMasthead` so the two never both render.
   */
  | { type: 'hero'; image: string; title: string; subtitle?: string }
  /**
   * A single horizontal row of label/value pairs — Client, Sector, Year,
   * Role, Deliverables and the like. The `credits` block is a two-column
   * list meant for the end of a page; this is the same data shape read
   * left to right, for the top.
   */
  | { type: 'metaBar'; items: { label: string; value: string }[] }
  /** One large centred display line — a full-width pause between sections. */
  | { type: 'pullQuote'; text: string }
  /** Numbered principles — a short title and one sentence each, stacked. */
  | { type: 'principles'; items: { title: string; body: string }[] }
  /**
   * One named stage of a route/system: a lead 16:9 image, a body
   * paragraph, and a 4:5 pair beside it. Rendered by one shared component
   * so every instance of this block is structurally identical — the point
   * of naming it once instead of hand-repeating three fullBleed groups.
   */
  | {
      type: 'route'
      number: string
      name: string
      subheadline?: string
      descriptor: string
      intro?: string
      body: string
      leadImage: string
      pairImages: [string, string]
    }
  /**
   * An asymmetric collage: a 3:2 + 4:5 row, then a row of three 3:2s.
   * Falls back to a plain 3-up when only 3 images are supplied.
   */
  | { type: 'album'; images: string[] }
  /** An image at roughly half width beside a text column. */
  | { type: 'sideBySide'; image: string; heading?: string; body: string }
  /** A text-only section break — small uppercase label + display-scale line. */
  | { type: 'divider'; label: string; text: string }

export type BlockType = Block['type']

export type Manifest = {
  slug: string
  title: string
  client?: string
  role?: string
  year?: string
  location?: string
  tags?: string[]
  /** Filename inside /public/projects/{slug}/ */
  cover?: string
  summary?: string
  /** Informational only — filenames in blocks are already fully qualified. */
  assetPrefix?: string
  /**
   * Slug of a TS-authored case study (data/projects) to close the page with
   * the site's usual next-project block. Manifest projects have no place in
   * that chain themselves — this only points forward, borrowing the
   * component as-is rather than adding a manifest-side equivalent.
   */
  nextProjectSlug?: string
  /**
   * Flips the page to the site's black-ground [data-invert] treatment.
   * For a project that is only artwork on white artboards — nothing else on
   * the page reads as "content" for that ground to sit against.
   */
  invert?: boolean
  /** Same switch, spelled the way a hand-authored manifest reaches for it. */
  theme?: 'dark' | 'light'
  /** Disable rounded corners on all media blocks. */
  noRounding?: boolean
  /** Remove gaps between all consecutive media blocks. */
  noBlockGaps?: boolean
  /** Suppress the page's own title/summary/dl masthead — for a project
   *  that opens on a `hero` block instead. */
  noMasthead?: boolean
  blocks: Block[]
}

/** How many images each mosaic layout expects. Used to warn, never to crop. */
export const MOSAIC_CELLS: Record<MosaicLayout, number> = {
  'teaser-posts': 9,
  'launch-posts': 6,
  'invitation-details': 5,
  'outdoor-details': 5,
}
