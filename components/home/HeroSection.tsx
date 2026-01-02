'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      {/* Subtle technical overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="circuit-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1" />
              <circle cx="0" cy="0" r="0.2" fill="white" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#circuit-grid)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 space-y-6 md:space-y-12 w-full max-w-6xl"
      >
        <div className="flex flex-col items-center">
          <div className="text-[10px] md:text-sm text-gray-500 uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 md:mb-8 font-light">
            Exact Solutions Limited
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[140px] font-light text-white leading-[1.1] md:leading-[0.9] tracking-[-0.04em] md:tracking-[-0.05em] mb-6 md:mb-12 uppercase">
            EXACT
            <br />
            <span className="font-normal text-primary">SOLUTIONS</span>
          </h1>
          <div className="flex items-center justify-center gap-3 md:gap-6">
            <div className="h-px w-6 md:w-24 bg-primary/40"></div>
            <span className="text-[10px] md:text-xl text-gray-400 uppercase tracking-[0.2em] md:tracking-[0.5em] font-light">
              Industrial Solutions Engineering
            </span>
            <div className="h-px w-6 md:w-24 bg-primary/40"></div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 md:gap-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 md:gap-3 text-[9px] md:text-sm text-primary tracking-[0.3em] md:tracking-[0.4em] uppercase border border-primary/20 px-4 md:px-6 py-1.5 md:py-2 bg-primary/5"
          >
            <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-primary rounded-full animate-pulse" />
            <span>Now Live</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">        <div className="h-12 w-px bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  )
}

