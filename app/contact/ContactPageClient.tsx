'use client'

import { motion, Variants } from 'framer-motion'
import { MapPin, ExternalLink } from 'lucide-react'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
}

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
}

export default function ContactPageClient() {
  return (
    <main className="min-h-screen bg-light dark:bg-dark text-light-text dark:text-dark-text-primary relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.02] pointer-events-none">
        <svg className="w-full h-full text-light-text-subtle dark:text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="contact-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#contact-grid)" />
        </svg>
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        {/* Section 01: Hero & Contact */}
        <section className="px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-24 md:pb-32 lg:pb-48">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-16 md:mb-24 lg:mb-32"
            >
              <motion.div variants={itemVariants} className="flex items-baseline gap-3 md:gap-4 mb-3 md:mb-4">
                <span className="text-[11.5px] text-primary font-mono tracking-[0.4em] uppercase">01</span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-light-text dark:text-dark-text-primary leading-[0.95] tracking-tight uppercase">
                  Contact Us
                </h1>
              </motion.div>
              <motion.div
                variants={fadeInVariants}
                initial="hidden"
                animate="visible"
                className="h-px w-16 md:w-20 bg-gradient-to-r from-primary/60 to-transparent mt-4 md:mt-6 mb-4 md:mb-6"
              />
              <motion.div variants={itemVariants} className="max-w-3xl">
                <p className="text-sm sm:text-base md:text-lg text-light-text-muted dark:text-dark-text-muted font-light leading-relaxed">
                  Get in touch with our industrial solutions team. Have a project in mind? Describe your requirements and we'll provide exact solutions tailored to your needs.
                </p>
              </motion.div>
            </motion.div>

            {/* Enhanced Two-Column Layout with Premium Styling */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16">
              {/* Left Column: Contact Form (8 cols) - First on Mobile */}
              <motion.div variants={itemVariants} className="lg:col-span-8 order-1">
                <div className="relative">
                  {/* Subtle accent border */}
                  <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/40 to-transparent hidden lg:block"></div>
                  <ContactForm />
                </div>
              </motion.div>

              {/* Right Column: Contact Info (4 cols) - Hidden on Mobile, Visible on Desktop */}
              <motion.div variants={itemVariants} className="hidden lg:block lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <ContactInfo />
                </div>
              </motion.div>
            </div>
          </motion.div>
          </div>
        </section>

        {/* Section 02: Location - Premium Redesign */}
        <div className="h-px bg-gradient-to-r from-transparent via-light-border dark:via-dark-border to-transparent"></div>
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-48 relative overflow-hidden"
        >
          {/* Subtle background accent */}
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
          
          <div className="max-w-[1400px] mx-auto relative z-10">
            <motion.div variants={itemVariants} className="mb-12 md:mb-16 lg:mb-24">
              <div className="flex items-baseline gap-3 md:gap-4 mb-3 md:mb-4">
                <span className="text-[11.5px] text-primary font-mono tracking-[0.4em] uppercase">02</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-light-text dark:text-dark-text-primary leading-[0.95] tracking-tight uppercase">
                  Our Location
                </h2>
              </div>
              <motion.div
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="h-px w-16 md:w-20 bg-gradient-to-r from-primary/60 to-transparent mt-4 md:mt-6 mb-4 md:mb-6"
              />
              <p className="text-sm sm:text-base md:text-lg text-light-text-muted dark:text-dark-text-muted font-light max-w-2xl">
                Visit our headquarters in Nairobi, Kenya. We serve clients across Kenya and East Africa.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              {/* Location Details - Premium Expanded Card */}
              <div className="relative p-5 sm:p-8 md:p-12 lg:p-14 border-2 border-light-border dark:border-dark-border bg-light-lighter/50 dark:bg-dark-lighter/50 hover:bg-light-lighter dark:hover:bg-dark-lighter hover:border-primary/30 transition-all duration-500 group overflow-hidden">
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.02] pointer-events-none">
                  <svg className="w-full h-full text-light-text-subtle dark:text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="location-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#location-grid)" />
                  </svg>
                </div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border-2 border-light-border dark:border-dark-border flex items-center justify-center group-hover:border-primary transition-colors duration-300 flex-shrink-0">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="h-px w-8 sm:w-12 md:w-16 bg-primary/40 flex-shrink-0"></div>
                      <span className="text-[10px] sm:text-[11.5px] md:text-sm text-primary font-mono tracking-[0.3em] sm:tracking-[0.4em] uppercase whitespace-nowrap">Address</span>
                    </div>
                  </div>
                  
                  {/* Location Content */}
                  <div className="space-y-5 sm:space-y-6 md:space-y-8">
                    {/* Main Location */}
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light text-light-text dark:text-dark-text-primary mb-4 sm:mb-5 md:mb-6 group-hover:text-primary transition-colors duration-300 leading-tight">
                        Nairobi, Kenya
                      </h3>
                      
                      {/* Detailed Address */}
                      <div className="space-y-2.5 sm:space-y-3 md:space-y-4 pl-0 md:pl-6 border-l-0 md:border-l border-light-border dark:border-dark-border md:border-primary/20">
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-light-text-muted dark:text-dark-text-secondary font-light leading-relaxed break-words">
                          Behind Astrol Petrol Station, Utawala.
                        </p>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-light-text-muted dark:text-gray-300 font-light leading-relaxed break-words">
                          Along the Eastern Bypass
                        </p>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <div className="pt-4 sm:pt-5 md:pt-6 border-t border-light-border dark:border-dark-border">
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-light-text-muted dark:text-gray-400 leading-relaxed">
                        Our headquarters is located in Nairobi, serving clients across Kenya and East Africa.
                      </p>
                    </div>
                    
                    {/* Get Directions CTA */}
                    <div className="pt-5 sm:pt-6 md:pt-8 border-t border-light-border dark:border-gray-800">
                      <a
                        href="https://maps.app.goo.gl/DAktGxDSZVFnMbrL7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto px-5 sm:px-6 md:px-8 py-3.5 sm:py-3 md:py-4 border-2 border-primary/30 hover:border-primary bg-primary/5 hover:bg-primary/10 transition-all duration-500 group/link active:scale-[0.98]"
                      >
                        <span className="text-xs sm:text-sm md:text-base text-primary font-light">Get Directions</span>
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300 flex-shrink-0" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}
