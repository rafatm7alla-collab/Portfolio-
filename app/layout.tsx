import type { Metadata, Viewport } from 'next'
import { profile } from '@/data/profile'
import { Navigation } from '@/components/chrome/Navigation'
import { Footer } from '@/components/chrome/Footer'
import '@/styles/motion-tokens.css'
import './globals.css'
import { SmoothScroll } from '@/components/SmoothScroll'
import { PageTransition } from '@/components/PageTransition'
import FloatingContact from '@/components/FloatingContact'

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.heroSupporting,
  openGraph: {
    type: 'website',
    siteName: profile.name,
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
  themeColor: '#ffffff',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
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
