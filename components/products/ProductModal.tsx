'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send } from 'lucide-react'
import { Product } from '@/types/products'
import WhatsAppButton from './WhatsAppButton'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/98 backdrop-blur-md" 
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl max-h-[95vh] bg-black border border-gray-800 overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-10 p-2"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left: Product Image & Quick Info (5 cols) */}
            <div className="lg:col-span-5 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-800">
              <div className="relative aspect-square mb-12 border border-gray-900 bg-dark-lighter grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 bg-primary px-3 py-1">
                  <span className="text-[10px] text-white font-mono uppercase tracking-widest">{product.code}</span>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-light text-white uppercase tracking-tight mb-2">
                    {product.name}
                  </h2>
                  <span className="text-[10px] text-primary uppercase tracking-[0.3em] font-mono">
                    Category // {product.category}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4">
                  <WhatsAppButton 
                    productName={product.name} 
                    productCode={product.code} 
                    className="w-full sm:w-auto"
                  />
                </div>
              </div>
            </div>

            {/* Right: Technical Details (7 cols) */}
            <div className="lg:col-span-7 p-8 md:p-12 space-y-12">
              {/* Full Specs Grid */}
              <section>
                <h3 className="text-[10px] text-gray-500 uppercase tracking-[0.4em] mb-8 font-mono">
                  Technical Datasheet
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {Object.entries(product.fullSpecs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-baseline border-b border-gray-900 pb-2">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest">{key}</span>
                      <span className="text-sm text-white font-mono">{value}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Applications */}
              <section>
                <h3 className="text-[10px] text-gray-500 uppercase tracking-[0.4em] mb-6 font-mono">
                  Operational Application
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.applications.map((app, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border border-gray-900 bg-dark-light">
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      <span className="text-xs text-gray-300">{app}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Installation */}
              <section>
                <h3 className="text-[10px] text-gray-500 uppercase tracking-[0.4em] mb-4 font-mono">
                  Site Requirements
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-primary/20 pl-6">
                  {product.installationReqs}
                </p>
              </section>

              {/* Custom Request Form */}
              <section className="pt-8 border-t border-gray-900">
                <h3 className="text-[10px] text-primary uppercase tracking-[0.4em] mb-8 font-mono">
                  Request Custom Configuration
                </h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="FULL NAME" 
                    className="bg-dark-light border border-gray-900 px-4 py-3 text-xs text-white focus:outline-none focus:border-primary transition-colors uppercase tracking-widest"
                  />
                  <input 
                    type="email" 
                    placeholder="CORPORATE EMAIL" 
                    className="bg-dark-light border border-gray-900 px-4 py-3 text-xs text-white focus:outline-none focus:border-primary transition-colors uppercase tracking-widest"
                  />
                  <textarea 
                    placeholder="SPECIFIC REQUIREMENTS FOR THIS UNIT..." 
                    rows={3}
                    className="md:col-span-2 bg-dark-light border border-gray-900 px-4 py-3 text-xs text-white focus:outline-none focus:border-primary transition-colors uppercase tracking-widest resize-none"
                  />
                  <button 
                    type="button"
                    className="md:col-span-2 py-4 bg-transparent border border-gray-800 text-gray-400 text-[10px] uppercase tracking-[0.3em] font-medium hover:border-white hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-3 h-3" />
                    Submit Technical Request
                  </button>
                </form>
              </section>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

