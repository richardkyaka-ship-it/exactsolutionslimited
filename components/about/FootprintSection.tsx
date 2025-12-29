'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface FootprintMetric {
  label: string
  value: string
}

const METRICS: FootprintMetric[] = [
  { label: "Projects Completed", value: "250+" },
  { label: "Client Retention", value: "98%" },
  { label: "Countries Served", value: "03" }
]

export default function FootprintSection() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32 border-b border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-baseline gap-4 mb-16 md:mb-24">
          <span className="text-[10px] text-primary font-mono tracking-[0.3em] uppercase">Section 05</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight uppercase">
            Regional Footprint
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-4 space-y-12">
            {METRICS.map((metric, index) => (
              <div key={index} className="flex flex-col border-b border-gray-900 pb-8">
                <span className="text-5xl font-light text-white mb-2">{metric.value}</span>
                <span className="text-[10px] text-primary uppercase tracking-[0.3em] font-mono">{metric.label}</span>
              </div>
            ))}
            <div className="p-6 bg-dark-light border border-gray-800">
              <p className="text-xs text-gray-500 leading-relaxed italic">
                "Exact Solutions provided critical power infrastructure for our logistics hub in record time."
              </p>
              <p className="text-[10px] text-white mt-4 uppercase tracking-widest">— Logistics Director, Mombasa Port</p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="relative aspect-[4/3] md:aspect-[16/9] bg-dark-lighter border border-gray-800 overflow-hidden group">
              {/* Technical Blueprint Grid Background */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                  <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#map-grid)" />
                </svg>
              </div>

              {/* Simplified East Africa Technical Map */}
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <svg 
                  viewBox="0 0 200 200" 
                  className="w-full h-full opacity-40 grayscale contrast-125"
                  fill="none" 
                  stroke="currentColor"
                >
                  {/* Rough outline of Kenya/East Africa - Schematic Style */}
                  <motion.path 
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    viewport={{ once: true }}
                    d="M100,40 L140,50 L160,100 L145,150 L100,160 L60,150 L40,100 L60,50 Z" 
                    stroke="#ffffff" 
                    strokeWidth="0.5"
                    strokeDasharray="4 4"
                  />
                  
                  {/* Connection Lines between Nodes */}
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                    viewport={{ once: true }}
                    d="M110,110 L140,135" 
                    stroke="#ff6600" 
                    strokeWidth="0.5" 
                    strokeDasharray="2 2"
                  />
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                    viewport={{ once: true }}
                    d="M110,110 L60,105" 
                    stroke="#ff6600" 
                    strokeWidth="0.5" 
                    strokeDasharray="2 2"
                  />

                  {/* Operational Nodes */}
                  {/* Nairobi (Central-ish Hub) */}
                  <g className="cursor-pointer">
                    <circle cx="110" cy="110" r="2.5" fill="#ff6600" />
                    <circle cx="110" cy="110" r="6" stroke="#ff6600" strokeWidth="0.5" opacity="0.3">
                      <animate attributeName="r" values="4;8;4" dur="3s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  {/* Mombasa (Coastal Node) */}
                  <g className="cursor-pointer">
                    <circle cx="140" cy="135" r="1.5" fill="#ff6600" opacity="0.7" />
                    <circle cx="140" cy="135" r="4" stroke="#ff6600" strokeWidth="0.3" opacity="0.2" />
                  </g>

                  {/* Kampala Node */}
                  <g className="cursor-pointer">
                    <circle cx="60" cy="105" r="1.5" fill="#ff6600" opacity="0.7" />
                    <circle cx="60" cy="105" r="4" stroke="#ff6600" strokeWidth="0.3" opacity="0.2" />
                  </g>
                </svg>
              </div>

              {/* Labels with Technical Callouts */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Nairobi Label */}
                <div className="absolute top-[55%] left-[55%] translate-x-[-50%] translate-y-[-50%]">
                  <div className="flex flex-col items-start bg-black/60 backdrop-blur-md border border-primary/20 p-2">
                    <span className="text-[9px] text-white font-mono uppercase tracking-widest">HQ // NAIROBI</span>
                    <span className="text-[7px] text-primary uppercase font-mono tracking-tighter">Central Ops & Fabrication</span>
                  </div>
                </div>

                {/* Mombasa Label */}
                <div className="absolute top-[68%] left-[72%]">
                  <div className="flex flex-col items-start bg-black/60 backdrop-blur-md border border-gray-800 p-2">
                    <span className="text-[9px] text-gray-300 font-mono uppercase tracking-widest">PORT // MOMBASA</span>
                    <span className="text-[7px] text-gray-500 uppercase font-mono tracking-tighter">Logistics & Marine</span>
                  </div>
                </div>

                {/* Regional Label */}
                <div className="absolute top-[52%] left-[15%]">
                  <div className="flex flex-col items-end bg-black/60 backdrop-blur-md border border-gray-800 p-2">
                    <span className="text-[9px] text-gray-300 font-mono uppercase tracking-widest">REGIONAL // KAMPALA</span>
                    <span className="text-[7px] text-gray-500 uppercase font-mono tracking-tighter">Technical Support Hub</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-2 right-2 p-4 bg-primary/5 border border-primary/20 backdrop-blur-sm max-w-[200px]">
                <p className="text-[8px] text-primary uppercase tracking-[0.2em] mb-1 font-mono">Territory Status</p>
                <p className="text-[10px] text-gray-400 leading-tight">
                  Active deployment capability across Kenya, Uganda, and Tanzania.
                </p>
              </div>
              
              <div className="absolute top-4 left-4">
                <span className="text-[8px] text-gray-600 font-mono uppercase tracking-[0.3em]">Map ID: EA-ENG-001</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
