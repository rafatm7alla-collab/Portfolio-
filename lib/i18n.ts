/**
 * Locales. English lives at the root (/contact), Arabic under /ar (/ar/contact).
 *
 * The /ar prefix is handled by middleware.ts: it rewrites /ar/... to the same
 * route and tags the request with x-locale, so every page exists once and
 * reads its language from the request instead of being duplicated per locale.
 */

export type Locale = 'en' | 'ar'

export const LOCALE_HEADER = 'x-locale'

export function isArabicPath(pathname: string) {
  return pathname === '/ar' || pathname.startsWith('/ar/')
}

/** /contact → /ar/contact in Arabic; unchanged in English. */
export function localeHref(href: string, locale: Locale) {
  if (locale !== 'ar' || !href.startsWith('/') || isArabicPath(href)) return href
  return href === '/' ? '/ar' : `/ar${href}`
}

/** /ar/contact → /contact. */
export function stripLocale(pathname: string) {
  if (!isArabicPath(pathname)) return pathname
  return pathname.slice(3) || '/'
}

export function dirOf(locale: Locale) {
  return locale === 'ar' ? 'rtl' : 'ltr'
}
