'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// WhatsApp Icon - Styled to match site aesthetic
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
      fill="currentColor"
    />
  </svg>
)

const SERVICES = [
  {
    title: 'Equipment & Generators',
    description: 'High-performance power systems engineered for industrial resilience. End-to-end energy solutions from technical sizing to installation and maintenance.'
  },
  {
    title: 'Shipping Containers',
    description: 'Specialized storage and logistics infrastructure. Containers and refrigerated units built to international maritime standards for extreme durability.'
  },
  {
    title: 'Building & Construction',
    description: 'Precision architectural and industrial fabrication. High-grade stainless steel work and structural aluminum systems for modern commercial applications.'
  }
]

const PHONE_NUMBERS = [
  '+254720876787',
  '+254795850668',
  '+254737066684',
]

const formatPhoneNumber = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('254')) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`
  }
  return phone
}

export default function RestrictedSplashScreen() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Subtle technical overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="splash-circuit-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1" />
              <circle cx="0" cy="0" r="0.2" fill="white" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#splash-circuit-grid)" />
        </svg>
      </div>

      <div className="max-w-[1800px] mx-auto w-full flex-grow flex flex-col relative z-10">
        {/* Integrated Hero & Services - Dynamic Editorial Layout */}
        <section className="px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-16 md:pb-24 relative">
          <div className="max-w-[1400px] mx-auto">
            {/* Top Section - Hero Left, Service Preview Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-start mb-24 md:mb-40 lg:mb-56">
              {/* Left - Hero (5 cols) */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="lg:col-span-5 space-y-4 md:space-y-6 lg:space-y-8 lg:sticky lg:top-32"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-[11.5px] text-primary font-mono tracking-[0.4em] uppercase"
                >
                  Exact Solutions Limited
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[0.95] tracking-tight uppercase"
                >
                  EXACT
                  <br />
                  <span className="text-primary">SOLUTIONS</span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex items-center gap-3 pt-2"
                >
                  <div className="h-px w-12 bg-primary/40"></div>
                  <span className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.3em] font-light">
                    Industrial Solutions Engineering
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="pt-6"
                >
                  <div className="relative inline-flex items-center gap-3 text-[14px] md:text-[16px] text-primary tracking-[0.4em] uppercase border-2 border-primary/50 px-6 md:px-8 py-3 md:py-4 bg-primary/10 hover:bg-primary/15 hover:border-primary transition-all duration-500 group">
                    {/* Animated Pulse Ring */}
                    <div className="absolute inset-0 border-2 border-primary/30 rounded-sm animate-ping opacity-75"></div>
                    <div className="relative flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50" />
                      <span className="font-medium">Launching Early 2026</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right - First Service (7 cols) */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="lg:col-span-7 lg:pt-24 border-l-0 lg:border-l border-gray-900 pl-0 lg:pl-8 md:pl-12 lg:pl-16 mt-12 lg:mt-0"
              >
                <div className="flex items-start gap-3 md:gap-6 mb-6 md:mb-8">
                  <div className="flex flex-row md:flex-col items-start gap-3 md:gap-0 flex-shrink-0">
                    <span className="text-[11.5px] text-primary font-mono tracking-[0.4em] uppercase md:mb-8">01</span>
                    <div className="w-px md:w-px h-12 md:h-20 md:bg-gradient-to-b bg-gradient-to-r from-primary/60 to-transparent md:from-primary/60"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-white leading-[0.95] tracking-tight uppercase mb-4 md:mb-6">
                      Equipment, Generators<br />
                      <span className="text-primary">& Energy</span>
                    </h3>
                    <p className="text-sm md:text-base lg:text-lg font-light text-gray-400 leading-relaxed max-w-xl">
                      {SERVICES[0].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Services Grid - Asymmetric Creative Layout */}
            <div className="space-y-16 md:space-y-24 lg:space-y-32 border-t border-gray-900 pt-16 md:pt-24 lg:pt-32">
              {/* Service 02 - Offset Layout */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-row md:grid md:grid-cols-12 gap-3 md:gap-8 lg:gap-16 items-start"
              >
                {/* Left Spacer - Creates Offset */}
                <div className="hidden md:block md:col-span-2"></div>
                
                {/* Number & Divider - Horizontal on mobile, vertical on desktop */}
                <div className="md:col-span-2 flex-shrink-0">
                  <div className="flex flex-row md:flex-col items-start gap-3 md:gap-0">
                    <span className="text-[11.5px] text-primary font-mono tracking-[0.4em] uppercase md:mb-8">02</span>
                    <div className="w-px md:w-px h-12 md:h-24 md:bg-gradient-to-b bg-gradient-to-r from-primary/60 to-transparent md:from-primary/60"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 md:col-span-8">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-[0.95] tracking-tight uppercase mb-4 md:mb-6">
                    Shipping Containers<br />
                    <span className="text-primary">& Reefers</span>
                  </h3>
                  <div className="max-w-2xl">
                    <p className="text-base md:text-lg lg:text-xl font-light text-gray-400 leading-relaxed">
                      {SERVICES[1].description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Service 03 - Full Width */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="flex flex-row md:grid md:grid-cols-12 gap-3 md:gap-8 lg:gap-16 items-start"
              >
                {/* Number & Divider - Horizontal on mobile, vertical on desktop */}
                <div className="md:col-span-2 flex-shrink-0">
                  <div className="flex flex-row md:flex-col items-start gap-3 md:gap-0">
                    <span className="text-[11.5px] text-primary font-mono tracking-[0.4em] uppercase md:mb-8">03</span>
                    <div className="w-px md:w-px h-12 md:h-24 md:bg-gradient-to-b bg-gradient-to-r from-primary/60 to-transparent md:from-primary/60"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 md:col-span-10">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-[0.95] tracking-tight uppercase mb-4 md:mb-6">
                    Glass, Aluminum<br />
                    <span className="text-primary">& Steel</span>
                  </h3>
                  <div className="max-w-2xl">
                    <p className="text-base md:text-lg lg:text-xl font-light text-gray-400 leading-relaxed">
                      {SERVICES[2].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section - Premium Integrated with Diagonal Flow */}
        <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-48 border-t border-gray-900 relative overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
          
          <div className="max-w-[1400px] mx-auto relative z-10">
            {/* Section Header - Minimal & Elegant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mb-16 md:mb-24 lg:mb-32 max-w-3xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[11.5px] text-primary font-mono tracking-[0.4em] uppercase">Contact</span>
                <div className="h-px w-16 bg-primary/40"></div>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[0.95] tracking-tight uppercase mb-3 md:mb-4">
                Get In Touch
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-500 font-light">
                Connect with our engineering team. We're ready to discuss your industrial solutions requirements.
              </p>
            </motion.div>

            {/* Contact Grid - Creative 3-Column Asymmetric */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12">
              {/* Phone - 3 cols */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="md:col-span-1 lg:col-span-3 space-y-4 md:space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 border border-gray-800 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[11.5px] text-primary font-mono tracking-[0.4em] uppercase">Phone</span>
                </div>
                <div className="space-y-3 pl-14">
                  {PHONE_NUMBERS.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone}`}
                      className="block text-lg font-light text-white hover:text-primary transition-colors duration-300"
                    >
                      {formatPhoneNumber(phone)}
                    </a>
                  ))}
                  <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mt-4">
                    Mon-Fri, 8AM-5PM EAT
                  </p>
                </div>
              </motion.div>

              {/* Email - 3 cols */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="md:col-span-1 lg:col-span-3 space-y-4 md:space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 border border-gray-800 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[11.5px] text-primary font-mono tracking-[0.4em] uppercase">Email</span>
                </div>
                <div className="pl-14">
                  <a
                    href="mailto:expert@exactsolutions.co.ke"
                    className="block text-lg font-light text-white hover:text-primary transition-colors duration-300 break-all mb-3"
                  >
                    expert@exactsolutions.co.ke
                  </a>
                  <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">
                    Response within 24 hours
                  </p>
                </div>
              </motion.div>

              {/* CTA Cards - 6 cols (Prominent) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:col-span-2 lg:col-span-6 space-y-4 mt-8 md:mt-0"
              >
                {/* Primary CTA */}
                <Link
                  href="/contact"
                  className="group block w-full p-6 md:p-8 border-2 border-primary/30 hover:border-primary bg-primary/5 hover:bg-primary/10 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11.5px] text-primary font-mono tracking-[0.4em] uppercase">Contact Form</span>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-2 group-hover:text-primary transition-colors duration-300">
                      Send a Message
                    </h3>
                    <p className="text-xs text-gray-400">
                      Describe your project requirements
                    </p>
                  </div>
                </Link>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/254720876787?text=Hi,%20I'm%20reaching%20out%20about%20your%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-full p-6 border border-gray-800 hover:border-primary/50 hover:bg-primary/5 transition-all duration-500"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300">
                        <WhatsAppIcon className="w-full h-full" />
                      </div>
                      <span className="text-[11.5px] text-primary font-mono tracking-[0.4em] uppercase">WhatsApp</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                  <p className="text-sm font-light text-white group-hover:text-primary transition-colors duration-300">
                    Instant Messaging
                  </p>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer - Minimalist Premium */}
        <footer className="px-6 md:px-20 py-16 md:py-24 border-t border-gray-900 bg-dark-light mt-auto relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {/* Brand */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-[10px] md:text-sm text-gray-500 uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 font-light">
                  Exact Solutions Limited
                </div>
                <div className="text-2xl md:text-3xl font-light text-white leading-tight tracking-tighter uppercase mb-2">
                  EXACT<span className="text-primary">SOLUTIONS</span>
                </div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.2em] md:tracking-[0.3em] font-light">
                  Industrial Solutions Engineering
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="space-y-4"
              >
                <div>
                  <div className="text-[11.5px] text-primary uppercase tracking-[0.3em] font-mono mb-2">Email</div>
                  <a 
                    href="mailto:expert@exactsolutions.co.ke"
                    className="text-base font-light text-white hover:text-primary transition-colors block break-all"
                  >
                    expert@exactsolutions.co.ke
                  </a>
                </div>
                <div>
                  <div className="text-[11.5px] text-primary uppercase tracking-[0.3em] font-mono mb-2">Phone</div>
                  <a 
                    href="tel:+254720876787"
                    className="text-base font-light text-white hover:text-primary transition-colors block"
                  >
                    +254 720 876 787
                  </a>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-4"
              >
                <div className="text-[11.5px] text-primary uppercase tracking-[0.3em] font-mono mb-2">Quick Links</div>
                <div className="space-y-2">
                  <Link 
                    href="/contact"
                    className="block text-base font-light text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Form
                  </Link>
                  <a 
                    href="https://wa.me/254720876787"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-base font-light text-gray-400 hover:text-white transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Bottom Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-12 pt-8 border-t border-gray-900 text-center"
            >
              <p className="text-xs text-gray-600 uppercase tracking-[0.2em]">
                © {new Date().getFullYear()} Exact Solutions Limited. All rights reserved.
              </p>
            </motion.div>
          </div>
        </footer>
      </div>
    </div>
  )
}
