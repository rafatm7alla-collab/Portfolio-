'use client'

import { usePathname } from 'next/navigation'
import { useLocale } from '@/components/i18n/LocaleProvider'
import { localeHref, stripLocale } from '@/lib/i18n'
import { t } from '@/data/i18n'

/**
 * EN ↔ العربية. A plain <a>, not <Link>: switching language reloads the page
 * so <html lang/dir> and every server-rendered string come back in the new
 * language together.
 */
export function LanguageSwitch({ className = '' }: { className?: string }) {
  const locale = useLocale()
  const path = stripLocale(usePathname() || '/')
  const target = locale === 'ar' ? 'en' : 'ar'
  const href = localeHref(path, target)
  const d = t(locale).nav

  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={d.switchLabel}
      className={`t-meta link ${className}`}
      style={{ letterSpacing: target === 'en' ? '0.18em' : 0 }}
    >
      {d.switchTo}
    </a>
  )
}
