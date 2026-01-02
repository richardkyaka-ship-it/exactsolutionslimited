'use client'

import { motion } from 'framer-motion'
import { Zap, Container, Factory } from 'lucide-react'
import Link from 'next/link'

const SERVICES = [
  {
    icon: Zap,
    title: 'Equipment & Generators',
    description: 'Industrial power solutions designed for maximum resilience.'
  },
  {
    icon: Container,
    title: 'Shipping Containers',
    description: 'Specialized storage and refrigerated logistics infrastructure.'
  },
  {
    icon: Factory,
    title: 'Building & Construction',
    description: 'Precision glass, aluminum, and stainless steel fabrication.'
  }
]

export default function RestrictedSplashScreen() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Subtle technical overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="splash-circuit-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1" />
              <circle cx="0" cy="0" r="0.2" fill="white" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#splash-circuit-grid)" />
        </svg>
      </div>

      <div className="max-w-[1800px] mx-auto w-full flex-grow flex flex-col relative z-10">
        {/* Hero Section */}
        <header className="px-6 md:px-12 lg:px-20 py-20 md:py-32 min-h-[80vh] md:min-h-screen flex flex-col justify-center items-center text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10 md:space-y-16 w-full max-w-5xl"
          >
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[10px] md:text-sm text-gray-500 uppercase tracking-[0.3em] md:tracking-[0.4em] mb-6 md:mb-8 font-light"
              >
                Exact Solutions Limited
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl sm:text-7xl md:text-9xl lg:text-[140px] font-light text-white leading-[1.1] md:leading-[0.9] tracking-[-0.04em] md:tracking-[-0.05em] mb-8 md:mb-12 uppercase"
              >
                EXACT
                <br />
                <span className="font-normal text-primary">SOLUTIONS</span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex items-center justify-center gap-4 md:gap-6"
              >
                <div className="h-px w-8 md:w-24 bg-primary/40"></div>
                <span className="text-xs md:text-xl text-gray-400 uppercase tracking-[0.3em] md:tracking-[0.5em] font-light">
                  Industrial Solutions Engineering
                </span>
                <div className="h-px w-8 md:w-24 bg-primary/40"></div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-4 md:pt-8 flex flex-col items-center gap-4 md:gap-6"
            >
              <div className="inline-flex items-center gap-2 md:gap-3 text-[9px] md:text-sm text-primary tracking-[0.3em] md:tracking-[0.4em] uppercase border border-primary/20 px-4 md:px-6 py-1.5 md:py-2 bg-primary/5 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300">
                <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-primary rounded-full animate-pulse" />
                <span>Launching Early 2026</span>
              </div>
            </motion.div>
          </motion.div>
        </header>

        {/* Services Summary Section */}
        <section className="px-6 md:px-20 py-20 md:py-32 border-t border-gray-900 relative">
          {/* Background Pattern for Services */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="splash-services-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#splash-services-pattern)" />
            </svg>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 md:mb-20 text-center"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight uppercase mb-6 md:mb-8">
                Our Services
              </h2>
              <div className="h-px w-16 md:w-24 bg-primary/40 mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {SERVICES.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="group p-6 md:p-8 border border-gray-900 hover:border-primary/30 hover:bg-dark-light/50 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
                  >
                    {/* Hover Border Accent */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 transition-colors pointer-events-none" />
                    
                    <div className="w-12 h-12 md:w-16 md:h-16 border border-gray-800 flex items-center justify-center mb-6 md:mb-8 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500 relative z-10">
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                      {service.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 md:px-20 py-16 md:py-20 border-t border-gray-900 bg-dark-light mt-auto relative">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="text-[10px] md:text-sm text-gray-500 uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 font-light">
                Exact Solutions Limited
              </div>
              <div className="text-2xl md:text-4xl font-light text-white leading-tight tracking-tighter uppercase mb-2">
                EXACT<span className="text-primary">SOLUTIONS</span>
              </div>
              <div className="text-xs md:text-base text-gray-400 uppercase tracking-[0.2em] md:tracking-[0.3em] font-light">
                Industrial Solutions Engineering
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-col md:flex-row gap-6 justify-center items-center text-sm text-gray-500"
            >
              <a 
                href="mailto:expert@exactsolutions.co.ke"
                className="hover:text-primary transition-colors duration-300"
              >
                expert@exactsolutions.co.ke
              </a>
              <span className="hidden md:inline text-gray-700">•</span>
              <a 
                href="tel:+254720876787"
                className="hover:text-primary transition-colors duration-300"
              >
                +254 720 876 787
              </a>
              <span className="hidden md:inline text-gray-700">•</span>
              <Link 
                href="/contact"
                className="hover:text-primary transition-colors duration-300"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </footer>
      </div>
    </div>
  )
}

