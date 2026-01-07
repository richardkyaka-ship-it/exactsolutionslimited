'use client'

import { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { MessageCircle, Menu, X } from 'lucide-react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher'

const NAV_ITEMS = [
  { label: 'Home', path: '/', number: '01' },
  { label: 'Services', path: '/services', number: '02' },
  { label: 'Projects', path: '/projects', number: '03' },
  { label: 'Products', path: '/products', number: '04' },
  { label: 'About', path: '/about', number: '05' },
] as const

// Optimized animation variants
const overlayVariants: Variants = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 1, 1],
    },
  },
}

const containerVariants: Variants = {
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0, // No delay - instant
      when: 'beforeChildren',
    },
  },
  closed: {
    opacity: 0,
    transition: {
      staggerChildren: 0,
      staggerDirection: -1,
      when: 'afterChildren',
      duration: 0.1, // Faster close
    },
  },
}

const itemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
  closed: {
    y: 10,
    opacity: 0,
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 1, 1],
    },
  },
}

export default function Navigation() {
  const pathname = usePathname()

  // Hide global navigation on admin routes and splash screen
  if (pathname.startsWith('/admin') || pathname === '/splash') {
    return null
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const navRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu is open - instant updates
  useLayoutEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '0px' // Prevent layout shift
    } else {
      // Instant cleanup - no frame delay
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isMenuOpen])

  // ESC key handler - instant response
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        e.preventDefault()
        setIsMenuOpen(false)
        // Immediately focus menu toggle for keyboard nav
        setTimeout(() => {
          const menuToggle = document.querySelector('[aria-label="open navigation menu"]') as HTMLElement
          menuToggle?.focus()
        }, 0)
      }
    }

    document.addEventListener('keydown', handleEscape, { passive: false })
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  // Focus trap when menu is open
  useEffect(() => {
    if (isMenuOpen && navRef.current) {
      const focusableElements = navRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus()
            e.preventDefault()
          }
        }
      }

      document.addEventListener('keydown', handleTab)
      firstElement?.focus()

      return () => {
        document.removeEventListener('keydown', handleTab)
      }
    }
  }, [isMenuOpen])

  // Optimized handlers with useCallback - instant navigation
  const handleClose = useCallback(() => {
    setIsMenuOpen(false)
    setIsClosing(false)
    // Focus management - non-blocking
    setTimeout(() => {
      const menuToggle = document.querySelector('[aria-label="open navigation menu"]') as HTMLElement
      menuToggle?.focus()
    }, 0)
  }, [])

  const handleContactClick = useCallback(() => {
    // Navigate immediately - zero delay
    if (isMenuOpen) {
      handleClose()
    }
    router.push('/contact')
  }, [router, isMenuOpen, handleClose])


  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsMenuOpen(false)
    }
  }, [])

  // Memoize navigation items
  const navItems = useMemo(() => NAV_ITEMS, [])

  return (
    <>
      {/* Logo / Home Link - Premium Styling */}
      <Link
        href="/"
        className="fixed top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-[70] flex items-center gap-2 group touch-manipulation"
        aria-label="Exact Solutions Home"
      >
        <div className="flex flex-col relative">
          {/* Subtle hover accent */}
          <div className="absolute -left-1 top-0 bottom-0 w-px bg-primary/0 group-hover:bg-primary/40 transition-all duration-300" />
          <span className="text-base sm:text-lg md:text-xl font-light tracking-tighter text-light-text dark:text-dark-text-primary group-hover:text-primary transition-colors duration-300">
            EXACT<span className="font-normal text-primary group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">SOLUTIONS</span>
          </span>
          <span className="text-[7px] sm:text-[8px] md:text-[10px] text-light-text-muted dark:text-dark-text-muted uppercase tracking-[0.3em] font-light -mt-1 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
            Limited
          </span>
        </div>
      </Link>

      {/* Right Side Navigation Controls - Premium Grouped Layout */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-[70] flex items-center gap-2 sm:gap-3">
          {/* Menu Toggle Button - Navigation */}
        <motion.button
          onClick={() => setIsMenuOpen(true)}
          aria-label="open navigation menu"
          className="w-9 sm:w-10 h-9 sm:h-10 bg-transparent border border-light-border dark:border-dark-border flex items-center justify-center group hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/5 transition-all duration-300 touch-manipulation rounded-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isScrolled ? 0.85 : 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative w-5 h-5 md:w-6 md:h-6">
            {/* Blueprint-style dimension lines */}
            <div className="absolute inset-0 flex flex-col justify-center">
              <div className="h-px bg-light-text-subtle dark:bg-dark-text-muted group-hover:bg-primary transition-colors duration-300"></div>
            </div>
            {/* Perpendicular ticks */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-light-text-subtle dark:bg-dark-text-muted group-hover:bg-primary transition-colors duration-300"></div>
            <div className="absolute right-0 top-0 bottom-0 w-px bg-light-text-subtle dark:bg-dark-text-muted group-hover:bg-primary transition-colors duration-300"></div>
          </div>
        </motion.button>

        {/* Contact Button */}
        <motion.button
          onClick={handleContactClick}
          aria-label="go to contact page"
          className="h-9 sm:h-10 bg-transparent border border-light-border dark:border-dark-border flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/5 transition-all duration-300 group touch-manipulation rounded-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isScrolled ? 0.85 : 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="hidden sm:inline text-xs sm:text-sm font-light tracking-wide text-light-text-muted dark:text-dark-text-muted group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300 uppercase">
            Contact
          </span>
          <MessageCircle className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-light-text-muted dark:text-dark-text-muted group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300 flex-shrink-0" />
        </motion.button>

        {/* Theme Switcher */}
        <div className="relative">
          <ThemeSwitcher />
        </div>
      </div>

      {/* Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Full-screen solid black overlay background - GPU accelerated */}
            <motion.div
              ref={overlayRef}
              variants={overlayVariants}
              initial="closed"
              animate={isClosing ? "closed" : "open"}
              exit="closed"
              className={`fixed inset-0 bg-light dark:bg-dark z-[50] ${isClosing ? 'closing' : ''}`}
              onClick={handleOverlayClick}
              aria-hidden="true"
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                willChange: 'opacity',
                WebkitFontSmoothing: 'subpixel-antialiased',
                pointerEvents: 'auto', // Allow clicks to pass through to nav content
              }}
            />

            {/* Navigation content - optimized animations */}
            <motion.nav
              ref={navRef}
              variants={containerVariants}
              initial="closed"
              animate={isClosing ? "closed" : "open"}
              exit="closed"
              className={`fixed inset-0 z-[60] flex items-center justify-center ${isClosing ? 'closing' : ''}`}
              onClick={(e) => {
                // Only stop propagation if clicking on the nav container itself, not on links
                if (e.target === e.currentTarget) {
                  e.stopPropagation()
                }
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                pointerEvents: 'auto', // Ensure clicks work
              }}
            >
              <div className="relative w-full max-w-5xl px-6 md:px-12">
                {/* Enhanced Close Button - instant feedback */}
                <motion.button
                  onClick={handleClose}
                  className="absolute top-8 right-8 md:top-12 md:right-12 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center z-10 text-light-text-muted dark:text-dark-text-muted hover:text-light-text dark:hover:text-dark-text-primary active:scale-95 active:text-primary transition-all duration-150 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light dark:focus-visible:ring-offset-black"
                  aria-label="close navigation menu"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <X className="w-8 h-8 md:w-10 md:h-10" />
                  </motion.div>
                </motion.button>

                <ul className="space-y-10 md:space-y-14">
                  {navItems.map((item) => {
                    const isActive = pathname === item.path
                    return (
                      <motion.li
                        key={item.path}
                        variants={itemVariants}
                        style={{
                          willChange: 'transform, opacity',
                        }}
                      >
                        <NavLink
                          item={item}
                          isActive={isActive}
                          onClick={() => {
                            // Close menu instantly - don't wait for animation
                            setIsMenuOpen(false)
                            setIsClosing(false)
                          }}
                        />
                      </motion.li>
                    )
                  })}
                </ul>

                {/* Subtle Divider */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-24 h-px bg-primary/30"></div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ item, isActive, onClick }: { item: typeof NAV_ITEMS[number], isActive: boolean, onClick: () => void }) {
  const handleClick = () => {
    // Close menu immediately - let Next.js Link handle navigation with prefetching
    onClick()
  }
  
  return (
    <Link
      href={item.path}
      onClick={handleClick}
      prefetch={true}
      className="group flex items-baseline gap-4 text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light dark:focus-visible:ring-offset-black touch-manipulation"
    >
      <span className="text-xs text-primary font-medium tracking-[0.3em] uppercase">
        {item.number}
      </span>
      <div className="flex items-center gap-3">
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="w-2 h-2 bg-primary"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
        <span
          className="text-5xl md:text-7xl lg:text-8xl font-light text-light-text dark:text-dark-text-primary group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300"
        >
          {item.label}
        </span>
      </div>
    </Link>
  )
}
