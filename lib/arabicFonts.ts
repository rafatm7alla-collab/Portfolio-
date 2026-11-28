import { IBM_Plex_Sans_Arabic } from 'next/font/google'

/**
 * The Arabic site typeface (/ar pages): IBM Plex Sans Arabic, chosen
 * 2026-11-28 — corporate, calm, sits well next to Helvetica.
 *
 * Arabic subset only, so its unicode-range covers Arabic codepoints and Latin
 * text keeps rendering in Helvetica. Exposed as --font-arabic-ui and used by
 * html[lang='ar'] in globals.css. To swap in a custom font later, replace
 * this with next/font/local and keep the same variable name.
 */
const plex = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-arabic-ui',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
})

export const arabicFontClasses = plex.variable
