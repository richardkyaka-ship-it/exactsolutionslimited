'use client'

import Link from 'next/link'

export default function ConversionSection() {
  return (
    <section className="bg-light dark:bg-dark border-t border-light-border/50 dark:border-dark-border/50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-14 md:gap-16 lg:gap-20 xl:gap-24">
          {/* Technical Consultation */}
          <div className="flex flex-col justify-center space-y-6 sm:space-y-8 md:space-y-10">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <span className="text-[10px] sm:text-xs text-primary/80 font-mono tracking-[0.15em] sm:tracking-[0.2em] uppercase block">Project Analysis</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-light-text dark:text-dark-text-primary tracking-tight leading-tight">
                Technical Consultation
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-light-text-muted dark:text-dark-text-muted font-light leading-relaxed max-w-md">
                Discuss your specific project requirements with our multi-disciplinary engineering team.
              </p>
            </div>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-light-text dark:text-dark-text-primary hover:text-primary transition-colors duration-300 border-b border-transparent hover:border-primary/30 pb-1 w-fit group"
            >
              Start a Conversation <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>

          {/* Equipment Browsing */}
          <div className="flex flex-col justify-center space-y-6 sm:space-y-8 md:space-y-10 pt-12 sm:pt-14 md:pt-0 md:border-l border-light-border/30 dark:border-dark-border/30 md:pl-12 lg:pl-16 xl:pl-20">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <span className="text-[10px] sm:text-xs text-primary/80 font-mono tracking-[0.15em] sm:tracking-[0.2em] uppercase block">Asset Catalog</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-light-text dark:text-dark-text-primary tracking-tight leading-tight">
                Equipment Inquiry
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-light-text-muted dark:text-dark-text-muted font-light leading-relaxed max-w-md">
                Obtain detailed technical specifications and availability for our industrial equipment range.
              </p>
            </div>
            <Link 
              href="/products"
              className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-light-text dark:text-dark-text-primary hover:text-primary transition-colors duration-300 border-b border-transparent hover:border-primary/30 pb-1 w-fit group"
            >
              Browse Products <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

