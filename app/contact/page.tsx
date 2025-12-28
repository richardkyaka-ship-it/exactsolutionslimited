import type { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact Us | Exact Solutions Limited',
  description: 'Get in touch with Exact Solutions Limited for industrial equipment, generators, shipping containers, and metal fabrication services in Kenya.',
}

export default function ContactPage() {
  return <ContactPageClient />
}