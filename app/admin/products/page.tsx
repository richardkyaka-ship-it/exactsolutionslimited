'use client'

import React, { useEffect, useState, useMemo, useCallback } from 'react'
import Image from 'next/image'
import { Plus, Search, Edit2, Trash2, ExternalLink, Filter } from 'lucide-react'
import { Product } from '@/types/products'
import DeleteConfirmationModal from '@/components/admin/DeleteConfirmationModal'
import { useAdmin } from '@/components/admin/AdminProvider'
import FastLink from '@/components/ui/FastLink'
import { getOptimizedAirtableImage } from '@/utils/image-optimizer'

export default function ProductsListPage() {
  const { setIsLoading, showToast } = useAdmin()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  // Custom Delete Modal State
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    productId: string;
    productName: string;
  }>({
    isOpen: false,
    productId: '',
    productName: '',
  })
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/products')
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      showToast('Connection Refused: Sync Failed', 'error')
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
      setIsLoading(false)
    }
  }, [setIsLoading, showToast])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const confirmDelete = async () => {
    setIsDeleting(true)
    setIsLoading(true)
    try {
      const res = await fetch(`/api/admin/products?id=${deleteModal.productId}`, { method: 'DELETE' })
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== deleteModal.productId))
        setDeleteModal({ ...deleteModal, isOpen: false })
        showToast('Asset Purged from Registry', 'success')
      }
    } catch (error) {
      showToast('Deletions Restricted', 'error')
      console.error('Error deleting product:', error)
    } finally {
      setIsDeleting(false)
      setIsLoading(false)
    }
  }

  const filteredProducts = useMemo(() => {
    const s = search.toLowerCase()
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(s) ||
        p.code.toLowerCase().includes(s)
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [products, search, categoryFilter])

  return (
    <div className="space-y-8 pb-12">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light text-white tracking-tight uppercase">Product Inventory</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Manage industrial assets and technical data</p>
        </div>
        <FastLink
          href="/admin/products/new"
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 text-xs uppercase tracking-widest transition-all duration-300 w-fit"
        >
          <Plus className="w-4 h-4" />
          Add New Asset
        </FastLink>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
          <input
            type="text"
            placeholder="Search by name or technical code..."
            className="w-full bg-dark-light border border-gray-900 pl-12 pr-4 py-4 text-xs text-white uppercase tracking-widest focus:outline-none focus:border-primary/50 transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="md:col-span-4 relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
          <select
            className="w-full bg-dark-light border border-gray-900 pl-12 pr-4 py-4 text-xs text-white uppercase tracking-widest focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="generators">Generators & Power</option>
            <option value="containers">Container Solutions</option>
            <option value="metal">Building & Construction</option>
          </select>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-dark-light border border-gray-900 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-900 text-[10px] uppercase tracking-[0.2em] text-gray-500 bg-black/50">
              <th className="px-6 py-5 font-medium">Technical ID</th>
              <th className="px-6 py-5 font-medium">Asset Name</th>
              <th className="px-6 py-5 font-medium">Category</th>
              <th className="px-6 py-5 font-medium">Status</th>
              <th className="px-6 py-5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-900/50">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-xs text-gray-600 uppercase tracking-widest">
                  Establishing Neural Link with Database...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-xs text-gray-600 uppercase tracking-widest">
                  No assets found matching current parameters.
                </td>
              </tr>
            ) : filteredProducts.map((product) => (
              <tr key={product.id} className="admin-table-row group hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-xs font-mono text-primary">{product.code}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 border border-gray-800 overflow-hidden bg-dark-lighter">
                      {product.images && product.images.length > 0 && product.images[0] ? (
                        <Image
                          src={getOptimizedAirtableImage(product.images[0])}
                          alt={product.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                          quality={75}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[6px] text-gray-800 uppercase">No Img</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-white uppercase tracking-wider font-light">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">{product.category}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${product.active ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                      {product.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <FastLink
                      href={`/products/${product.id}`}
                      target="_blank"
                      className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 transition-all duration-300"
                      title="View on Site"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </FastLink>
                    <FastLink
                      href={`/admin/products/${product.id}`}
                      className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                      title="Edit Specifications"
                    >
                      <Edit2 className="w-4 h-4" />
                    </FastLink>
                    <button
                      onClick={() => setDeleteModal({
                        isOpen: true,
                        productId: product.id,
                        productName: product.name
                      })}
                      className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300"
                      title="Decommission Asset"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onCancel={() => setDeleteModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDelete}
        title="Confirm Decommission"
        itemName={deleteModal.productName}
        isLoading={isDeleting}
      />
    </div>
  )
}
