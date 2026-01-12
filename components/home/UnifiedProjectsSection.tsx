'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/products'
import { getOptimizedAirtableImage, generateBlurDataURL } from '@/utils/image-optimizer'
import { ChevronLeft, ChevronRight, ArrowRight, FileText, MessageCircle } from 'lucide-react'

const PROJECTS = [
  {
    id: 'PRJ-001',
    title: 'Custom Architectural Facade',
    subtitle: 'High-wind Load Structural Glass',
    description: 'Advanced structural engineering for high-performance architectural glass systems',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200',
    metrics: ['2.5MW', '98% Efficiency', 'ISO Certified']
  },
  {
    id: 'PRJ-002',
    title: 'Hospital Redundancy Upgrade',
    subtitle: 'Critical Infrastructure Backup',
    description: 'Comprehensive backup systems ensuring zero-downtime for critical medical operations',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200',
    metrics: ['99.9% Uptime', '24/7 Monitoring', 'Redundant Systems']
  }
]

const CONSULTATION_CTA = {
  label: 'Project Analysis',
  title: 'Technical Consultation',
  description: 'Discuss your specific project requirements with our multi-disciplinary engineering team.',
  link: '/contact',
  linkText: 'Start a Conversation'
}

export default function UnifiedProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [nextSlide, isPaused])

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        // Fetch only featured and active products dynamically
        const res = await fetch('/api/admin/products?featured=true&status=Active')
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.status}`)
        }
        const data = await res.json()
        if (Array.isArray(data)) {
          // Filter to ensure only featured and active products, then limit to 4 for optimal display
          const featuredProducts = data
            .filter((p: Product) => p?.featured && p?.active)
            .slice(0, 4) // Limit to 4 for clean grid layout (2x2 on larger screens)
          setProducts(featuredProducts)
        } else {
          setProducts([])
        }
      } catch (error) {
        console.error('Error fetching featured products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
    
    // Optional: Refresh featured products periodically or on focus
    const handleFocus = () => {
      fetchFeatured()
    }
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (carouselRef.current) {
        const rect = carouselRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('mousemove', handleMouseMove)
      return () => carousel.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 50, damping: 20 })
  const springY = useSpring(y, { stiffness: 50, damping: 20 })
  
  useEffect(() => {
    x.set(mousePosition.x)
    y.set(mousePosition.y)
  }, [mousePosition, x, y])

  const parallaxX = useTransform(springX, [0, 1920], [-20, 20])
  const parallaxY = useTransform(springY, [0, 1080], [-20, 20])

  return (
    <section className="bg-light dark:bg-dark border-t border-light-border/40 dark:border-dark-border/40 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 right-0 opacity-[0.02] dark:opacity-[0.02] pointer-events-none">
        <motion.span 
          className="text-[200px] sm:text-[250px] md:text-[350px] lg:text-[450px] xl:text-[550px] font-extralight text-primary leading-none select-none block"
          animate={{ 
            opacity: [0.02, 0.04, 0.02],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          02
        </motion.span>
      </div>
      
      {/* Animated Geometric Accent Lines */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scaleX: [0.8, 1, 0.8]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute top-1/3 left-0 w-px h-1/3 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      <div className="absolute bottom-1/4 right-0 w-px h-1/4 bg-gradient-to-t from-transparent via-primary/5 to-transparent"></div>

      <div className="max-w-[1920px] mx-auto relative z-10 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 pt-24 sm:pt-28 md:pt-32 lg:pt-40 xl:pt-48 pb-24 sm:pb-28 md:pb-32 lg:pb-40 xl:pb-48">
        {/* ========== ENGINEERING PROJECTS - PREMIUM CAROUSEL ========== */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-32 sm:mb-36 md:mb-40 lg:mb-48 xl:mb-56"
        >
          {/* Premium Header with Dynamic Elements */}
          <div className="relative mb-16 sm:mb-20 md:mb-24">
            <motion.div 
              className="flex items-center gap-4 sm:gap-5 mb-12 sm:mb-14"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                className="text-[10px] sm:text-[11px] text-primary font-mono tracking-[0.45em] sm:tracking-[0.55em] uppercase"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                02
              </motion.span>
              <motion.div 
                className="h-px flex-1 max-w-24 sm:max-w-32 bg-gradient-to-r from-primary/60 via-primary/40 via-primary/20 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-primary/50"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 sm:gap-12 md:gap-14 lg:gap-20 xl:gap-24 items-end">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <div className="absolute -left-6 sm:-left-8 md:-left-12 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/10 to-transparent"></div>
                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight text-light-text dark:text-white tracking-tight mb-5 sm:mb-6 leading-[0.90]">
                  Engineering Projects
                </h2>
                <motion.div 
                  className="flex items-center gap-4 sm:gap-5 mt-6 sm:mt-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div 
                    className="h-px w-12 sm:w-16 bg-primary/40"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  />
                  <p className="text-xs sm:text-sm md:text-base text-light-text-muted dark:text-dark-text-muted font-light">
                    Recent technical solutions
                  </p>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="flex items-end justify-end lg:justify-start pt-4 lg:pt-0 gap-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Link 
                  href="/projects"
                  className="relative group text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted hover:text-primary transition-all duration-700 flex items-center gap-4 w-fit"
                >
                  <motion.div 
                    className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary/30"
                    whileHover={{ scale: 2, backgroundColor: 'rgba(255, 102, 0, 1)' }}
                  />
                  <span className="border-b border-transparent group-hover:border-primary/50 pb-1 transition-all duration-500">View All Projects</span>
                  <motion.span 
                    className="group-hover:translate-x-3 transition-transform duration-700"
                    whileHover={{ x: 12 }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Ultra Premium Dynamic Carousel */}
          <motion.div
            ref={carouselRef}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative h-[65vh] sm:h-[70vh] md:h-[75vh] lg:h-[85vh] xl:h-[90vh] overflow-hidden group/carousel rounded-sm"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Animated Border Frame */}
            <motion.div 
              className="absolute inset-0 border border-primary/10 group-hover/carousel:border-primary/30 transition-colors duration-700 pointer-events-none z-20 rounded-sm"
              animate={{ 
                borderColor: [
                  'rgba(255, 102, 0, 0.1)',
                  'rgba(255, 102, 0, 0.2)',
                  'rgba(255, 102, 0, 0.1)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Dynamic Geometric Corner Accents */}
            <motion.div 
              className="absolute top-0 left-0 w-20 h-20 sm:w-24 sm:h-24 border-t border-l border-primary/20 z-20 pointer-events-none"
              whileHover={{ borderColor: 'rgba(255, 102, 0, 0.5)' }}
            />
            <motion.div 
              className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 border-t border-r border-primary/20 z-20 pointer-events-none"
              whileHover={{ borderColor: 'rgba(255, 102, 0, 0.5)' }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 border-b border-l border-primary/20 z-20 pointer-events-none"
              whileHover={{ borderColor: 'rgba(255, 102, 0, 0.5)' }}
            />
            <motion.div 
              className="absolute bottom-0 right-0 w-20 h-20 sm:w-24 sm:h-24 border-b border-r border-primary/20 z-20 pointer-events-none"
              whileHover={{ borderColor: 'rgba(255, 102, 0, 0.5)' }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1, rotateY: 5 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotateY: -5 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0"
                style={{
                  x: parallaxX,
                  y: parallaxY
                }}
              >
                <img 
                  src={PROJECTS[currentIndex].image} 
                  alt={PROJECTS[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                {/* Multi-layer Dynamic Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 via-black/30 to-black/5"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>
                <motion.div 
                  className="absolute inset-0 bg-primary/0"
                  animate={{ 
                    backgroundColor: [
                      'rgba(255, 102, 0, 0)',
                      'rgba(255, 102, 0, 0.05)',
                      'rgba(255, 102, 0, 0)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                {/* Premium Content Overlay with Dynamic Reveal */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 pb-12 sm:pb-14 md:pb-18 lg:pb-24 xl:pb-28"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <div className="max-w-[1800px] mx-auto">
                    <div className="max-w-5xl space-y-6 sm:space-y-7 md:space-y-8 relative">
                      {/* Dynamic ID Badge */}
                      <motion.div 
                        className="flex items-center gap-4 sm:gap-5 mb-4"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <motion.span 
                          className="text-[10px] sm:text-xs text-primary/95 font-mono tracking-[0.35em] sm:tracking-[0.45em] uppercase bg-black/40 backdrop-blur-md px-4 py-2 rounded-sm border border-primary/30"
                          whileHover={{ scale: 1.05, borderColor: 'rgba(255, 102, 0, 0.6)' }}
                        >
                          {PROJECTS[currentIndex].id}
                        </motion.span>
                        <motion.div 
                          className="h-px flex-1 max-w-20 sm:max-w-28 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.5, duration: 0.6 }}
                        />
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full bg-primary/70"
                          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                      
                      <motion.h3 
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-white tracking-tight mb-6 sm:mb-7 leading-[0.92]"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                      >
                        {PROJECTS[currentIndex].title}
                      </motion.h3>
                      
                      <motion.div 
                        className="flex items-start gap-4 sm:gap-5 mb-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <div className="h-px w-8 sm:w-12 bg-primary/60 mt-2.5"></div>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 font-light max-w-3xl leading-relaxed">
                          {PROJECTS[currentIndex].subtitle}
                        </p>
                      </motion.div>

                      {/* Dynamic Metrics */}
                      <motion.div 
                        className="flex flex-wrap gap-4 sm:gap-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        {PROJECTS[currentIndex].metrics?.map((metric, i) => (
                          <motion.div
                            key={i}
                            className="px-4 py-2 bg-black/30 backdrop-blur-sm border border-primary/20 rounded-sm"
                            whileHover={{ scale: 1.05, borderColor: 'rgba(255, 102, 0, 0.5)' }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                          >
                            <span className="text-[10px] sm:text-xs text-primary/90 font-mono uppercase tracking-wider">
                              {metric}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Premium Navigation Controls */}
            <div className="absolute bottom-12 sm:bottom-14 md:bottom-18 lg:bottom-24 xl:bottom-28 right-6 sm:right-8 md:right-12 lg:right-20 xl:right-24 flex items-center gap-6 sm:gap-8 z-30">
              {/* Previous Button */}
              <motion.button
                onClick={prevSlide}
                className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:border-primary/50 transition-all duration-500 group"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors" />
              </motion.button>

              {/* Indicators */}
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="h-px w-8 sm:w-12 bg-white/20"></div>
                {PROJECTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className="relative group"
                    aria-label={`Go to project ${i + 1}`}
                  >
                    <motion.div
                      className={`h-0.5 transition-all duration-700 ${
                        i === currentIndex 
                          ? 'w-16 sm:w-20 bg-white' 
                          : 'w-10 sm:w-12 bg-white/30 hover:bg-white/70'
                      }`}
                      whileHover={{ scaleY: 1.5 }}
                    >
                      {i === currentIndex && (
                        <motion.div
                          layoutId="carousel-indicator"
                          className="absolute inset-0 bg-white"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <motion.button
                onClick={nextSlide}
                className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:border-primary/50 transition-all duration-500 group"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* ========== INDUSTRIAL EQUIPMENT & TECHNICAL SPECS - PREMIUM GRID ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] xl:grid-cols-[1.5fr_1fr] gap-16 sm:gap-20 md:gap-24 lg:gap-28 xl:gap-32">
          {/* Left: Industrial Equipment with Premium Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="absolute -left-4 sm:-left-6 md:-left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/10 via-transparent to-transparent hidden lg:block"></div>

            <div className="space-y-16 sm:space-y-20 md:space-y-24">
              {/* Premium Header */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <motion.div 
                  className="flex items-center gap-4 sm:gap-5 mb-8 sm:mb-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.span 
                    className="text-[10px] sm:text-[11px] text-primary/70 font-mono tracking-[0.45em] sm:tracking-[0.55em] uppercase"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Equipment & Asset Catalog
                  </motion.span>
                  <motion.div 
                    className="h-px flex-1 max-w-20 sm:max-w-28 bg-gradient-to-r from-primary/35 via-primary/20 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                  <motion.div 
                    className="w-1.5 h-1.5 rounded-full bg-primary/40"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="h-px w-6 sm:w-8 bg-primary/25"></div>
                </motion.div>
                
                <div className="mb-12 sm:mb-14 md:mb-16">
                  <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight text-light-text dark:text-white tracking-tight mb-6 sm:mb-7 leading-[0.90]">
                    Industrial Equipment
                  </h2>
                  <motion.div 
                    className="flex items-center gap-4 sm:gap-5 mt-8 sm:mt-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.div 
                      className="h-px w-10 sm:w-14 bg-primary/40"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                    <p className="text-xs sm:text-sm md:text-base text-light-text-muted dark:text-dark-text-muted font-light">
                      Browse featured equipment and obtain detailed specifications
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Premium Products Grid with Advanced Interactions - Dynamically displays featured products from admin */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12 md:gap-14 ${
                products.length === 1 ? 'max-w-md mx-auto' : ''
              }`}>
                {loading ? (
                  <div className="col-span-full py-32 text-center">
                    <motion.div 
                      className="inline-block w-10 h-10 border-2 border-light-border dark:border-dark-border border-t-primary rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                ) : products && products.length > 0 ? (
                  products.map((product, i) => (
                    <motion.div
                      key={product.code || product.id || i}
                      initial={{ opacity: 0, y: 50, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: i * 0.15, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="group relative"
                      onMouseEnter={() => setHoveredProduct(i)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      {/* Dynamic Border Frame */}
                      <motion.div 
                        className="absolute inset-0 border border-primary/5 rounded-sm pointer-events-none z-10"
                        animate={{
                          borderColor: hoveredProduct === i 
                            ? 'rgba(255, 102, 0, 0.3)' 
                            : 'rgba(255, 102, 0, 0.05)'
                        }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      <motion.div 
                        className="relative aspect-[4/3] overflow-hidden bg-light-lighter dark:bg-dark-lighter mb-6 sm:mb-7 rounded-sm"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                      >
                        {product.images && product.images.length > 0 && product.images[0] ? (
                          <Image
                            src={getOptimizedAirtableImage(product.images[0])}
                            alt={product.name || 'Product image'}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-1000 ease-out"
                            style={{
                              transform: hoveredProduct === i ? 'scale(1.1)' : 'scale(1)'
                            }}
                            loading="lazy"
                            quality={90}
                            placeholder="blur"
                            blurDataURL={generateBlurDataURL()}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-light-lighter dark:bg-dark-lighter">
                            <span className="text-[10px] sm:text-xs text-light-text-subtle dark:text-dark-text-subtle uppercase tracking-widest font-mono">No Image</span>
                          </div>
                        )}
                        
                        {/* Dynamic Code Badge */}
                        {product.code && (
                          <motion.div 
                            className="absolute top-6 left-6 sm:top-7 sm:left-7 z-20"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ 
                              opacity: hoveredProduct === i ? 1 : 0.8,
                              y: hoveredProduct === i ? 0 : -5
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.span 
                              className="text-[10px] sm:text-xs text-primary/95 font-mono uppercase tracking-wider bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-sm border border-primary/30"
                              whileHover={{ scale: 1.05 }}
                            >
                              {product.code}
                            </motion.span>
                          </motion.div>
                        )}
                        
                        {/* Dynamic Multi-layer Hover Overlay */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent"
                          animate={{
                            background: hoveredProduct === i
                              ? 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)'
                              : 'linear-gradient(to top, rgba(0,0,0,0), transparent)'
                          }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.div 
                          className="absolute inset-0 bg-primary/0"
                          animate={{
                            backgroundColor: hoveredProduct === i
                              ? 'rgba(255, 102, 0, 0.1)'
                              : 'rgba(255, 102, 0, 0)'
                          }}
                          transition={{ duration: 0.5 }}
                        />
                        
                        {/* Dynamic Corner Accent */}
                        <motion.div 
                          className="absolute top-0 right-0 w-16 h-16 border-t border-r border-primary/0"
                          animate={{
                            borderColor: hoveredProduct === i
                              ? 'rgba(255, 102, 0, 0.4)'
                              : 'rgba(255, 102, 0, 0)'
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      </motion.div>
                      
                      <div className="space-y-5 sm:space-y-6 relative">
                        {/* Dynamic Accent Line */}
                        <motion.div 
                          className="absolute -left-4 top-0 bottom-0 w-px bg-primary/0"
                          animate={{
                            backgroundColor: hoveredProduct === i
                              ? 'rgba(255, 102, 0, 0.3)'
                              : 'rgba(255, 102, 0, 0)'
                          }}
                          transition={{ duration: 0.5 }}
                        />
                        
                        <motion.h3 
                          className="text-2xl sm:text-3xl md:text-4xl font-extralight text-light-text dark:text-white tracking-tight transition-colors duration-500"
                          animate={{
                            color: hoveredProduct === i
                              ? 'rgba(255, 102, 0, 0.95)'
                              : undefined
                          }}
                        >
                          {product.name || 'Product'}
                        </motion.h3>
                        
                        {product.keySpecs && product.keySpecs[0] && (
                          <motion.div 
                            className="flex items-start gap-3 sm:gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hoveredProduct === i ? 1 : 0.8 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="h-px w-6 sm:w-8 bg-primary/30 mt-2"></div>
                            <p className="text-[10px] sm:text-xs md:text-sm text-light-text-muted dark:text-dark-text-muted font-light flex-1">
                              {product.keySpecs[0]}
                            </p>
                          </motion.div>
                        )}
                        
                        {product.id && (
                          <motion.div
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Link
                              href={`/products/${product.id}`}
                              className="inline-block relative group/link text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted hover:text-primary transition-all duration-500 flex items-center gap-4 w-fit"
                            >
                              <motion.div 
                                className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary/30"
                                whileHover={{ scale: 2, backgroundColor: 'rgba(255, 102, 0, 1)' }}
                              />
                              <span className="border-b border-transparent group-hover/link:border-primary/50 pb-1 transition-all duration-500">View Details</span>
                              <motion.span 
                                className="group-hover/link:translate-x-3 transition-transform duration-500"
                                whileHover={{ x: 12 }}
                              >
                                →
                              </motion.span>
                            </Link>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-32 text-center">
                    <p className="text-sm text-light-text-muted dark:text-dark-text-muted">No featured products available</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: Combined Equipment Inquiry & Technical Consultation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <div className="pl-0 lg:pl-10 xl:pl-14 border-l-0 lg:border-l border-light-border/15 dark:border-dark-border/15 lg:pl-10 xl:pl-14 relative">
              <motion.div 
                className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/10 via-transparent to-transparent hidden lg:block"
                animate={{ 
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="space-y-12 sm:space-y-14 md:space-y-16">
                {/* Equipment Inquiry Section */}
                <motion.div 
                  className="group/specs relative p-6 sm:p-8 md:p-10 rounded-sm border border-light-border/10 dark:border-dark-border/10 hover:border-primary/30 transition-all duration-700 bg-light-lighter/30 dark:bg-dark-lighter/30 hover:bg-light-lighter/50 dark:hover:bg-dark-lighter/50"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <motion.div 
                    className="absolute -left-2 top-0 w-8 h-8 border-t border-l border-primary/0 group-hover/specs:border-primary/30 transition-colors duration-700"
                    animate={{
                      borderColor: 'rgba(255, 102, 0, 0)'
                    }}
                  />
                  
                  <div className="space-y-6 sm:space-y-7">
                    <motion.div 
                      className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <FileText className="w-4 h-4 text-primary/70" />
                      <motion.span 
                        className="text-[10px] sm:text-[11px] text-primary/70 font-mono tracking-[0.45em] sm:tracking-[0.55em] uppercase"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        Equipment Inquiry
                      </motion.span>
                      <motion.div 
                        className="h-px flex-1 max-w-16 sm:max-w-20 bg-primary/20 group-hover/specs:bg-primary/60 group-hover/specs:max-w-24 transition-all duration-700"
                        whileHover={{ scaleX: 1.2 }}
                      />
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover/specs:bg-primary/70 group-hover/specs:scale-125 transition-all duration-700"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                    
                    <div className="space-y-5 sm:space-y-6">
                      <motion.h3 
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-light-text dark:text-dark-text-primary tracking-tight leading-[0.92]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                      >
                        Obtain Technical Specifications
                      </motion.h3>
                      
                      <motion.div 
                        className="flex items-start gap-4 sm:gap-5"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                      >
                        <motion.div 
                          className="h-px w-8 sm:w-12 bg-primary/30 mt-2.5"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.7, duration: 0.6 }}
                        />
                        <p className="text-sm sm:text-base md:text-lg text-light-text-muted dark:text-dark-text-muted font-light leading-relaxed">
                          Get detailed technical specifications and availability for our industrial equipment range.
                        </p>
                      </motion.div>
                    </div>
                    
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link 
                        href="/products"
                        className="inline-flex items-center gap-4 sm:gap-5 text-xs sm:text-sm text-light-text dark:text-dark-text-primary hover:text-primary transition-all duration-500 w-fit group/link relative mt-6 sm:mt-8"
                      >
                        <motion.div 
                          className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary/30"
                          whileHover={{ scale: 2, backgroundColor: 'rgba(255, 102, 0, 1)' }}
                        />
                        <span className="border-b border-transparent group-hover/link:border-primary/50 pb-1 transition-all duration-500">Browse Full Catalog</span>
                        <motion.span 
                          className="group-hover/link:translate-x-3 transition-transform duration-500"
                          whileHover={{ x: 12 }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Technical Consultation Section */}
                <motion.div 
                  className="group/cta relative p-6 sm:p-8 md:p-10 rounded-sm border border-light-border/10 dark:border-dark-border/10 hover:border-primary/30 transition-all duration-700 bg-light-lighter/30 dark:bg-dark-lighter/30 hover:bg-light-lighter/50 dark:hover:bg-dark-lighter/50"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <motion.div 
                    className="absolute -left-2 top-0 w-8 h-8 border-t border-l border-primary/0 group-hover/cta:border-primary/30 transition-colors duration-700"
                    animate={{
                      borderColor: 'rgba(255, 102, 0, 0)'
                    }}
                  />
                  
                  <div className="space-y-6 sm:space-y-7 md:space-y-8">
                    <motion.div 
                      className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                    >
                      <MessageCircle className="w-4 h-4 text-primary/70" />
                      <motion.span 
                        className="text-[10px] sm:text-[11px] text-primary/70 font-mono tracking-[0.45em] sm:tracking-[0.55em] uppercase"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {CONSULTATION_CTA.label}
                      </motion.span>
                      <motion.div 
                        className="h-px flex-1 max-w-20 sm:max-w-28 bg-primary/20 group-hover/cta:bg-primary/60 group-hover/cta:max-w-32 transition-all duration-700"
                        whileHover={{ scaleX: 1.2 }}
                      />
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover/cta:bg-primary/70 group-hover/cta:scale-125 transition-all duration-700"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <div className="h-px w-6 sm:w-8 bg-primary/20 group-hover/cta:bg-primary/50 transition-colors duration-700"></div>
                    </motion.div>
                    
                    <div className="space-y-5 sm:space-y-6">
                      <motion.h2 
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-light-text dark:text-dark-text-primary tracking-tight leading-[0.90]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                      >
                        {CONSULTATION_CTA.title}
                      </motion.h2>
                      
                      <motion.div 
                        className="flex items-start gap-4 sm:gap-5"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                      >
                        <motion.div 
                          className="h-px w-8 sm:w-12 bg-primary/30 mt-2.5"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.9, duration: 0.6 }}
                        />
                        <p className="text-sm sm:text-base md:text-lg text-light-text-muted dark:text-dark-text-muted font-light leading-relaxed">
                          {CONSULTATION_CTA.description}
                        </p>
                      </motion.div>
                    </div>
                    
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link 
                        href={CONSULTATION_CTA.link}
                        className="inline-flex items-center gap-4 sm:gap-5 text-xs sm:text-sm text-light-text dark:text-dark-text-primary hover:text-primary transition-all duration-500 w-fit group/link mt-6 sm:mt-8 relative"
                      >
                        <motion.div 
                          className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary/30"
                          whileHover={{ scale: 2, backgroundColor: 'rgba(255, 102, 0, 1)' }}
                        />
                        <span className="border-b border-transparent group-hover/link:border-primary/50 pb-1 transition-all duration-500">{CONSULTATION_CTA.linkText}</span>
                        <motion.span 
                          className="group-hover/link:translate-x-3 transition-transform duration-500"
                          whileHover={{ x: 12 }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.div>
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
