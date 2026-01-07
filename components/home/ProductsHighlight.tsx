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
        setProducts(data.filter((p: Product) => p.featured && p.active).slice(0, 4))
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  return (
    <section className="px-4 md:px-12 lg:px-20 py-20 md:py-32 bg-light dark:bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <div>
            <div className="flex items-baseline gap-3 mb-3 md:mb-4">
              <span className="text-[10px] text-primary font-mono tracking-[0.3em] uppercase">03</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-light-text dark:text-white tracking-tight uppercase">
                Equipment Catalog
              </h2>
            </div>
            <p className="text-light-text-muted dark:text-dark-text-muted uppercase tracking-widest text-[10px] md:text-sm">Browse industrial equipment</p>
          </div>
          <FastLink
            href="/products"
            className="text-[10px] text-light-text dark:text-white uppercase tracking-[0.3em] hover:text-primary transition-colors flex items-center gap-2 group w-fit"
          >
            Browse Full Catalog <span className="group-hover:translate-x-2 transition-transform duration-300">───→</span>
          </FastLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {loading ? (
            <div className="col-span-full py-12 text-center text-light-text-subtle dark:text-gray-800">
              <p className="text-[10px] uppercase tracking-widest">Loading Featured Assets...</p>
            </div>
          ) : products.map((product, i) => (
            <motion.div
              key={product.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group bg-light-surface dark:bg-dark-light border border-light-border dark:border-dark-border hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-500 flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden bg-light-lighter dark:bg-dark-lighter">
                {product.images && product.images.length > 0 && product.images[0] ? (
                  <Image
                    src={getOptimizedAirtableImage(product.images[0])}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    loading="lazy"
                    quality={85}
                    placeholder="blur"
                    blurDataURL={generateBlurDataURL()}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-light-lighter dark:bg-dark-lighter">
                    <span className="text-[9px] text-light-text-subtle dark:text-dark-text-subtle uppercase tracking-widest font-mono">No Image</span>
                  </div>
                )}
                <div className="absolute top-0 left-0 bg-primary/90 px-2 md:px-3 py-1 z-10">
                  <span className="text-[8px] md:text-[9px] text-white font-mono uppercase tracking-widest">{product.code}</span>
                </div>
              </div>
              <div className="p-5 md:p-6 space-y-3 md:space-y-4">
                <h3 className="text-base font-light text-light-text dark:text-white uppercase tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-[9px] md:text-[10px] text-light-text-muted dark:text-dark-text-muted font-mono uppercase tracking-widest border-l border-light-border dark:border-dark-border pl-3">
                  {product.keySpecs[0]}
                </p>
                <FastLink
                  href={`/products/${product.id}`}
                  className="inline-block w-full py-2.5 md:py-3 border border-light-border dark:border-dark-border text-light-text-muted dark:text-dark-text-muted text-[10px] uppercase tracking-[0.2em] font-medium text-center hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary transition-all duration-300"
                >
                  View Details
                </FastLink>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
