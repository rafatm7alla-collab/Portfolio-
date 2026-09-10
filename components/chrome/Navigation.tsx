'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { profile, navigation } from '@/data/profile'
import { MobileMenu } from './MobileMenu'

export function Navigation() {
  const pathname = usePathname()
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
          color: '#000',
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.85)' : '#fff',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: `background-color var(--dur-base) var(--ease-soft), backdrop-filter var(--dur-base) var(--ease-soft)`,
        }}
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

          {/* Mobile */}
          <div className="pointer-events-auto md:hidden">
            <MobileMenu />
          </div>
        </div>
      </header>

      <a
        href="#main"
        className="t-meta sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-black focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
    </>
  )
}
