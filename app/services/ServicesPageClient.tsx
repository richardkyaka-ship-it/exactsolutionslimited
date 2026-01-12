'use client'

import React, { useEffect } from 'react'
import ServiceSection from '@/components/services/ServiceSection'
import { motion } from 'framer-motion'
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

const SERVICES_DATA = [
  {
    id: 'energy-solutions',
    number: '01',
    title: 'Equipment, Generators & Energy',
    description: 'High-performance power systems designed for industrial resilience. We provide end-to-end energy solutions from technical sizing to installation and maintenance.',
    imageSrc: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&q=80&w=2000',
    imageAlt: 'Industrial Power Generator Blueprint',
    annotations: [
      { x: 30, y: 40, label: 'Enclosure', value: 'Soundproofed Steel' },
      { x: 70, y: 60, label: 'Output', value: '1250 kVA' },
      { x: 50, y: 20, label: 'Cooling', value: 'Liquid System' }
    ],
    specs: [
      { parameter: 'Power Range', value: '10kVA — 2500kVA' },
      { parameter: 'Fuel Type', value: 'Diesel / Natural Gas' },
      { parameter: 'Frequency', value: '50Hz / 60Hz' },
      { parameter: 'Voltage', value: '240V / 415V' },
      { parameter: 'Alternator', value: 'Brushless / Synchronous' },
      { parameter: 'Control System', value: 'DeepSea / ComAp' }
    ],
    highlights: [
      { 
        title: 'Critical Power Backup', 
        description: 'Automatic failover systems for data centers and hospitals with < 10ms switching.' 
      },
      { 
        title: 'Hybrid Energy Systems', 
        description: 'Solar-Diesel synchronization for remote industrial sites reducing fuel costs by 40%.' 
      }
    ]
  },
  {
    id: 'containers-reefers',
    number: '02',
    title: 'Shipping Containers & Reefers',
    description: 'Specialized storage and logistics infrastructure. Our containers and refrigerated units (reefers) are built to international maritime standards for extreme durability.',
    imageSrc: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000',
    imageAlt: 'Shipping Container Technical Drawing',
    annotations: [
      { x: 20, y: 50, label: 'Length', value: '12,192mm' },
      { x: 80, y: 30, label: 'Capacity', value: '67.7 m³' },
      { x: 50, y: 80, label: 'Wall', value: 'Corten Steel' }
    ],
    specs: [
      { parameter: 'Standard Sizes', value: '20ft / 40ft / 40ft HC' },
      { parameter: 'Temp Range', value: '-30°C to +30°C' },
      { parameter: 'Insulation', value: 'Polyurethane Foam' },
      { parameter: 'Max Payload', value: '28,480 kg' },
      { parameter: 'Interior Floor', value: 'T-Bar Aluminum' },
      { parameter: 'Power Input', value: '380V / 460V 3-Phase' }
    ],
    highlights: [
      { 
        title: 'Cold Storage Hubs', 
        description: 'Multi-unit reefers integrated for agricultural exports and pharmaceutical storage.' 
      },
      { 
        title: 'Modular Fabrication', 
        description: 'Custom-modified containers for remote office spaces and laboratory units.' 
      }
    ]
  },
  {
    id: 'metal-fabrication',
    number: '03',
    title: 'Glass, Aluminum & Steel',
    description: 'Precision architectural and industrial fabrication. We specialize in high-grade stainless steel work and structural aluminum systems for modern commercial applications.',
    imageSrc: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2000',
    imageAlt: 'Stainless Steel Fabrication Schematic',
    annotations: [
      { x: 40, y: 30, label: 'Grade', value: '316L Stainless' },
      { x: 60, y: 70, label: 'Tolerance', value: '±0.5mm' },
      { x: 25, y: 60, label: 'Finish', value: 'Satin Brushed' }
    ],
    specs: [
      { parameter: 'Profile Types', value: 'Heavy Duty Industrial' },
      { parameter: 'Material Grade', value: '304 / 316 Stainless' },
      { parameter: 'Finish', value: 'Mirror / Satin / Powder' },
      { parameter: 'Glass Type', value: 'Laminated / Tempered' },
      { parameter: 'Welding', value: 'TIG / MIG Certified' },
      { parameter: 'Max Sheet', value: '1500mm x 3000mm' }
    ],
    highlights: [
      { 
        title: 'Structural Facades', 
        description: 'Full-height glass curtain walls with thermal-break aluminum profiles.' 
      },
      { 
        title: 'Industrial Stainless', 
        description: 'Custom fabrication of food-grade processing equipment and safety railings.' 
      }
    ]
  }
]

