'use client'

import { useState, FormEvent } from 'react'
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
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-medium text-white mb-2">
          Send a Message
        </h3>
        <p className="text-sm text-gray-500">
          We'll respond within 24 hours
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm text-gray-400 mb-2">
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            onBlur={() => handleBlur('fullName')}
            className={`w-full px-4 py-3 bg-dark-lighter border ${
              errors.fullName ? 'border-red-500' : 'border-gray-800'
            } text-white focus:outline-none focus:border-primary transition-colors`}
            required
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm text-gray-400 mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 bg-dark-lighter border border-gray-800 text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
            Email <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onBlur={() => handleBlur('email')}
            className={`w-full px-4 py-3 bg-dark-lighter border ${
              errors.email ? 'border-red-500' : 'border-gray-800'
            } text-white focus:outline-none focus:border-primary transition-colors`}
            required
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm text-gray-400 mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            onBlur={() => handleBlur('phone')}
            placeholder="+254 720 000 000"
            className={`w-full px-4 py-3 bg-dark-lighter border ${
              errors.phone ? 'border-red-500' : 'border-gray-800'
            } text-white focus:outline-none focus:border-primary transition-colors`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Service Category - Radio Buttons */}
        <div>
          <label className="block text-sm text-gray-400 mb-3">
            Service Category <span className="text-primary">*</span>
          </label>
          <div className="space-y-3">
            {SERVICE_CATEGORIES.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="serviceCategory"
                  value={category}
                  checked={formData.serviceCategory === category}
                  onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                  onBlur={() => handleBlur('serviceCategory')}
                  className="w-4 h-4 border border-gray-800 bg-dark-lighter focus:outline-none focus:border-primary cursor-pointer radio-custom"
                  required
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
          {errors.serviceCategory && (
            <p className="mt-2 text-xs text-red-500">{errors.serviceCategory}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
            Message <span className="text-primary">*</span>
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            onBlur={() => handleBlur('message')}
            rows={6}
            minLength={10}
            className={`w-full px-4 py-3 bg-dark-lighter border ${
              errors.message ? 'border-red-500' : 'border-gray-800'
            } text-white focus:outline-none focus:border-primary transition-colors resize-none`}
            required
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-500">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-4 bg-primary text-white border border-primary hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-500/10 border border-green-500/30">
            <p className="text-sm text-green-400">
              Message sent successfully! We'll get back to you within 24 hours.
            </p>
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="p-4 bg-red-500/10 border border-red-500/30">
            <p className="text-sm text-red-400">
              Something went wrong. Please try again or contact us directly.
            </p>
          </div>
        )}
      </form>
    </div>
  )
}
