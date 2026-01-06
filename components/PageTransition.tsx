'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const prevPathname = useRef(pathname)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setIsTransitioning(true)
      // Smooth scroll to top on route change
      window.scrollTo({ top: 0, behavior: 'smooth' })
      
      // Reset transition state after a brief moment
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        prevPathname.current = pathname
      }, 400)

      return () => clearTimeout(timer)
    }
  }, [pathname])

  return (
    <>
      {/* Subtle overlay fade for premium transition feel */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 bg-black z-[99] pointer-events-none"
            style={{ 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
          />
        )}
      </AnimatePresence>

      {/* Page content - no animation here, let pages handle their own */}
      <div key={pathname} className="page-transition">
        {children}
      </div>
    </>
  )
}
