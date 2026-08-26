#!/usr/bin/env node
/**
 * Which project images are in place, and which are still missing.
 *
 *   npm run images
 *
 * Mirrors the matching rules in lib/projectImages.ts — a slot counts as
 * filled by any common extension and any capitalisation, so hero.jpg,
 * COVER.JPG and 01.png all register.
 */

import { readdirSync, existsSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const ROOT = process.cwd()
const WORK = join(ROOT, 'public', 'work')
const SLOTS = ['hero', '01', '02', '03', '04']
const ALIASES = { hero: ['hero', 'cover', 'main', '00'] }
const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif']

const dim = (s) => `\x1b[2m${s}\x1b[0m`
const bold = (s) => `\x1b[1m${s}\x1b[0m`

if (!existsSync(WORK)) {
  console.log('public/work does not exist yet.')
  process.exit(0)
}

const slugs = readdirSync(WORK).filter((entry) =>
  statSync(join(WORK, entry)).isDirectory(),
)

if (slugs.length === 0) {
  console.log('No project folders in public/work.')
  process.exit(0)
}

console.log('')
console.log(bold('  PROJECT IMAGES'))
console.log(dim('  ─────────────────────────────────────────────────────────'))

let filled = 0
let total = 0

for (const slug of slugs.sort()) {
  const entries = readdirSync(join(WORK, slug)).filter((f) =>
    EXTENSIONS.includes(extname(f).slice(1).toLowerCase()),
  )

  const marks = SLOTS.map((slot) => {
    const names = ALIASES[slot] ?? [slot]
    const hit = entries.find((entry) => {
      const lower = entry.toLowerCase()
      return names.some((n) => lower.startsWith(n))
    })
    total += 1
    if (hit) filled += 1
    return hit ? '●' : dim('·')
  })

  const label = slug.padEnd(24)
  const heroState = marks[0] === '●' ? '' : dim('   no cover')
  console.log(`  ${label} ${marks.join(' ')}${heroState}`)
}

console.log(dim('  ─────────────────────────────────────────────────────────'))
console.log(dim(`  slots: hero 01 02 03 04        ${filled}/${total} filled`))
console.log('')
console.log(dim('  ● present   · empty'))
console.log(
  dim('  Drop files into public/work/<slug>/ — any extension, any case.'),
)
console.log('')
