import type { Metadata, Viewport } from 'next'
import { profile } from '@/data/profile'
import { Navigation } from '@/components/chrome/Navigation'
import { Footer } from '@/components/chrome/Footer'
import './globals.css'

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
      <body>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
