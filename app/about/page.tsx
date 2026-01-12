import { Metadata } from 'next'
import AboutPageClient from './AboutPageClient'

export const metadata: Metadata = {
  title: 'About Us | Industrial Engineering Experts | Exact Solutions Limited',
  description: 'Learn about Exact Solutions Limited: Industrial engineering experts in Kenya with 10+ years experience in power, containers, and fabrication.',
  keywords: [
    'about Exact Solutions',
    'company history Kenya',
    'industrial engineering team Nairobi',
    'business expertise East Africa',
    'industrial solutions provider',
    'engineering company Kenya',
    'industrial equipment supplier',
    'B2B solutions East Africa'
  ].join(', '),
  openGraph: {
    title: 'About Us | Exact Solutions Limited',
    description: 'Industrial engineering experts in Kenya with 10+ years experience',
    url: '/about',
    siteName: 'Exact Solutions Limited',
    locale: 'en_KE',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About Exact Solutions Limited',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Exact Solutions Limited',
    description: 'Industrial engineering experts in Kenya',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/about',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}

