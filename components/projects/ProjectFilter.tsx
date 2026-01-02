'use client'

import React from 'react'

type Category = 'all' | 'energy' | 'containers' | 'metal'

interface ProjectFilterProps {
  activeCategory: Category
  onCategoryChange: (category: Category) => void
}

const CATEGORIES: { label: string; value: Category }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'Energy & Generators', value: 'energy' },
  { label: 'Shipping Containers', value: 'containers' },
  { label: 'Building & Construction', value: 'metal' },
]

export default function ProjectFilter({ activeCategory, onCategoryChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-4 md:gap-8 mb-16">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onCategoryChange(cat.value)}
          className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 border ${
            activeCategory === cat.value
              ? 'border-primary text-primary'
              : 'border-gray-900 text-gray-500 hover:text-white hover:border-gray-700'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}

