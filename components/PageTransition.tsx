'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Simple scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 1.01 }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for smoother deceleration
        }}
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          willChange: 'opacity, transform',
          WebkitFontSmoothing: 'subpixel-antialiased'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
