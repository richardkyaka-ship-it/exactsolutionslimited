'use client'

import { useEffect } from 'react'

export default function Favicon() {
  useEffect(() => {
    // Remove any existing favicon links
    const existingLinks = document.querySelectorAll('link[rel*="icon"]')
    existingLinks.forEach(link => link.remove())

    // Add favicon link
    const link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/svg+xml'
    link.href = '/icon.svg'
    document.head.appendChild(link)
  }, [])

  return null
}

