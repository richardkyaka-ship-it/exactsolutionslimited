'use client'

import React from 'react'
import { motion } from 'framer-motion'
import BlueprintImage from './BlueprintImage'
import SpecGrid from './SpecGrid'
import ProjectHighlights from './ProjectHighlights'

interface ServiceSectionProps {
  id: string
  number: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  annotations: Array<{ x: number; y: number; label: string; value: string }>
  specs: Array<{ parameter: string; value: string }>
  highlights: Array<{ title: string; description: string }>
}

export default function ServiceSection({
  id,
  number,
  title,
  description,
  imageSrc,
  imageAlt,
  annotations,
  specs,
  highlights
}: ServiceSectionProps) {
  return (
    <section id={id} className="min-h-screen px-6 md:px-12 lg:px-20 py-24 md:py-32 flex flex-col justify-center border-b border-gray-900/50">
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header Section */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-xs text-primary font-mono tracking-[0.3em] uppercase">{number}</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-none uppercase">
              {title}
            </h2>
          </div>
          <div className="h-px w-24 bg-primary/40 mb-8" />
          <p className="text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Main Visual - Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <BlueprintImage 
                src={imageSrc} 
                alt={imageAlt} 
                annotations={annotations} 
              />
            </motion.div>

            <ProjectHighlights highlights={highlights} />
          </div>

          {/* Technical Details - Right Column (4 cols) */}
          <div className="lg:col-span-4 space-y-12">
            <div className="sticky top-32">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-medium mb-8">
                Technical Datasheet // 0{number}
              </h3>
              <SpecGrid specs={specs} />
              
              <div className="mt-12 p-6 border border-primary/10 bg-primary/5 group hover:bg-primary/10 transition-colors duration-300">
                <p className="text-[10px] text-primary uppercase tracking-[0.2em] mb-2">Requirement Assessment</p>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  Need a custom solution tailored to specific site parameters? Our engineers provide full technical documentation.
                </p>
                <a 
                  href="/contact" 
                  className="text-[10px] uppercase tracking-[0.3em] text-white hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  Request Specs ───
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

