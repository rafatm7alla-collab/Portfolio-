import type { Metadata, Viewport } from 'next'
import { Tajawal } from 'next/font/google'
import { profile } from '@/data/profile'

/**
 * Tajawal — used for every Arabic glyph on the site. Loaded with the
 * `arabic` subset only, so the @font-face unicode-range covers just
 * Arabic codepoints. Latin text keeps rendering in the site's grotesque
 * because unicode-range prevents Tajawal from claiming Latin glyphs.
 */
const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-arabic',
  display: 'swap',
})
import { Navigation } from '@/components/chrome/Navigation'
import { Footer } from '@/components/chrome/Footer'
import '@/styles/motion-tokens.css'
import './globals.css'
import { SmoothScroll } from '@/components/SmoothScroll'
import { PageTransition } from '@/components/PageTransition'
import FloatingContact from '@/components/FloatingContact'

/** The title used for the browser tab and link previews (WhatsApp etc.). */
const SHARE_TITLE = `${profile.name} — Creative Director`
const SHARE_DESCRIPTION =
  'Rafat Mhalla is a Creative Director working across branding, visual systems, campaigns and digital experiences.'

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: SHARE_TITLE,
    template: `%s — ${profile.name}`,
  },
  description: SHARE_DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: profile.name,
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    locale: 'en_GB',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  icons: {
    icon: [
      {
        url: '/favicon-dark.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon-light.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/favicon-dark.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

/**
 * Runs BEFORE first paint so the theme attribute is already on <html> when
 * the page renders. Prevents a white flash when a dark-theme visitor reloads.
 */
const themeBootScript = `
  try {
    var saved = localStorage.getItem('theme-pref');
    var theme = (saved === 'light' || saved === 'dark') ? saved : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={tajawal.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <noscript>
          <style>{`.reveal, .wbd-stagger { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body>
        <SmoothScroll>
          <Navigation />
          <PageTransition>
            <main id="main">{children}</main>
          </PageTransition>
          <Footer />
          <FloatingContact />
        </SmoothScroll>
      </body>
    </html>
  )
}
