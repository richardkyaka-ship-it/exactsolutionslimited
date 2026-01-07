'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/components/providers/ThemeProvider'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-9 sm:h-10 w-9 sm:w-10 bg-transparent border border-light-border dark:border-dark-border rounded-sm" />
    )
  }

  const themes = [
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ]

  const currentTheme = themes.find(t => t.value === theme) || themes[0]
  const CurrentIcon = currentTheme.icon

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 sm:h-10 w-9 sm:w-10 bg-transparent border border-light-border dark:border-dark-border hover:border-primary dark:hover:border-primary flex items-center justify-center transition-all duration-300 group touch-manipulation rounded-sm relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Toggle theme"
        aria-expanded={isOpen}
      >
        {/* Subtle background on hover */}
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CurrentIcon className="w-4 h-4 sm:w-4 sm:h-4 relative z-10 text-light-text-muted dark:text-dark-text-muted group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60]"
              onClick={() => setIsOpen(false)}
            />

            {/* Premium Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ 
                duration: 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute top-12 right-0 bg-light-surface dark:bg-dark-light border border-light-border dark:border-dark-border rounded-sm overflow-hidden min-w-[160px] z-[70] shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm"
            >
              {/* Header divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-light-border dark:via-dark-border to-transparent mb-1" />
              
              {themes.map(({ value, label, icon: Icon }, index) => {
                const isActive = theme === value
                return (
                  <motion.button
                    key={value}
                    onClick={() => {
                      setTheme(value)
                      setIsOpen(false)
                    }}
                    className={`relative w-full px-4 py-3 flex items-center gap-3 text-left transition-all duration-200 group/item ${
                      isActive
                        ? 'bg-primary/8 dark:bg-primary/15 text-primary dark:text-primary'
                        : 'text-light-text-muted dark:text-dark-text-muted hover:text-light-text dark:hover:text-dark-text-primary hover:bg-light-lighter dark:hover:bg-dark-lighter'
                    }`}
                    whileHover={{ x: 2 }}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    {/* Active indicator line */}
                    {isActive && (
                      <motion.div
                        layoutId="themeActiveIndicator"
                        className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary"
                        initial={false}
                      />
                    )}
                    
                    <div className={`flex items-center justify-center w-5 h-5 rounded-sm transition-colors ${
                      isActive 
                        ? 'bg-primary/15 dark:bg-primary/25' 
                        : 'bg-light-lighter dark:bg-dark-lighter group-hover/item:bg-primary/10 dark:group-hover/item:bg-primary/10'
                    }`}>
                      <Icon className={`w-3.5 h-3.5 transition-colors ${
                        isActive 
                          ? 'text-primary dark:text-primary' 
                          : 'text-light-text-subtle dark:text-dark-text-subtle group-hover/item:text-primary dark:group-hover/item:text-primary'
                      }`} />
                    </div>
                    
                    <span className={`text-xs font-light tracking-wide uppercase ${
                      isActive ? 'font-medium' : ''
                    }`}>
                      {label}
                    </span>
                    
                    {isActive && (
                      <motion.div
                        layoutId="themeCheck"
                        className="ml-auto w-1.5 h-1.5 bg-primary rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                )
              })}
              
              {/* Footer divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-light-border dark:via-dark-border to-transparent mt-1" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
