'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const PROJECTS = [
  {
    id: 'PRJ-001',
    title: 'Custom Architectural Facade',
    subtitle: 'High-wind Load Structural Glass',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'PRJ-002',
    title: 'Hospital Redundancy Upgrade',
    subtitle: 'Critical Infrastructure Backup',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200'
  }
]

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide, isPaused])

  return (
    <section className="bg-light dark:bg-dark border-t border-light-border/50 dark:border-dark-border/50">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="px-4 sm:px-6 md:px-12 lg:px-20 pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-8 sm:pb-10 md:pb-12 lg:pb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight text-light-text dark:text-white tracking-tight mb-2 sm:mb-3">
              Engineering Projects
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-light-text-muted dark:text-dark-text-muted font-light">
              Recent technical solutions
            </p>
          </div>
          <Link 
            href="/projects"
            className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted hover:text-primary transition-colors duration-300 flex items-center gap-2 group w-fit border-b border-transparent hover:border-primary/30 pb-1"
          >
            View All Projects <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>

        {/* Full-bleed Carousel */}
        <div 
          className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[70vh] xl:h-[75vh] overflow-hidden max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0"
            >
              <img 
                src={PROJECTS[currentIndex].image} 
                alt={PROJECTS[currentIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 md:px-12 lg:px-20 pb-8 sm:pb-10 md:pb-12 lg:pb-16 xl:pb-20">
                <div className="max-w-[1600px] mx-auto">
                  <div className="max-w-3xl">
                    <div className="mb-3 sm:mb-4">
                      <span className="text-[10px] sm:text-xs text-primary/80 font-mono tracking-[0.2em] sm:tracking-[0.3em] uppercase">{PROJECTS[currentIndex].id}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight text-white tracking-tight mb-3 sm:mb-4 leading-tight">
                      {PROJECTS[currentIndex].title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-300 font-light">
                      {PROJECTS[currentIndex].subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Minimal Carousel Controls */}
          <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 lg:bottom-16 xl:bottom-20 right-4 sm:right-6 md:right-12 lg:right-20 flex gap-2 sm:gap-3">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-0.5 transition-all duration-500 ${
                  i === currentIndex ? 'w-10 sm:w-12 bg-white' : 'w-6 sm:w-8 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

