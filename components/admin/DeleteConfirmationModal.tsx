'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Trash2, X } from 'lucide-react'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  title: string
  itemName: string
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export default function DeleteConfirmationModal({
  isOpen,
  title,
  itemName,
  onConfirm,
  onCancel,
  isLoading = false
}: DeleteConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
            onClick={onCancel}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-dark-light border border-red-900/30 overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h2 className="text-lg font-light text-white uppercase tracking-tight">{title}</h2>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mt-1">Permanent Action Required</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-400 leading-relaxed">
                  Are you sure you want to delete <span className="text-white font-medium">"{itemName}"</span>? 
                </p>
                
                <div className="bg-red-500/5 border-l-2 border-red-500/20 p-4">
                  <p className="text-xs text-red-400/80 leading-relaxed uppercase tracking-wider font-medium">
                    ⚠️ Notice: This action cannot be undone. If you delete this by mistake, you will have to manually recreate it from scratch.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-10">
                <button
                  onClick={onCancel}
                  disabled={isLoading}
                  className="px-6 py-4 bg-transparent border border-gray-800 text-gray-400 text-[10px] uppercase tracking-[0.2em] font-medium hover:border-white hover:text-white transition-all duration-300 disabled:opacity-50"
                >
                  Keep Item
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="px-6 py-4 bg-red-600 text-white text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                >
                  <Trash2 className="w-3 h-3" />
                  {isLoading ? 'Deleting...' : 'Delete Now'}
                </button>
              </div>
            </div>

            {/* Corner Close Button */}
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 text-gray-600 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

