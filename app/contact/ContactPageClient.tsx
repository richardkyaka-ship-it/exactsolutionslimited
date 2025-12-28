'use client'

import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'

export default function ContactPageClient() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-[1800px] mx-auto">
        {/* Section 01: Hero */}
        <section className="px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-24 md:pb-32">
          <div className="mb-16 md:mb-24">
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-[10px] text-primary font-medium tracking-[0.3em] uppercase">01</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
                Contact Us
              </h1>
            </div>
            <div className="h-px w-16 bg-primary/40 mt-6"></div>
            <p className="text-sm text-gray-500 mt-6">
              Get in touch with our industrial solutions team
            </p>
            <p className="text-sm text-gray-500 mt-4 max-w-2xl">
              Have a project in mind? Describe your requirements and we'll provide exact solutions tailored to your needs.
            </p>
          </div>

          {/* Two-Column Layout */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-20">
              {/* Left Column: Contact Form (2/3) */}
              <div className="lg:col-span-2">
                <ContactForm />
              </div>

              {/* Right Column: Contact Info (1/3) */}
              <div className="lg:col-span-1">
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Location (Optional) */}
        <div className="h-px bg-gray-900"></div>
        <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
          <div className="mb-16">
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-[10px] text-primary font-medium tracking-[0.3em] uppercase">02</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
                Our Location
              </h2>
            </div>
            <div className="h-px w-16 bg-primary/40 mt-6"></div>
          </div>

          <div className="max-w-4xl">
            <div className="bg-dark-lighter border border-gray-800 h-64 md:h-96 flex items-center justify-center mb-6">
              <p className="text-sm text-gray-500">Google Maps placeholder</p>
            </div>
            <div>
              <p className="text-sm text-white mb-2">Nairobi, Kenya</p>
              <p className="text-xs text-gray-500">
                Serving clients across Kenya and East Africa
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
