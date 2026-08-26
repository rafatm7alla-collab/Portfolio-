import { openSync, readSync, closeSync } from 'node:fs'

/**
 * Intrinsic dimensions, read straight from the file header.
 *
 * The spec requires explicit width/height on every image to prevent layout
 * shift, and full-bleed images must keep their natural ratio — so the system
 * has to know the real size rather than be told it in the manifest. Asking an
 * author to type dimensions next to every filename is exactly the kind of
 * bookkeeping that goes stale.
 *
 * Header parsing rather than a dependency: `image-size` would be ~50kB of
 * node_modules to read a dozen bytes we can read ourselves. Only the first
 * 64kB of each file is touched.
 *
 * Server-only. Results are memoised per path — a manifest referencing the same
 * file twice should not open it twice.
 */

export type Dimensions = { width: number; height: number }

const cache = new Map<string, Dimensions | null>()

const DEFAULT: Dimensions = { width: 1600, height: 1067 }

export function imageSize(absPath: string): Dimensions {
  if (cache.has(absPath)) return cache.get(absPath) ?? DEFAULT

  let result: Dimensions | null = null
  try {
    const fd = openSync(absPath, 'r')
    const buf = Buffer.alloc(65536)
    const bytes = readSync(fd, buf, 0, 65536, 0)
    closeSync(fd)
    result = parse(buf.subarray(0, bytes))
  } catch {
    result = null
  }

  cache.set(absPath, result)
  return result ?? DEFAULT
}

function parse(b: Buffer): Dimensions | null {
  // ── PNG: IHDR is always the first chunk, at a fixed offset
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) {
    return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) }
  }

  // ── GIF: logical screen descriptor, little-endian
  if (b.length > 10 && b.subarray(0, 3).toString('latin1') === 'GIF') {
    return { width: b.readUInt16LE(6), height: b.readUInt16LE(8) }
  }

  // ── WebP: three sub-formats under the same RIFF container
  if (
    b.length > 30 &&
    b.subarray(0, 4).toString('latin1') === 'RIFF' &&
    b.subarray(8, 12).toString('latin1') === 'WEBP'
  ) {
    const kind = b.subarray(12, 16).toString('latin1')
    if (kind === 'VP8 ') {
      return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff }
    }
    if (kind === 'VP8L') {
      const bits = b.readUInt32LE(21)
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 }
    }
    if (kind === 'VP8X') {
      const w = 1 + (b[24] | (b[25] << 8) | (b[26] << 16))
      const h = 1 + (b[27] | (b[28] << 8) | (b[29] << 16))
      return { width: w, height: h }
    }
  }

  // ── JPEG: walk the marker chain to the first frame header.
  // Dimensions live in SOFn, and n varies (baseline, progressive, lossless),
  // so the whole SOF range is accepted except DHT/JPG/DAC which share it.
  if (b.length > 4 && b[0] === 0xff && b[1] === 0xd8) {
    let i = 2
    while (i < b.length - 9) {
      if (b[i] !== 0xff) {
        i += 1
        continue
      }
      const marker = b[i + 1]
      const isSOF =
        marker >= 0xc0 &&
        marker <= 0xcf &&
        marker !== 0xc4 &&
        marker !== 0xc8 &&
        marker !== 0xcc
      if (isSOF) {
        return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) }
      }
      // Standalone markers carry no length payload.
      if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
        i += 2
        continue
      }
      i += 2 + b.readUInt16BE(i + 2)
    }
  }

  return null
}
