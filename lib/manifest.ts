import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import type { Manifest, Block } from '@/types/blocks'
import { MOSAIC_CELLS } from '@/types/blocks'
import { resolveManifestImage } from '@/lib/manifestImages'
import { imageSize } from '@/lib/imageSize'

/**
 * Loads and validates manifests from /content/projects/*.json.
 *
 * Validation is deliberately loud in development and forgiving in production:
 * a hand-authored JSON file will have typos, and silently dropping a block is
 * how a case study quietly loses a section nobody notices for a month.
 *
 * Server-only.
 */

const CONTENT_DIR = join(process.cwd(), 'content', 'projects')

export type ManifestImage = {
  /** '' when the file is not on disk. */
  src: string
  width: number
  height: number
  alt: string
  missing: boolean
  unoptimized: boolean
  /** The filename as written in the manifest — shown when the file is absent. */
  filename: string
}

export function manifestSlugs(): string[] {
  if (!existsSync(CONTENT_DIR)) return []
  return readdirSync(CONTENT_DIR)
    .filter((f) => f.toLowerCase().endsWith('.json'))
    .map((f) => f.replace(/\.json$/i, ''))
    .sort()
}

export function getManifest(slug: string): Manifest | null {
  const path = join(CONTENT_DIR, `${slug}.json`)
  if (!existsSync(path)) return null

  try {
    const parsed = JSON.parse(readFileSync(path, 'utf8')) as Manifest
    if (!Array.isArray(parsed.blocks)) {
      console.warn(`[manifest] ${slug}: no blocks[] array — nothing to render.`)
      return { ...parsed, blocks: [] }
    }
    validate(slug, parsed)
    return parsed
  } catch (cause) {
    console.error(`[manifest] ${slug}: could not be parsed —`, cause)
    return null
  }
}

export function getAllManifests(): Manifest[] {
  return manifestSlugs()
    .map(getManifest)
    .filter((m): m is Manifest => m !== null)
}

/**
 * Resolves a filename to a fully-described image: real path, real intrinsic
 * dimensions, and an explicit `missing` flag so a block can render an honest
 * placeholder instead of a broken img.
 */
export function manifestImage(
  slug: string,
  filename: string,
  alt = '',
): ManifestImage {
  const resolved = resolveManifestImage(slug, filename)

  if (resolved.missing) {
    return {
      src: '',
      width: 1600,
      height: 1067,
      alt: alt || filename,
      missing: true,
      unoptimized: false,
      filename,
    }
  }

  const abs = join(process.cwd(), 'public', resolved.src.replace(/^\//, ''))
  const { width, height } = imageSize(abs)

  return {
    src: resolved.src,
    width,
    height,
    alt: alt || filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
    missing: false,
    unoptimized: resolved.unoptimized,
    filename,
  }
}

/**
 * Resolves a video file the project owns, same rules as manifestImage but
 * without the dimension probe — a <video> reports its own intrinsic size,
 * so nothing needs to read the file header up front.
 */
export function manifestVideo(slug: string, filename: string) {
  const resolved = resolveManifestImage(slug, filename)
  return { src: resolved.src, missing: resolved.missing }
}

/* ─── Validation ─────────────────────────────────────────────────── */

const KNOWN: Block['type'][] = [
  'sectionHeader',
  'text',
  'fullBleed',
  'grid',
  'twoUp',
  'threeUp',
  'mosaic',
  'videoEmbed',
  'video',
  'imageVideoPair',
  'credits',
  'audioEmbed',
  'hero',
  'metaBar',
  'pullQuote',
  'principles',
  'route',
  'album',
  'sideBySide',
  'divider',
  'fourUp',
]

function validate(slug: string, manifest: Manifest) {
  manifest.blocks.forEach((block, i) => {
    const at = `[manifest] ${slug} block ${i} (${block?.type ?? 'no type'})`

    if (!block?.type || !KNOWN.includes(block.type)) {
      console.warn(`${at}: unknown block type — it will not render.`)
      return
    }

    if (block.type === 'grid' && ![2, 3].includes(block.columns)) {
      console.warn(`${at}: columns must be 2 or 3, got ${block.columns}.`)
    }

    if (block.type === 'twoUp' && block.images.length !== 2) {
      console.warn(`${at}: expects 2 images, got ${block.images.length}.`)
    }

    if (block.type === 'threeUp' && block.images.length !== 3) {
      console.warn(`${at}: expects 3 images, got ${block.images.length}.`)
    }

    if (block.type === 'mosaic') {
      const expected = MOSAIC_CELLS[block.layout]
      if (!expected) {
        console.warn(`${at}: unknown mosaic layout "${block.layout}".`)
      } else if (block.images.length !== expected) {
        console.warn(
          `${at}: layout "${block.layout}" expects ${expected} images, got ${block.images.length}.`,
        )
      }
    }

    if (
      (block.type === 'videoEmbed' || block.type === 'imageVideoPair') &&
      /^REPLACE_/.test(block.id)
    ) {
      console.warn(`${at}: placeholder video id "${block.id}" — not yet supplied.`)
    }

    if (block.type === 'video' && !block.file) {
      console.warn(`${at}: no file given.`)
    }

    if (block.type === 'audioEmbed' && /^REPLACE_/i.test(block.soundcloudUrl)) {
      console.warn(`${at}: placeholder SoundCloud URL — not yet supplied.`)
    }

    if (block.type === 'route' && block.pairImages.length !== 2) {
      console.warn(`${at}: pairImages expects 2 images, got ${block.pairImages.length}.`)
    }

    if (block.type === 'album' && block.images.length < 3) {
      console.warn(`${at}: expects at least 3 images, got ${block.images.length}.`)
    }
  })
}
