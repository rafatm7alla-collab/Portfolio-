import Link from 'next/link'
import { Page } from '@/components/primitives/Layout'
import { Meta } from '@/components/type/Type'

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col justify-center">
      <Page>
        <Meta as="p" secondary>
          (404)
        </Meta>
        <h1 className="t-display-xl mt-8 uppercase">
          Not
          <br />
          Found
        </h1>
        <div className="mt-[clamp(48px,8vh,120px)] flex gap-8">
          <Link href="/" className="t-meta link">
            Index
          </Link>
          <Link href="/work" className="t-meta link">
            Work
          </Link>
        </div>
      </Page>
    </section>
  )
}
