'use client'

import { Zap, Container, Factory, Mail, MessageCircle, Phone } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

export default function SplashScreen() {
  const pathname = usePathname()
  const isMainSplash = pathname === '/'

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="max-w-[1800px] mx-auto w-full flex-grow flex flex-col">
        {/* Header - Always Visible, Always Massive & Centralized */}
        <header className="px-6 md:px-12 lg:px-20 py-20 md:py-32 min-h-[80vh] md:min-h-screen flex flex-col justify-center items-center text-center">
          <div className="space-y-10 md:space-y-16 w-full max-w-5xl">
            <div className="flex flex-col items-center">
              <div className="text-[10px] md:text-sm text-gray-500 uppercase tracking-[0.3em] md:tracking-[0.4em] mb-6 md:mb-8 font-light">
                Exact Solutions Limited
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[140px] font-light text-white leading-[1.1] md:leading-[0.9] tracking-[-0.04em] md:tracking-[-0.05em] mb-8 md:mb-12 uppercase">
                EXACT
                <br />
                <span className="font-normal text-primary">SOLUTIONS</span>
              </h1>
              <div className="flex items-center justify-center gap-4 md:gap-6">
                <div className="h-px w-8 md:w-24 bg-primary/40"></div>
                <span className="text-xs md:text-xl text-gray-400 uppercase tracking-[0.3em] md:tracking-[0.5em] font-light">
                  Limited
                </span>
                <div className="h-px w-8 md:w-24 bg-primary/40"></div>
              </div>
            </div>

            <div className="pt-4 md:pt-8 flex flex-col items-center gap-4 md:gap-6">
              <div className="inline-flex items-center gap-3 md:gap-4 flex-wrap justify-center">
                <div className="hidden md:block h-px w-16 bg-primary/30"></div>
                <span className="text-xs md:text-xl text-primary uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium border-x border-primary/20 md:border-none px-4 md:px-0">
                  Website Under Construction
                </span>
                <div className="hidden md:block h-px w-16 bg-primary/30"></div>
              </div>
              
              <div className="flex items-center gap-3 text-[10px] md:text-sm text-gray-500 tracking-[0.2em] md:tracking-[0.4em] uppercase">
                <div className="h-px w-4 md:w-8 bg-primary/60"></div>
                <span>Launching 2026</span>
                <div className="h-px w-4 md:w-8 bg-primary/60"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Conditional Sections - Only visible on Main Splash (/) */}
        {isMainSplash && (
          <div className="flex-grow">
            <div className="h-px bg-gray-900 mx-6 md:mx-20"></div>

            {/* Services Section - Premium Editorial Layout */}
            <section className="px-6 md:px-20 py-20 md:py-32">
              <div className="max-w-7xl mx-auto">
                <div className="mb-20 md:mb-32 text-center">
                  <span className="text-[10px] text-primary font-mono tracking-[0.3em] uppercase mb-6 block">Section 01</span>
                  <h2 className="text-4xl md:text-7xl lg:text-8xl font-light tracking-tight uppercase mb-6">Our Services</h2>
                  <div className="h-px w-24 bg-primary/40 mx-auto"></div>
                </div>

                {/* Premium Service List - Minimalist Editorial Style */}
                <div className="space-y-16 md:space-y-24 max-w-5xl mx-auto">
                  {/* Service 01 */}
                  <div className="group relative">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-[10px] text-primary font-mono tracking-[0.4em] uppercase">01</span>
                          <div className="h-px flex-1 bg-gray-900"></div>
                        </div>
                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-light text-white tracking-tight uppercase mb-4 group-hover:text-primary transition-colors duration-500">
                          Equipment, Generators & Energy
                        </h3>
                        <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl">
                          High-performance power systems engineered for industrial resilience. End-to-end energy solutions from technical sizing to installation and maintenance.
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                          <Zap className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service 02 */}
                  <div className="group relative">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-[10px] text-primary font-mono tracking-[0.4em] uppercase">02</span>
                          <div className="h-px flex-1 bg-gray-900"></div>
                        </div>
                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-light text-white tracking-tight uppercase mb-4 group-hover:text-primary transition-colors duration-500">
                          Shipping Containers & Reefers
                        </h3>
                        <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl">
                          Specialized storage and logistics infrastructure. Containers and refrigerated units built to international maritime standards for extreme durability.
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                          <Container className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service 03 */}
                  <div className="group relative">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-[10px] text-primary font-mono tracking-[0.4em] uppercase">03</span>
                          <div className="h-px flex-1 bg-gray-900"></div>
                        </div>
                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-light text-white tracking-tight uppercase mb-4 group-hover:text-primary transition-colors duration-500">
                          Glass, Aluminum & Steel
                        </h3>
                        <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl">
                          Precision architectural and industrial fabrication. High-grade stainless steel work and structural aluminum systems for modern commercial applications.
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                          <Factory className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="h-px bg-gray-900 mx-6 md:mx-20"></div>

            {/* Get In Touch Section - Centralized and Spread Out */}
            <section className="px-6 md:px-20 py-20 md:py-32 text-center">
              <div className="mb-16 md:mb-20">
                <span className="text-[10px] text-primary font-mono tracking-[0.4em] uppercase mb-4 block">Section 02</span>
                <h2 className="text-3xl md:text-6xl font-light tracking-tight uppercase">Get In Touch</h2>
                <p className="text-gray-500 text-[10px] md:text-sm mt-4 md:mt-6 uppercase tracking-[0.2em] md:tracking-widest">Connect with our engineering team</p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center max-w-4xl mx-auto">
                <a
                  href="https://wa.me/254720876787?text=Hi,%20I'm%20reaching%20out%20about%20your%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto px-8 md:px-12 py-4 md:py-5 bg-primary text-white text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium hover:bg-primary-dark transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
                <a
                  href="tel:+254720876787"
                  className="w-full md:w-auto px-8 md:px-12 py-4 md:py-5 border border-gray-800 text-white text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium hover:border-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  Direct Call
                </a>
                <a
                  href="mailto:expert@exactsolutions.co.ke"
                  className="w-full md:w-auto px-8 md:px-12 py-4 md:py-5 border border-gray-800 text-white text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium hover:border-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Mail className="w-5 h-5" />
                  Email Office
                </a>
              </div>
              
              <p className="mt-12 text-[10px] text-gray-600 uppercase tracking-[0.2em]">
                For detailed inquiries, use our <Link href="/contact" className="text-primary hover:underline">contact form</Link>.
              </p>
            </section>
          </div>
        )}

        {/* Footer - Always Visible, Spread Out Grid */}
        <footer className="px-6 md:px-20 py-16 md:py-20 border-t border-gray-900 bg-dark-light">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-[10px] text-primary uppercase tracking-[0.3em] md:tracking-[0.4em] font-mono">Email</h4>
              <a 
                href="mailto:expert@exactsolutions.co.ke"
                className="text-base md:text-xl font-light text-white hover:text-primary transition-colors block break-all"
              >
                expert@exactsolutions.co.ke
              </a>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-[10px] text-primary uppercase tracking-[0.3em] md:tracking-[0.4em] font-mono">Primary Phone</h4>
              <a 
                href="tel:+254720876787"
                className="text-base md:text-xl font-light text-white hover:text-primary transition-colors block"
              >
                +254 720 876 787
              </a>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-[10px] text-primary uppercase tracking-[0.3em] md:tracking-[0.4em] font-mono">Additional Lines</h4>
              <div className="space-y-1 md:space-y-2">
                <a href="tel:+254795850668" className="block text-sm md:text-base text-gray-500 hover:text-white transition-colors">+254 795 850 668</a>
                <a href="tel:+254737066684" className="block text-sm md:text-base text-gray-500 hover:text-white transition-colors">+254 737 066 684</a>
              </div>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-[10px] text-primary uppercase tracking-[0.3em] md:tracking-[0.4em] font-mono">Response Time</h4>
              <p className="text-base md:text-xl font-light text-white">Within 24 hours</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 md:mt-2">Mon-Fri, 8AM-5PM EAT</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
