import type { ManifestImage } from '@/lib/manifest'
import { BlockImage } from '@/components/blocks/BlockImage'

/**
 * Structured photo grid: full → 2-up → full → 2-up → full.
 * 7 images when complete; gracefully renders whatever is present.
 */
export function AlbumBlock({
  images,
  noRounding = false,
}: {
  images: ManifestImage[]
  noRounding?: boolean
}) {
  if (images.length === 0) return null

  const row = (imgs: ManifestImage[], cols: 1 | 2, delay: number) => (
    <div
      className={`mt-4 grid grid-cols-1 gap-4 md:mt-6 ${
        cols === 2 ? 'md:grid-cols-2' : ''
      } md:gap-6`}
    >
      {imgs.map((image, i) => (
        <BlockImage
          key={image.filename + i}
          image={image}
          sizes={cols === 2 ? '(max-width: 768px) 100vw, 50vw' : '100vw'}
          fit="natural"
          delay={delay + i * 100}
          noRounding={noRounding}
        />
      ))}
    </div>
  )

  const rows: ManifestImage[][] = []
  const cols: (1 | 2)[] = []
  const pattern: (1 | 2)[] = [1, 2, 1, 2, 1]
  let idx = 0
  for (const c of pattern) {
    if (idx >= images.length) break
    const count = c === 2 ? Math.min(2, images.length - idx) : 1
    rows.push(images.slice(idx, idx + count))
    cols.push(c)
    idx += count
  }

  return (
    <div className="bleed">
      {rows.map((imgs, i) => (
        <div key={i} className={i === 0 ? '' : undefined}>
          {i === 0 ? (
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {imgs.map((image, j) => (
                <BlockImage
                  key={image.filename + j}
                  image={image}
                  sizes="100vw"
                  fit="natural"
                  noRounding={noRounding}
                />
              ))}
            </div>
          ) : (
            row(imgs, cols[i], i * 100)
          )}
        </div>
      ))}
    </div>
  )
}
