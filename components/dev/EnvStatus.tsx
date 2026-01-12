'use client';

/**
 * Environment Status Indicator (Development Only)
 * 
 * Shows a small indicator in the bottom-right corner during development
 * to quickly see if environment variables are properly configured.
 * 
 * This component is automatically hidden in production builds.
 */

import { useEffect, useState } from 'react';

interface EnvStatus {
  status: 'loading' | 'valid' | 'error';
  error?: string;
  config?: {
    nodeEnv: string;
    airtable: boolean;
    email: boolean;
    admin: boolean;
    cloudinary: boolean;
  };
}

export function EnvStatus() {
  const [envStatus, setEnvStatus] = useState<EnvStatus>({ status: 'loading' });

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    // Check environment status via API route (since env validation is server-side)
    fetch('/api/env-check')
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setEnvStatus({
            status: 'valid',
            config: data.config,
          });
        } else {
          setEnvStatus({
            status: 'error',
            error: data.error || 'Environment validation failed',
          });
        }
      })
      .catch(() => {
        setEnvStatus({
          status: 'error',
          error: 'Failed to check environment',
        });
      });
  }, []);

  // Don't render in production
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const statusColors = {
    loading: 'bg-yellow-500 animate-pulse',
    valid: 'bg-green-500',
    error: 'bg-red-500',
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 border border-gray-800 p-3 rounded-lg text-xs font-mono shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-2 h-2 rounded-full ${statusColors[envStatus.status]}`} />
        <span className="text-white">ENV: {envStatus.status.toUpperCase()}</span>
      </div>
      
      {envStatus.error && (
        <div className="text-red-400 max-w-xs text-[10px] mt-1">
          {envStatus.error.split('\n')[0]}...
        </div>
      )}
      
      {envStatus.config && envStatus.status === 'valid' && (
        <div className="text-gray-400 text-[10px] mt-2 space-y-0.5">
          <div>Env: {envStatus.config.nodeEnv}</div>
          <div className="flex gap-2">
            <span className={envStatus.config.airtable ? 'text-green-400' : 'text-red-400'}>
              Airtable
            </span>
            <span className={envStatus.config.email ? 'text-green-400' : 'text-red-400'}>
              Email
            </span>
            <span className={envStatus.config.admin ? 'text-green-400' : 'text-red-400'}>
              Admin
            </span>
            <span className={envStatus.config.cloudinary ? 'text-green-400' : 'text-yellow-400'}>
              Cloudinary
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
