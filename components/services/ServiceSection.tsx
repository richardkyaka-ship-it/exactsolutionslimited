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
    <section id={id} className="min-h-screen px-4 md:px-12 lg:px-20 py-20 md:py-32 flex flex-col justify-center border-b border-gray-900/50">
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header Section */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-baseline gap-3 md:gap-4 mb-4">
            <span className="text-[10px] md:text-xs text-primary font-mono tracking-[0.3em] uppercase">{number}</span>
            <h2 className="text-3xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.1] md:leading-none uppercase">
              {title}
            </h2>
          </div>
          <div className="h-px w-16 md:w-24 bg-primary/40 mb-6 md:mb-8" />
          <p className="text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-20">
          {/* Main Visual - Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-10 md:space-y-12">
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
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-10 md:space-y-12">
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-medium mb-6 md:mb-8">
                  Technical Datasheet // 0{number}
                </h3>
                <SpecGrid specs={specs} />
              </div>
              
              <div className="p-6 border border-primary/10 bg-primary/5 group hover:bg-primary/10 transition-colors duration-300">
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

