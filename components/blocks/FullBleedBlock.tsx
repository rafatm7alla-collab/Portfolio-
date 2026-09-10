import type { ManifestImage } from '@/lib/manifest'
import { BlockImage } from '@/components/blocks/BlockImage'
import { ParallaxImage } from '@/components/blocks/ParallaxImage'
import { Page } from '@/components/primitives/Layout'
import { Micro } from '@/components/type/Type'
import { directionProps } from '@/lib/rtl'

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
  const useParallax = size === 'full' && !priority

  const imageElement = (
    <BlockImage
      image={image}
      sizes={size === 'contained' ? vw : '100vw'}
      fit="natural"
      priority={priority}
      noRounding={noRounding}
    />
  )

  return (
    <figure>
      <div
        className={size === 'contained' ? 'mx-auto' : 'bleed'}
        style={size === 'contained' ? { width: vw, maxWidth: vw } : undefined}
      >
        {useParallax ? (
          <ParallaxImage>
            {imageElement}
          </ParallaxImage>
        ) : (
          imageElement
        )}
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
