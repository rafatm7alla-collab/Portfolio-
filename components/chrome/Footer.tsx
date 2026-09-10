import Link from 'next/link'
import { profile, navigation } from '@/data/profile'
import { Page, Rule } from '@/components/primitives/Layout'
import { Micro } from '@/components/type/Type'
import { FooterReveal } from './FooterReveal'

export function Footer() {
  return (
    <footer className="pb-[32px] pt-[64px]">
      <Page>
        <Rule />
        <FooterReveal>
          <div className="flex flex-col gap-6 pt-5 md:flex-row md:items-baseline md:justify-between md:gap-10">
            <div data-footer-item>
              <Micro as="p">{profile.name}</Micro>
              <Micro as="p" secondary className="mt-1">
                {profile.title}
              </Micro>
            </div>

            <nav data-footer-item aria-label="Footer" className="flex gap-6">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="t-micro link">
                  {item.label}
                </Link>
              ))}
            </nav>

            <ul data-footer-item className="flex gap-6">
              {profile.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="t-micro link"
                    aria-label={s.label}
                  >
                    {s.short}
                  </a>
                </li>
              ))}
            </ul>

            <Micro data-footer-item as="p" secondary>
              © {new Date().getFullYear()}
            </Micro>
          </div>
        </FooterReveal>
      </Page>
    </footer>
  )
}
