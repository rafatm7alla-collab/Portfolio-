import { existsSync } from 'node:fs'
import { readdirSync } from 'node:fs'
import { join, extname } from 'node:path'
import type { Img } from '@/types/project'

/**
 * Resolves a project image slot to whatever is actually on disk.
 *
 * The data used to demand an exact filename — `hero.jpg` and nothing else —
 * so a cover uploaded as `COVER.jpg` silently never appeared. That is a bad
 * trade: the person adding images should not have to match a string in a
 * TypeScript file.
 *
 * A slot now matches case-insensitively across common extensions, so
 * hero.jpg / HERO.JPG / Cover.png / 01.jpeg all resolve. First match wins,
 * in the order listed by ALIASES.
 *
 * Server-only — data/projects is imported exclusively by server components.
 */

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif']

/** Alternative names accepted for each slot, in priority order. */
const ALIASES: Record<string, string[]> = {
  hero: ['hero', 'cover', 'main', '00'],
  /**
   * The image used when this project appears as "Next" at the foot of
   * another case study. Falls back to the hero when absent.
   * Listed longest-first so "next project cover" wins over bare "next".
   */
  'next-cover': ['next project cover', 'next cover', 'nextcover', 'next'],
}

const workDir = (slug: string) => join(process.cwd(), 'public', 'work', slug)

function resolveFile(slug: string, slot: string): string | null {
  const dir = workDir(slug)
  if (!existsSync(dir)) return null

  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return null
  }

  const names = (ALIASES[slot] ?? [slot]).map((n) => n.toLowerCase())

  // Pass 1 — exact filename. Runs across every alias and extension before any
  // prefix matching, because a folder can hold both "2nd cover.jpg" and
  // "2nd cover s.jpg": a prefix search alone would return whichever readdir
  // happened to list first, which is not a decision anyone made.
  for (const name of names) {
    for (const ext of EXTENSIONS) {
      const exact = entries.find((entry) => entry.toLowerCase() === `${name}.${ext}`)
      if (exact) return `/work/${slug}/${exact}`
    }
  }

  // Pass 2 — prefix, so "hero-1.jpg" or "cover final.jpg" still resolve.
  // Shortest name wins: it is the closest thing to what was asked for.
  for (const name of names) {
    const candidates = entries
      .filter(
        (entry) =>
          entry.toLowerCase().startsWith(name) &&
          EXTENSIONS.includes(extname(entry).slice(1).toLowerCase()),
      )
      .sort((a, b) => a.length - b.length)
    if (candidates[0]) return `/work/${slug}/${candidates[0]}`
  }

  return null
}

/**
 * @param slot 'hero' for the cover, otherwise '01', '02', '03'…
 * Width and height are the fallback intrinsic ratio used before the real
 * file lands; once it exists the file's own dimensions are what matter for
 * the crop, and these only prevent layout shift.
 */
export function projectImage(
  slug: string,
  slot: string,
  width: number,
  height: number,
  alt: string,
): Img {
  const src = resolveFile(slug, slot) ?? ''
  // Animated GIFs must bypass the optimizer or they arrive as a single frame.
  const unoptimized = src.toLowerCase().endsWith('.gif')
  return { src, alt, width, height, ...(unoptimized ? { unoptimized } : {}) }
}
