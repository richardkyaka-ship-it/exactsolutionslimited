'use client'

import Link from 'next/link'

export default function ConversionSection() {
  return (
    <section className="bg-light-lighter dark:bg-dark-light border-y border-light-border dark:border-dark-border">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Technical Consultation */}
        <div className="px-4 md:px-12 lg:px-20 py-20 md:py-32 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-light-border dark:border-dark-border group">
          <span className="text-[10px] text-primary font-mono tracking-[0.4em] uppercase mb-6 md:mb-8 block">Project Analysis</span>
          <h2 className="text-3xl md:text-5xl font-light text-light-text dark:text-dark-text-primary tracking-tight uppercase mb-4 md:mb-6 leading-tight">
            Technical <br className="hidden md:block" /> Consultation
          </h2>
          <p className="text-light-text-muted dark:text-dark-text-muted text-sm md:text-base max-w-sm mb-10 md:mb-12 leading-relaxed px-4">
            Discuss your specific project requirements with our multi-disciplinary engineering team.
          </p>
          <Link 
            href="/contact"
            className="w-full md:w-auto px-8 md:px-12 py-4 md:py-5 bg-primary text-white text-[10px] uppercase tracking-[0.3em] font-medium hover:bg-primary-dark transition-all duration-300"
          >
            Start a Conversation ───→
          </Link>
        </div>

        {/* Equipment Browsing */}
        <div className="px-4 md:px-12 lg:px-20 py-20 md:py-32 flex flex-col justify-center items-center text-center group">
          <span className="text-[10px] text-primary font-mono tracking-[0.4em] uppercase mb-6 md:mb-8 block">Asset Catalog</span>
          <h2 className="text-3xl md:text-5xl font-light text-light-text dark:text-dark-text-primary tracking-tight uppercase mb-4 md:mb-6 leading-tight">
            Equipment <br className="hidden md:block" /> Inquiry
          </h2>
          <p className="text-light-text-muted dark:text-dark-text-muted text-sm md:text-base max-w-sm mb-10 md:mb-12 leading-relaxed px-4">
            Obtain detailed technical specifications and availability for our industrial equipment range.
          </p>
          <Link 
            href="/products"
            className="w-full md:w-auto px-8 md:px-12 py-4 md:py-5 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text-primary text-[10px] uppercase tracking-[0.3em] font-medium hover:border-primary dark:hover:border-primary hover:bg-light-lighter dark:hover:bg-dark-lighter transition-all duration-300"
          >
            Browse Products ───→
          </Link>
        </div>
      </div>
    </section>
  )
}

