'use client'

import Image from 'next/image'
import { Link } from 'next-view-transitions'

interface LogoProps {
  variant?: 'white-bg' | 'black-bg' | 'auto'
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

/**
 * Logo Component
 * 
 * Displays the Exact Solutions logo with automatic background detection.
 * 
 * @param variant - 'white-bg' | 'black-bg' | 'auto' (default: 'auto')
 *   - 'white-bg': Always use white background logo
 *   - 'black-bg': Always use black background logo  
 *   - 'auto': Automatically choose based on current page background
 * 
 * @param className - Additional CSS classes
 * @param width - Logo width (default: auto-calculated)
 * @param height - Logo height (default: auto-calculated)
 * @param priority - Load with priority (for above-fold logos)
 */
export default function Logo({
  variant = 'auto',
  className = '',
  width,
  height,
  priority = false,
}: LogoProps) {
  // Determine which logo to use
  const getLogoSource = () => {
    if (variant === 'white-bg') {
      return {
        src: '/logo-white-bg.png',
        alt: 'Exact Solutions Limited',
      }
    }
    if (variant === 'black-bg') {
      return {
        src: '/logo-black-bg.png',
        alt: 'Exact Solutions Limited',
      }
    }
    // Auto mode: use black-bg logo (since site is black background)
    return {
      src: '/logo-black-bg.png',
      alt: 'Exact Solutions Limited',
    }
  }

  const logo = getLogoSource()

  // Default dimensions (adjust based on your actual logo aspect ratio)
  const defaultWidth = width || 180
  const defaultHeight = height || 60

  return (
    <Link
      href="/"
      className={`inline-block transition-opacity duration-300 hover:opacity-80 ${className}`}
      aria-label="Exact Solutions Limited - Home"
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={defaultWidth}
        height={defaultHeight}
        priority={priority}
        className="h-auto w-auto"
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </Link>
  )
}

