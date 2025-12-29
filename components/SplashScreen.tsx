'use client'

import { Phone, Zap, Container, Building2, Mail, MessageCircle } from 'lucide-react'
import { Link } from 'next-view-transitions'

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
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <header className="px-4 sm:px-6 md:px-12 lg:px-20 pt-16 sm:pt-20 md:pt-28 pb-16 sm:pb-24 md:pb-32">
          <div className="mb-12 sm:mb-16 md:mb-20">
            <div className="h-16 sm:h-20 md:h-28"></div>
          </div>

          <div className="space-y-8 sm:space-y-10 md:space-y-12 text-center md:text-left">
            <div>
              <div className="text-xs sm:text-sm md:text-base text-gray-500 uppercase tracking-[0.15em] mb-4 sm:mb-6 font-light">
                Exact Solutions Limited
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[110px] font-light text-white leading-[1.05] tracking-[-0.04em] mb-6 sm:mb-8">
                EXACT
                <br />
                <span className="font-normal text-primary">SOLUTIONS</span>
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4">
                <div className="h-px w-12 sm:w-16 md:w-20 bg-primary/40"></div>
                <span className="text-sm sm:text-base md:text-lg text-gray-400 uppercase tracking-[0.25em] font-light">
                  Limited
                </span>
              </div>
            </div>

            <div className="pt-6 sm:pt-8 flex flex-col items-center md:items-start gap-4">
              <div className="inline-flex items-center gap-2 sm:gap-3 flex-wrap">
                <div className="h-px w-8 sm:w-12 bg-primary/30"></div>
                <span className="text-sm sm:text-base md:text-lg text-primary uppercase tracking-[0.2em] font-medium">
                  Website Under Construction
                </span>
                <div className="h-px w-8 sm:w-12 bg-primary/30"></div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-500 tracking-[0.2em] uppercase">
                <div className="h-px w-4 bg-primary"></div>
                <span>Launching 2026</span>
                <div className="h-px w-4 bg-primary"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Divider */}
        <div className="h-px bg-gray-900"></div>

        {/* Services */}
        <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="mb-12 sm:mb-16 md:mb-24">
            <div className="flex items-baseline gap-3 sm:gap-4 mb-3">
              <span className="text-[10px] text-primary font-medium tracking-[0.3em] uppercase">01</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight uppercase">
                Our Services
              </h2>
            </div>
            <div className="h-px w-12 sm:w-16 bg-primary/40 mt-4 sm:mt-6"></div>
          </div>

          <div className="space-y-2 max-w-4xl">
            {/* Equipment & Generators */}
            <div className="flex items-start gap-4 p-4 hover:border-primary/30 hover:text-primary transition-all duration-300 border border-dark-lighter rounded-none group">
              <div className="border border-gray-800 rounded-none p-3 group-hover:border-primary/50 transition-colors">
                <Zap className="w-6 h-6 text-gray-500 group-hover:text-primary transition-colors" />
              </div>
              <div>
                <h3 className="text-base font-medium text-white group-hover:text-primary transition-colors">Equipment & Generators</h3>
                <p className="text-gray-600 text-sm mt-1">Industrial power solutions that keep you running</p>
              </div>
            </div>

            {/* Shipping Containers */}
            <div className="flex items-start gap-4 p-4 hover:border-primary/30 hover:text-primary transition-all duration-300 border border-dark-lighter rounded-none group">
              <div className="border border-gray-800 rounded-none p-3 group-hover:border-primary/50 transition-colors">
                <Container className="w-6 h-6 text-gray-500 group-hover:text-primary transition-colors" />
              </div>
              <div>
                <h3 className="text-base font-medium text-white group-hover:text-primary transition-colors">Shipping Containers & Reefers</h3>
                <p className="text-gray-600 text-sm mt-1">Specialized storage and transport logistics infrastructure</p>
              </div>
            </div>

            {/* Metal Fabrication */}
            <div className="flex items-start gap-4 p-4 hover:border-primary/30 hover:text-primary transition-all duration-300 border border-dark-lighter rounded-none group">
              <div className="border border-gray-800 rounded-none p-3 group-hover:border-primary/50 transition-colors">
                <Building2 className="w-6 h-6 text-gray-500 group-hover:text-primary transition-colors" />
              </div>
              <div>
                <h3 className="text-base font-medium text-white group-hover:text-primary transition-colors">Glass, Aluminum & Steel</h3>
                <p className="text-gray-600 text-sm mt-1">Precision architectural and industrial fabrication services</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gray-900"></div>

        {/* Contact */}
        <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="mb-12 sm:mb-16 md:mb-24">
            <div className="flex items-baseline gap-3 sm:gap-4 mb-3">
              <span className="text-[10px] text-primary font-medium tracking-[0.3em] uppercase">02</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight uppercase">
                Get In Touch
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
              Ready to discuss your project?
            </p>
            <p className="text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4">
              For detailed inquiries, use our <Link href="/contact" className="text-primary hover:underline">contact form</Link>.
            </p>
          </div>

          <div className="max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/254720876787?text=Hi,%20I'm%20reaching%20out%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white py-3 px-6 text-sm font-medium hover:bg-primary-dark transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              
              {/* Call Button */}
              <a
                href="tel:+254720876787"
                className="bg-transparent text-white border border-gray-800 py-3 px-6 text-sm font-medium hover:border-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>

              {/* Email Button */}
              <a
                href="mailto:expert@exactsolutions.co.ke"
                className="bg-transparent text-white border border-gray-800 py-3 px-6 text-sm font-medium hover:border-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email Us
              </a>
            </div>

            {/* Enhanced Contact Info at Bottom */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 mt-12 border-t border-gray-900">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Email</h4>
                <a 
                  href="mailto:expert@exactsolutions.co.ke"
                  className="text-white hover:text-primary transition-colors duration-300 text-lg break-all"
                >
                  expert@exactsolutions.co.ke
                </a>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Primary Phone</h4>
                <a 
                  href="tel:+254720876787"
                  className="text-white hover:text-primary transition-colors duration-300 text-lg"
                >
                  +254 720 876 787
                </a>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Additional Lines</h4>
                <div className="space-y-2">
                  <a href="tel:+254795850668" className="block text-gray-500 hover:text-white transition-colors">+254 795 850 668</a>
                  <a href="tel:+254737066684" className="block text-gray-500 hover:text-white transition-colors">+254 737 066 684</a>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Response Time</h4>
                <p className="text-gray-500">Within 24 hours</p>
                <p className="text-gray-500 text-sm mt-1">Mon-Fri, 8AM-5PM EAT</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
