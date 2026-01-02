'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@/types/products'
import ProductFilter, { ProductFilterType } from '@/components/products/ProductFilter'
import ProductCard from '@/components/products/ProductCard'
import ProductModal from '@/components/products/ProductModal'
import FastLink from '@/components/ui/FastLink'
import { useProducts } from '@/hooks/useProducts'

export default function ProductsPageClient() {
  const [activeCategory, setActiveCategory] = useState<ProductFilterType>('all')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  
  // Use SWR hook for optimized, cached product fetching
  // Don't block navigation - show page immediately, load data in background
  const { products = [], isLoading } = useProducts({
    status: 'Active',
    category: activeCategory === 'all' ? undefined : activeCategory,
  })

  const filteredProducts = useMemo(() => {
    // Ensure products is always an array
    if (!Array.isArray(products)) return []
    if (activeCategory === 'all') return products
    return products.filter(p => p.category === activeCategory)
  }, [products, activeCategory])

  return (
    <main className="bg-black text-white selection:bg-primary selection:text-white min-h-screen">
      {/* Hero Section */}
      <section className="px-6 md:px-12 lg:px-20 pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-[10px] text-primary font-mono tracking-[0.3em] uppercase">01</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-tight uppercase">
              Industrial Catalog
            </h1>
          </div>
          <div className="h-px w-24 bg-primary/40 mb-8" />
          <p className="text-xl font-light text-gray-400 max-w-2xl leading-relaxed">
            Browse our technical equipment range. Select any unit to view full specifications or start a direct technical consultation.
          </p>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="px-6 md:px-12 lg:px-20 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Filter System */}
          <ProductFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {isLoading ? (
              <div className="col-span-full py-20 text-center">
                <p className="text-xs text-gray-600 uppercase tracking-[0.2em]">Synchronizing Catalog Data...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <p className="text-xs text-gray-600 uppercase tracking-[0.2em]">No products found in this category.</p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenSpecs={setSelectedProduct}
                  />
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>

      {/* Footer CTA */}
      <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-dark-light border-t border-gray-900 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px] text-primary uppercase tracking-[0.4em] font-mono mb-8 block">Project Support</span>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight uppercase mb-12">
            Can't find a specific component?
          </h2>
          <p className="text-gray-400 mb-12 uppercase tracking-widest text-xs">
            Our engineering team sources and fabricates specialized industrial equipment.
          </p>
          <FastLink
            href="/contact"
            className="inline-block px-12 py-5 border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 text-sm uppercase tracking-[0.2em] font-medium"
          >
            Custom Sourcing Request
          </FastLink>
        </div>
      </section>
    </main>
  )
}
