'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle } from 'lucide-react'

export type ToastType = 'success' | 'error'

interface ToastProps {
    message: string
    type: ToastType
    onClose: () => void
}

export default function Toast({ message, type, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 1500)
        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[10000] pointer-events-none">
            <div className={`
        flex items-center gap-3 px-6 py-3 bg-black border border-gray-800 shadow-2xl animate-toast
        ${type === 'success' ? 'border-primary/50' : 'border-red-900/50'}
      `}>
                {type === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-primary" />
                ) : (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                )}
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white">
                    {message}
                </span>
            </div>
        </div>
    )
}
