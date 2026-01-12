import { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'Exact Solutions Limited | Industrial Equipment Kenya',
  description: 'Premium industrial solutions provider in Kenya: generators, shipping containers, metal fabrication, and custom industrial equipment. Serving East Africa.',
  keywords: [
    'industrial equipment Kenya',
    'generators Nairobi',
    'shipping containers Kenya',
    'metal fabrication Nairobi',
    'industrial solutions Kenya',
    'power generators East Africa',
    'reefer containers Mombasa',
    'aluminum fabrication Kenya',
    'stainless steel work Kenya',
    'B2B industrial supplier'
  ].join(', '),
  openGraph: {
    title: 'Exact Solutions Limited | Industrial Equipment Kenya',
    description: 'Premium industrial solutions provider in Kenya',
    url: '/',
    siteName: 'Exact Solutions Limited',
    locale: 'en_KE',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Exact Solutions Limited - Industrial Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exact Solutions Limited | Industrial Equipment Kenya',
    description: 'Premium industrial solutions provider in Kenya',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  return <HomePageClient />
}
