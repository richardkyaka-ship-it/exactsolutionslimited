'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cloud } from 'lucide-react'

interface AutoSaveIndicatorProps {
    isSaving: boolean
    lastSaved: Date | null
}

export default function AutoSaveIndicator({ isSaving, lastSaved }: AutoSaveIndicatorProps) {
    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-1">
            <AnimatePresence mode="wait">
                {isSaving ? (
                    <motion.div
                        key="saving"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-[10px] text-primary uppercase tracking-widest font-mono"
                    >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(255,102,0,0.8)]" />
                        <span>Syncing to Ledger...</span>
                    </motion.div>
                ) : lastSaved && (
                    <motion.div
                        key="saved"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 text-[9px] text-gray-500 uppercase tracking-widest font-mono"
                    >
                        <span className="w-1 h-1 bg-gray-700 rounded-full" />
                        <span>Vault Updated: {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
