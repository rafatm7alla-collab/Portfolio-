import { headers } from 'next/headers'
import { LOCALE_HEADER, type Locale } from './i18n'

/** The request's locale, as tagged by middleware.ts. Server components only. */
export async function getLocale(): Promise<Locale> {
  const h = await headers()
  return h.get(LOCALE_HEADER) === 'ar' ? 'ar' : 'en'
}
