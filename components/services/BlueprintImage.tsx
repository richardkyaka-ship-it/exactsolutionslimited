'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Annotation {
  x: number // percentage from left
  y: number // percentage from top
  label: string
  value: string
}

interface BlueprintImageProps {
  src: string
  alt: string
  annotations?: Annotation[]
}

export default function BlueprintImage({ src, alt, annotations = [] }: BlueprintImageProps) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden border border-gray-900 bg-dark-lighter group">
      {/* desaturated Industrial Image */}
      <div className="absolute inset-0 grayscale contrast-[1.1] opacity-40 group-hover:opacity-60 transition-opacity duration-700">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Blueprint SVG Overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Border Grid Lines */}
        <line x1="5" y1="0" x2="5" y2="100" stroke="rgba(255,102,0,0.1)" strokeWidth="0.1" />
        <line x1="95" y1="0" x2="95" y2="100" stroke="rgba(255,102,0,0.1)" strokeWidth="0.1" />
        <line x1="0" y1="5" x2="100" y2="5" stroke="rgba(255,102,0,0.1)" strokeWidth="0.1" />
        <line x1="0" y1="95" x2="100" y2="95" stroke="rgba(255,102,0,0.1)" strokeWidth="0.1" />

        {/* Blueprint Annotations */}
        {annotations.map((anno, i) => (
          <React.Fragment key={i}>
            {/* Horizontal Line */}
            <line
              x1={anno.x - 5}
              y1={anno.y}
              x2={anno.x + 5}
              y2={anno.y}
              stroke="#ff6600"
              strokeWidth="0.2"
              className="opacity-40"
            />
            {/* Vertical Tick Marks */}
            <line x1={anno.x - 5} y1={anno.y - 1} x2={anno.x - 5} y2={anno.y + 1} stroke="#ff6600" strokeWidth="0.2" className="opacity-40" />
            <line x1={anno.x + 5} y1={anno.y - 1} x2={anno.x + 5} y2={anno.y + 1} stroke="#ff6600" strokeWidth="0.2" className="opacity-40" />
          </React.Fragment>
        ))}
      </svg>

      {/* Callout Labels */}
      {annotations.map((anno, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${anno.x}%`, top: `${anno.y}%` }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="relative -translate-x-1/2 -translate-y-full mb-2">
            <div className="bg-black/80 backdrop-blur-sm border border-primary/30 px-2 py-1 flex flex-col items-center">
              <span className="text-[8px] uppercase tracking-[0.2em] text-gray-500 font-medium">{anno.label}</span>
              <span className="text-[10px] font-mono text-primary whitespace-nowrap">{anno.value}</span>
            </div>
            {/* Connector Dot */}
            <div className="absolute left-1/2 bottom-[-4px] -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(255,102,0,0.8)]" />
          </div>
        </motion.div>
      ))}

      {/* Blueprint Corner Accents */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-primary/40" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-primary/40" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-primary/40" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-primary/40" />
    </div>
  )
}

