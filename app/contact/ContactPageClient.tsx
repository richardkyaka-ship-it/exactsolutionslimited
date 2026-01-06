'use client'

import { motion } from 'framer-motion'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

export default function ContactPageClient() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-[1800px] mx-auto">
        {/* Section 01: Hero */}
        <section className="px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-24 md:pb-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16 md:mb-24"
          >
            <motion.div variants={itemVariants} className="flex items-baseline gap-4 mb-3">
              <span className="text-[10px] text-primary font-medium tracking-[0.3em] uppercase">01</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
                Contact Us
              </h1>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              className="h-px w-16 bg-primary/40 mt-6"
            />
            <motion.div variants={itemVariants} className="mt-6">
              <p className="text-sm text-gray-500">
                Get in touch with our industrial solutions team
              </p>
              <p className="text-sm text-gray-500 mt-4 max-w-2xl">
                Have a project in mind? Describe your requirements and we'll provide exact solutions tailored to your needs.
              </p>
            </motion.div>
          </motion.div>

          {/* Two-Column Layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-20">
              {/* Left Column: Contact Form (2/3) */}
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <ContactForm />
              </motion.div>

              {/* Right Column: Contact Info (1/3) */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <ContactInfo />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Section 02: Location (Optional) */}
        <div className="h-px bg-gray-900"></div>
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="px-6 md:px-12 lg:px-20 py-24 md:py-32"
        >
          <motion.div variants={itemVariants} className="mb-16">
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-[10px] text-primary font-medium tracking-[0.3em] uppercase">02</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
                Our Location
              </h2>
            </div>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="h-px w-16 bg-primary/40 mt-6"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-4xl">
            <div className="bg-dark-lighter border border-gray-800 h-64 md:h-96 flex items-center justify-center mb-6">
              <p className="text-sm text-gray-500">Google Maps placeholder</p>
            </div>
            <div>
              <p className="text-sm text-white mb-2">Nairobi, Kenya</p>
              <p className="text-xs text-gray-500">
                Serving clients across Kenya and East Africa
              </p>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </main>
  )
}
