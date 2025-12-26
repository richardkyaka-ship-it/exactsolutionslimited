'use client'

import { Phone, Zap, Container, Building2, ArrowRight } from 'lucide-react'
import ThemeSwitcher from './ThemeSwitcher'

const PHONE_NUMBERS = [
  '+254720876787',
  '+254795850668',
  '+254737066684',
]

const CATEGORIES = [
  {
    title: 'Generators & Energy',
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
    <>
      <ThemeSwitcher />
      <div className="min-h-screen bg-white dark:bg-dark relative overflow-hidden">
        {/* Background accent elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Header Section - Asymmetric */}
          <div className="flex-1 flex items-center px-6 md:px-12 lg:px-20 py-20 md:py-32">
            <div className="max-w-7xl w-full">
              {/* Logo space */}
              <div className="h-24 md:h-32 mb-12"></div>
              
              <div className="grid md:grid-cols-12 gap-8 items-start">
                {/* Left side - Company name */}
                <div className="md:col-span-7">
                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-black dark:text-white mb-6 leading-[0.9] tracking-tight">
                    EXACT
                    <br />
                    <span className="text-primary">SOLUTIONS</span>
                  </h1>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-1 w-20 bg-primary"></div>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 uppercase tracking-[0.2em] font-medium">
                      Limited
                    </p>
                  </div>
                </div>
                
                {/* Right side - Status */}
                <div className="md:col-span-5 md:pt-8">
                  <div className="inline-block bg-primary/10 dark:bg-primary/20 px-8 py-4 border-2 border-primary/40">
                    <p className="text-lg md:text-xl font-bold text-primary uppercase tracking-wider">
                      Website Under Construction
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Section - Minimal & Impactful */}
          <div className="px-6 md:px-12 lg:px-20 pb-20 md:pb-32">
            <div className="max-w-7xl w-full">
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
                  Our Services
                </h2>
                <div className="h-1 w-24 bg-primary"></div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                {CATEGORIES.map((category, index) => {
                  const Icon = category.icon
                  return (
                    <div
                      key={category.title}
                      className="group relative"
                    >
                      {/* Icon with accent */}
                      <div className="mb-6">
                        <div className="w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                          <Icon className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-3 group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      
                      <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                        {category.tagline}
                      </p>
                      
                      {/* Accent line on hover */}
                      <div className="h-0.5 w-0 bg-primary mt-4 group-hover:w-full transition-all duration-300"></div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Contact Section - Full width accent */}
          <div className="bg-primary/5 dark:bg-primary/10 border-t border-gray-200 dark:border-gray-800">
            <div className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
              <div className="max-w-7xl w-full">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
                      Get In Touch
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      Ready to discuss your project?
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                  {PHONE_NUMBERS.map((phone, index) => (
                    <a
                      key={phone}
                      href={`tel:${phone}`}
                      className="group flex items-center justify-between gap-4 text-lg font-semibold text-black dark:text-white bg-white dark:bg-dark-lighter border-2 border-gray-200 dark:border-gray-800 px-6 py-5 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                          <Phone className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <span>{formatPhoneNumber(phone)}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}