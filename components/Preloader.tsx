'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function Preloader() {
  const pathname = usePathname()
  const initialized = useRef(false)

  // Only run once on mount - don't block navigation
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Defer prefetching to not block navigation
    setTimeout(() => {
      const links = [
        { href: '/contact', as: 'document' },
        { href: '/', as: 'document' },
      ]

      links.forEach(link => {
        const preloadLink = document.createElement('link')
        preloadLink.rel = 'prefetch'
        preloadLink.href = link.href
        preloadLink.as = link.as as any
        document.head.appendChild(preloadLink)
      })
    }, 100) // Small delay to not block navigation
  }, [])

  return null
}
