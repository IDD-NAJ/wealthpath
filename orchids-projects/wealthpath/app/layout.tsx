import type { Metadata, Viewport } from 'next'
import { Inter, Manrope } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const _inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const _manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'WealthPath — Find the Best Wealth-Building Platforms',
    template: '%s | WealthPath',
  },
  description:
    'Expert reviews and comparisons of the best investment platforms, trading apps, AI tools, and financial products. Updated weekly with unbiased affiliate program ratings.',
  keywords: ['affiliate programs', 'investment platforms', 'wealth building', 'financial reviews', 'trading apps'],
  authors: [{ name: 'WealthPath Editorial Team' }],
  creator: 'WealthPath',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wealthpath.io',
    siteName: 'WealthPath',
    title: 'WealthPath — Find the Best Wealth-Building Platforms',
    description:
      'Expert reviews and comparisons of the best investment platforms, trading apps, AI tools, and financial products.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WealthPath — Find the Best Wealth-Building Platforms',
    description:
      'Expert reviews and comparisons of the best investment platforms, trading apps, and financial products.',
    creator: '@wealthpath',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#0B1220',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${_inter.variable} ${_manrope.variable} bg-background`}>
        <body className="font-sans antialiased">{children}</body>
      </html>
    </ClerkProvider>
  )
}
