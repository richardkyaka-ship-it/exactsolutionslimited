import { Metadata } from 'next'
import ProductsPageClient from './ProductsPageClient'

export const metadata: Metadata = {
  title: 'Industrial Catalog | Exact Solutions Limited',
  description: 'Technical specifications for industrial equipment, generators, shipping containers, and Building & Construction materials in East Africa.',
}

// ISR: Regenerate page every hour for fresh product data
export const revalidate = 3600

export default function ProductsPage() {
  return <ProductsPageClient />
}

