'use client'

import { Zap, Container, Building2, Mail, MessageCircle, Phone } from 'lucide-react'
import { Link } from 'next-view-transitions'
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
        <header className="px-6 md:px-12 lg:px-20 py-20 md:py-32 flex flex-col justify-center items-center text-center">
          <div className="space-y-12 md:space-y-16 w-full max-w-5xl">
            <div className="flex flex-col items-center">
              <div className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.4em] mb-8 font-light">
                Exact Solutions Limited
              </div>
              <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[140px] font-light text-white leading-[0.9] tracking-[-0.05em] mb-12 uppercase">
                EXACT
                <br />
                <span className="font-normal text-primary">SOLUTIONS</span>
              </h1>
              <div className="flex items-center justify-center gap-6">
                <div className="h-px w-16 md:w-24 bg-primary/40"></div>
                <span className="text-sm md:text-xl text-gray-400 uppercase tracking-[0.5em] font-light">
                  Limited
                </span>
                <div className="h-px w-16 md:w-24 bg-primary/40"></div>
              </div>
            </div>

            <div className="pt-8 flex flex-col items-center gap-6">
              <div className="inline-flex items-center gap-4 flex-wrap justify-center">
                <div className="h-px w-12 md:w-16 bg-primary/30"></div>
                <span className="text-sm md:text-xl text-primary uppercase tracking-[0.3em] font-medium">
                  Website Under Construction
                </span>
                <div className="h-px w-12 md:w-16 bg-primary/30"></div>
              </div>
              
              <div className="flex items-center gap-3 text-xs md:text-sm text-gray-500 tracking-[0.4em] uppercase">
                <div className="h-px w-8 bg-primary/60"></div>
                <span>Launching 2026</span>
                <div className="h-px w-8 bg-primary/60"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Conditional Sections - Only visible on Main Splash (/) */}
        {isMainSplash && (
          <div className="flex-grow">
            <div className="h-px bg-gray-900 mx-6 md:mx-20"></div>

            {/* Services Section - Centralized and Spread Out */}
            <section className="px-6 md:px-20 py-24 md:py-32 text-center">
              <div className="mb-20">
                <span className="text-[10px] text-primary font-mono tracking-[0.4em] uppercase mb-4 block">Section 01</span>
                <h2 className="text-4xl md:text-6xl font-light tracking-tight uppercase">Our Services</h2>
                <div className="h-px w-24 bg-primary/40 mx-auto mt-8"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                <div className="group p-8 border border-gray-900 hover:border-primary/20 transition-all duration-500 flex flex-col items-center">
                  <div className="w-16 h-16 border border-gray-800 flex items-center justify-center mb-8 group-hover:border-primary/40 transition-colors">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-4">Equipment & Generators</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Industrial power solutions designed for maximum resilience.</p>
                </div>

                <div className="group p-8 border border-gray-900 hover:border-primary/20 transition-all duration-500 flex flex-col items-center">
                  <div className="w-16 h-16 border border-gray-800 flex items-center justify-center mb-8 group-hover:border-primary/40 transition-colors">
                    <Container className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-4">Shipping Containers</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Specialized storage and refrigerated logistics infrastructure.</p>
                </div>

                <div className="group p-8 border border-gray-900 hover:border-primary/20 transition-all duration-500 flex flex-col items-center">
                  <div className="w-16 h-16 border border-gray-800 flex items-center justify-center mb-8 group-hover:border-primary/40 transition-colors">
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-4">Metal Fabrication</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Precision glass, aluminum, and stainless steel fabrication.</p>
                </div>
              </div>
            </section>

            <div className="h-px bg-gray-900 mx-6 md:mx-20"></div>

            {/* Get In Touch Section - Centralized and Spread Out */}
            <section className="px-6 md:px-20 py-24 md:py-32 text-center">
              <div className="mb-20">
                <span className="text-[10px] text-primary font-mono tracking-[0.4em] uppercase mb-4 block">Section 02</span>
                <h2 className="text-4xl md:text-6xl font-light tracking-tight uppercase">Get In Touch</h2>
                <p className="text-gray-500 text-sm mt-6 uppercase tracking-widest">Connect with our engineering team</p>
              </div>

              <div className="flex flex-col md:flex-row gap-6 justify-center max-w-4xl mx-auto">
                <a
                  href="https://wa.me/254720876787?text=Hi,%20I'm%20reaching%20out%20about%20your%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-12 py-5 bg-primary text-white text-xs uppercase tracking-[0.3em] font-medium hover:bg-primary-dark transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
                <a
                  href="tel:+254720876787"
                  className="px-12 py-5 border border-gray-800 text-white text-xs uppercase tracking-[0.3em] font-medium hover:border-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  Direct Call
                </a>
                <a
                  href="mailto:expert@exactsolutions.co.ke"
                  className="px-12 py-5 border border-gray-800 text-white text-xs uppercase tracking-[0.3em] font-medium hover:border-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Mail className="w-5 h-5" />
                  Email Office
                </a>
              </div>
              
              <p className="mt-12 text-xs text-gray-600 uppercase tracking-[0.2em]">
                For detailed inquiries, use our <Link href="/contact" className="text-primary hover:underline">contact form</Link>.
              </p>
            </section>
          </div>
        )}

        {/* Footer - Always Visible, Spread Out Grid */}
        <footer className="px-6 md:px-20 py-20 border-t border-gray-900 bg-dark-light">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            <div className="space-y-4">
              <h4 className="text-[10px] text-primary uppercase tracking-[0.4em] font-mono">Email</h4>
              <a 
                href="mailto:expert@exactsolutions.co.ke"
                className="text-lg md:text-xl font-light text-white hover:text-primary transition-colors block break-all"
              >
                expert@exactsolutions.co.ke
              </a>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-[10px] text-primary uppercase tracking-[0.4em] font-mono">Primary Phone</h4>
              <a 
                href="tel:+254720876787"
                className="text-lg md:text-xl font-light text-white hover:text-primary transition-colors block"
              >
                +254 720 876 787
              </a>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-[10px] text-primary uppercase tracking-[0.4em] font-mono">Additional Lines</h4>
              <div className="space-y-2">
                <a href="tel:+254795850668" className="block text-gray-500 hover:text-white transition-colors">+254 795 850 668</a>
                <a href="tel:+254737066684" className="block text-gray-500 hover:text-white transition-colors">+254 737 066 684</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-[10px] text-primary uppercase tracking-[0.4em] font-mono">Response Time</h4>
              <p className="text-lg font-light text-white">Within 24 hours</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">Mon-Fri, 8AM-5PM EAT</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
