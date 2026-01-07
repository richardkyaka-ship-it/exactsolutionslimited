'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { X, Send } from 'lucide-react'
import Link from 'next/link'
import { Product } from '@/types/products'
import FastLink from '@/components/ui/FastLink'
import WhatsAppButton from './WhatsAppButton'
import { getOptimizedAirtableImage, generateBlurDataURL } from '@/utils/image-optimizer'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Lock body scroll
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  if (!product || !mounted) return null

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      style={{ isolation: 'isolate' }}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-light-surface/90 dark:bg-dark/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-6xl max-h-[95vh] bg-light-surface dark:bg-dark-light border border-light-border dark:border-dark-border overflow-y-auto overflow-x-hidden shadow-[0_0_50px_rgba(28,27,24,0.08)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-light-text-muted dark:text-dark-text-muted hover:text-light-text dark:hover:text-dark-text-primary transition-colors z-10 p-2 bg-light-lighter/50 dark:bg-dark/50 backdrop-blur-sm md:bg-transparent"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left: Product Image & Quick Info (5 cols) */}
          <div className="lg:col-span-5 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-light-border dark:border-dark-border">
            <div className="relative aspect-square mb-8 md:mb-12 border border-light-border dark:border-dark-border bg-light-lighter dark:bg-dark-lighter grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden">
              {product.images && product.images.length > 0 && product.images[0] ? (
                <Image
                  src={getOptimizedAirtableImage(product.images[0])}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  quality={90}
                  priority
                  placeholder="blur"
                  blurDataURL={generateBlurDataURL()}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-light-lighter dark:bg-dark-lighter">
                  <span className="text-xs text-light-text-subtle dark:text-dark-text-subtle uppercase tracking-widest font-mono">No Image Available</span>
                </div>
              )}
              <div className="absolute top-0 left-0 bg-primary px-2 md:px-3 py-1 z-10">
                <span className="text-[8px] md:text-[10px] text-white font-mono uppercase tracking-widest">{product.code}</span>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-light-text dark:text-dark-text-primary uppercase tracking-tight mb-2 leading-tight">
                  {product.name}
                </h2>
                <span className="text-[9px] md:text-[10px] text-primary uppercase tracking-[0.3em] font-mono">
                  Category // {product.category}
                </span>
              </div>

              <div className="flex flex-wrap gap-4">
                <WhatsAppButton
                  productName={product.name}
                  productCode={product.code}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Right: Technical Details (7 cols) */}
          <div className="lg:col-span-7 p-6 md:p-12 space-y-10 md:space-y-12">
            {/* Full Specs Grid */}
            <section>
              <h3 className="text-[9px] md:text-[10px] text-light-text-muted dark:text-dark-text-muted uppercase tracking-[0.4em] mb-6 md:mb-8 font-mono">
                Technical Datasheet
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 md:gap-y-4">
                {Object.entries(product.fullSpecs).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-baseline border-b border-light-border dark:border-dark-border pb-2">
                    <span className="text-[9px] md:text-[10px] text-light-text-muted dark:text-dark-text-muted uppercase tracking-widest">{key}</span>
                    <span className="text-xs md:text-sm text-light-text dark:text-dark-text-primary font-mono">{value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Applications */}
            <section>
              <h3 className="text-[10px] text-light-text-muted dark:text-dark-text-muted uppercase tracking-[0.4em] mb-6 font-mono">
                Operational Application
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.applications.map((app, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border border-light-border dark:border-dark-border bg-light-lighter dark:bg-dark-light">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    <span className="text-xs text-light-text-muted dark:text-dark-text-secondary">{app}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Installation */}
            <section>
              <h3 className="text-[10px] text-light-text-muted dark:text-dark-text-muted uppercase tracking-[0.4em] mb-4 font-mono">
                Site Requirements
              </h3>
              <p className="text-sm text-light-text-muted dark:text-dark-text-muted leading-relaxed border-l-2 border-primary/20 pl-6">
                {product.installationReqs}
              </p>
            </section>

            {/* Custom Request Form */}
            <section className="pt-8 border-t border-light-border dark:border-dark-border">
              <h3 className="text-[10px] text-primary uppercase tracking-[0.4em] mb-8 font-mono">
                Request Custom Configuration
              </h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="FULL NAME"
                  className="bg-light-lighter dark:bg-dark-light border border-light-border dark:border-dark-border px-4 py-3 text-xs text-light-text dark:text-dark-text-primary focus:outline-none focus:border-primary transition-colors uppercase tracking-widest"
                />
                <input
                  type="email"
                  placeholder="CORPORATE EMAIL"
                  className="bg-light-lighter dark:bg-dark-light border border-light-border dark:border-dark-border px-4 py-3 text-xs text-light-text dark:text-dark-text-primary focus:outline-none focus:border-primary transition-colors uppercase tracking-widest"
                />
                <textarea
                  placeholder="SPECIFIC REQUIREMENTS FOR THIS UNIT..."
                  rows={3}
                  className="md:col-span-2 bg-light-lighter dark:bg-dark-light border border-light-border dark:border-dark-border px-4 py-3 text-xs text-light-text dark:text-dark-text-primary focus:outline-none focus:border-primary transition-colors uppercase tracking-widest resize-none"
                />
                <FastLink
                  href={`/products/${product.id}`}
                  className="md:col-span-2 py-4 bg-primary/10 border border-primary/30 text-primary text-[10px] uppercase tracking-[0.3em] font-medium hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  View Full Technical Specifications
                  <span className="group-hover:translate-x-1 transition-transform">──→</span>
                </FastLink>
                <button
                  type="button"
                  className="md:col-span-2 py-4 bg-transparent border border-light-border dark:border-dark-border text-light-text-muted dark:text-dark-text-muted text-[10px] uppercase tracking-[0.3em] font-medium hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-3 h-3" />
                  Submit Technical Request
                </button>
              </form>
            </section>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}

