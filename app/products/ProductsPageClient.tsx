'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@/types/products'
import ProductFilter, { ProductFilterType } from '@/components/products/ProductFilter'
import ProductCard from '@/components/products/ProductCard'
import ProductModal from '@/components/products/ProductModal'
import FastLink from '@/components/ui/FastLink'
import { useProducts } from '@/hooks/useProducts'
import { 
  staggerContainer, 
  badgeVariants, 
  heroVariants, 
  fadeInUp, 
  lineReveal,
  pageDelays,
  viewportOptions 
} from '@/utils/animations'

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

  const delays = pageDelays.products

  return (
    <main className="bg-light dark:bg-dark text-light-text dark:text-dark-text-primary selection:bg-primary/20 selection:text-light-text dark:selection:text-dark-text-primary min-h-screen overflow-hidden">
      {/* Hero Section - FLIP REVEAL */}
      <section className="px-6 md:px-12 lg:px-20 pt-32 pb-16 relative overflow-hidden">
        {/* Subtle Background Element */}
        <motion.div 
          initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
          animate={{ opacity: 0.02, rotate: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute bottom-0 right-0 dark:opacity-[0.02] pointer-events-none"
        >
          <span className="text-[200px] md:text-[300px] lg:text-[400px] font-extralight text-primary leading-none select-none block">
            01
          </span>
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-baseline gap-4 mb-8"
          >
            <span className="text-[10px] text-primary font-mono tracking-[0.3em] uppercase">01</span>
            <motion.h1 
              initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.68, -0.55, 0.265, 1.55] }}
              style={{ transformStyle: 'preserve-3d' }}
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-light-text dark:text-dark-text-primary tracking-tight uppercase"
            >
              Industrial Catalog
            </motion.h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scaleX: 0, rotate: 45 }}
            animate={{ opacity: 1, scaleX: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="h-px w-24 bg-gradient-to-r from-primary/60 via-primary/40 to-transparent mb-8" 
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 30, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-xl md:text-2xl font-light text-light-text-muted dark:text-dark-text-muted max-w-2xl leading-relaxed"
          >
            Browse our technical equipment range. Select any unit to view full specifications or start a direct technical consultation.
          </motion.p>
        </div>
      </section>

      {/* Catalog Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={staggerContainer}
        className="px-6 md:px-12 lg:px-20 pb-32"
      >
        <div className="max-w-7xl mx-auto">
          {/* Filter System */}
          <motion.div variants={fadeInUp}>
            <ProductFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </motion.div>

          {/* Product Grid - FLIP CARD EFFECT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
            {isLoading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <p className="text-xs text-gray-600 uppercase tracking-[0.2em]">Synchronizing Catalog Data...</p>
              </motion.div>
            ) : filteredProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <p className="text-xs text-gray-600 uppercase tracking-[0.2em]">No products found in this category.</p>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                    transition={{ 
                      delay: index * 0.08,
                      duration: 0.7,
                      ease: [0.68, -0.55, 0.265, 1.55],
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <ProductCard
                      product={product}
                      onOpenSpecs={setSelectedProduct}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </motion.section>

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
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={staggerContainer}
        className="px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-dark-light border-t border-gray-900 text-center relative overflow-hidden"
      >
        {/* Subtle background accent */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.span 
            variants={badgeVariants}
            className="text-[10px] text-primary uppercase tracking-[0.4em] font-mono mb-8 block"
          >
            Project Support
          </motion.span>
          <motion.h2 
            variants={heroVariants}
            className="text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-tight uppercase mb-12"
          >
            Can't find a specific component?
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-gray-400 mb-12 uppercase tracking-widest text-xs md:text-sm"
          >
            Our engineering team sources and fabricates specialized industrial equipment.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <FastLink
              href="/contact"
              className="inline-block px-12 py-5 border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 text-sm uppercase tracking-[0.2em] font-medium"
            >
              Custom Sourcing Request
            </FastLink>
          </motion.div>
        </div>
      </motion.section>
    </main>
  )
}
