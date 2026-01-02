'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const IDLE_TIMEOUT = 30 * 60 * 1000 // 30 minutes
const CHECK_INTERVAL = 60 * 1000 // Check every minute

export default function SessionManager() {
  const router = useRouter()
  const pathname = usePathname()
  const [lastActivity, setLastActivity] = useState(Date.now())

  // ✅ ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  // Reset activity timer on user interaction
  const resetTimer = useCallback(() => {
    setLastActivity(Date.now())
  }, [])

  useEffect(() => {
    // ✅ Don't run session management on login page
    if (pathname === '/admin/login') {
      return
    }

    // Track user activity
    const activities = ['mousedown', 'keydown', 'touchstart', 'scroll', 'click']
    
    activities.forEach(event => {
      window.addEventListener(event, resetTimer, { passive: true })
    })

    // Check session timeout every minute
    const interval = setInterval(() => {
      const idleTime = Date.now() - lastActivity
      
      if (idleTime > IDLE_TIMEOUT) {
        // Session expired - force logout
        // Clear session cookie
        document.cookie = 'exact_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict'
        
        // Clear any cached data
        if ('caches' in window) {
          caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => caches.delete(cacheName))
          })
        }
        
        // Redirect to login with timeout flag
        const timestamp = Date.now()
        window.location.href = `/admin/login?timeout=1&t=${timestamp}`
      }
    }, CHECK_INTERVAL)

    return () => {
      activities.forEach(event => {
        window.removeEventListener(event, resetTimer)
      })
      clearInterval(interval)
    }
  }, [lastActivity, resetTimer, pathname])

  // ✅ NOW HANDLE CONDITIONAL RENDERING AFTER ALL HOOKS
  // Only run on admin pages (not login)
  if (pathname === '/admin/login') return null

  return null // This component doesn't render anything
}

