import { Metadata } from 'next'
import ProductsPageClient from './ProductsPageClient'

export const metadata: Metadata = {
  title: 'Industrial Equipment Catalog | Generators, Containers & Materials | Exact Solutions Limited',
  description: 'Browse our industrial equipment catalog: generators, shipping containers, metal materials, and fabrication equipment available in Kenya. Specs and pricing.',
  keywords: [
    'industrial equipment catalog Kenya',
    'generator prices Nairobi',
    'container specifications',
    'metal materials East Africa',
    'equipment catalog',
    'industrial generators Kenya',
    'shipping containers for sale',
    'metal fabrication materials'
  ].join(', '),
  openGraph: {
    title: 'Industrial Equipment Catalog | Exact Solutions Limited',
    description: 'Browse industrial equipment available in Kenya',
    url: '/products',
    siteName: 'Exact Solutions Limited',
    locale: 'en_KE',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Exact Solutions Product Catalog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industrial Equipment Catalog | Exact Solutions Limited',
    description: 'Browse industrial equipment available in Kenya',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/products',
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

// ISR: Regenerate page every hour for fresh product data
export const revalidate = 3600

export default function ProductsPage() {
  return <ProductsPageClient />
}

