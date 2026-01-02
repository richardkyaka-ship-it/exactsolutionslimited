'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Globe,
  LogOut,
  ChevronRight,
  Menu,
  X
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { AdminProvider } from '@/components/admin/AdminProvider'
import FastLink from '@/components/ui/FastLink'
import SessionManager from '@/components/admin/SessionManager'

const MENU_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { label: 'Products', icon: Package, href: '/admin/products' },
  { label: 'Categories', icon: FolderTree, href: '/admin/categories' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // ✅ ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  const handleLogout = React.useCallback(async () => {
    // 1. Clear session cookie (all paths and attributes)
    document.cookie = 'exact_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict'
    document.cookie = 'exact_admin_session=; path=/admin; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict'
    
    // 2. Clear localStorage (if any)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_data')
      sessionStorage.clear()
    }
    
    // 3. Force cache invalidation for admin pages
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys()
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        )
      } catch (error) {
        console.warn('Failed to clear caches:', error)
      }
    }
    
    // 4. Prevent back button navigation by replacing history
    window.history.replaceState(null, '', '/admin/login')
    
    // 5. Redirect to login with cache-busting query
    const timestamp = Date.now()
    window.location.href = `/admin/login?logout=1&t=${timestamp}`
    
    // Note: Using window.location.href instead of router.push to force full page reload
    // This ensures all cached content is cleared
  }, [])

  // ✅ NOW HANDLE CONDITIONAL RENDERING AFTER ALL HOOKS
  if (pathname === '/admin/login') return <>{children}</>

  return (
    <AdminProvider>
      <SessionManager />
      <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
        {/* Sidebar (Desktop) */}
        <aside className="admin-sidebar w-64 border-r border-gray-900 bg-dark-light hidden md:flex flex-col h-screen sticky top-0">
          <div className="p-8 border-b border-gray-900">
            <FastLink href="/admin/dashboard" className="flex flex-col group">
              <span className="text-lg font-light tracking-tighter text-white group-hover:text-primary transition-colors duration-300">
                EXACT<span className="font-normal text-primary group-hover:text-white transition-colors duration-300">ADMIN</span>
              </span>
              <span className="text-[8px] text-gray-500 uppercase tracking-[0.3em] font-light group-hover:text-gray-300 transition-colors duration-300">
                Management Portal
              </span>
            </FastLink>
          </div>

          <nav className="flex-grow p-4 space-y-2">
            {MENU_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <FastLink
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-300 ${isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </FastLink>
              )
            })}
          </nav>

          <div className="p-4 border-t border-gray-900 space-y-2">
            <FastLink
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              <Globe className="w-5 h-5" />
              View Website
            </FastLink>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Mobile Header & Nav */}
        <div className="md:hidden sticky top-0 z-[100]">
          <header className="p-4 border-b border-gray-900 bg-dark-light flex justify-between items-center h-16">
            <FastLink href="/admin/dashboard" className="text-sm font-light tracking-tighter text-white group">
              <span className="group-hover:text-primary transition-colors duration-300">
                EXACT<span className="font-normal text-primary group-hover:text-white transition-colors duration-300">ADMIN</span>
              </span>
            </FastLink>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-400 hover:text-white bg-gray-900 border border-gray-800"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </header>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-dark-light border-b border-gray-900 overflow-hidden"
              >
                <nav className="p-4 space-y-1">
                  {MENU_ITEMS.map((item) => {
                    const isActive = pathname.startsWith(item.href)
                    return (
                      <FastLink
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-4 text-sm font-medium ${isActive ? 'text-primary' : 'text-gray-400'
                          }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </FastLink>
                    )
                  })}
                  <div className="h-px bg-gray-900 my-2" />
                  <FastLink
                    href="/"
                    className="flex items-center gap-3 px-4 py-4 text-sm font-medium text-gray-400"
                  >
                    <Globe className="w-5 h-5" />
                    View Website
                  </FastLink>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-4 text-sm font-medium text-red-500"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Content */}
        <main className="flex-grow flex flex-col min-w-0">
          {/* Top Breadcrumb (Desktop) */}
          <div className="hidden md:flex items-center gap-2 px-8 py-4 border-b border-gray-900 bg-black/50 backdrop-blur-sm">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Portal</span>
            <ChevronRight className="w-3 h-3 text-gray-700" />
            <span className="text-[10px] text-primary uppercase tracking-widest font-medium">
              {MENU_ITEMS.find(i => pathname.startsWith(i.href))?.label || 'Management'}
            </span>
          </div>

          <div className="flex-grow p-4 sm:p-6 md:p-12 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </AdminProvider>
  )
}
