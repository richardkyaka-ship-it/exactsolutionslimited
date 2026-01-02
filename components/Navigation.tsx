'use client'

import { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { MessageCircle, Menu, X } from 'lucide-react'
import { motion, AnimatePresence, Variants } from 'framer-motion'

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
      {/* Logo / Home Link */}
      <Link
        href="/"
        className="fixed top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-[70] flex items-center gap-2 group touch-manipulation"
        aria-label="Exact Solutions Home"
      >
        <div className="flex flex-col">
          <span className="text-base sm:text-lg md:text-xl font-light tracking-tighter text-white group-hover:text-primary transition-colors duration-300">
            EXACT<span className="font-normal text-primary group-hover:text-white transition-colors duration-300">SOLUTIONS</span>
          </span>
          <span className="text-[7px] sm:text-[8px] md:text-[10px] text-gray-500 uppercase tracking-[0.3em] font-light -mt-1 group-hover:text-gray-300 transition-colors duration-300">
            Limited
          </span>
        </div>
      </Link>

      {/* Contact Button */}
      <motion.button
        onClick={handleContactClick}
        aria-label="go to contact page"
        className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-[70] h-9 sm:h-10 bg-transparent border border-gray-800 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 hover:border-primary hover:bg-primary/10 transition-colors duration-300 group touch-manipulation"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isScrolled ? 0.8 : 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="hidden sm:inline text-xs sm:text-sm font-normal text-gray-400 group-hover:text-white transition-colors duration-300">
          Contact
        </span>
        <MessageCircle className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition-colors duration-300 flex-shrink-0" />
      </motion.button>

      {/* Menu Toggle Button */}
      <motion.button
        onClick={() => setIsMenuOpen(true)}
        aria-label="open navigation menu"
        className="fixed top-4 right-16 sm:top-6 sm:right-32 md:top-8 md:right-40 z-[70] w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center group touch-manipulation"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isScrolled ? 0.8 : 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0 }}
      >
        <div className="relative w-5 h-5 md:w-6 md:h-6">
          {/* Blueprint-style dimension lines */}
          <div className="absolute inset-0 flex flex-col justify-center">
            <div className="h-px bg-gray-400 group-hover:bg-primary transition-colors duration-300"></div>
          </div>
          {/* Perpendicular ticks */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-400 group-hover:bg-primary transition-colors duration-300"></div>
          <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-400 group-hover:bg-primary transition-colors duration-300"></div>
        </div>
      </motion.button>

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
              className={`fixed inset-0 bg-black z-[50] ${isClosing ? 'closing' : ''}`}
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
                  className="absolute top-8 right-8 md:top-12 md:right-12 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center z-10 text-gray-400 hover:text-white active:scale-95 active:text-primary transition-all duration-150 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
  const router = useRouter()
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault() // Prevent default Link behavior
    // Close menu immediately
    onClick()
    // Navigate immediately using router
    router.push(item.path)
  }
  
  return (
    <Link
      href={item.path}
      onClick={handleClick}
      prefetch={true}
      className="group flex items-baseline gap-4 text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black touch-manipulation"
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
          className="text-5xl md:text-7xl lg:text-8xl font-light text-white group-hover:text-primary transition-colors duration-300"
        >
          {item.label}
        </span>
      </div>
    </Link>
  )
}
