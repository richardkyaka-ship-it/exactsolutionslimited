'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Project } from '@/types/projects'
import ProjectMetrics from './ProjectMetrics'

interface ProjectCardProps {
  project: Project
  onClick: (project: Project) => void
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="group bg-dark-light border border-gray-900 hover:border-primary transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Container */}
      <div 
        className="relative aspect-[4/3] overflow-hidden cursor-pointer"
        onClick={() => onClick(project)}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
        />
        {/* Blueprint Overlay */}
        <div className="absolute inset-0 bg-primary/5 opacity-50 group-hover:opacity-20 transition-opacity" />
        <div className="absolute inset-0 pointer-events-none p-4">
          <div className="w-full h-full border border-white/5 relative">
            {/* Technical Annotation */}
            <div className="absolute top-4 left-4">
              <span className="text-[8px] text-primary/60 font-mono uppercase tracking-widest">
                Data Point: {project.metrics[0].value}
              </span>
            </div>
            <div className="absolute bottom-4 right-4">
              <span className="text-[8px] text-white/20 font-mono uppercase tracking-widest italic">
                {project.id}-SPEC-REV.01
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-mono tracking-widest uppercase border border-primary/20">
            {project.category}
          </span>
          <div className="h-px flex-grow bg-gray-900" />
        </div>

        <h3 
          className="text-xl font-light text-white uppercase tracking-tight mb-4 group-hover:text-primary transition-colors cursor-pointer"
          onClick={() => onClick(project)}
        >
          {project.title}
        </h3>

        <div className="space-y-4 mb-8">
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Client</p>
            <p className="text-xs text-white font-medium">{project.client}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Challenge</p>
            <p className="text-xs text-gray-400 line-clamp-1 italic">"{project.challenge}"</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Solution</p>
            <p className="text-xs text-gray-400 line-clamp-1">{project.solution}</p>
          </div>
        </div>

        <div className="mt-auto">
          <ProjectMetrics metrics={project.metrics} compact />
          
          <button
            onClick={() => onClick(project)}
            className="mt-8 text-[10px] text-primary uppercase tracking-[0.3em] hover:text-white transition-colors flex items-center gap-2 group/btn"
          >
            Technical Details 
            <span className="group-hover:translate-x-2 transition-transform duration-300">───→</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

