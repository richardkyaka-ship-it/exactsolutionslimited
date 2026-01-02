'use client'

import React from 'react'

export default function ProgressBar({ isLoading }: { isLoading: boolean }) {
    return (
        <div className="fixed top-0 left-0 right-0 h-0.5 z-[9999] pointer-events-none">
            <div
                className="h-full bg-gray-900 w-full"
            >
                <div
                    className={`h-full bg-primary transition-all duration-500 ease-out ${isLoading ? 'w-full opacity-100' : 'w-0 opacity-0'
                        }`}
                    style={{
                        boxShadow: isLoading ? '0 0 10px rgba(255, 102, 0, 0.5)' : 'none'
                    }}
                />
            </div>
        </div>
    );
}
