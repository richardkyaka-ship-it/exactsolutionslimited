'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const PROJECTS = [
  {
    id: 'PRJ-001',
    title: 'Industrial Park Backup System',
    subtitle: '1.5 MW Total Capacity',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1704ed9?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'PRJ-003',
    title: 'Port Storage Modular Expansion',
    subtitle: '40 x 40ft High Cube Units',
    image: 'https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'PRJ-005',
    title: 'Custom Architectural Facade',
    subtitle: 'High-wind Load Structural Glass',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200'
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
    <section className="px-4 md:px-12 lg:px-20 py-20 md:py-32 bg-light-lighter dark:bg-dark-light">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-[10px] text-primary font-mono tracking-[0.3em] uppercase">Section 02</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-light-text dark:text-white tracking-tight uppercase">
                Engineering Projects
              </h2>
            </div>
            <p className="text-light-text-muted dark:text-dark-text-muted uppercase tracking-widest text-[10px] md:text-sm">Recent technical solutions</p>
          </div>
          <Link 
            href="/projects"
            className="text-[10px] text-light-text dark:text-white uppercase tracking-[0.3em] hover:text-primary transition-colors flex items-center gap-2 group w-fit"
          >
            View All Projects <span className="group-hover:translate-x-2 transition-transform duration-300">───→</span>
          </Link>
        </div>

        <div 
          className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden border border-light-border dark:border-dark-border"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src={PROJECTS[currentIndex].image} 
                alt={PROJECTS[currentIndex].title}
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-light-text dark:from-black via-light-text/40 dark:via-black/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-2xl pr-6">
                <span className="text-[8px] md:text-[10px] text-primary font-mono tracking-[0.4em] uppercase mb-2 md:mb-4 block">Project ID: {PROJECTS[currentIndex].id}</span>
                <h3 className="text-xl md:text-4xl font-light text-white dark:text-dark-text-primary uppercase tracking-tight mb-2 md:mb-4 leading-tight">
                  {PROJECTS[currentIndex].title}
                </h3>
                <p className="text-xs md:text-base text-gray-200 dark:text-dark-text-secondary font-mono">
                  {PROJECTS[currentIndex].subtitle}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 flex gap-2 md:gap-4">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-8 md:w-12 h-1 transition-all duration-500 ${
                  i === currentIndex ? 'bg-primary' : 'bg-light-border dark:bg-dark-border hover:bg-primary/40 dark:hover:bg-primary/40'
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

