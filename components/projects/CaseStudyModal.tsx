'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Project } from '@/types/projects'
import ProjectMetrics from './ProjectMetrics'

interface CaseStudyModalProps {
  project: Project | null
  onClose: () => void
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-dark-light border border-gray-800 overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Image & Specs */}
            <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-800">
              <div className="relative aspect-video mb-12 grayscale">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
              </div>

              <h3 className="text-xs text-primary font-mono uppercase tracking-[0.3em] mb-8">
                Technical Specifications
              </h3>
              <div className="space-y-4">
                {Object.entries(project.technicalSpecs).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-gray-900 pb-2">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">{key}</span>
                    <span className="text-xs text-white font-mono">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Narrative */}
            <div className="p-8 md:p-12">
              <div className="mb-12">
                <span className="text-[10px] text-primary uppercase tracking-[0.3em] font-mono block mb-4">
                  Case Study // {project.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-light text-white uppercase tracking-tight mb-4">
                  {project.title}
                </h2>
                <p className="text-sm text-gray-400 font-medium">{project.client}</p>
              </div>

              <div className="space-y-12">
                <section>
                  <h4 className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-4">01 // Problem Statement</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{project.details.problemStatement}</p>
                </section>

                <section>
                  <h4 className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-4">02 // Engineering Approach</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{project.details.engineeringApproach}</p>
                </section>

                <section>
                  <h4 className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-4">03 // Project Metrics</h4>
                  <ProjectMetrics metrics={project.metrics} />
                </section>

                <section>
                  <h4 className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-4">04 // Outcome</h4>
                  <p className="text-sm text-white font-medium leading-relaxed">{project.details.results}</p>
                </section>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

