'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { Trash2, FolderTree, Info } from 'lucide-react'
import { Category } from '@/types/products'
import DeleteConfirmationModal from '@/components/admin/DeleteConfirmationModal'
import { useAdmin } from '@/components/admin/AdminProvider'

export default function CategoriesPage() {
  const { setIsLoading, showToast } = useAdmin()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  // Custom Delete Modal State
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    categoryId: string;
    categoryName: string;
  }>({
    isOpen: false,
    categoryId: '',
    categoryName: '',
  })
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchCategories = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/categories')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      showToast('Catalog Sync Interrupted', 'error')
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
      setIsLoading(false)
    }
  }, [setIsLoading, showToast])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const confirmDelete = async () => {
    showToast('Categories are fixed and cannot be deleted. Contact developer to modify categories.', 'error')
    setDeleteModal(prev => ({ ...prev, isOpen: false }))
  }

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-light text-white uppercase tracking-tight mb-2">
          Equipment <span className="text-primary">Categories</span>
        </h1>
        <p className="text-sm text-gray-500 uppercase tracking-widest">Organize your industrial asset catalog</p>
      </div>

      {/* Categories List - Full Width */}
      <div className="bg-dark-light border border-gray-900 overflow-hidden">
            {/* Desktop View */}
            <div className="hidden md:block">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-900 bg-black/50 text-[10px] uppercase tracking-widest text-gray-500">
                    <th className="px-8 py-6 font-medium text-center w-20">Icon</th>
                    <th className="px-8 py-6 font-medium">Category Name</th>
                    <th className="px-8 py-6 font-medium text-right w-32">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/50">
                  {loading ? (
                    <tr>
                      <td colSpan={3} className="px-8 py-20 text-center text-gray-600 uppercase tracking-widest text-xs">Synchronizing Classifications...</td>
                    </tr>
                  ) : (
                    categories.map((cat) => (
                      <tr key={cat.id} className="group hover:bg-black/20 transition-colors">
                        <td className="px-8 py-6 text-center">
                          <div className="w-10 h-10 border border-gray-800 flex items-center justify-center mx-auto bg-black group-hover:border-primary/30 transition-colors">
                            <FolderTree className="w-4 h-4 text-primary/60" />
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-sm font-medium text-white uppercase tracking-wider">{cat.name}</p>
                          <p className="text-[9px] font-mono text-gray-600 uppercase mt-1">ID: {cat.id}</p>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button
                            disabled
                            className="p-2 text-gray-800 cursor-not-allowed"
                            title="Categories are fixed and cannot be deleted"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-gray-900/50">
          {loading ? (
            <div className="p-12 text-center text-gray-600 uppercase tracking-widest text-xs">Synchronizing...</div>
          ) : (
            categories.map((cat) => (
              <div key={cat.id} className="p-6 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-gray-800 flex items-center justify-center bg-black group-hover:border-primary/30 transition-all">
                    <FolderTree className="w-4 h-4 text-primary/60" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white uppercase tracking-wider">{cat.name}</p>
                    <p className="text-[9px] font-mono text-gray-600 uppercase mt-1">ID: {cat.id}</p>
                  </div>
                </div>
                <button
                  disabled
                  className="p-3 bg-black border border-gray-800 text-gray-800 cursor-not-allowed"
                  title="Categories are fixed and cannot be deleted"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 flex items-start gap-4 p-6 border border-gray-900 bg-black/30">
        <Info className="w-5 h-5 text-gray-600 flex-shrink-0" />
        <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider">
          Categories are fixed and managed in code. The three service categories (Generators & Power, Shipping Containers, Building & Construction) represent the core business divisions and cannot be modified through this interface.
        </p>
      </div>

      {/* Delete Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        title="Confirm Deletion"
        itemName={deleteModal.categoryName}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal(prev => ({ ...prev, isOpen: false }))}
        isLoading={isDeleting}
      />
    </div>
  )
}
