'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Profile {
  role: string
  metric: string
  detail: string
}

const PROFILES: Profile[] = [
  { role: "Engineering Leads", metric: "15+ yrs avg exp", detail: "Chartered engineers overseeing all technical documentation." },
  { role: "Project Managers", metric: "200+ projects", detail: "Proven track record in delivering high-stakes industrial deployments." },
  { role: "Fabrication Specialists", metric: "Certified Techs", detail: "Qualified welders and machinists adhering to ISO standards." }
]

export default function TeamSection() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-light-lighter dark:bg-dark-light border-b border-light-border dark:border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-baseline gap-4 mb-16 md:mb-24">
          <span className="text-[10px] text-primary font-mono tracking-[0.3em] uppercase">Section 04</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-light-text dark:text-white tracking-tight uppercase">
            Engineering Team
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Abstract Image Side */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] bg-light-lighter dark:bg-dark-lighter border border-light-border dark:border-gray-800 overflow-hidden group">
              {/* Abstract Industrial Texture Placeholder */}
              <div className="absolute inset-0 grayscale opacity-40 group-hover:scale-110 transition-transform duration-1000">
                <img 
                  src="https://images.unsplash.com/photo-1517089535819-f48560c1d60b?auto=format&fit=crop&q=80&w=1000" 
                  alt="Industrial Abstract" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="text-[10px] text-primary uppercase tracking-[0.3em] mb-2 font-mono">Dossier Access</p>
                <p className="text-xl font-light text-light-text dark:text-white">Personnel Data: Level 01</p>
              </div>
            </div>
          </div>

          {/* Metrics Side */}
          <div className="lg:col-span-7 space-y-12">
            {PROFILES.map((profile, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group border-l border-light-border dark:border-gray-800 pl-8 hover:border-primary transition-colors duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                  <h3 className="text-xl font-light text-light-text dark:text-white group-hover:text-primary transition-colors duration-300">
                    {profile.role}
                  </h3>
                  <span className="text-sm font-mono text-primary">{profile.metric}</span>
                </div>
                <p className="text-sm text-light-text-muted dark:text-gray-500 max-w-md">
                  {profile.detail}
                </p>
              </motion.div>
            ))}

            <div className="pt-8 border-t border-light-border dark:border-gray-900 grid grid-cols-3 gap-4">
              {['ISO 9001', 'ISO 45001', 'ERB CERT'].map((cert, i) => (
                <div key={i} className="text-center p-4 border border-light-border dark:border-gray-800 bg-light dark:bg-black">
                  <span className="text-[8px] text-light-text-subtle dark:text-gray-600 font-mono tracking-widest">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

