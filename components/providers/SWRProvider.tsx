'use client'

import { SWRConfig } from 'swr'
import React from 'react'

/**
 * SWR Provider for global configuration
 * Provides caching and revalidation settings for all SWR hooks
 */
export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        // Global defaults for all SWR hooks
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000, // 1 minute
        revalidateIfStale: true,
        keepPreviousData: true,
        // Error retry configuration
        errorRetryCount: 3,
        errorRetryInterval: 5000,
        // Fetcher configuration
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  )
}

