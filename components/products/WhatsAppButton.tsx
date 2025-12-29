'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'

interface WhatsAppButtonProps {
  productName: string
  productCode: string
  className?: string
}

export default function WhatsAppButton({ productName, productCode, className = "" }: WhatsAppButtonProps) {
  const phoneNumber = "254720876787"
  const message = `Hi, I'm interested in ${productName} (Code: ${productCode}) for my project. Please share availability and pricing.`
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-primary-dark transition-all duration-300 ${className}`}
    >
      <MessageCircle className="w-3.5 h-3.5" />
      Get Quote
    </a>
  )
}

