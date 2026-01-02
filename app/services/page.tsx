import { Metadata } from 'next'
import ServicesPageClient from './ServicesPageClient'

export const metadata: Metadata = {
  title: 'Services | Exact Solutions Limited',
  description: 'Explore our technical industrial solutions including power systems, specialized shipping containers, and architectural Building & Construction.',
}

export default function ServicesPage() {
  return <ServicesPageClient />
}

