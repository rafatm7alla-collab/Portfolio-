'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { profile, navigation } from '@/data/profile'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitch } from './LanguageSwitch'
import { useLocale } from '@/components/i18n/LocaleProvider'
import { navLabel } from '@/components/i18n/navLabels'
import { localeHref, stripLocale } from '@/lib/i18n'
import { t } from '@/data/i18n'

export function Navigation() {
  const locale = useLocale()
  const pathname = stripLocale(usePathname() || '/')
  const headerRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        className="pointer-events-none fixed inset-x-0 top-0 z-50"
        style={{
          color: 'var(--color-ink)',
          backgroundColor: scrolled
            ? 'color-mix(in srgb, var(--color-paper) 85%, transparent)'
            : 'var(--color-paper)',
          transition: `background-color var(--dur-base) var(--ease-soft)`,
        }}
        data-scrolled={scrolled || undefined}
      >
        <div className="page flex items-center justify-between py-[28px] md:py-[32px]">
          <Link
            href={localeHref('/', locale)}
            lang="en"
            className="pointer-events-auto t-meta link"
            style={{ letterSpacing: '0.18em' }}
          >
            {profile.name}
          </Link>

          {/* Desktop */}
          <nav
            aria-label="Primary"
            className="pointer-events-auto hidden items-center gap-8 md:flex lg:gap-10"
          >
            {navigation.map((item) => {
              const active =
                item.href === '/work'
                  ? pathname.startsWith('/work')
                  : pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={localeHref(item.href, locale)}
                  aria-current={active ? 'page' : undefined}
                  className={`t-meta link ${active ? 'link-active' : ''}`}
                  style={{ letterSpacing: '0.18em' }}
                >
                  {navLabel(item.href, locale, item.label)}
                </Link>
              )
            })}
            <LanguageSwitch className="ms-2" />
            <ThemeToggle className="ms-2" />
          </nav>

          {/* Mobile */}
          <div className="pointer-events-auto flex items-center gap-4 md:hidden">
            <LanguageSwitch />
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </header>

      <a
        href="#main"
        className="t-meta sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-black focus:px-4 focus:py-3 focus:text-white"
      >
        {t(locale).nav.skip}
      </a>
    </>
  )
}
