'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const prevPathname = useRef(pathname)

  // Instant scroll to top on route change - NO DELAYS
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      // Scroll immediately without any frame delays
      window.scrollTo(0, 0)
      prevPathname.current = pathname
    }
  }, [pathname])

  return <>{children}</>
}
