import React from 'react'
import { motion } from 'framer-motion'

interface Highlight {
  title: string
  description: string
}

interface ProjectHighlightsProps {
  highlights: Highlight[]
}

export default function ProjectHighlights({ highlights }: ProjectHighlightsProps) {
  return (
    <div className="space-y-8">
      <h3 className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium mb-6">
        Capabilities & Case Highlights
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {highlights.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex gap-4 group"
          >
            <div className="flex-shrink-0 w-px h-12 bg-light-border dark:bg-gray-800 group-hover:bg-primary transition-colors duration-500" />
            <div>
              <h4 className="text-sm font-medium text-light-text dark:text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">
                {item.title}
              </h4>
              <p className="text-xs text-light-text-muted dark:text-gray-500 leading-relaxed max-w-sm">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

