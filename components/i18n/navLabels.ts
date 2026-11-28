import type { Locale } from '@/lib/i18n'
import { t } from '@/data/i18n'

/** Navigation labels by route, in the given language. */
export function navLabel(href: string, locale: Locale, fallback: string) {
  const n = t(locale).nav
  const map: Record<string, string> = {
    '/work': n.projects,
    '/framework': n.framework,
    '/about': n.about,
    '/contact': n.contact,
  }
  return map[href] ?? fallback
}
