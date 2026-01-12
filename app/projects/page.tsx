import { Metadata } from 'next'
import ProjectsPageClient from './ProjectsPageClient'

export const metadata: Metadata = {
  title: 'Industrial Projects | Completed Work Portfolio | Exact Solutions Limited',
  description: 'View our completed industrial projects: power installations, container solutions, metal fabrication work across Kenya and East Africa. Case studies included.',
  keywords: [
    'industrial projects Kenya',
    'completed work Nairobi',
    'case studies East Africa',
    'project portfolio',
    'industrial installations',
    'power project Kenya',
    'container solutions portfolio',
    'fabrication projects Nairobi'
  ].join(', '),
  openGraph: {
    title: 'Industrial Projects | Exact Solutions Limited',
    description: 'Completed industrial projects across Kenya and East Africa',
    url: '/projects',
    siteName: 'Exact Solutions Limited',
    locale: 'en_KE',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Exact Solutions Projects Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industrial Projects | Exact Solutions Limited',
    description: 'Completed industrial projects across Kenya',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/projects',
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

export default function ProjectsPage() {
  return <ProjectsPageClient />
}

