'use client'

import { Phone, Mail, MessageCircle, Zap, Container, Building2 } from 'lucide-react'

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

export default function ContactInfo() {
  return (
    <div className="space-y-12">
      {/* Direct Contact */}
      <div>
        <h3 className="text-lg font-medium text-white mb-6 uppercase tracking-[0.1em]">
          Direct Contact
        </h3>
        
        <div className="space-y-6">
          {/* Phone Numbers */}
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-[0.15em] mb-4">
              Phone
            </div>
            <div className="space-y-3">
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
            <p className="text-xs text-gray-500 mt-4">
              Available Monday - Friday, 8:00 AM - 5:00 PM EAT
            </p>
          </div>

          {/* Email */}
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-[0.15em] mb-4">
              Email
            </div>
            <a
              href="mailto:expert@exactsolutions.co.ke"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
            >
              expert@exactsolutions.co.ke
            </a>
            <p className="text-xs text-gray-500 mt-2">
              We typically respond within 24 hours
            </p>
          </div>

          {/* WhatsApp */}
          <div>
            <a
              href="https://wa.me/254720876787?text=Hi,%20I'm%20reaching%20out%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-white border border-primary hover:bg-primary/90 transition-colors duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Service Quick Reference */}
      <div>
        <h3 className="text-lg font-medium text-white mb-6 uppercase tracking-[0.1em]">
          Our Services
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 border border-gray-800 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium text-white mb-1">
                Equipment, Generators & Energy Solutions
              </div>
              <p className="text-xs text-gray-500">
                Power solutions that keep you running
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 border border-gray-800 flex items-center justify-center flex-shrink-0">
              <Container className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium text-white mb-1">
                Shipping Containers & Reefers
              </div>
              <p className="text-xs text-gray-500">
                Storage & transport solutions
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 border border-gray-800 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium text-white mb-1">
                Glass, Aluminum & Stainless Steel
              </div>
              <p className="text-xs text-gray-500">
                Custom industrial solutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
