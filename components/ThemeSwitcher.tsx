'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="bg-gray-50 dark:bg-dark-lighter border border-gray-200 dark:border-gray-800 p-1 flex gap-1 rounded-lg shadow-lg">
        <button
          onClick={() => setTheme('light')}
          className={`p-2 rounded transition-colors ${
            theme === 'light'
              ? 'bg-primary text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800'
          }`}
          aria-label="Light mode"
        >
          <Sun className="w-5 h-5" />
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`p-2 rounded transition-colors ${
            theme === 'dark'
              ? 'bg-primary text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800'
          }`}
          aria-label="Dark mode"
        >
          <Moon className="w-5 h-5" />
        </button>
        <button
          onClick={() => setTheme('system')}
          className={`p-2 rounded transition-colors ${
            theme === 'system'
              ? 'bg-primary text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800'
          }`}
          aria-label="System preference"
        >
          <Monitor className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
