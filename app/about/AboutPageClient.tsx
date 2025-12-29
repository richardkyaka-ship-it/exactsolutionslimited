'use client'

import React from 'react'
import { motion } from 'framer-motion'
import PhilosophySection from '@/components/about/PhilosophySection'
import TimelineSection from '@/components/about/TimelineSection'
import CapabilityMatrix from '@/components/about/CapabilityMatrix'
import TeamSection from '@/components/about/TeamSection'
import FootprintSection from '@/components/about/FootprintSection'
import Link from 'next/link'

export default function AboutPageClient() {
  return (
    <main className="bg-black text-white selection:bg-primary selection:text-white overflow-hidden">
      {/* Dossier Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 relative pt-20">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] text-primary font-mono tracking-[0.4em] uppercase">Corporate Dossier // Exact-01</span>
              <div className="h-px w-16 bg-primary/40" />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[100px] font-light leading-[0.9] tracking-tighter uppercase mb-12">
              Precision <br />
              <span className="text-primary">Engineering</span> <br />
              Since 2015
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-end">
              <div className="lg:col-span-2">
                <p className="text-xl md:text-2xl font-light text-gray-400 max-w-2xl leading-relaxed">
                  Industrial solutions built on technical expertise. We solve complex problems with exact engineering across East Africa.
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end">
                <div className="text-right">
                  <p className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em] mb-4">Origin Status: Verified</p>
                  <div className="h-16 w-px bg-primary mx-auto md:mr-0" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Sections */}
      <PhilosophySection />
      <TimelineSection />
      <CapabilityMatrix />
      <TeamSection />
      <FootprintSection />

      {/* Final Dossier Footer / CTA */}
      <section className="px-6 md:px-12 lg:px-20 py-32 md:py-48 bg-dark-lighter">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block border border-primary/20 p-8 mb-12">
            <span className="text-xs text-primary font-mono tracking-[0.4em] uppercase block mb-4">Verification Complete</span>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight uppercase max-w-xl mx-auto">
              Request Technical Capabilities Document
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link 
              href="/contact"
              className="px-12 py-5 bg-primary text-white hover:bg-primary-dark transition-all duration-300 text-sm uppercase tracking-[0.2em] font-medium"
            >
              Contact Engineering
            </Link>
            <Link 
              href="/services"
              className="px-12 py-5 border border-gray-800 text-gray-400 hover:border-white hover:text-white transition-all duration-300 text-sm uppercase tracking-[0.2em] font-medium"
            >
              Explore Solutions
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

