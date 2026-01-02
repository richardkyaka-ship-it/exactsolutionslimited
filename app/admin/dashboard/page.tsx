'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Package, FolderTree, ArrowRight, Plus, Activity } from 'lucide-react'
import { useAdmin } from '@/components/admin/AdminProvider'
import FastLink from '@/components/ui/FastLink'

export default function DashboardPage() {
  const { setIsLoading, showToast } = useAdmin()
  const [stats, setStats] = useState({ products: 0, categories: 0 })
  const [loading, setLoading] = useState(true)

  const fetchStats = useCallback(async () => {
    setIsLoading(true)
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/admin/products/count'),
        fetch('/api/admin/categories/count')
      ])
      const prodData = await prodRes.json()
      const catData = await catRes.json()
      setStats({ products: prodData.count, categories: catData.count })
    } catch (error) {
      showToast('Telemetry Link Failed', 'error')
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
      setIsLoading(false)
    }
  }, [setIsLoading, showToast])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const cards = [
    { label: 'Total Products', value: stats.products, icon: Package, href: '/admin/products', color: 'primary' },
    { label: 'Categories', value: stats.categories, icon: FolderTree, href: '/admin/categories', color: 'gray' },
  ]

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-light text-white uppercase tracking-tight mb-2">
          Management <span className="text-primary">Dashboard</span>
        </h1>
        <p className="text-sm text-gray-500 uppercase tracking-widest">System Overview & Quick Actions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <FastLink
              href={card.href}
              className="admin-card group block p-8 bg-dark-light border border-gray-900 hover:border-primary/30 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-8">
                <div className={`p-4 ${card.color === 'primary' ? 'bg-primary/10 border border-primary/20' : 'bg-gray-900 border border-gray-800'}`}>
                  <card.icon className={`w-6 h-6 ${card.color === 'primary' ? 'text-primary' : 'text-gray-400'}`} />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-800 group-hover:text-primary transition-colors" />
              </div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium mb-1">{card.label}</p>
              <p className="text-4xl font-light text-white">{loading ? '...' : card.value}</p>
            </FastLink>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <FastLink
            href="/admin/products/new"
            className="admin-card flex flex-col justify-center items-center h-full p-8 border-2 border-dashed border-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500 group"
          >
            <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center mb-4 group-hover:border-primary/50 transition-colors">
              <Plus className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" />
            </div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium group-hover:text-white transition-colors">Add New Product</span>
          </FastLink>
        </motion.div>
      </div>

      <div className="pt-12 border-t border-gray-900">
        <div className="flex items-center gap-3 mb-8">
          <Activity className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-medium text-white uppercase tracking-widest">Recent System Activity</h2>
        </div>

        <div className="bg-dark-light border border-gray-900 overflow-hidden">
          <div className="p-12 text-center">
            <p className="text-xs text-gray-600 uppercase tracking-[0.2em]">Activity log is currently empty</p>
          </div>
        </div>
      </div>
    </div>
  )
}