export default function ServicesPageClient() {
  // Handle hash scrolling when page loads or hash changes
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      // Wait for DOM to be ready, then scroll
      const scrollToSection = () => {
        const element = document.getElementById(hash)
        if (element) {
          const yOffset = -80 // Offset for better visibility
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }
      
      // Try immediately, then retry after a short delay to ensure DOM is ready
      scrollToSection()
      setTimeout(scrollToSection, 100)
      setTimeout(scrollToSection, 500)
    }
  }, [])

  return (
    <main className="bg-light dark:bg-black text-light-text dark:text-white selection:bg-primary/20 selection:text-light-text dark:selection:text-white min-h-screen">
      {/* Editorial Hero Section - ZOOM BLUR REVEAL */}
      <section className="min-h-[80vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-32 relative overflow-hidden">
        {/* Background Number Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
          animate={{ opacity: 0.02, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute bottom-0 right-0 dark:opacity-[0.02] pointer-events-none"
        >
          <span className="text-[200px] md:text-[300px] lg:text-[400px] font-extralight text-primary leading-none select-none block">
            04
          </span>
        </motion.div>

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="text-xs text-primary font-mono tracking-[0.4em] uppercase">Blueprint // 2025</span>
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-px w-12 bg-gradient-to-r from-primary/60 via-primary/40 to-transparent" 
            />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 1.3, filter: 'blur(15px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-8xl lg:text-[120px] xl:text-[140px] font-light leading-[0.9] tracking-tighter uppercase mb-12 text-light-text dark:text-white"
          >
            Exact <motion.span 
              initial={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-primary"
            >
              Capabilities
            </motion.span>
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-end">
            <motion.div 
              initial={{ opacity: 0, scale: 1.1, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 1 }}
              className="lg:col-span-1"
            >
              <p className="text-light-text-muted dark:text-gray-500 text-sm md:text-base leading-relaxed uppercase tracking-wider">
                Technical solutions for <br />
                heavy industry, logistics <br />
                & architectural fabrication.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 1.1, filter: 'blur(8px)', x: 50 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', x: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="lg:col-span-2 flex flex-col items-start md:items-end"
            >
              <div className="space-y-2 text-right">
                <p className="text-[10px] text-light-text-subtle dark:text-gray-600 font-mono uppercase tracking-[0.2em]">Scroll to Explore Specs</p>
                <motion.div 
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                  className="h-24 w-px bg-gradient-to-b from-primary/60 via-primary/40 to-transparent mx-auto md:mr-4" 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Sections */}
      {SERVICES_DATA.map((service) => (
        <ServiceSection key={service.id} {...service} />
      ))}

      {/* Final CTA Section */}
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

        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <motion.span 
            variants={badgeVariants}
            className="text-xs text-primary font-mono tracking-[0.4em] uppercase mb-8 block"
          >
            Project Consultation
          </motion.span>
          <motion.h2 
            variants={heroVariants}
            className="text-4xl md:text-7xl lg:text-8xl font-light mb-12 tracking-tight uppercase"
          >
            Ready to Build?
          </motion.h2>
          <motion.div 
            variants={staggerContainer}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <motion.div variants={fadeInUp}>
              <Link 
                href="/contact"
                className="px-12 py-5 border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 text-sm uppercase tracking-[0.2em] font-medium inline-block"
              >
                Start Technical Brief
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link 
                href="/projects"
                className="px-12 py-5 border border-gray-800 text-gray-400 hover:border-white hover:text-white transition-all duration-300 text-sm uppercase tracking-[0.2em] font-medium inline-block"
              >
                View Case Studies
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  )
}

