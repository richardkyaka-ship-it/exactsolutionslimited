import React from 'react'

interface ProjectMetricsProps {
  metrics: {
    label: string;
    value: string;
  }[];
  compact?: boolean;
}

export default function ProjectMetrics({ metrics, compact = false }: ProjectMetricsProps) {
  return (
    <div className={`grid grid-cols-2 gap-4 ${compact ? 'mt-4' : 'mt-8'}`}>
      {metrics.map((metric, index) => (
        <div key={index} className="border-l border-light-border dark:border-gray-800 pl-3">
          <p className="text-[10px] text-light-text-muted dark:text-gray-500 uppercase tracking-widest font-mono">
            {metric.label}
          </p>
          <p className={`${compact ? 'text-xs' : 'text-sm'} text-light-text dark:text-white font-mono mt-0.5`}>
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  )
}

