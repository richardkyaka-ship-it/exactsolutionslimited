import { Variants } from 'framer-motion'

/**
 * Premium animation utilities for consistent, non-repetitive page transitions
 * Each variant set is designed to feel unique while maintaining the premium aesthetic
 */

// Premium easing curves for smooth, luxurious animations
export const premiumEasing = {
  smooth: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  elegant: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  refined: [0.4, 0, 0.2, 1] as [number, number, number, number],
  bounce: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
}

// Hero section animations - Large typography reveal
export const heroVariants: Variants = {
  hidden: { opacity: 0, y: 40, clipPath: 'inset(0 100% 0 0)' },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      duration: 1.1,
      ease: premiumEasing.elegant,
    },
  },
}

// Staggered container for sequential reveals
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

// Fade in from bottom with slight scale
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: premiumEasing.refined,
    },
  },
}

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: premiumEasing.smooth,
    },
  },
}

// Slide in from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: premiumEasing.smooth,
    },
  },
}

// Scale in with fade
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: premiumEasing.refined,
    },
  },
}

// Divider/line reveal animation
export const lineReveal: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.9,
      ease: premiumEasing.elegant,
    },
  },
}

// Badge/header animation
export const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: premiumEasing.refined,
    },
  },
}

// Grid item animation for cards/lists
export const gridItemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: premiumEasing.refined,
    },
  },
}

// Page-specific animation delays for variety
export const pageDelays = {
  products: {
    hero: 0.3,
    badge: 0.5,
    title: 0.7,
    description: 0.9,
    content: 1.1,
  },
  about: {
    hero: 0.2,
    badge: 0.4,
    title: 0.6,
    description: 0.8,
    content: 1.0,
  },
  contact: {
    hero: 0.4,
    badge: 0.6,
    title: 0.8,
    description: 1.0,
    content: 1.2,
  },
  services: {
    hero: 0.3,
    badge: 0.5,
    title: 0.7,
    description: 0.9,
    content: 1.1,
  },
  projects: {
    hero: 0.25,
    badge: 0.45,
    title: 0.65,
    description: 0.85,
    content: 1.05,
  },
  product: {
    hero: 0.35,
    badge: 0.55,
    title: 0.75,
    description: 0.95,
    content: 1.15,
  },
}

// Viewport-based animation trigger
export const viewportOptions = {
  once: true,
  margin: '-100px',
  amount: 0.3,
}

// ============================================
// UNIQUE PAGE-SPECIFIC ANIMATIONS
// Each page gets its own exciting personality
// ============================================

// PROJECTS PAGE: Cascade/Waterfall Effect - Cards drop in from top with stagger
export const cascadeReveal: Variants = {
  hidden: { opacity: 0, y: -100, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
}

// PRODUCTS PAGE: Flip Card Effect - 3D rotation reveal
export const flipReveal: Variants = {
  hidden: { opacity: 0, rotateY: -90, scale: 0.8 },
  visible: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.68, -0.55, 0.265, 1.55],
    },
  },
}

// SERVICES PAGE: Zoom Blur Effect - Scale with blur
export const zoomBlurReveal: Variants = {
  hidden: { opacity: 0, scale: 1.2, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

// ABOUT PAGE: Split Reveal - Text splits from center
export const splitReveal: Variants = {
  hidden: { 
    opacity: 0, 
    clipPath: 'inset(50% 0 50% 0)',
    y: 20,
  },
  visible: {
    opacity: 1,
    clipPath: 'inset(0% 0 0% 0)',
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
}

// CONTACT PAGE: Edge Slide - Elements slide from all edges
export const edgeSlideTop: Variants = {
  hidden: { opacity: 0, y: -60, x: -30 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
}

export const edgeSlideBottom: Variants = {
  hidden: { opacity: 0, y: 60, x: 30 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
}

export const edgeSlideLeft: Variants = {
  hidden: { opacity: 0, x: -80, rotate: -5 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 0.9,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
}

export const edgeSlideRight: Variants = {
  hidden: { opacity: 0, x: 80, rotate: 5 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 0.9,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
}

// SINGLE PRODUCT PAGE: 3D Tilt Effect - Perspective transform
export const tilt3D: Variants = {
  hidden: { 
    opacity: 0, 
    rotateX: 25,
    rotateY: -15,
    z: -100,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    rotateY: 0,
    z: 0,
    transition: {
      duration: 1.1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

// WAVE REVEAL - For hero sections
export const waveReveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
    transition: {
      duration: 1.3,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
}

// SPIN REVEAL - Rotating entrance
export const spinReveal: Variants = {
  hidden: { opacity: 0, rotate: -180, scale: 0.5 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.68, -0.55, 0.265, 1.55],
    },
  },
}
