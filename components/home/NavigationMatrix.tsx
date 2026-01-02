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
    title: 'Building & Construction',
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
    <section className="bg-black border-y border-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {PANELS.map((panel, index) => {
          const Icon = panel.icon
          return (
            <Link 
              key={panel.id} 
              href={panel.href}
              onClick={(e) => handlePanelClick(e, panel.href)}
              className={`relative group h-[320px] sm:h-[400px] md:h-[600px] border-gray-900 transition-all duration-500 overflow-hidden flex flex-col justify-end p-6 sm:p-8 md:p-12 ${
                index !== PANELS.length - 1 ? 'border-b lg:border-b-0 lg:border-r' : ''
              }`}
            >
              {/* Background Pattern Placeholder */}
              <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none">
                <svg width="100%" height="100%" className="w-full h-full">
                  <pattern id={`pattern-${panel.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                  <rect width="100%" height="100%" fill={`url(#pattern-${panel.id})`} />
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-6">
                <Icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-500" />
                
                <div>
                  <h3 className="text-2xl md:text-3xl font-light text-white uppercase tracking-tight group-hover:text-primary transition-colors">
                    {panel.title}
                  </h3>
                  <div className="h-px w-8 bg-primary/40 my-4 group-hover:w-16 transition-all duration-500" />
                  <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                    {panel.metric}
                  </p>
                </div>

                <div className="text-[10px] text-white uppercase tracking-[0.3em] font-medium flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
                  {panel.cta} <span className="text-primary">───→</span>
                </div>
              </div>

              {/* Hover Border Accent */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 transition-colors pointer-events-none" />
            </Link>
          )
        })}
      </div>
    </section>
  )
}

