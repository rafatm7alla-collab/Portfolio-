import type { Block, Manifest } from '@/types/blocks'
import { manifestImage, manifestVideo } from '@/lib/manifest'
import { SectionHeaderBlock } from '@/components/blocks/SectionHeaderBlock'
import { TextBlock } from '@/components/blocks/TextBlock'
import { FullBleedBlock } from '@/components/blocks/FullBleedBlock'
import { GridBlock } from '@/components/blocks/GridBlock'
import { NUpBlock } from '@/components/blocks/NUpBlock'
import { MosaicBlock } from '@/components/blocks/MosaicBlock'
import { VideoEmbedBlock } from '@/components/blocks/VideoEmbedBlock'
import { LocalVideoBlock } from '@/components/blocks/LocalVideoBlock'
import { ImageVideoPairBlock } from '@/components/blocks/ImageVideoPairBlock'
import { CreditsBlock } from '@/components/blocks/CreditsBlock'
import { AudioEmbedBlock } from '@/components/blocks/AudioEmbedBlock'
import { HeroBlock } from '@/components/blocks/HeroBlock'
import { MetaBarBlock } from '@/components/blocks/MetaBarBlock'
import { PullQuoteBlock } from '@/components/blocks/PullQuoteBlock'
import { PrinciplesBlock } from '@/components/blocks/PrinciplesBlock'
import { RouteBlock } from '@/components/blocks/RouteBlock'
import { AlbumBlock } from '@/components/blocks/AlbumBlock'
import { SideBySideBlock } from '@/components/blocks/SideBySideBlock'
import { DividerBlock } from '@/components/blocks/DividerBlock'

/**
 * Maps blocks[] to components, in order.
 *
 * ── Vertical rhythm lives here and nowhere else ──
 * No block sets its own outer margin. The gap between any two blocks is one
 * value, applied by this renderer. That is the only way "no block invents its
 * own spacing" survives contact with a seventh block type being added later.
 *
 * The single exception is deliberate and named: a sectionHeader is a divider,
 * so it gets more air above than below — it should feel attached to the
 * content it introduces, not floating between two things equally.
 */
export function Blocks({
  slug,
  blocks,
  noRounding,
  noBlockGaps,
}: {
  slug: string
  blocks: Block[]
  noRounding?: boolean
  noBlockGaps?: boolean
}) {
  const isMediaBlock = (b: Block | undefined): boolean => {
    if (!b) return false
    return ['fullBleed', 'video', 'imageVideoPair', 'grid', 'twoUp', 'threeUp', 'mosaic', 'videoEmbed'].includes(
      b.type,
    )
  }

  return (
    <div>
      {blocks.map((block, i) => {
        const previous = blocks[i - 1]
        const isFirst = i === 0

        // Spacing rules:
        // - Section headers get extra space above, minimal below
        // - `noGap` flag: explicit flush (e.g. runs of banners)
        const noGap = 'noGap' in block && block.noGap

        const bothMedia = isMediaBlock(block) && isMediaBlock(previous)

        const spacing = isFirst || noGap
          ? ''
          : noBlockGaps && bothMedia
            ? 'pt-1'
            : block.type === 'sectionHeader'
              ? 'pt-[var(--block-gap-lg)]'
              : previous?.type === 'sectionHeader'
                ? 'pt-[var(--block-gap-sm)]'
                : 'pt-[var(--block-gap)]'

        return (
          <section key={i} className={spacing}>
            {render(slug, block, i, noRounding)}
          </section>
        )
      })}
    </div>
  )
}

