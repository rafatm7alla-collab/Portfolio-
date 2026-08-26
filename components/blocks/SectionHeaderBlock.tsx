import { Page } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { Meta } from '@/components/type/Type'
import { directionProps } from '@/lib/rtl'

/**
 * The signature divider. Bold uppercase title, grey subtitle beneath.
 *
 * "It must feel identical every time" — so it takes no layout options at all.
 * There is no variant prop, no alignment prop, no size prop. The only way it
 * can differ between two case studies is the words in it.
 */
export function SectionHeaderBlock({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <Page>
      <header>
        <Reveal>
          <h2 className="t-display-l uppercase" {...directionProps(title)}>
            {title}
          </h2>
        </Reveal>
        {subtitle && (
          <Reveal delay={80} className="mt-5">
            <Meta as="p" secondary {...directionProps(subtitle)}>
              {subtitle}
            </Meta>
          </Reveal>
        )}
      </header>
    </Page>
  )
}
