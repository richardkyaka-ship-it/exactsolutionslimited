'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Principle {
  title: string
  statement: string
  metric: string
  explanation: string
}

const PRINCIPLES: Principle[] = [
  {
    title: "01 // PRECISION",
    statement: "Precision is measurable",
    metric: "±1mm tolerance",
    explanation: "Our fabrication processes adhere to strict aeronautical-grade tolerances, ensuring every component fits exactly as engineered."
  },
  {
    title: "02 // EXPERTISE",
    statement: "Engineering leads every project",
    metric: "15+ yrs experience",
    explanation: "We don't just supply equipment; we provide engineered solutions. Our team brings over a decade of hands-on industrial experience."
  },
  {
    title: "03 // PERFORMANCE",
    statement: "Reliability as standard",
    metric: "98% completion rate",
    explanation: "Our track record is built on delivering complex projects on time and within specification, across the most demanding environments."
  }
]

export default function PhilosophySection() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32 border-b border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-baseline gap-4 mb-16 md:mb-24">
          <span className="text-[10px] text-primary font-mono tracking-[0.3em] uppercase">Section 01</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight uppercase">
            Technical Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
          {PRINCIPLES.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col group"
            >
              <span className="text-[10px] text-gray-500 font-mono mb-6 tracking-widest">{item.title}</span>
              <h3 className="text-xl md:text-2xl font-light text-white mb-4 group-hover:text-primary transition-colors duration-300">
                {item.statement}
              </h3>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-primary" />
                <span className="text-sm font-mono text-primary uppercase tracking-wider">{item.metric}</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.explanation}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

