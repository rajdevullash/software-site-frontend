import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexrosolution.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'NexroSolution - Empowering Business with High-Tech Solutions',
    template: '%s | NexroSolution',
  },
  description: 'Empowering Business with High-Tech Solutions. We deliver cutting-edge software solutions and strategic consulting services.',
  keywords: [
    'NexroSolution',
    'software development',
    'custom software',
    'web development',
    'cloud integration',
    'enterprise software',
    'technology consulting',
    'digital transformation',
  ],
  authors: [{ name: 'NexroSolution' }],
  creator: 'NexroSolution',
  publisher: 'NexroSolution',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
      { url: '/logos/nexrosolution.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/logos/nexrosolution.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'NexroSolution',
    title: 'NexroSolution - Empowering Business with High-Tech Solutions',
    description: 'Empowering Business with High-Tech Solutions. We deliver cutting-edge software solutions and strategic consulting services.',
    images: [
      {
        url: '/logos/nexrosolution.png',
        width: 1200,
        height: 630,
        alt: 'NexroSolution Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexroSolution - Empowering Business with High-Tech Solutions',
    description: 'Empowering Business with High-Tech Solutions. We deliver cutting-edge software solutions and strategic consulting services.',
    images: ['/logos/nexrosolution.png'],
    creator: '@nexrosolution',
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
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}

