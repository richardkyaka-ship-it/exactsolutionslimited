'use client'

import { motion } from 'framer-motion'
import { Zap, Container, Factory } from 'lucide-react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

const PANELS = [
  {
    id: 'energy',
    title: 'Power Solutions',
    metric: 'Up to 2MW Capacity',
    icon: Zap,
    cta: 'Explore Energy Solutions',
    href: '/services#energy-solutions',
    pattern: 'generator'
  },
  {
    id: 'containers',
    title: 'Container Systems',
    metric: '10ft - 40ft Range',
    icon: Container,
    cta: 'View Container Options',
    href: '/services#containers-reefers',
    pattern: 'container'
  },
  {
    id: 'metal',
    title: 'Building& Construction',
    metric: '±1mm Precision',
    icon: Factory,
    cta: 'See Fabrication Work',
    href: '/services#metal-fabrication',
    pattern: 'metal'
  }
]

export default function NavigationMatrix() {
  const router = useRouter()
  const pathname = usePathname()

  const handlePanelClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle special scrolling for containers section
    if (href === '/services#containers-reefers') {
      e.preventDefault()
      
      if (pathname === '/services') {
        // Already on services page, just scroll to section
        const element = document.getElementById('containers-reefers')
        if (element) {
          // Add a small offset for better visibility
          const yOffset = -80
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      } else {
        // Navigate to services page with hash, then scroll after page loads
        router.push('/services#containers-reefers')
        // Use requestAnimationFrame to wait for DOM update
        requestAnimationFrame(() => {
          setTimeout(() => {
            const element = document.getElementById('containers-reefers')
            if (element) {
              const yOffset = -80
              const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
              window.scrollTo({ top: y, behavior: 'smooth' })
            }
          }, 300)
        })
      }
    }
    // For other links, let default behavior handle it
  }

  return (
    <section className="bg-light dark:bg-dark border-t border-light-border/40 dark:border-dark-border/40 relative overflow-hidden">
      {/* Creative Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.015] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-primary"></div>
        <div className="absolute top-0 left-2/4 w-px h-full bg-primary"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-primary"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 relative z-10">
        {PANELS.map((panel, index) => {
          const Icon = panel.icon
          return (
            <motion.div
              key={panel.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.15, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link 
                href={panel.href}
                onClick={(e) => handlePanelClick(e, panel.href)}
                className={`relative group min-h-[450px] sm:min-h-[500px] md:min-h-[550px] lg:min-h-[750px] xl:min-h-[800px] border-b lg:border-b-0 lg:border-r border-light-border/25 dark:border-dark-border/25 transition-all duration-700 overflow-hidden flex flex-col p-8 sm:p-10 md:p-14 lg:p-20 xl:p-24 hover:bg-light-lighter/40 dark:hover:bg-dark-light/40 ${
                  index !== PANELS.length - 1 ? '' : ''
                }`}
              >
                {/* Premium Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/3 group-hover:to-primary/8 transition-all duration-700 pointer-events-none"></div>

                {/* Creative Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-primary/50 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-primary/50 to-transparent"></div>
                </div>

                {/* Content - Premium Alignment */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Top Section - Enhanced Icons and Titles */}
                  <div className="space-y-6 sm:space-y-7 md:space-y-8 flex-shrink-0 mb-8 sm:mb-10">
                    <motion.div 
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center text-primary/50 group-hover:text-primary transition-all duration-700 relative"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <div className="absolute inset-0 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700"></div>
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 relative z-10" />
                    </motion.div>
                    
                    <div className="space-y-4 sm:space-y-5">
                      <div className="flex items-center gap-3 sm:gap-4 mb-2">
                        <span className="text-[9px] sm:text-[10px] text-primary/40 group-hover:text-primary/70 transition-colors duration-500 font-mono tracking-[0.4em] uppercase">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="h-px flex-1 max-w-12 bg-primary/20 group-hover:bg-primary/40 group-hover:max-w-20 transition-all duration-500"></div>
                      </div>
                      <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight text-light-text dark:text-dark-text-primary tracking-tight mb-4 sm:mb-5 group-hover:text-primary/90 transition-colors duration-700 leading-[0.95]">
                        {panel.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs md:text-sm font-mono text-light-text-muted dark:text-gray-500 uppercase tracking-[0.2em] sm:tracking-[0.25em]">
                        {panel.metric}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Section - Premium CTA with Creative Design */}
                  <div className="mt-auto pt-8 sm:pt-10 md:pt-12 border-t border-light-border/20 dark:border-dark-border/20 group-hover:border-primary/30 transition-colors duration-700">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="h-px w-8 sm:w-12 bg-primary/30 group-hover:w-16 sm:group-hover:w-20 transition-all duration-500"></div>
                      <div className="text-[10px] sm:text-xs md:text-sm text-light-text-muted dark:text-dark-text-muted uppercase tracking-[0.2em] sm:tracking-[0.25em] font-light flex items-center gap-3 sm:gap-4 group-hover:gap-5 sm:group-hover:gap-6 transition-all duration-500">
                        <span className="group-hover:translate-x-1 transition-transform duration-500">{panel.cta}</span>
                        <span className="text-primary/50 group-hover:text-primary group-hover:translate-x-2 transition-all duration-500">→</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium Border Animation */}
                <div className="absolute inset-0 border border-transparent group-hover:border-primary/10 transition-colors duration-700 pointer-events-none"></div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

