'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ProductForm from '@/components/admin/ProductForm'
import { Product } from '@/types/products'

export default function EditProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products?id=${params.id}`)
        if (res.ok) {
          const data: Product = await res.json()
          if (data) {
            console.log('[EditProductPage] Fetched product:', {
              id: data.id,
              name: data.name,
              imagesCount: data.images?.length || 0,
              images: data.images,
            });
            setProduct(data)
          } else {
            console.error('Product not found - API returned null')
          }
        } else if (res.status === 404) {
          console.error('Product not found - 404 from API')
        } else {
          console.error('Error fetching product:', res.status, res.statusText)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }
    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <p className="text-xs text-gray-600 uppercase tracking-[0.2em]">Loading product data...</p>
    </div>
  )

  if (!product) return (
    <div className="text-center py-20">
      <h2 className="text-xl font-light text-white uppercase tracking-widest mb-4">Product Not Found</h2>
      <p className="text-sm text-gray-500 mb-8 uppercase tracking-widest">The unit ID "{params.id}" does not exist in the database.</p>
    </div>
  )

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-light text-white uppercase tracking-tight mb-2">
          Update <span className="text-primary">Equipment</span>
        </h1>
        <p className="text-sm text-gray-500 uppercase tracking-widest">Modify technical data for unit {product.code}</p>
      </div>

      <ProductForm initialData={product} />
    </div>
  )
}

