'use client'

import React from 'react'
import { CATEGORIES as CATEGORY_CONSTANTS, CategoryId } from '@/constants/categories'

export type ProductFilterType = 'all' | CategoryId

interface ProductFilterProps {
  activeCategory: ProductFilterType
  onCategoryChange: (category: ProductFilterType) => void
}

const CATEGORIES: { label: string; value: ProductFilterType }[] = [
  { label: 'All Equipment', value: 'all' },
  ...CATEGORY_CONSTANTS.map(cat => ({
    label: cat.name,
    value: cat.id as ProductFilterType,
  })),
]

export default function ProductFilter({ activeCategory, onCategoryChange }: ProductFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-12">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onCategoryChange(cat.value)}
          className={`px-6 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 border ${
            activeCategory === cat.value
              ? 'border-primary text-primary bg-primary/5'
              : 'border-gray-900 text-gray-500 hover:text-white hover:border-gray-700'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}

