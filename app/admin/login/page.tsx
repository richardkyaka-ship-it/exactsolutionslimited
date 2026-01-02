'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, ShieldCheck, AlertCircle, Clock } from 'lucide-react'

// Force dynamic rendering to avoid prerendering errors with useSearchParams
export const dynamic = 'force-dynamic'

function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [timeoutMessage, setTimeoutMessage] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check for timeout or logout query params
  useEffect(() => {
    const timeout = searchParams.get('timeout')
    const logout = searchParams.get('logout')
    
    if (timeout === '1') {
      setTimeoutMessage(true)
    }
    
    // Clear any cached data on login page load
    if (typeof window !== 'undefined') {
      // Clear localStorage
      localStorage.removeItem('admin_data')
      
      // Clear service worker caches if any
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => caches.delete(cacheName))
        })
      }
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        router.push('/admin/dashboard')
      } else {
        setError(true)
      }
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 border border-primary/30 flex items-center justify-center bg-primary/5">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-light text-white uppercase tracking-widest">
            Admin <span className="text-primary">Authentication</span>
          </h1>
          <p className="text-xs text-gray-500 mt-2 uppercase tracking-[0.2em]">Management Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-medium ml-1">
              Management Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-dark-light border border-gray-800 focus:border-primary px-12 py-4 text-white placeholder:text-gray-700 focus:outline-none transition-all duration-300"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
            </div>
          </div>

          {timeoutMessage && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 p-4"
            >
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Session expired due to inactivity. Please login again.</span>
            </motion.div>
          )}

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-red-500 bg-red-500/10 border border-red-500/20 p-4"
            >
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Invalid password. Access denied.</span>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white py-4 px-6 text-xs uppercase tracking-[0.3em] font-medium transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Enter Dashboard'}
          </button>
        </form>

        <p className="text-center mt-12 text-[10px] text-gray-700 uppercase tracking-widest">
          © 2026 Exact Solutions Ltd.
        </p>
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary mx-auto mb-4"></div>
          <p className="text-xs text-gray-600 uppercase tracking-[0.2em]">Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}

