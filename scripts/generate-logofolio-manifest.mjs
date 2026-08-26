// One-time generator — run with `node scripts/generate-logofolio-manifest.mjs`.
// Produces content/projects/logofolio.json from the numeric image range so
// the 30 fullBleed blocks are never hand-typed.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SLIDE_COUNT = 30

const intro = {
  type: 'text',
  heading: 'Designed to Be Recognized.',
  body: [
    'Every logo starts with an idea.',
    'My approach is rooted in simplicity, structure, and meaning — transforming concepts into visual marks that feel clear, distinctive, and built to last.',
    "I believe a strong identity doesn't need to explain everything at first glance. It needs to create recognition, hold meaning, and remain relevant beyond trends.",
    'This folio brings together 30 selected logos and emblems, each exploring a different balance between form, typography, symbolism, and simplicity.',
    'From a single gesture to a carefully constructed monogram, the goal remains the same:',
    'Create less. Mean more.',
  ].join('\n\n'),
}

const slides = Array.from({ length: SLIDE_COUNT }, (_, i) => ({
  type: 'fullBleed',
  image: `logofolio-${String(i + 1).padStart(2, '0')}.jpg`,
  size: 'contained',
}))

const conclusion = {
  type: 'text',
  heading: 'Thank You for Looking.',
  body: [
    'One constant approach, simplicity with intention.',
    'Thank you for taking the time to explore my work.',
    "If you have a brand, an idea, or simply a challenge worth solving, I'd be happy to talk.",
    'Let’s create something worth recognizing.',
  ].join('\n\n'),
}

const blocks = [intro, ...slides, conclusion]

const manifest = {
  slug: 'logofolio',
  title: 'Logofolio',
  cover: 'logofolio-01.jpg',
  nextProjectSlug: 'toyota-crown',
  blocks,
}

const out = join(process.cwd(), 'content', 'projects', 'logofolio.json')
writeFileSync(out, JSON.stringify(manifest, null, 2) + '\n')
console.log(`Wrote ${blocks.length} blocks to ${out}`)
