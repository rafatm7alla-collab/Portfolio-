import type { ManifestImage } from '@/lib/manifest'
import { BlockImage } from '@/components/blocks/BlockImage'
import { Page } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { Meta } from '@/components/type/Type'
import { directionProps } from '@/lib/rtl'

/**
 * One named stage of a route/system: number + name + descriptor + body,
 * a lead 16:9 image, then a 4:5 pair beside it. Rendered by one shared
 * component so every call site is structurally identical.
 *
 * The lead route (The Bolt) carries an optional subheadline and intro
 * paragraph — that is the only permitted difference.
 */
export function RouteBlock({
  number,
  name,
  subheadline,
  descriptor,
  intro,
  body,
  leadImage,
  pairImages,
  noRounding = false,
}: {
  number: string
  name: string
  subheadline?: string
  descriptor: string
  intro?: string
  body: string
  leadImage: ManifestImage
  pairImages: [ManifestImage, ManifestImage]
  noRounding?: boolean
}) {
  return (
    <div>
      <Page>
        <Reveal>
          <Meta secondary as="span">
            {number}
          </Meta>
          <h3 className="t-display-m mt-3 uppercase" {...directionProps(name)}>
            {name}
          </h3>
          {subheadline && (
            <p className="t-lede mt-4 max-w-[60ch]" {...directionProps(subheadline)}>
              {subheadline}
            </p>
          )}
          <p className="t-body mt-4 max-w-[60ch] ink-secondary" {...directionProps(descriptor)}>
            {descriptor}
          </p>
          {intro && (
            <p className="t-body mt-6 max-w-[65ch]" {...directionProps(intro)}>
              {intro}
            </p>
          )}
          <p className="t-body mt-6 max-w-[65ch]" {...directionProps(body)}>
            {body}
          </p>
        </Reveal>
      </Page>

      <div className="bleed mt-[var(--block-gap-sm)]">
        <BlockImage
          image={leadImage}
          sizes="100vw"
          fit="natural"
          noRounding={noRounding}
        />
      </div>

      <div className="bleed mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {pairImages.map((image, i) => (
          <BlockImage
            key={image.filename + i}
            image={image}
            sizes="(max-width: 768px) 100vw, 50vw"
            fit="natural"
            delay={i * 100}
            noRounding={noRounding}
          />
        ))}
      </div>
    </div>
  )
}
