/**
 * Generates base64 blur placeholders for every image in public/work.
 *
 *   npm i -D sharp tsx
 *   npx tsx scripts/blur.ts
 *
 * Writes data/generated/blur.json keyed by public path:
 *   { "/work/al-zaytouna-terraces/hero.jpg": "data:image/webp;base64,..." }
 *
 * Project data files are left untouched — read the map at build time and
 * attach blurDataURL where you need it.
 */

import { readdir, mkdir, writeFile, stat } from 'node:fs/promises'
import { join, relative, extname } from 'node:path'
import sharp from 'sharp'

const WORK_DIR = join(process.cwd(), 'public', 'work')
const OUT_DIR = join(process.cwd(), 'data', 'generated')
const OUT_FILE = join(OUT_DIR, 'blur.json')
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) return walk(path)
      return EXTS.has(extname(entry.name).toLowerCase()) ? [path] : []
    }),
  )
  return files.flat()
}

async function main() {
  try {
    await stat(WORK_DIR)
  } catch {
    console.log('public/work does not exist yet — nothing to do.')
    return
  }

  const files = await walk(WORK_DIR)
  if (files.length === 0) {
    console.log('No images found in public/work.')
    return
  }

  const map: Record<string, string> = {}

  for (const file of files) {
    // 20px wide is enough — it is blurred to nothing anyway, and keeping it
    // tiny keeps the JSON (and therefore the HTML payload) small.
    const buffer = await sharp(file)
      .resize(20, null, { fit: 'inside' })
      .webp({ quality: 40 })
      .toBuffer()

    const key = '/' + relative(join(process.cwd(), 'public'), file).split('\\').join('/')
    map[key] = `data:image/webp;base64,${buffer.toString('base64')}`
    console.log(`✓ ${key}`)
  }

  await mkdir(OUT_DIR, { recursive: true })
  await writeFile(OUT_FILE, JSON.stringify(map, null, 2) + '\n')
  console.log(`\n${files.length} placeholders → data/generated/blur.json`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