function render(slug: string, block: Block, index: number, noRounding?: boolean) {
  switch (block.type) {
    case 'sectionHeader':
      return <SectionHeaderBlock title={block.title} subtitle={block.subtitle} />

    case 'text':
      return (
        <TextBlock body={block.body} heading={block.heading} list={block.list} light={block.light} />
      )

    case 'fullBleed':
      return (
        <FullBleedBlock
          image={manifestImage(slug, block.image, block.caption)}
          caption={block.caption}
          size={block.size}
          widthPercent={block.widthPercent}
          // Only the very first block may load eagerly; everything else is
          // below the fold by definition.
          priority={index === 0}
          noRounding={noRounding}
        />
      )

    case 'grid':
      return (
        <GridBlock
          columns={block.columns}
          images={block.images.map((file) => manifestImage(slug, file))}
          noRounding={noRounding}
        />
      )

    case 'twoUp':
    case 'threeUp':
    case 'fourUp':
      return (
        <NUpBlock
          columns={block.type === 'fourUp' ? 4 : block.type === 'threeUp' ? 3 : 2}
          images={block.images.map((file) => manifestImage(slug, file))}
          size={block.size}
          widthPercent={block.widthPercent}
          noRounding={noRounding}
          captions={block.captions}
        />
      )

    case 'mosaic':
      return (
        <MosaicBlock
          layout={block.layout}
          images={block.images.map((file) => manifestImage(slug, file))}
          noRounding={noRounding}
        />
      )

    case 'videoEmbed':
      return (
        <VideoEmbedBlock
          provider={block.provider}
          id={block.id}
          title={block.title}
          // Convention over configuration: {id}-poster.jpg if it exists.
          poster={manifestImage(slug, `${block.id}-poster.jpg`)}
          size={block.size}
          widthPercent={block.widthPercent}
          noRounding={noRounding}
        />
      )

    case 'imageVideoPair':
      return (
        <ImageVideoPairBlock
          image={manifestImage(slug, block.image, block.caption)}
          caption={block.caption}
          provider={block.provider}
          id={block.id}
          title={block.title}
          poster={manifestImage(slug, `${block.id}-poster.jpg`)}
          size={block.size}
          widthPercent={block.widthPercent}
          noRounding={noRounding}
        />
      )

    case 'video': {
      const video = manifestVideo(slug, block.file)
      const poster = block.poster ? manifestImage(slug, block.poster) : undefined
      return (
        <LocalVideoBlock
          src={video.src}
          missing={video.missing}
          poster={poster && !poster.missing ? poster.src : undefined}
          title={block.title}
          aspect={block.aspect}
          size={block.size}
          widthPercent={block.widthPercent}
          noRounding={noRounding}
        />
      )
    }

    case 'credits':
      return <CreditsBlock items={block.items} />

    case 'audioEmbed':
      return (
        <AudioEmbedBlock soundcloudUrl={block.soundcloudUrl} title={block.title} artist={block.artist} />
      )

    case 'hero':
      return (
        <HeroBlock
          image={manifestImage(slug, block.image, block.title)}
          title={block.title}
          subtitle={block.subtitle}
        />
      )

    case 'metaBar':
      return <MetaBarBlock items={block.items} />

    case 'pullQuote':
      return <PullQuoteBlock text={block.text} />

    case 'principles':
      return <PrinciplesBlock items={block.items} />

    case 'route':
      return (
        <RouteBlock
          number={block.number}
          name={block.name}
          subheadline={block.subheadline}
          descriptor={block.descriptor}
          intro={block.intro}
          body={block.body}
          leadImage={manifestImage(slug, block.leadImage)}
          pairImages={[
            manifestImage(slug, block.pairImages[0]),
            manifestImage(slug, block.pairImages[1]),
          ]}
          noRounding={noRounding}
        />
      )

    case 'album':
      return (
        <AlbumBlock
          images={block.images.map((file) => manifestImage(slug, file))}
          noRounding={noRounding}
        />
      )

    case 'sideBySide':
      return (
        <SideBySideBlock
          image={manifestImage(slug, block.image)}
          heading={block.heading}
          body={block.body}
          noRounding={noRounding}
        />
      )

    case 'divider':
      return <DividerBlock label={block.label} text={block.text} />

    default:
      // Unknown type — the loader has already warned. Render nothing rather
      // than crashing a whole case study over one bad block.
      return null
  }
}
