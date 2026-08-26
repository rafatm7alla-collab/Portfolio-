import type { ManifestImage } from '@/lib/manifest'
import type { VideoProvider } from '@/types/blocks'
import { BlockImage } from '@/components/blocks/BlockImage'
import { VideoFacade } from '@/components/blocks/VideoFacade'
import { MediaReveal } from '@/components/media/MediaReveal'
import { Page } from '@/components/primitives/Layout'
import { Micro } from '@/components/type/Type'
import { directionProps } from '@/lib/rtl'

/**
 * A portrait image and its own video, left and right, one pair centred as
 * a single unit — for a storyteller shot beside their documentary, where
 * the two read as one beat rather than two blocks stacked in sequence.
 *
 * Each side keeps its own natural shape (the image at its own ratio, the
 * video at 16:9); top-aligned rather than forced to match heights, same as
 * NUpBlock. Stacks to one column below `md`.
 */
export function ImageVideoPairBlock({
  image,
  caption,
  provider,
  id,
  title,
  poster,
  size = 'full',
  widthPercent = 75,
  noRounding = false,
}: {
  image: ManifestImage
  caption?: string
  provider: VideoProvider
  id: string
  title: string
  poster: ManifestImage | null
  size?: 'full' | 'contained'
  widthPercent?: number
  noRounding?: boolean
}) {
  const unsupplied = /^REPLACE_/i.test(id)
  const vw = `${widthPercent}vw`

  return (
    <figure>
      <div
        className={size === 'contained' ? 'mx-auto' : 'bleed'}
        style={size === 'contained' ? { width: vw, maxWidth: vw } : undefined}
      >
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-6">
          <BlockImage
            image={image}
            sizes={size === 'contained' ? `(max-width: 768px) 100vw, ${widthPercent / 2}vw` : '(max-width: 768px) 100vw, 50vw'}
            fit="natural"
            noRounding={noRounding}
          />

          <MediaReveal className={noRounding ? '' : 'rounded-2xl'} style={{ aspectRatio: '16 / 9' }}>
            {unsupplied ? (
              <div className="flex h-full w-full items-center justify-center bg-[#0a0a0a]">
                <div className="px-6 text-center">
                  <Micro as="p" className="text-white/60">
                    {provider} id not supplied
                  </Micro>
                  <Micro as="p" className="mt-2 text-white" {...directionProps(title)}>
                    {title}
                  </Micro>
                </div>
              </div>
            ) : (
              <VideoFacade
                provider={provider}
                id={id}
                title={title}
                poster={poster?.missing === false ? { src: poster.src } : null}
              />
            )}
          </MediaReveal>
        </div>
      </div>

      {(caption || title) && (
        <Page>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <Micro secondary as="figcaption" {...directionProps(caption ?? '')}>
              {caption}
            </Micro>
            <Micro secondary as="figcaption" {...directionProps(title)}>
              {title}
            </Micro>
          </div>
        </Page>
      )}
    </figure>
  )
}
