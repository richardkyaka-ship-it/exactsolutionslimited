'use client'

import React from 'react'
import Link from 'next/link'

interface FastLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string
}

/**
 * FastLink - Optimized Next.js Link wrapper
 * Uses standard Next.js Link for instant navigation
 * Prefetches on hover for better performance
 */
export default function FastLink({ href, children, className, ...props }: FastLinkProps) {
    return (
        <Link
            href={href}
            className={`${className} touch-manipulation`}
            prefetch={true}
            {...props}
        >
            {children}
        </Link>
    )
}
