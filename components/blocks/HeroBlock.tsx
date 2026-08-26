import type { ManifestImage } from '@/lib/manifest'
import { BlockImage } from '@/components/blocks/BlockImage'
import { Page } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { directionProps } from '@/lib/rtl'

/**
 * Full-bleed opener at the image's own natural ratio — never cropped —
 * with the title/subtitle set over it, bottom-aligned. Stands in for the
 * page's own masthead — pair with `Manifest.noMasthead` so the two never
 * both render.
 */
export function HeroBlock({
  image,
  title,
  subtitle,
}: {
  image: ManifestImage
  title: string
  subtitle?: string
}) {
  return (
    <div className="bleed relative">
      <BlockImage
        image={image}
        sizes="100vw"
        fit="natural"
        priority
        noRounding
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
      <div className="absolute inset-x-0 bottom-0">
        <Page className="pb-[clamp(24px,5vw,56px)]">
          <Reveal>
            <h1 className="t-display-l text-white" {...directionProps(title)}>
              {title}
            </h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={80} className="mt-4">
              <p className="t-lede max-w-[60ch] text-white/80" {...directionProps(subtitle)}>
                {subtitle}
              </p>
            </Reveal>
          )}
        </Page>
      </div>
    </div>
  )
}
