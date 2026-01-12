'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface ErrorPageLayoutProps {
  code: string
  title: string
  message: string
  primaryAction?: {
    label: string
    onClick?: () => void
    href?: string
  }
  secondaryAction?: {
    label: string
    onClick?: () => void
    href?: string
  }
  showTechnicalDetails?: boolean
  technicalDetails?: string
  sectionNumber?: string
}

export default function ErrorPageLayout({
  code,
  title,
  message,
  primaryAction,
  secondaryAction,
  showTechnicalDetails = false,
  technicalDetails,
  sectionNumber = '01',
}: ErrorPageLayoutProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <main className="min-h-screen bg-light dark:bg-black text-light-text dark:text-white flex items-center justify-center p-6">
      <div className="text-center">
        {/* Section Number */}
        {sectionNumber && (
          <div className="flex items-baseline justify-center gap-3 md:gap-4 mb-3 md:mb-4">
            <span className="text-[11.5px] text-primary font-mono tracking-[0.4em] uppercase">
              [{sectionNumber}]
            </span>
          </div>
        )}

        {/* Error Code */}
        <div className="text-6xl md:text-8xl font-light tracking-tight mb-4 text-light-text dark:text-white">
          {code}
        </div>

        {/* Divider */}
        <div className="h-px w-16 bg-primary mx-auto mb-6"></div>

        {/* Title */}
        <h1 className="text-xl md:text-2xl font-light text-light-text-muted dark:text-gray-400 mb-8 uppercase tracking-[0.3em]">
          {title}
        </h1>

        {/* Message */}
        <p className="text-light-text-subtle dark:text-gray-600 mb-12 max-w-md mx-auto text-sm uppercase tracking-widest leading-loose">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          {primaryAction && (
            <>
              {primaryAction.onClick ? (
                <button
                  onClick={primaryAction.onClick}
                  className="inline-block border border-light-border dark:border-gray-800 hover:border-primary hover:text-primary px-10 py-4 text-[10px] uppercase tracking-[0.4em] transition-all duration-300 bg-light-lighter/50 dark:bg-white/5 backdrop-blur-sm active:scale-[0.98]"
                >
                  {primaryAction.label}
                </button>
              ) : primaryAction.href ? (
                <Link
                  href={primaryAction.href}
                  className="inline-block border border-light-border dark:border-gray-800 hover:border-primary hover:text-primary px-10 py-4 text-[10px] uppercase tracking-[0.4em] transition-all duration-300 bg-light-lighter/50 dark:bg-white/5 backdrop-blur-sm active:scale-[0.98]"
                >
                  {primaryAction.label}
                </Link>
              ) : null}
            </>
          )}

          {secondaryAction && (
            <>
              {secondaryAction.onClick ? (
                <button
                  onClick={secondaryAction.onClick}
                  className="inline-block border border-light-border dark:border-gray-800 hover:border-primary hover:text-primary px-10 py-4 text-[10px] uppercase tracking-[0.4em] transition-all duration-300 bg-light-lighter/50 dark:bg-white/5 backdrop-blur-sm active:scale-[0.98]"
                >
                  {secondaryAction.label}
                </button>
              ) : secondaryAction.href ? (
                <Link
                  href={secondaryAction.href}
                  className="inline-block border border-light-border dark:border-gray-800 hover:border-primary hover:text-primary px-10 py-4 text-[10px] uppercase tracking-[0.4em] transition-all duration-300 bg-light-lighter/50 dark:bg-white/5 backdrop-blur-sm active:scale-[0.98]"
                >
                  {secondaryAction.label}
                </Link>
              ) : null}
            </>
          )}
        </div>

        {/* Technical Details (Development Only) */}
        {showTechnicalDetails && technicalDetails && (
          <div className="mt-12 pt-8 border-t border-light-border dark:border-gray-900 text-left">
            <p className="text-[10px] uppercase tracking-[0.4em] text-light-text-muted dark:text-gray-600 mb-4">
              Technical Details (Development Only):
            </p>
            <pre className="text-xs text-light-text-subtle dark:text-gray-500 font-mono bg-light-lighter/30 dark:bg-white/5 p-4 rounded border border-light-border dark:border-gray-800 overflow-x-auto">
              {technicalDetails}
            </pre>
          </div>
        )}

        {/* Footer Text */}
        <div className="mt-12 pt-8 border-t border-light-border dark:border-gray-900">
          <p className="text-[10px] uppercase tracking-[0.4em] text-light-text-subtle dark:text-gray-700">
            text
          </p>
        </div>
      </div>
    </main>
  )
}
