/**
 * useProducts Hook with SWR Caching
 * 
 * Provides cached, optimized product fetching with automatic revalidation
 */

import useSWR from 'swr'
import { Product } from '@/types/products'

interface UseProductsOptions {
  category?: string
  featured?: boolean
  status?: 'Active' | 'Draft' | 'Archived'
  page?: number
  pageSize?: number
}

interface ProductsResponse {
  products: Product[]
  total: number
  hasMore: boolean
}

const fetcher = async (url: string): Promise<ProductsResponse> => {
  const res = await fetch(url)
  
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  
  const products: Product[] = await res.json()
  
  return {
    products: Array.isArray(products) ? products : [],
    total: products.length,
    hasMore: false, // Will be updated when pagination is implemented
  }
}

export function useProducts(options: UseProductsOptions = {}) {
  const { category, featured, status = 'Active', page = 1, pageSize = 12 } = options
  
  // Build query string
  const params = new URLSearchParams()
  if (category) params.append('category', category)
  if (featured) params.append('featured', 'true')
  if (status) params.append('status', status)
  
  const key = `/api/admin/products?${params.toString()}`
  
  const { data, error, isLoading, mutate } = useSWR<ProductsResponse>(
    key,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1 minute - prevent duplicate requests
      revalidateIfStale: false, // Don't revalidate on mount if stale - faster navigation
      keepPreviousData: true,
      // Don't block navigation - show cached data immediately
      fallbackData: undefined,
    }
  )
  
  return {
    products: data?.products || [],
    total: data?.total || 0,
    hasMore: data?.hasMore || false,
    isLoading,
    isError: error,
    mutate, // For manual revalidation
  }
}

