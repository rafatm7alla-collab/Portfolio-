import type { ManifestImage } from '@/lib/manifest'
import type { VideoProvider } from '@/types/blocks'
import { VideoFacade } from '@/components/blocks/VideoFacade'
import { MediaReveal } from '@/components/media/MediaReveal'
import { Page } from '@/components/primitives/Layout'
import { Micro } from '@/components/type/Type'
import { directionProps } from '@/lib/rtl'

/**
 * Video block — full-bleed, exactly like fullBleed images.
 *
 * It used to sit in a 1100px column while every image beside it ran edge to
 * edge, so a film read as a smaller, lesser thing than a photograph. Same
 * width, same reveal, same caption treatment: a film is media, not an
 * embed sitting in the page.
 *
 * The player loads on approach rather than on page load — see VideoFacade.
 */
export function VideoEmbedBlock({
  provider,
  id,
  title,
  poster,
  size = 'full',
  widthPercent = 75,
  noRounding = false,
}: {
  provider: VideoProvider
  id: string
  title: string
  poster: ManifestImage | null
  size?: 'full' | 'contained'
  widthPercent?: number
  noRounding?: boolean
}) {
  // Manifest still carries REPLACE_* — hold the frame and say so rather
  // than pointing a player at an id that does not exist.
  const unsupplied = /^REPLACE_/i.test(id)
  const vw = `${widthPercent}vw`

  return (
    <figure>
      <div
        className={size === 'contained' ? 'mx-auto' : 'bleed'}
        style={size === 'contained' ? { width: vw, maxWidth: vw } : undefined}
      >
        {/* Identical treatment to images, so a film does not snap in
            beside media that settles. */}
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

      <Page>
        <Micro secondary as="figcaption" className="mt-4" {...directionProps(title)}>
          {title}
        </Micro>
      </Page>
    </figure>
  )
}
