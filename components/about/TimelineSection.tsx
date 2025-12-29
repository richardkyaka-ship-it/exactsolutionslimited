'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Milestone {
  year: string
  title: string
  metric: string
}

const MILESTONES: Milestone[] = [
  { year: "2015", title: "Founded by industrial engineers", metric: "3 founding engineers" },
  { year: "2018", title: "Energy solutions division launch", metric: "50+ generators installed" },
  { year: "2021", title: "Metal fabrication expansion", metric: "1000+ projects completed" },
  { year: "2024", title: "Regional operations expansion", metric: "Serving 3 East African countries" }
]

export default function TimelineSection() {
  return (
    <section className="px-4 md:px-12 lg:px-20 py-20 md:py-32 bg-dark-light border-b border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-baseline gap-3 md:gap-4 mb-12 md:mb-24">
          <span className="text-[10px] text-primary font-mono tracking-[0.3em] uppercase">Section 02</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-tight uppercase">
            Engineering Timeline
          </h2>
        </div>

        <div className="relative px-2 sm:px-0">
          {/* Central Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-800 -translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {MILESTONES.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Node */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(255,102,0,0.5)]" />

                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                    <span className="text-xl md:text-2xl font-mono text-primary mb-2">{item.year}</span>
                    <h3 className={`text-base md:text-lg font-light text-white mb-2 ${index % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                      {item.title}
                    </h3>
                    <div className={`flex items-center gap-2 ${index % 2 === 0 ? 'flex-row' : 'md:flex-row-reverse'}`}>
                      <div className="h-px w-4 bg-gray-700" />
                      <span className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-[0.2em]">{item.metric}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

