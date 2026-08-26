import { existsSync, readdirSync } from 'node:fs'
import { join, extname } from 'node:path'

/**
 * Resolves a filename written in a manifest against
 * /public/projects/{slug}/.
 *
 * Separate from lib/projectImages.ts on purpose: that one resolves *slots*
 * ("hero", "01") for the TS-authored system under /public/work/. This one
 * resolves *filenames the author typed*, for the manifest system under
 * /public/projects/. Different inputs, different folder, different rules —
 * merging them would mean one function guessing which contract it is under.
 *
 * Server-only.
 */

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif']

const projectDir = (slug: string) =>
  join(process.cwd(), 'public', 'projects', slug)

export type ResolvedImage = {
  /** Public path, or '' when the file is not on disk. */
  src: string
  /** True when the manifest named a file that does not exist. */
  missing: boolean
  /** Animated GIFs must bypass the image optimizer or they lose animation. */
  unoptimized: boolean
}

/**
 * Matching is forgiving about extension and case, because a manifest is
 * hand-written and "hero.jpg" versus "Hero.JPG" is not a decision anyone
 * meant to make. An extension in the manifest is honoured exactly first;
 * only then does it try the others.
 */
export function resolveManifestImage(
  slug: string,
  filename: string,
): ResolvedImage {
  const miss: ResolvedImage = { src: '', missing: true, unoptimized: false }
  if (!filename) return miss

  const dir = projectDir(slug)
  if (!existsSync(dir)) return miss

  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return miss
  }

  const wanted = filename.toLowerCase()
  const stem = wanted.replace(/\.[^.]+$/, '')

  const hit =
    entries.find((entry) => entry.toLowerCase() === wanted) ??
    EXTENSIONS.map((ext) =>
      entries.find((entry) => entry.toLowerCase() === `${stem}.${ext}`),
    ).find(Boolean)

  if (!hit) return miss

  return {
    src: `/projects/${slug}/${hit}`,
    missing: false,
    unoptimized: extname(hit).toLowerCase() === '.gif',
  }
}

/** Every manifest slug currently on disk, from /content/projects/*.json. */
export function manifestSlugs(): string[] {
  const dir = join(process.cwd(), 'content', 'projects')
  if (!existsSync(dir)) return []
  try {
    return readdirSync(dir)
      .filter((f) => f.toLowerCase().endsWith('.json'))
      .map((f) => f.replace(/\.json$/i, ''))
      .sort()
  } catch {
    return []
  }
}
