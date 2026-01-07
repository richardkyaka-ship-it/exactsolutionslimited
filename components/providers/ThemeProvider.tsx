'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: 'dark' | 'light'
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load theme from localStorage immediately
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const initialTheme: Theme = (savedTheme && ['dark', 'light', 'system'].includes(savedTheme)) 
      ? savedTheme 
      : 'dark'
    
    setTheme(initialTheme)
    setMounted(true)
    
    // Set initial class immediately to prevent flash
    const root = document.documentElement
    if (initialTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      if (systemTheme === 'light') {
        root.classList.remove('dark')
      } else {
        root.classList.add('dark')
      }
    } else if (initialTheme === 'light') {
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const getSystemTheme = (): 'dark' | 'light' => {
      if (typeof window === 'undefined') return 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const resolveTheme = (): 'dark' | 'light' => {
      if (theme === 'system') {
        return getSystemTheme()
      }
      return theme
    }

    const resolved = resolveTheme()
    setResolvedTheme(resolved)

    // Apply theme to document
    const root = document.documentElement
    if (resolved === 'light') {
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
    }

    // Listen for system theme changes
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => {
        const newResolved = getSystemTheme()
        setResolvedTheme(newResolved)
        if (newResolved === 'light') {
          root.classList.remove('dark')
        } else {
          root.classList.add('dark')
        }
      }
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme, mounted])

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

