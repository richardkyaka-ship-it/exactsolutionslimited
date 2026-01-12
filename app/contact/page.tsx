import type { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact Us | Industrial Equipment Inquiries | Exact Solutions Limited',
  description: 'Contact Exact Solutions Limited for industrial equipment inquiries, project consultations, and technical support in Kenya. WhatsApp, phone, email available.',
  keywords: [
    'contact industrial supplier Kenya',
    'generator inquiries Nairobi',
    'container quotes East Africa',
    'metal fabrication consultation',
    'technical support',
    'industrial equipment contact',
    'B2B inquiries Kenya',
    'project consultation Nairobi'
  ].join(', '),
  openGraph: {
    title: 'Contact Us | Exact Solutions Limited',
    description: 'Contact for industrial equipment and consultations',
    url: '/contact',
    siteName: 'Exact Solutions Limited',
    locale: 'en_KE',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Exact Solutions Limited',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Exact Solutions Limited',
    description: 'Contact for industrial equipment and consultations',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/contact',
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

export default function ContactPage() {
  return <ContactPageClient />
}