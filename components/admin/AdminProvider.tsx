'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import ProgressBar from './ProgressBar'
import Toast, { ToastType } from './Toast'
import AutoSaveIndicator from './AutoSaveIndicator'

interface AdminContextType {
    setIsLoading: (loading: boolean) => void
    showToast: (message: string, type: ToastType) => void
    setIsSaving: (saving: boolean) => void
    setLastSaved: (date: Date) => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(false)
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)
    const [isSaving, setIsSaving] = useState(false)
    const [lastSaved, setLastSaved] = useState<Date | null>(null)

    const showToast = useCallback((message: string, type: ToastType) => {
        setToast({ message, type })
    }, [])

    return (
        <AdminContext.Provider value={{ setIsLoading, showToast, setIsSaving, setLastSaved }}>
            <ProgressBar isLoading={isLoading} />
            <AnimatePresence>
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </AnimatePresence>
            <AutoSaveIndicator isSaving={isSaving} lastSaved={lastSaved} />
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => {
    const context = useContext(AdminContext)
    if (!context) throw new Error('useAdmin must be used within AdminProvider')
    return context
}

import { AnimatePresence } from 'framer-motion'
