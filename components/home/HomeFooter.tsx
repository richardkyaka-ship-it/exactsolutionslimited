'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HomeFooter() {
  return (
    <footer className="bg-light dark:bg-dark border-t border-light-border/40 dark:border-dark-border/40 relative overflow-hidden">
      {/* Creative Background Elements - Asymmetric */}
      <div className="absolute bottom-0 right-0 opacity-[0.03] dark:opacity-[0.03] pointer-events-none">
        <span className="text-[150px] sm:text-[180px] md:text-[250px] lg:text-[350px] xl:text-[450px] font-extralight text-primary leading-none select-none block">
          03
        </span>
      </div>
      <div className="absolute top-1/3 left-0 w-px h-1/3 bg-primary/5"></div>

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 py-16 sm:py-20 md:py-24 lg:py-28 xl:py-36 relative z-10">
        {/* Premium Grid Layout - Creative Asymmetric */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.1fr] gap-12 sm:gap-14 md:gap-16 lg:gap-20 xl:gap-24 mb-16 sm:mb-20 md:mb-24 lg:mb-28">
          {/* Brand - Premium Creative Layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6 sm:space-y-7 md:space-y-8"
          >
            <div className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-5">
              <span className="text-[10px] sm:text-[11px] text-primary font-mono tracking-[0.35em] sm:tracking-[0.45em] uppercase">03</span>
              <div className="h-px flex-1 max-w-16 sm:max-w-20 bg-gradient-to-r from-primary/50 via-primary/30 to-transparent"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-light-text dark:text-dark-text-primary leading-[0.95] tracking-tighter uppercase">
              EXACT<span className="text-primary">SOLUTIONS</span>
            </div>
            <div className="space-y-2 sm:space-y-3 pt-2">
              <p className="text-[10px] sm:text-[11px] md:text-xs text-primary font-mono tracking-[0.3em] sm:tracking-[0.4em] uppercase">
                Exact Solutions Limited
              </p>
              <p className="text-[10px] sm:text-xs md:text-sm text-light-text-muted dark:text-dark-text-muted font-light uppercase tracking-[0.2em] sm:tracking-[0.25em]">
                Industrial Solutions Engineering
              </p>
            </div>
          </motion.div>

          {/* Navigation - Premium with Enhanced Design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6 sm:space-y-7 md:space-y-8"
          >
            <div className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-5">
              <span className="text-[10px] sm:text-[11px] text-primary/60 font-mono tracking-[0.35em] sm:tracking-[0.45em] uppercase">Links</span>
              <div className="h-px flex-1 max-w-16 sm:max-w-20 bg-primary/25"></div>
              <div className="w-1 h-1 rounded-full bg-primary/30"></div>
            </div>
            <div className="flex flex-col gap-3 sm:gap-4">
              <Link href="/" className="group flex items-center gap-3 sm:gap-4 text-xs sm:text-sm md:text-base text-light-text-muted dark:text-dark-text-muted hover:text-primary transition-all duration-500 font-light relative pl-6 sm:pl-8">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary group-hover:scale-150 transition-all duration-500"></div>
                <span className="group-hover:translate-x-1 transition-transform duration-500">Home</span>
              </Link>
              <Link href="/contact" className="group flex items-center gap-3 sm:gap-4 text-xs sm:text-sm md:text-base text-light-text-muted dark:text-dark-text-muted hover:text-primary transition-all duration-500 font-light relative pl-6 sm:pl-8">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary group-hover:scale-150 transition-all duration-500"></div>
                <span className="group-hover:translate-x-1 transition-transform duration-500">Contact</span>
              </Link>
              <Link href="/services" className="group flex items-center gap-3 sm:gap-4 text-xs sm:text-sm md:text-base text-light-text-muted dark:text-dark-text-muted hover:text-primary transition-all duration-500 font-light relative pl-6 sm:pl-8">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary group-hover:scale-150 transition-all duration-500"></div>
                <span className="group-hover:translate-x-1 transition-transform duration-500">Services</span>
              </Link>
              <Link href="/projects" className="group flex items-center gap-3 sm:gap-4 text-xs sm:text-sm md:text-base text-light-text-muted dark:text-dark-text-muted hover:text-primary transition-all duration-500 font-light relative pl-6 sm:pl-8">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary group-hover:scale-150 transition-all duration-500"></div>
                <span className="group-hover:translate-x-1 transition-transform duration-500">Projects</span>
              </Link>
            </div>
          </motion.div>

          {/* Contact - Premium Creative Layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6 sm:space-y-7 md:space-y-8"
          >
            <div className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-5">
              <span className="text-[10px] sm:text-[11px] text-primary/60 font-mono tracking-[0.35em] sm:tracking-[0.45em] uppercase">Connect</span>
              <div className="h-px flex-1 max-w-16 sm:max-w-20 bg-primary/25"></div>
              <div className="w-1 h-1 rounded-full bg-primary/30"></div>
            </div>
            <div className="space-y-6 sm:space-y-7">
              <div className="group space-y-2 sm:space-y-3">
                <p className="text-[10px] sm:text-[11px] text-light-text-muted dark:text-dark-text-muted uppercase tracking-[0.2em] sm:tracking-[0.25em] font-mono">Email</p>
                <a href="mailto:expert@exactsolutions.co.ke" className="text-xs sm:text-sm md:text-base text-light-text dark:text-dark-text-primary hover:text-primary transition-all duration-500 font-light block break-all group-hover:translate-x-1">
                  expert@exactsolutions.co.ke
                </a>
              </div>
              <div className="pt-4 sm:pt-5 border-t border-light-border/20 dark:border-dark-border/20 group space-y-2 sm:space-y-3">
                <p className="text-[10px] sm:text-[11px] text-light-text-muted dark:text-dark-text-muted uppercase tracking-[0.2em] sm:tracking-[0.25em] font-mono">Phone</p>
                <a href="tel:+254720876787" className="text-xs sm:text-sm md:text-base text-light-text dark:text-dark-text-primary hover:text-primary transition-all duration-500 font-light block group-hover:translate-x-1">
                  +254 720 876 787
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Premium Copyright Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-8 sm:pt-10 md:pt-12 lg:pt-14 border-t border-light-border/30 dark:border-dark-border/30"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-5">
            <p className="text-[10px] sm:text-[11px] md:text-xs text-light-text-muted dark:text-dark-text-muted font-light">
              © 2024 Exact Solutions Limited. All rights reserved.
            </p>
            <Link href="/admin/login" className="text-[10px] sm:text-[11px] md:text-xs text-light-text-muted dark:text-dark-text-muted hover:text-primary transition-all duration-500 font-light flex items-center gap-3 group">
              <span>Admin</span>
              <span className="text-primary/40 group-hover:text-primary group-hover:translate-x-2 transition-all duration-500">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

