'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

const SERVICE_CATEGORIES = [
  'Equipment, Generators & Energy Solutions',
  'Shipping Containers & Reefers',
  'Glass, Aluminum & Stainless Steel',
  'General Inquiry',
]

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  serviceCategory?: string
  message?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    serviceCategory: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePhone = (phone: string) => {
    if (!phone) return true
    const cleaned = phone.replace(/\D/g, '')
    return cleaned.length >= 10
  }

  const handleBlur = (field: keyof typeof formData) => {
    const value = formData[field]
    const newErrors: FormErrors = { ...errors }

    switch (field) {
      case 'fullName':
        if (!value.trim()) {
          newErrors.fullName = 'Full name is required'
        } else {
          delete newErrors.fullName
        }
        break
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required'
        } else if (!validateEmail(value)) {
          newErrors.email = 'Please enter a valid email address'
        } else {
          delete newErrors.email
        }
        break
      case 'phone':
        if (value && !validatePhone(value)) {
          newErrors.phone = 'Please enter a valid phone number'
        } else {
          delete newErrors.phone
        }
        break
      case 'serviceCategory':
        if (!value) {
          newErrors.serviceCategory = 'Please select a service category'
        } else {
          delete newErrors.serviceCategory
        }
        break
      case 'message':
        if (!value.trim()) {
          newErrors.message = 'Message is required'
        } else if (value.trim().length < 10) {
          newErrors.message = 'Message must be at least 10 characters'
        } else {
          delete newErrors.message
        }
        break
    }

    setErrors(newErrors)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Validate all required fields
    const newErrors: FormErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address'
    if (!formData.serviceCategory) newErrors.serviceCategory = 'Please select a service category'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters'
    if (formData.phone && !validatePhone(formData.phone)) newErrors.phone = 'Please enter a valid phone number'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          fullName: '',
          company: '',
          email: '',
          phone: '',
          serviceCategory: '',
          message: '',
        })
        setErrors({})
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="mb-6 sm:mb-8 md:mb-12">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="h-px w-8 sm:w-12 bg-primary/40"></div>
          <span className="text-[11.5px] text-primary font-mono tracking-[0.4em] uppercase">Contact Form</span>
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-light-text dark:text-white mb-2 sm:mb-3 leading-[0.95] tracking-tight uppercase">
          Send a Message
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-light-text-muted dark:text-dark-text-muted font-light">
          We'll respond within 24 hours
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 md:space-y-8">
        {/* Honeypot field - invisible to humans, bots will fill this */}
        <input
          type="text"
          name="website_url"
          tabIndex={-1}
          autoComplete="off"
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
            opacity: 0,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />
        
        {/* Full Name */}
        <div className="group">
          <label htmlFor="fullName" className="block text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted mb-2 font-light">
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            onBlur={() => handleBlur('fullName')}
            className={`w-full px-4 py-3 sm:px-4 sm:py-3 md:px-5 md:py-4 bg-light-lighter dark:bg-dark-lighter border ${
              errors.fullName ? 'border-red-500' : 'border-light-border dark:border-dark-border'
            } text-light-text dark:text-dark-text-primary text-sm sm:text-base font-light focus:outline-none focus:border-primary transition-all duration-300 group-hover:border-primary/30 dark:group-hover:border-primary/30`}
            required
          />
          {errors.fullName && (
            <p className="mt-2 text-xs text-red-500">{errors.fullName}</p>
          )}
        </div>

        {/* Company */}
        <div className="group">
          <label htmlFor="company" className="block text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted mb-2 font-light">
            Company
          </label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 sm:px-4 sm:py-3 md:px-5 md:py-4 bg-light-lighter dark:bg-dark-lighter border border-light-border dark:border-dark-border text-light-text dark:text-dark-text-primary text-sm sm:text-base font-light focus:outline-none focus:border-primary transition-all duration-300 group-hover:border-primary/30 dark:group-hover:border-primary/30"
          />
        </div>

        {/* Email */}
        <div className="group">
          <label htmlFor="email" className="block text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted mb-2 font-light">
            Email <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onBlur={() => handleBlur('email')}
            className={`w-full px-4 py-3 sm:px-4 sm:py-3 md:px-5 md:py-4 bg-light-lighter dark:bg-dark-lighter border ${
              errors.email ? 'border-red-500' : 'border-light-border dark:border-dark-border'
            } text-light-text dark:text-dark-text-primary text-sm sm:text-base font-light focus:outline-none focus:border-primary transition-all duration-300 group-hover:border-primary/30 dark:group-hover:border-primary/30`}
            required
          />
          {errors.email && (
            <p className="mt-2 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="group">
          <label htmlFor="phone" className="block text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted mb-2 font-light">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            onBlur={() => handleBlur('phone')}
            placeholder="+254 720 000 000"
            className={`w-full px-4 py-3 sm:px-4 sm:py-3 md:px-5 md:py-4 bg-light-lighter dark:bg-dark-lighter border ${
              errors.phone ? 'border-red-500' : 'border-light-border dark:border-dark-border'
            } text-light-text dark:text-dark-text-primary text-sm sm:text-base font-light placeholder:text-light-text-subtle dark:placeholder:text-dark-text-subtle focus:outline-none focus:border-primary transition-all duration-300 group-hover:border-primary/30 dark:group-hover:border-primary/30`}
          />
          {errors.phone && (
            <p className="mt-2 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Service Category - Radio Buttons */}
        <div>
          <label className="block text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted mb-3 sm:mb-4 font-light">
            Service Category <span className="text-primary">*</span>
          </label>
          <div className="space-y-2">
            {SERVICE_CATEGORIES.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 sm:gap-4 cursor-pointer group p-3 sm:p-3 border border-light-border dark:border-dark-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                <input
                  type="radio"
                  name="serviceCategory"
                  value={category}
                  checked={formData.serviceCategory === category}
                  onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                  onBlur={() => handleBlur('serviceCategory')}
                  className="w-4 h-4 border border-light-border dark:border-dark-border bg-light-lighter dark:bg-dark-lighter focus:outline-none focus:border-primary cursor-pointer radio-custom group-hover:border-primary/50 transition-colors flex-shrink-0"
                  required
                />
                <span className="text-xs sm:text-sm text-light-text-muted dark:text-dark-text-secondary group-hover:text-light-text dark:group-hover:text-dark-text-primary font-light transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
          {errors.serviceCategory && (
            <p className="mt-3 text-xs text-red-500">{errors.serviceCategory}</p>
          )}
        </div>

        {/* Message */}
        <div className="group">
          <label htmlFor="message" className="block text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted mb-2 font-light">
            Message <span className="text-primary">*</span>
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            onBlur={() => handleBlur('message')}
            rows={5}
            minLength={10}
            className={`w-full px-4 py-3 sm:px-4 sm:py-3 md:px-5 md:py-4 bg-light-lighter dark:bg-dark-lighter border ${
              errors.message ? 'border-red-500' : 'border-light-border dark:border-dark-border'
            } text-light-text dark:text-dark-text-primary text-sm sm:text-base font-light focus:outline-none focus:border-primary transition-all duration-300 resize-none group-hover:border-primary/30 dark:group-hover:border-primary/30`}
            required
          />
          {errors.message && (
            <p className="mt-2 text-xs text-red-500">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group w-full px-5 py-4 sm:px-6 sm:py-4 md:py-5 bg-primary text-white border-2 border-primary hover:bg-primary/90 hover:border-primary/80 transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
        >
          <span className="relative z-10 font-light text-sm sm:text-base md:text-lg">
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2 sm:mr-3" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/0 to-primary/0 group-hover:from-primary/20 group-hover:via-white/10 group-hover:to-primary/20 transition-all duration-500"></div>
        </button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 md:p-5 bg-green-500/10 border border-green-500/30"
          >
            <p className="text-sm md:text-base text-green-400 font-light">
              Message sent successfully! We'll get back to you within 24 hours.
            </p>
          </motion.div>
        )}
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 md:p-5 bg-red-500/10 border border-red-500/30"
          >
            <p className="text-sm md:text-base text-red-400 font-light">
              Something went wrong. Please try again or contact us directly.
            </p>
          </motion.div>
        )}
      </form>
    </div>
  )
}
