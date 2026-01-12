import { Metadata } from 'next'
import ServicesPageClient from './ServicesPageClient'

export const metadata: Metadata = {
  title: 'Industrial Services | Equipment, Containers & Fabrication | Exact Solutions Limited',
  description: 'Comprehensive industrial services in Kenya: Power solutions with generators, shipping containers & reefers, custom metal fabrication & aluminum work.',
  keywords: [
    'industrial services Kenya',
    'generator installation Nairobi',
    'shipping container supplier Kenya',
    'metal fabrication services East Africa',
    'industrial equipment maintenance',
    'power solutions Kenya',
    'container modifications Nairobi',
    'aluminum fabrication Kenya',
    'stainless steel work',
    'industrial contractor Kenya'
  ].join(', '),
  openGraph: {
    title: 'Industrial Services | Exact Solutions Limited',
    description: 'Professional industrial services across Kenya',
    url: '/services',
    siteName: 'Exact Solutions Limited',
    locale: 'en_KE',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Exact Solutions Industrial Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industrial Services | Exact Solutions Limited',
    description: 'Professional industrial services across Kenya',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/services',
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

export default function ServicesPage() {
  return <ServicesPageClient />
}

