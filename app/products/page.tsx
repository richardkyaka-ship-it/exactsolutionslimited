import { Metadata } from 'next'
import ProductsPageClient from './ProductsPageClient'

export const metadata: Metadata = {
  title: 'Industrial Catalog | Exact Solutions Limited',
  description: 'Technical specifications for industrial equipment, generators, shipping containers, and metal fabrication materials in East Africa.',
}

export default function ProductsPage() {
  return <ProductsPageClient />
}

