'use client'

import { useEffect, useState } from 'react'
import ErrorPageLayout from '@/components/error/ErrorPageLayout'
import { logError, isRecoverableError } from '@/lib/error-tracking'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const [autoRetryAttempted, setAutoRetryAttempted] = useState(false)

  useEffect(() => {
    // Log error to monitoring service
    logError(error, {
      digest: error.digest,
      component: 'ErrorBoundary',
    })

    // Auto-recovery for network errors (after 5 seconds)
    if (isRecoverableError(error) && !autoRetryAttempted) {
      const timer = setTimeout(() => {
        setAutoRetryAttempted(true)
        reset()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [error, reset, autoRetryAttempted])

  return (
    <ErrorPageLayout
      code="500"
      title="Something went wrong"
      message="Our engineering team has been notified of this issue."
      primaryAction={{
        label: 'Try again',
        onClick: reset,
      }}
      secondaryAction={{
        label: 'Return home',
        href: '/',
      }}
      showTechnicalDetails={process.env.NODE_ENV === 'development'}
      technicalDetails={error.message}
      sectionNumber="01"
    />
  )
}
