'use client'

import React from 'react'
import { Zap, Container, Factory, Scale } from 'lucide-react'

interface Capability {
  icon: React.ElementType
  title: string
  spec: string
}

const CAPABILITIES: Capability[] = [
  { icon: Zap, title: "Power Solutions", spec: "50kVA - 2MW power range" },
  { icon: Container, title: "Container Systems", spec: "10ft - 40ft modular units" },
  { icon: Factory, title: "Fabrication Precision", spec: "±1mm engineering tolerance" },
  { icon: Scale, title: "Project Scale", spec: "Single unit to industrial park" }
]

export default function CapabilityMatrix() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32 border-b border-light-border dark:border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-baseline gap-4 mb-16 md:mb-24">
          <span className="text-[10px] text-primary font-mono tracking-[0.3em] uppercase">Section 03</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-light-text dark:text-white tracking-tight uppercase">
            Technical Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-light-border dark:bg-gray-900 border border-light-border dark:border-gray-900">
          {CAPABILITIES.map((item, index) => (
            <div key={index} className="bg-light dark:bg-black p-12 group hover:bg-light-lighter dark:hover:bg-dark-light transition-colors duration-500">
              <item.icon className="w-8 h-8 text-primary mb-8 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-[10px] text-light-text-muted dark:text-gray-500 uppercase tracking-[0.3em] font-medium mb-4">
                0{index + 1} // {item.title}
              </h3>
              <div className="h-px w-12 bg-primary/30 mb-6 group-hover:w-24 transition-all duration-500" />
              <p className="text-2xl font-light text-light-text dark:text-white group-hover:text-primary transition-colors duration-300">
                {item.spec}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

