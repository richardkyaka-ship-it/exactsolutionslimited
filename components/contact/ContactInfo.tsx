'use client'

import { Phone, Mail, Zap, Container, Building2, ArrowRight } from 'lucide-react'

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
    <div className="space-y-4 md:space-y-6 lg:space-y-12">
      {/* Direct Contact - Ultra Compact on Mobile */}
      <div>
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 lg:mb-6">
          <div className="h-px w-6 md:w-8 lg:w-12 bg-primary/40"></div>
          <span className="text-[10px] md:text-[11.5px] text-primary font-mono tracking-[0.3em] md:tracking-[0.4em] uppercase">Direct Contact</span>
        </div>
        
        <div className="space-y-3 md:space-y-4 lg:space-y-6">
          {/* Phone Numbers - Compact Mobile Layout */}
          <div className="group">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3 lg:mb-4">
              <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 border border-light-border dark:border-dark-border flex items-center justify-center group-hover:border-primary transition-colors duration-300 flex-shrink-0">
                <Phone className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-primary" />
              </div>
              <span className="text-[10px] md:text-[11.5px] text-primary font-mono tracking-[0.3em] md:tracking-[0.4em] uppercase">Phone</span>
            </div>
            <div className="space-y-1 md:space-y-2 lg:space-y-3 pl-8 md:pl-10 lg:pl-14">
              {PHONE_NUMBERS.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone}`}
                  className="block text-xs md:text-sm lg:text-base font-light text-light-text dark:text-dark-text-primary hover:text-primary transition-colors duration-300"
                >
                  {formatPhoneNumber(phone)}
                </a>
              ))}
            </div>
            <p className="text-[10px] md:text-xs text-light-text-muted dark:text-dark-text-muted mt-2 md:mt-3 lg:mt-4 pl-8 md:pl-10 lg:pl-14 uppercase tracking-[0.15em] md:tracking-[0.2em]">
              Mon-Fri, 8AM-5PM EAT
            </p>
          </div>

          {/* Email - Compact Mobile Layout */}
          <div className="group">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3 lg:mb-4">
              <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 border border-light-border dark:border-dark-border flex items-center justify-center group-hover:border-primary transition-colors duration-300 flex-shrink-0">
                <Mail className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-primary" />
              </div>
              <span className="text-[10px] md:text-[11.5px] text-primary font-mono tracking-[0.3em] md:tracking-[0.4em] uppercase">Email</span>
            </div>
            <div className="pl-8 md:pl-10 lg:pl-14">
              <a
                href="mailto:expert@exactsolutions.co.ke"
                className="block text-xs md:text-sm lg:text-base font-light text-light-text dark:text-dark-text-primary hover:text-primary transition-colors duration-300 break-all mb-1 md:mb-2"
              >
                expert@exactsolutions.co.ke
              </a>
              <p className="text-[10px] md:text-xs text-light-text-muted dark:text-gray-500 uppercase tracking-[0.15em] md:tracking-[0.2em]">
                Response within 24 hours
              </p>
            </div>
          </div>

          {/* WhatsApp - Compact Mobile Button */}
          <div>
            <a
              href="https://wa.me/254720876787?text=Hi,%20I'm%20reaching%20out%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between w-full p-2 md:p-3 lg:p-4 border border-light-border dark:border-dark-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-500"
            >
              <div className="flex items-center gap-2 md:gap-2 lg:gap-3">
                <div className="w-4 h-4 md:w-5 md:h-5 text-primary group-hover:scale-110 transition-transform duration-300">
                  <WhatsAppIcon className="w-full h-full" />
                </div>
                <span className="text-[10px] md:text-[11.5px] text-primary font-mono tracking-[0.3em] md:tracking-[0.4em] uppercase">WhatsApp</span>
              </div>
              <ArrowRight className="w-3 h-3 md:w-3 md:h-3 lg:w-4 lg:h-4 text-light-text-subtle dark:text-dark-text-subtle group-hover:text-primary group-hover:translate-x-2 transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Service Quick Reference - Hidden on Mobile, Visible on Desktop */}
      <div className="hidden md:block">
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 lg:mb-6">
          <div className="h-px w-6 md:w-8 lg:w-12 bg-primary/40"></div>
          <span className="text-[10px] md:text-[11.5px] text-primary font-mono tracking-[0.3em] md:tracking-[0.4em] uppercase">Our Services</span>
        </div>
        <div className="space-y-2 md:space-y-3 lg:space-y-4">
          <div className="group flex items-start gap-2 md:gap-3 lg:gap-4 p-2 md:p-3 lg:p-4 border border-light-border dark:border-dark-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
            <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 border border-light-border dark:border-dark-border flex items-center justify-center flex-shrink-0 group-hover:border-primary transition-colors duration-300">
              <Zap className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] md:text-xs lg:text-sm font-light text-light-text dark:text-dark-text-primary mb-0.5 md:mb-1 group-hover:text-primary transition-colors duration-300 leading-tight">
                Equipment, Generators & Energy
              </div>
              <p className="text-[10px] md:text-xs text-light-text-muted dark:text-dark-text-muted leading-tight">
                Power solutions that keep you running
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-2 md:gap-3 lg:gap-4 p-2 md:p-3 lg:p-4 border border-light-border dark:border-dark-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
            <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 border border-light-border dark:border-dark-border flex items-center justify-center flex-shrink-0 group-hover:border-primary transition-colors duration-300">
              <Container className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] md:text-xs lg:text-sm font-light text-light-text dark:text-dark-text-primary mb-0.5 md:mb-1 group-hover:text-primary transition-colors duration-300 leading-tight">
                Shipping Containers & Reefers
              </div>
              <p className="text-[10px] md:text-xs text-light-text-muted dark:text-dark-text-muted leading-tight">
                Storage & transport solutions
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-2 md:gap-3 lg:gap-4 p-2 md:p-3 lg:p-4 border border-light-border dark:border-dark-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
            <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 border border-light-border dark:border-dark-border flex items-center justify-center flex-shrink-0 group-hover:border-primary transition-colors duration-300">
              <Building2 className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] md:text-xs lg:text-sm font-light text-light-text dark:text-dark-text-primary mb-0.5 md:mb-1 group-hover:text-primary transition-colors duration-300 leading-tight">
                Glass, Aluminum & Steel
              </div>
              <p className="text-[10px] md:text-xs text-light-text-muted dark:text-dark-text-muted leading-tight">
                Custom industrial solutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
