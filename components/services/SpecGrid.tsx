import React from 'react'

interface SpecItem {
  parameter: string
  value: string
}

interface SpecGridProps {
  specs: SpecItem[]
}

export default function SpecGrid({ specs }: SpecGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 border-t border-gray-900 pt-8">
      {specs.map((spec, index) => (
        <div 
          key={index} 
          className="flex justify-between items-baseline group hover:border-b hover:border-primary/20 transition-all duration-300 pb-1"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">
            {spec.parameter}
          </span>
          <span className="text-sm font-mono text-white group-hover:text-primary transition-colors duration-300">
            {spec.value}
          </span>
        </div>
      ))}
    </div>
  )
}

