import { Page, Rule } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { Meta } from '@/components/type/Type'
import { directionProps } from '@/lib/rtl'

/**
 * Two-column label/value list. The last thing on a case study, so it is set
 * quietly: 11px labels against 15px values, one hairline above.
 *
 * A description list rather than a table — these are name/value pairs, not
 * tabular data, and dl is what a screen reader expects to hear.
 */
export function CreditsBlock({
  items,
}: {
  items: { label: string; value: string }[]
}) {
  return (
    <Page>
      <Rule />
      <Reveal>
        <dl className="grid-page gap-y-8 pt-8">
          {items.map((item) => (
            <div
              key={item.label + item.value}
              className="col-span-4 md:col-span-4 lg:col-span-3"
            >
              <dt>
                <Meta secondary as="span">
                  {item.label}
                </Meta>
              </dt>
              <dd
                className="mt-2 text-[15px] leading-[1.5]"
                {...directionProps(item.value)}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Page>
  )
}
