/**
 * Error tracking utility for logging errors in development and production
 */

interface ErrorContext {
  [key: string]: any
}

/**
 * Logs an error with optional context
 * In development: logs to console
 * In production: can send to error tracking service (Sentry, LogRocket, etc.)
 */
export function logError(error: Error, context?: ErrorContext) {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    name: error.name,
    url: typeof window !== 'undefined' ? window.location.href : 'server',
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'server',
    timestamp: new Date().toISOString(),
    context: context || {},
  }

  // Development: Log to console
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error, context)
    console.error('Error Info:', errorInfo)
  }

  // Production: Send to error tracking service
  // Example: Sentry, LogRocket, etc.
  // Uncomment and configure when ready:
  /*
  if (process.env.NEXT_PUBLIC_SENTRY_DSN && typeof window !== 'undefined') {
    Sentry.captureException(error, {
      contexts: {
        custom: context,
      },
    })
  }
  */

  // Always attempt to log to server (if API endpoint exists)
  // This should fail silently to not break the app
  if (typeof window !== 'undefined') {
    try {
      fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorInfo),
        // Don't wait for response - fire and forget
        keepalive: true,
      }).catch(() => {
        // Silently fail - error logging shouldn't break the app
      })
    } catch {
      // Silently fail - error logging shouldn't break the app
    }
  }

  // Google Analytics exception tracking (if configured)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    try {
      ;(window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: true,
      })
    } catch {
      // Silently fail
    }
  }
}

/**
 * Logs a warning (non-fatal)
 */
export function logWarning(message: string, context?: ErrorContext) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('Warning:', message, context)
  }

  // Can be extended to send to tracking service
}

/**
 * Determines if an error is a network error
 */
export function isNetworkError(error: Error): boolean {
  return (
    error.message.includes('Network') ||
    error.message.includes('fetch') ||
    error.message.includes('Failed to fetch') ||
    error.message.includes('NetworkError') ||
    error.message.includes('network')
  )
}

/**
 * Determines if an error is a timeout error
 */
export function isTimeoutError(error: Error): boolean {
  return (
    error.message.includes('timeout') ||
    error.message.includes('Timeout') ||
    error.message.includes('timed out')
  )
}

/**
 * Determines if an error might be recoverable (e.g., network issues)
 */
export function isRecoverableError(error: Error): boolean {
  return isNetworkError(error) || isTimeoutError(error)
}
