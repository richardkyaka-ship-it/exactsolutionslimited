'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-[95vh] flex items-center px-4 sm:px-6 md:px-12 lg:px-20 pt-20 sm:pt-24 md:pt-32 pb-20 sm:pb-24 md:pb-32 overflow-hidden">
      <div className="max-w-[1920px] mx-auto w-full relative">
        {/* Creative Background Elements - Asymmetric */}
        <div className="absolute bottom-0 right-0 opacity-[0.03] dark:opacity-[0.03] pointer-events-none">
          <span className="text-[150px] sm:text-[180px] md:text-[250px] lg:text-[350px] xl:text-[450px] font-extralight text-primary leading-none select-none block">
            01
          </span>
        </div>

        {/* Premium Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] xl:grid-cols-[2fr_1fr] gap-8 sm:gap-12 md:gap-16 lg:gap-24 xl:gap-32 items-start relative z-10">
          {/* Left - Hero Typography with Creative Stagger */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="space-y-8 sm:space-y-10 md:space-y-14 lg:space-y-16 lg:sticky lg:top-32"
          >
            {/* Premium Header Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8"
            >
              <span className="text-[10px] sm:text-[11px] text-primary font-mono tracking-[0.35em] sm:tracking-[0.45em] uppercase">Home // 2025</span>
              <div className="h-px flex-1 max-w-20 sm:max-w-28 bg-gradient-to-r from-primary/50 via-primary/30 to-transparent"></div>
              <div className="w-1 h-1 rounded-full bg-primary/40"></div>
            </motion.div>

            {/* Creative Typography Stack with Premium Spacing */}
            <div className="space-y-0 sm:space-y-1 md:space-y-2 lg:space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 40, clipPath: 'inset(0 100% 0 0)' }}
                animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)' }}
                transition={{ delay: 0.7, duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-6xl sm:text-7xl md:text-9xl lg:text-[160px] xl:text-[180px] font-extralight text-light-text dark:text-white leading-[0.82] tracking-[-0.04em] uppercase"
              >
                EXACT
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 40, clipPath: 'inset(0 100% 0 0)' }}
                animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)' }}
                transition={{ delay: 0.9, duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-5xl sm:text-6xl md:text-8xl lg:text-[140px] xl:text-[160px] font-extralight text-primary leading-[0.88] tracking-[-0.03em] uppercase -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-6"
              >
                SOLUTIONS
              </motion.h1>
            </div>

            {/* Premium Divider with Creative Design */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.1, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6"
            >
              <div className="h-px w-20 sm:w-28 md:w-40 bg-gradient-to-r from-primary/70 via-primary/40 to-transparent"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
              <div className="h-px flex-1 max-w-16 bg-primary/20"></div>
            </motion.div>

            {/* Premium Description with Enhanced Typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.9 }}
              className="space-y-6 sm:space-y-8 pt-4 sm:pt-6"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-light-text-muted dark:text-gray-400 leading-relaxed max-w-2xl">
                Industrial solutions engineering for precision-driven projects across East Africa.
              </p>
              <div className="flex items-center gap-3 sm:gap-4 pt-2">
                <div className="h-px w-8 sm:w-12 bg-primary/40"></div>
                <span className="text-[10px] sm:text-xs md:text-sm text-light-text-muted dark:text-gray-500 uppercase tracking-[0.25em] sm:tracking-[0.35em] font-light">
                  Established 2015
                </span>
                <div className="w-1 h-1 rounded-full bg-primary/30"></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Premium Creative Element - Stats & Journey */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="mt-12 sm:mt-16 md:mt-20 lg:mt-0 lg:pt-40 xl:pt-48 flex flex-col justify-center"
          >
            <div className="lg:pl-8 xl:pl-12 border-l border-light-border/20 dark:border-dark-border/20 lg:pl-8 xl:pl-12 relative">
              {/* Creative Vertical Accent */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/15 to-transparent"></div>

              {/* Premium Stats & Journey Display */}
              <div className="space-y-16 sm:space-y-18 md:space-y-20 lg:space-y-24 xl:space-y-28 pl-6 sm:pl-8">
                {/* Company Journey */}
                <motion.div
                  initial={{ opacity: 0, y: 30, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                  className="group relative"
                >
                  <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                    <span className="text-[9px] sm:text-[10px] text-primary/50 group-hover:text-primary transition-colors duration-500 font-mono tracking-[0.35em] sm:tracking-[0.45em] uppercase">Since 2015</span>
                    <div className="h-px flex-1 max-w-16 sm:max-w-20 bg-primary/20 group-hover:bg-primary/40 transition-colors duration-500"></div>
                    <div className="w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary/60 transition-colors duration-500"></div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-primary leading-none tracking-tight">
                      10+
                    </div>
                    <p className="text-[10px] sm:text-xs md:text-sm text-light-text-muted dark:text-gray-400 font-light uppercase tracking-[0.2em] sm:tracking-[0.25em]">
                      Years of Excellence
                    </p>
                  </div>
                </motion.div>

                {/* Premium Divider */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 1.6, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                  className="h-px w-20 sm:w-28 bg-gradient-to-r from-primary/40 via-primary/20 to-transparent"
                />

                {/* Value Proposition */}
                <motion.div
                  initial={{ opacity: 0, y: 30, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 1.8, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                  className="group relative"
                >
                  <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                    <span className="text-[9px] sm:text-[10px] text-primary/50 group-hover:text-primary transition-colors duration-500 font-mono tracking-[0.35em] sm:tracking-[0.45em] uppercase">Approach</span>
                    <div className="h-px flex-1 max-w-16 sm:max-w-20 bg-primary/20 group-hover:bg-primary/40 transition-colors duration-500"></div>
                    <div className="w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary/60 transition-colors duration-500"></div>
                  </div>
                  <div className="space-y-4 sm:space-y-5">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light text-light-text dark:text-white leading-relaxed max-w-xs">
                      Precision engineering meets innovative solutions across East Africa.
                    </p>
                    <Link 
                      href="/contact"
                      className="inline-flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-light-text-muted dark:text-gray-400 hover:text-primary transition-all duration-500 group/link w-fit border-b border-transparent hover:border-primary/40 pb-1"
                    >
                      <span>Start Your Project</span>
                      <span className="group-hover/link:translate-x-2 transition-transform duration-500">→</span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

