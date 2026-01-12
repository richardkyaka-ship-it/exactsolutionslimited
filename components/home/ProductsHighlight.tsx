'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Product } from '@/types/products'
import FastLink from '@/components/ui/FastLink'
import { getOptimizedAirtableImage, generateBlurDataURL } from '@/utils/image-optimizer'

export default function ProductsHighlight() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/admin/products')
        const data = await res.json()
        setProducts(data.filter((p: Product) => p.featured && p.active).slice(0, 3))
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  return (
    <section className="bg-light dark:bg-dark border-t border-light-border/50 dark:border-dark-border/50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40">
        {/* Header */}
        <div className="mb-12 sm:mb-14 md:mb-16 lg:mb-20 xl:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight text-light-text dark:text-white tracking-tight mb-2 sm:mb-3">
              Equipment Catalog
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-light-text-muted dark:text-dark-text-muted font-light">
              Browse industrial equipment
            </p>
          </div>
          <FastLink
            href="/products"
            className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted hover:text-primary transition-colors duration-300 flex items-center gap-2 group w-fit border-b border-transparent hover:border-primary/30 pb-1"
          >
            Browse Full Catalog <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </FastLink>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          {loading ? (
            <div className="col-span-full py-20 text-center">
              <div className="inline-block w-6 h-6 border border-light-border dark:border-dark-border border-t-primary animate-spin rounded-full"></div>
            </div>
          ) : products.map((product, i) => (
            <motion.div
              key={product.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-light-lighter dark:bg-dark-lighter mb-4 sm:mb-6">
                {product.images && product.images.length > 0 && product.images[0] ? (
                  <Image
                    src={getOptimizedAirtableImage(product.images[0])}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    loading="lazy"
                    quality={90}
                    placeholder="blur"
                    blurDataURL={generateBlurDataURL()}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-light-lighter dark:bg-dark-lighter">
                    <span className="text-[10px] sm:text-xs text-light-text-subtle dark:text-dark-text-subtle uppercase tracking-widest font-mono">No Image</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                  <span className="text-[10px] sm:text-xs text-primary/80 font-mono uppercase tracking-wider">{product.code}</span>
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-extralight text-light-text dark:text-white tracking-tight group-hover:text-primary/80 transition-colors duration-300">
                  {product.name}
                </h3>
                {product.keySpecs && product.keySpecs[0] && (
                  <p className="text-[10px] sm:text-xs md:text-sm text-light-text-muted dark:text-dark-text-muted font-light">
                    {product.keySpecs[0]}
                  </p>
                )}
                <FastLink
                  href={`/products/${product.id}`}
                  className="inline-block text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted hover:text-primary transition-colors duration-300 flex items-center gap-2 group/link border-b border-transparent hover:border-primary/30 pb-1 w-fit"
                >
                  View Details <span className="group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                </FastLink>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
