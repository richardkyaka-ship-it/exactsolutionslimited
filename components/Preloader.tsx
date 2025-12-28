'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Preloader() {
  const pathname = usePathname()

  useEffect(() => {
    // Preload likely next pages
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

    // Preload fonts if not loaded
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        // Fonts are loaded
      })
    }
  }, [pathname])

  return null
}
