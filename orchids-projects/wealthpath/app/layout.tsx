import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'

import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'WealthPath - Your Guide to Building Income',
  description: 'Discover proven strategies for generating income through freelancing, investing, online business, and more. Expert articles and resources to grow your wealth.',
}

export const viewport: Viewport = {
  themeColor: '#1a1714',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_inter.variable} ${_playfair.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
