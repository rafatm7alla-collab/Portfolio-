import type { ManifestImage } from '@/lib/manifest'
import { BlockImage } from '@/components/blocks/BlockImage'
import { Page } from '@/components/primitives/Layout'
import { Micro } from '@/components/type/Type'
import { directionProps } from '@/lib/rtl'

/**
 * Edge to edge, natural ratio — or, when `size` is 'contained', shrunk to
 * `widthPercent` of the viewport (default 75) and centred instead of
 * bleeding. Same frame either way: fit="natural" so nothing is ever cropped.
 *
 * fit="natural" is the whole point: the frame takes the image's own aspect
 * from its header, so a 3:1 key visual and a 4:5 portrait each arrive
 * uncropped. Forcing a fixed height here is the single easiest way to
 * decapitate someone's artwork.
 *
 * The caption sits back inside the page margin — the image bleeds, the type
 * never does.
 */
export function FullBleedBlock({
  image,
  caption,
  priority = false,
  size = 'full',
  widthPercent = 75,
  noRounding = false,
}: {
  image: ManifestImage
  caption?: string
  priority?: boolean
  size?: 'full' | 'contained'
  widthPercent?: number
  noRounding?: boolean
}) {
  const vw = `${widthPercent}vw`

  return (
    <figure>
      <div
        className={size === 'contained' ? 'mx-auto' : 'bleed'}
        style={size === 'contained' ? { width: vw, maxWidth: vw } : undefined}
      >
        <BlockImage
          image={image}
          sizes={size === 'contained' ? vw : '100vw'}
          fit="natural"
          priority={priority}
          noRounding={noRounding}
        />
      </div>
      {caption && (
        <Page>
          <Micro secondary as="figcaption" className="mt-4" {...directionProps(caption)}>
            {caption}
          </Micro>
        </Page>
      )}
    </figure>
  )
}
