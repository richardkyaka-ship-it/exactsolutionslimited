'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Product } from '@/types/products'
import WhatsAppButton from './WhatsAppButton'

interface ProductCardProps {
  product: Product
  onOpenSpecs: (product: Product) => void
}

export default function ProductCard({ product, onOpenSpecs }: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="group bg-dark-light border border-gray-900 hover:border-primary/50 transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Container */}
      <div 
        className="relative aspect-square overflow-hidden bg-dark-lighter cursor-pointer"
        onClick={() => onOpenSpecs(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
        />
        {/* Product Code Overlay */}
        <div className="absolute top-0 left-0 bg-primary/90 px-3 py-1 z-10">
          <span className="text-[9px] text-white font-mono uppercase tracking-widest">{product.code}</span>
        </div>
        {/* Blueprint Overlay Effect */}
        <div className="absolute inset-0 bg-primary/5 opacity-40 group-hover:opacity-10 transition-opacity pointer-events-none" />
      </div>

      {/* Content Section */}
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[8px] text-gray-500 uppercase tracking-[0.2em] font-medium bg-gray-900 px-2 py-0.5">
            {product.category}
          </span>
          <div className="h-px flex-grow bg-gray-900" />
        </div>

        <h3 
          className="text-base md:text-lg font-light text-white uppercase tracking-tight mb-6 group-hover:text-primary transition-colors cursor-pointer line-clamp-2 min-h-[3rem] md:min-h-[3.5rem]"
          onClick={() => onOpenSpecs(product)}
        >
          {product.name}
        </h3>

        {/* Key Specs */}
        <ul className="space-y-2 mb-8">
          {product.keySpecs.map((spec, i) => (
            <li key={i} className="flex items-center gap-2 text-[10px] md:text-[11px] text-gray-400 font-mono">
              <span className="w-1 h-1 bg-primary/40 rounded-full" />
              {spec}
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="mt-auto grid grid-cols-2 gap-2 md:gap-3">
          <WhatsAppButton 
            productName={product.name} 
            productCode={product.code}
          />
          <button
            onClick={() => onOpenSpecs(product)}
            className="px-2 md:px-4 py-2 border border-gray-800 text-gray-400 text-[9px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] font-medium hover:border-white hover:text-white transition-all duration-300"
          >
            Specs
          </button>
        </div>
      </div>
    </motion.div>
  )
}

