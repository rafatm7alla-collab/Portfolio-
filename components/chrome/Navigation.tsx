'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { profile, navigation } from '@/data/profile'
import { MobileMenu } from './MobileMenu'

/**
 * NAVIGATION
 *
 * Default mechanism is mix-blend-mode: difference with white type — it
 * renders black over white, white over black, and inverts itself across
 * any full-bleed image with no scroll listeners and no colour flashing.
 *
 * The honest caveat (DIRECTION.md §07): over busy mid-tone colour
 * photography, difference-blend produces odd hues. Sections can opt out
 * with data-nav="light" | "dark" and the nav switches to a fixed colour
 * while that section sits under it.
 */
export function Navigation() {
  const pathname = usePathname()
  const [mode, setMode] = useState<'blend' | 'light' | 'dark'>('blend')

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-nav]')
    if (sections.length === 0) {
      setMode('blend')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // The section currently crossing the nav band wins.
        const active = entries.find((e) => e.isIntersecting)
        if (!active) {
          setMode('blend')
          return
        }
        const declared = active.target.getAttribute('data-nav')
        setMode(declared === 'light' || declared === 'dark' ? declared : 'blend')
      },
      // A thin band at the very top of the viewport, level with the nav.
      { rootMargin: '0px 0px -100% 0px', threshold: 0 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [pathname])

  const colour =
    mode === 'blend'
      ? { color: '#ffffff', mixBlendMode: 'difference' as const }
      : mode === 'dark'
        ? { color: '#ffffff' }
        : { color: '#000000' }

  return (
    <>
      <header
        className="pointer-events-none fixed inset-x-0 top-0 z-50"
        style={colour}
      >
        <div className="page flex items-center justify-between py-[28px] md:py-[32px]">
          <Link
            href="/"
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
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`t-meta link ${active ? 'link-active' : ''}`}
                  style={{ letterSpacing: '0.18em' }}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile — the word, not an icon. Icons are UI; words are editorial. */}
          <div className="pointer-events-auto md:hidden">
            <MobileMenu />
          </div>
        </div>
      </header>

      {/* Skip link — keyboard users land here first. */}
      <a
        href="#main"
        className="t-meta sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-black focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
    </>
  )
}
