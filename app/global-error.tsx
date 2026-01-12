'use client'

import { useEffect } from 'react'
import { logError } from '@/lib/error-tracking'

interface GlobalErrorProps {
  error: Error & { digest?: string }
}

export default function GlobalErrorPage({ error }: GlobalErrorProps) {
  useEffect(() => {
    // Log fatal error
    logError(error, {
      digest: error.digest,
      component: 'GlobalErrorBoundary',
      severity: 'fatal',
    })
  }, [error])

  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>System Error - Exact Solutions Limited</title>
      </head>
      <body className="bg-black text-white antialiased min-h-screen flex items-center justify-center p-6" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
        <div className="text-center max-w-2xl w-full">
          {/* Company Branding */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 text-white">
              EXACT SOLUTIONS LIMITED
            </h1>
            <div className="h-px w-16 bg-primary mx-auto mb-6"></div>
          </div>

          {/* Error Title */}
          <h2 className="text-xl md:text-2xl font-light text-gray-400 mb-8 uppercase tracking-[0.3em]">
            System Error
          </h2>

          {/* Error Message */}
          <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm uppercase tracking-widest leading-loose">
            We've encountered an unexpected issue. Please try reloading the page or contact our support.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4 mb-12">
            <button
              onClick={() => window.location.reload()}
              className="inline-block border border-gray-800 hover:border-primary hover:text-primary px-10 py-4 text-[10px] uppercase tracking-[0.4em] transition-all duration-300 bg-white/5 backdrop-blur-sm active:scale-[0.98]"
            >
              Reload Page
            </button>
          </div>

          {/* Support Information */}
          <div className="pt-8 border-t border-gray-900 mb-8">
            <p className="text-gray-600 text-sm mb-4 uppercase tracking-[0.2em]">
              For immediate assistance:
            </p>
            <div className="space-y-2 text-gray-500">
              <p>
                <a
                  href="tel:+254720876787"
                  className="hover:text-white transition-colors duration-300"
                >
                  📞 +254 720 876 787
                </a>
              </p>
              <p>
                <a
                  href="mailto:expert@exactsolutions.co.ke"
                  className="hover:text-white transition-colors duration-300"
                >
                  ✉️ expert@exactsolutions.co.ke
                </a>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-900 text-gray-700 text-sm">
            <p>© {new Date().getFullYear()} Exact Solutions Limited</p>
          </div>

          {/* Footer Text */}
          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-800">
              text
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}
