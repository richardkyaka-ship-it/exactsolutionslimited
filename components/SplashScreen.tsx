'use client'

import { Phone, Zap, Container, Building2, Mail, MessageCircle } from 'lucide-react'

const PHONE_NUMBERS = [
  '+254720876787',
  '+254795850668',
  '+254737066684',
]

const CATEGORIES = [
  {
    title: 'Equipment, Generators & Energy Solutions',
    tagline: 'Power solutions that keep you running',
    icon: Zap,
  },
  {
    title: 'Shipping Containers & Reefers',
    tagline: 'Storage & transport solutions',
    icon: Container,
  },
  {
    title: 'Glass, Aluminum & Stainless Steel',
    tagline: 'Custom industrial solutions',
    icon: Building2,
  },
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
        <header className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-24 md:pb-32">
          <div className="mb-20">
            <div className="h-20 md:h-28"></div>
          </div>
          
          <div className="space-y-12">
            <div>
              <div className="text-sm md:text-base text-gray-500 uppercase tracking-[0.15em] mb-6 font-light">
                Exact Solutions Limited
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-[110px] font-light text-white leading-[1.05] tracking-[-0.04em] mb-8">
                EXACT
                <br />
                <span className="font-normal text-primary">SOLUTIONS</span>
              </h1>
              <div className="flex items-center gap-4">
                <div className="h-px w-20 bg-primary/40"></div>
                <span className="text-base md:text-lg text-gray-400 uppercase tracking-[0.25em] font-light">
                  Limited
                </span>
              </div>
            </div>

            <div className="pt-8">
              <div className="inline-flex items-center gap-3">
                <div className="h-px w-12 bg-primary/30"></div>
                <span className="text-base md:text-lg text-primary uppercase tracking-[0.2em] font-medium">
                  Website Under Construction
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Divider */}
        <div className="h-px bg-gray-900"></div>

        {/* Services */}
        <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
          <div className="mb-16 md:mb-24">
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-[10px] text-primary font-medium tracking-[0.3em] uppercase">01</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
                Our Services
              </h2>
            </div>
            <div className="h-px w-16 bg-primary/40 mt-6"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 md:gap-16 lg:gap-20">
            {CATEGORIES.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.title} className="group">
                  <div className="mb-6">
                    <div className="w-12 h-12 border border-gray-800 flex items-center justify-center group-hover:border-primary/50 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary/70 group-hover:text-primary transition-colors duration-300" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-medium text-white mb-3 group-hover:text-primary/90 transition-colors duration-300 leading-tight">
                    {category.title}
                  </h3>
                  
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {category.tagline}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gray-900"></div>

        {/* Contact */}
        <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
          <div className="mb-16 md:mb-24">
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-[10px] text-primary font-medium tracking-[0.3em] uppercase">02</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
                Get In Touch
              </h2>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Ready to discuss your project?
            </p>
          </div>
          
          <div className="max-w-4xl">
            <div className="grid md:grid-cols-3 gap-4">
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/254720876787?text=Hi,%20I'm%20reaching%20out%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 px-6 py-4 bg-primary text-white border border-primary hover:bg-primary/90 transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">WhatsApp</span>
              </a>

              {/* Call Button */}
              <a
                href="tel:+254720876787"
                className="group flex items-center justify-center gap-3 px-6 py-4 bg-transparent text-white border border-gray-800 hover:border-primary hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <Phone className="w-5 h-5" />
                <span className="text-sm font-medium">Call Us</span>
              </a>

              {/* Email Button */}
              <a
                href="mailto:expert@exactsolutions.co.ke"
                className="group flex items-center justify-center gap-3 px-6 py-4 bg-transparent text-white border border-gray-800 hover:border-primary hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm font-medium">Email Us</span>
              </a>
            </div>

            {/* Contact Information */}
            <div className="mt-16 pt-16 border-t border-gray-900">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xs text-gray-500 uppercase tracking-[0.15em] mb-6 font-medium">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <a
                        href="mailto:expert@exactsolutions.co.ke"
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        expert@exactsolutions.co.ke
                      </a>
                    </div>
                    <div className="space-y-2">
                      {PHONE_NUMBERS.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone}`}
                          className="block text-sm text-gray-400 hover:text-white transition-colors duration-300"
                        >
                          {formatPhoneNumber(phone)}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}