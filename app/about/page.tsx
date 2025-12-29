import { Metadata } from 'next'
import AboutPageClient from './AboutPageClient'

export const metadata: Metadata = {
  title: 'About | Exact Solutions Limited',
  description: 'Industrial engineering experts since 2015. Explore our technical dossier, engineering timeline, and regional capabilities across East Africa.',
}

export default function AboutPage() {
  return <AboutPageClient />
}

