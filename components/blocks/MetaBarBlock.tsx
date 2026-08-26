import { Page, Rule } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { Meta } from '@/components/type/Type'
import { directionProps } from '@/lib/rtl'

/**
 * One horizontal row of label/value pairs — Client, Sector, Year, Role,
 * Deliverables and the like. Same data shape as `credits`, read left to
 * right instead of stacked, for the top of a page instead of the bottom.
 */
export function MetaBarBlock({
  items,
}: {
  items: { label: string; value: string }[]
}) {
  return (
    <Page>
      <Rule />
      <Reveal>
        <dl className="flex flex-wrap gap-x-[clamp(24px,5vw,64px)] gap-y-8 pt-8">
          {items.map((item) => (
            <div key={item.label + item.value}>
              <dt>
                <Meta secondary as="span">
                  {item.label}
                </Meta>
              </dt>
              <dd className="mt-2 text-[15px] leading-[1.5]" {...directionProps(item.value)}>
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Page>
  )
}
