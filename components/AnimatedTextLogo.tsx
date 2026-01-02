'use client'

import Link from 'next/link'

interface AnimatedTextLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Animated Text Logo Component
 * 
 * The original animated text logo with hover color switching.
 * Preserved from the original Navigation implementation.
 */
export default function AnimatedTextLogo({ 
  className = '',
  size = 'md' 
}: AnimatedTextLogoProps) {
  const sizeClasses = {
    sm: 'text-sm md:text-base',
    md: 'text-lg md:text-xl',
    lg: 'text-2xl md:text-3xl',
  }

  const subtextSizeClasses = {
    sm: 'text-[6px] md:text-[8px]',
    md: 'text-[8px] md:text-[10px]',
    lg: 'text-[10px] md:text-[12px]',
  }

  return (
    <Link
      href="/"
      className={`flex items-center gap-2 group ${className}`}
      aria-label="Exact Solutions Home"
    >
      <div className="flex flex-col">
        <span className={`${sizeClasses[size]} font-light tracking-tighter text-white group-hover:text-primary transition-colors duration-300`}>
          EXACT<span className="font-normal text-primary group-hover:text-white transition-colors duration-300">SOLUTIONS</span>
        </span>
        <span className={`${subtextSizeClasses[size]} text-gray-500 uppercase tracking-[0.3em] font-light -mt-1 group-hover:text-gray-300 transition-colors duration-300`}>
          Limited
        </span>
      </div>
    </Link>
  )
}

