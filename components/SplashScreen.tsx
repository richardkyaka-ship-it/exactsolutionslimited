'use client'

import { Phone, Zap, Container, Building2 } from 'lucide-react'
import ThemeSwitcher from './ThemeSwitcher'

const PHONE_NUMBERS = [
  '+254720876787',
  '+254795850668',
  '+254737066684',
]

const CATEGORIES = [
  {
    title: 'Generators & Energy Solutions',
    description: 'Comprehensive power generation systems designed for reliability and efficiency. From industrial generators to complete energy solutions, we ensure uninterrupted power supply for your business needs.',
    icon: Zap,
  },
  {
    title: 'Shipping Containers',
    description: 'Versatile and durable shipping containers available in various sizes and configurations. Perfect for storage, transportation, and customizable modular structures to meet your specific requirements.',
    icon: Container,
  },
  {
    title: 'Glass, Aluminum & Stainless Steel',
    description: 'High-quality fabrication services for glass, aluminum, and stainless steel products. Custom solutions for architectural projects, industrial applications, and specialized enclosures.',
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
      <div className="min-h-screen bg-white dark:bg-dark flex items-center justify-center p-6 md:p-8 py-16 md:py-20">
      <div className="max-w-6xl w-full">
        {/* Header Section */}
        <div className="text-center mb-20 md:mb-24">
          {/* Logo space - empty as requested */}
          <div className="h-20 md:h-28 mb-16"></div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-6">
            Exact Solutions Limited
          </h1>
          
          <div className="inline-block h-1 w-32 bg-primary mb-8"></div>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-normal uppercase tracking-wider">
            Website Under Development
          </p>
        </div>

        {/* What's Coming Section */}
        <div className="mb-20 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-12 text-center">
            What's Coming
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {CATEGORIES.map((category) => {
              const Icon = category.icon
              return (
                <div
                  key={category.title}
                  className="bg-gray-50 dark:bg-dark-lighter border border-gray-200 dark:border-gray-800 p-8 hover:border-primary/50 transition-colors group"
                >
                  <div className="mb-6">
                    <div className="w-14 h-14 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-4 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-12 text-center">
            Contact Us
          </h2>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center max-w-3xl mx-auto">
            {PHONE_NUMBERS.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone}`}
                className="group flex items-center gap-3 text-lg font-semibold text-black dark:text-white bg-gray-50 dark:bg-dark-lighter border border-gray-200 dark:border-gray-800 px-8 py-4 min-w-[260px] justify-center hover:bg-primary hover:border-primary hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>{formatPhoneNumber(phone)}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}