'use client'

import React from 'react'
import { motion } from 'framer-motion'
import PhilosophySection from '@/components/about/PhilosophySection'
import TimelineSection from '@/components/about/TimelineSection'
import CapabilityMatrix from '@/components/about/CapabilityMatrix'
import Link from 'next/link'
import { 
  staggerContainer, 
  badgeVariants, 
  heroVariants, 
  fadeInUp, 
  lineReveal,
  slideInRight,
  pageDelays,
  viewportOptions 
} from '@/utils/animations'

export default function AboutPageClient() {
  const delays = pageDelays.about

  return (
    <main className="bg-light dark:bg-dark text-light-text dark:text-dark-text-primary selection:bg-primary/20 selection:text-light-text dark:selection:text-dark-text-primary overflow-hidden">
      {/* Dossier Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 relative pt-20">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] pointer-events-none overflow-hidden">
          <svg className="w-full h-full text-light-text-subtle dark:text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        {/* Background Number Element */}
        <div className="absolute bottom-0 right-0 opacity-[0.02] dark:opacity-[0.02] pointer-events-none">
          <span className="text-[200px] md:text-[300px] lg:text-[400px] font-extralight text-primary leading-none select-none block">
            02
          </span>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-[10px] text-primary font-mono tracking-[0.4em] uppercase">Corporate Dossier // Exact-01</span>
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-px w-16 bg-gradient-to-r from-primary/60 via-primary/40 to-transparent" 
            />
          </motion.div>

          <motion.h1 
            initial={{ 
              opacity: 0, 
              clipPath: 'inset(50% 0 50% 0)',
              y: 20,
            }}
            animate={{ 
              opacity: 1, 
              clipPath: 'inset(0% 0 0% 0)',
              y: 0,
            }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="text-5xl md:text-7xl lg:text-[100px] xl:text-[120px] font-light leading-[0.9] tracking-tighter uppercase mb-12"
          >
            Precision <br />
            <motion.span 
              initial={{ 
                opacity: 0, 
                clipPath: 'inset(50% 0 50% 0)',
                y: 20,
              }}
              animate={{ 
                opacity: 1, 
                clipPath: 'inset(0% 0 0% 0)',
                y: 0,
              }}
              transition={{ delay: 0.8, duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="text-primary"
            >
              Engineering
            </motion.span> <br />
            <motion.span
              initial={{ 
                opacity: 0, 
                clipPath: 'inset(50% 0 50% 0)',
                y: 20,
              }}
              animate={{ 
                opacity: 1, 
                clipPath: 'inset(0% 0 0% 0)',
                y: 0,
              }}
              transition={{ delay: 1.1, duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            >
              Since 2015
            </motion.span>
          </motion.h1>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-end"
          >
            <motion.div 
              variants={fadeInUp}
              transition={{ delay: delays.description }}
              className="lg:col-span-2"
            >
              <p className="text-xl md:text-2xl font-light text-gray-400 max-w-2xl leading-relaxed">
                Industrial solutions built on technical expertise. We solve complex problems with exact engineering across East Africa.
              </p>
            </motion.div>
            <motion.div 
              variants={slideInRight}
              transition={{ delay: delays.description + 0.2 }}
              className="flex flex-col items-start md:items-end"
            >
              <div className="text-right">
                <p className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em] mb-4">Origin Status: Verified</p>
                <motion.div 
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: delays.description + 0.4, duration: 0.8 }}
                  className="h-16 w-px bg-gradient-to-b from-primary/60 via-primary/40 to-transparent mx-auto md:mr-0" 
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Sections */}
      <PhilosophySection />
      <TimelineSection />
      <CapabilityMatrix />

      {/* Final Dossier Footer / CTA */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={staggerContainer}
        className="px-6 md:px-12 lg:px-20 py-32 md:py-48 bg-dark-lighter relative overflow-hidden"
      >
        {/* Background accent */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-primary/20 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            variants={fadeInUp}
            className="inline-block border border-primary/20 p-8 mb-12"
          >
            <motion.span 
              variants={badgeVariants}
              className="text-xs text-primary font-mono tracking-[0.4em] uppercase block mb-4"
            >
              Verification Complete
            </motion.span>
            <motion.h2 
              variants={heroVariants}
              className="text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-tight uppercase max-w-xl mx-auto"
            >
              Request Technical Capabilities Document
            </motion.h2>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            className="flex flex-col md:flex-row gap-6 justify-center"
          >
            <motion.div variants={fadeInUp}>
              <Link 
                href="/contact"
                className="px-12 py-5 bg-primary text-white hover:bg-primary-dark transition-all duration-300 text-sm uppercase tracking-[0.2em] font-medium inline-block"
              >
                Contact Engineering
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link 
                href="/services"
                className="px-12 py-5 border border-gray-800 text-gray-400 hover:border-white hover:text-white transition-all duration-300 text-sm uppercase tracking-[0.2em] font-medium inline-block"
              >
                Explore Solutions
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  )
}

