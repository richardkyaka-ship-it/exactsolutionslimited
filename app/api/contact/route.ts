import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getEmailConfig } from '@/lib/env'

// Initialize Resend client (uses validated environment)
function getResendClient() {
  try {
    const { RESEND_API_KEY } = getEmailConfig()
    return new Resend(RESEND_API_KEY)
  } catch {
    // If validation fails, return null (shouldn't happen if validation is working)
    return null
  }
}

// Rate limiting: Simple in-memory store (in production, use Redis or similar)
const rateLimitMap = new Map<string, number>()
const rateLimitViolations = new Map<string, number>() // Track violations per IP
const RATE_LIMIT_WINDOW = 60 * 1000 // 60 seconds
const MAX_VIOLATIONS = 5 // Block after 5 violations
const BLOCK_DURATION = 15 * 60 * 1000 // 15 minutes block

// Request size limits
const MAX_BODY_SIZE = 50 * 1024 // 50KB max request body
const MAX_FIELD_LENGTH = {
  fullName: 200,
  company: 200,
  email: 254,
  phone: 50,
  message: 5000,
}

// Spam patterns to detect
const SPAM_PATTERNS = [
  /(?:https?:\/\/)?(?:www\.)?(?:bit\.ly|tinyurl|t\.co|goo\.gl|short\.link)/gi, // URL shorteners
  /(?:buy|sell|cheap|discount|offer|deal|promo|limited time)/gi, // Sales spam
  /(?:click here|visit now|act now|urgent|limited offer)/gi, // Urgency spam
  /(?:casino|poker|gambling|lottery|winner)/gi, // Gambling spam
  /(?:viagra|cialis|pharmacy|pills|medication)/gi, // Pharmaceutical spam
  /(?:make money|work from home|get rich|earn \$)/gi, // MLM spam
  /(?:free.*money|guaranteed.*income|risk.*free)/gi, // Scam patterns
]

// Honeypot field name (should be invisible to humans)
const HONEYPOT_FIELD = 'website_url' // Common bot trap name

// Service category mapping
const SERVICE_CATEGORY_MAP: Record<string, string> = {
  'equipment': 'Equipment, Generators & Energy Solutions',
  'containers': 'Shipping Containers & Reefers',
  'metal': 'Glass, Aluminum & Stainless Steel',
  'general': 'General Inquiry',
  // Also handle full display names (in case form sends them)
  'Equipment, Generators & Energy Solutions': 'Equipment, Generators & Energy Solutions',
  'Shipping Containers & Reefers': 'Shipping Containers & Reefers',
  'Glass, Aluminum & Stainless Steel': 'Glass, Aluminum & Stainless Steel',
  'General Inquiry': 'General Inquiry',
}

// Sanitize HTML to prevent XSS
function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// Format phone number for tel link
function formatPhoneForLink(phone: string): string {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '')
  // If it doesn't start with +, assume Kenyan number and add +254
  if (!cleaned.startsWith('+')) {
    const digits = cleaned.replace(/\D/g, '')
    if (digits.startsWith('0')) {
      return '+254' + digits.substring(1)
    }
    return '+254' + digits
  }
  return cleaned
}

// Get Kenyan time (EAT - East Africa Time)
function getKenyanTime(): string {
  const now = new Date()
  // EAT is UTC+3
  const eatOffset = 3 * 60 // minutes
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
  const eatTime = new Date(utc + (eatOffset * 60000))
  
  return eatTime.toLocaleString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Africa/Nairobi',
  })
}

// Generate confirmation email template for customer
function generateConfirmationEmail(data: {
  name: string
  service: string
}): string {
  const serviceDisplay = SERVICE_CATEGORY_MAP[data.service] || data.service
  const sanitizedName = sanitizeHtml(data.name)
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Thank You for Contacting Exact Solutions</title>
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); color: #ffffff; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
  <!-- Outer container with gradient background -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Main content container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #000000; border: 1px solid #1a1a1a;">
          <!-- Header with accent line -->
          <tr>
            <td style="padding: 40px 40px 30px 40px; border-bottom: 2px solid #ff6600;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 300; color: #ffffff; letter-spacing: 1px; line-height: 1.2;">Exact Solutions Limited</h1>
              <div style="height: 2px; width: 60px; background-color: #ff6600; margin-top: 12px;"></div>
            </td>
          </tr>
          
          <!-- Main content -->
          <tr>
            <td style="padding: 40px 40px 30px 40px;">
              <!-- Greeting -->
              <h2 style="margin: 0 0 24px 0; color: #ffffff; font-size: 24px; font-weight: 400; line-height: 1.3;">
                Thank You, ${sanitizedName}!
              </h2>
              
              <!-- Confirmation message -->
              <p style="margin: 0 0 24px 0; color: #e5e7eb; font-size: 16px; line-height: 1.7; font-weight: 300;">
                We've successfully received your inquiry regarding <strong style="color: #ff6600; font-weight: 500;">${sanitizeHtml(serviceDisplay)}</strong>. Our team is reviewing your message and will get back to you within 24 hours.
              </p>
              
              <!-- Service category badge -->
              <div style="margin: 32px 0; padding: 16px 20px; background: linear-gradient(135deg, rgba(255, 102, 0, 0.1) 0%, rgba(255, 102, 0, 0.05) 100%); border-left: 3px solid #ff6600;">
                <div style="color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; font-weight: 500;">Your Inquiry</div>
                <div style="color: #ff6600; font-size: 16px; font-weight: 500; letter-spacing: 0.3px;">${sanitizeHtml(serviceDisplay)}</div>
              </div>
              
              <!-- Next steps -->
              <div style="margin: 32px 0; padding: 24px; background-color: #0a0a0a; border: 1px solid #1a1a1a;">
                <h3 style="margin: 0 0 16px 0; color: #ffffff; font-size: 18px; font-weight: 500; letter-spacing: 0.3px;">What Happens Next?</h3>
                <ul style="margin: 0; padding-left: 20px; color: #d1d5db; font-size: 15px; line-height: 1.8; font-weight: 300;">
                  <li style="margin-bottom: 12px;">Our expert team will review your requirements</li>
                  <li style="margin-bottom: 12px;">We'll prepare a tailored solution for your needs</li>
                  <li style="margin-bottom: 0;">You'll receive a response within 24 hours</li>
                </ul>
              </div>
              
              <!-- Contact info box -->
              <div style="margin: 32px 0; padding: 20px; background-color: rgba(255, 102, 0, 0.05); border: 1px solid rgba(255, 102, 0, 0.2);">
                <p style="margin: 0 0 12px 0; color: #ffffff; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Need Immediate Assistance?</p>
                <p style="margin: 0; color: #d1d5db; font-size: 15px; line-height: 1.6;">
                  Email: <a href="mailto:expert@exactsolutions.co.ke" style="color: #ff6600; text-decoration: none; font-weight: 500;">expert@exactsolutions.co.ke</a><br>
                  Phone: <a href="tel:+254720876787" style="color: #ff6600; text-decoration: none; font-weight: 500;">+254 720 876 787</a>
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #0a0a0a; border-top: 1px solid #1a1a1a;">
              <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 13px; line-height: 1.6; font-weight: 300;">
                This is an automated confirmation email. Please do not reply directly to this message.
              </p>
              <p style="margin: 0; color: #4b5563; font-size: 12px; line-height: 1.6;">
                &copy; ${new Date().getFullYear()} Exact Solutions Limited. All rights reserved.<br>
                Nairobi, Kenya | Behind Astrol Petrol Station, Utawala
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// Generate HTML email template for business notification
function generateContactEmail(data: {
  name: string
  company?: string
  email: string
  phone: string
  service: string
  message: string
}): string {
  const serviceDisplay = SERVICE_CATEGORY_MAP[data.service] || data.service
  const timestamp = getKenyanTime()
  const sanitizedName = sanitizeHtml(data.name)
  const sanitizedCompany = data.company ? sanitizeHtml(data.company) : ''
  const sanitizedEmail = sanitizeHtml(data.email)
  const sanitizedPhone = sanitizeHtml(data.phone)
  const sanitizedMessage = sanitizeHtml(data.message).replace(/\n/g, '<br>')
  const phoneLink = formatPhoneForLink(data.phone)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; color: #ffffff; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #000000;">
    <!-- Header -->
    <div style="padding: 24px; border-bottom: 2px solid #ff6600;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 300; color: #ffffff; letter-spacing: 0.5px;">Exact Solutions Limited</h1>
      <div style="height: 2px; width: 48px; background-color: #ff6600; margin-top: 8px;"></div>
    </div>
    
    <!-- Content -->
    <div style="padding: 24px;">
      <h2 style="margin-top: 0; margin-bottom: 20px; color: #ff6600; font-weight: 500; font-size: 20px; letter-spacing: 0.3px;">New Contact Form Submission</h2>
      
      <!-- Service Category -->
      <div style="margin-bottom: 20px;">
        <div style="color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Service Category</div>
        <div style="display: inline-block; padding: 8px 16px; background-color: rgba(255, 102, 0, 0.1); border: 1px solid #ff6600; color: #ff6600; font-size: 14px; font-weight: 500;">${sanitizeHtml(serviceDisplay)}</div>
      </div>
      
      <!-- Divider -->
      <div style="height: 1px; background-color: #1a1a1a; margin: 20px 0;"></div>
      
      <!-- Customer Details -->
      <div style="margin-bottom: 20px;">
        <div style="color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Customer Details</div>
        <div style="color: #ffffff; font-size: 16px; margin-bottom: 8px; line-height: 1.6;">
          <strong>${sanitizedName}</strong>
        </div>
        ${sanitizedCompany ? `<div style="color: #ffffff; font-size: 16px; margin-bottom: 8px; line-height: 1.6;">Company: ${sanitizedCompany}</div>` : ''}
        <div style="color: #ffffff; font-size: 16px; margin-bottom: 8px; line-height: 1.6;">
          Email: <a href="mailto:${sanitizedEmail}" style="color: #ff6600; text-decoration: none;">${sanitizedEmail}</a>
        </div>
        <div style="color: #ffffff; font-size: 16px; margin-bottom: 8px; line-height: 1.6;">
          Phone: <a href="tel:${phoneLink}" style="color: #ff6600; text-decoration: none;">${sanitizedPhone}</a>
        </div>
      </div>
      
      <!-- Divider -->
      <div style="height: 1px; background-color: #1a1a1a; margin: 20px 0;"></div>
      
      <!-- Message -->
      <div style="margin-bottom: 20px;">
        <div style="color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Message</div>
        <div style="color: #ffffff; font-size: 16px; line-height: 1.6; white-space: pre-line;">${sanitizedMessage}</div>
      </div>
      
      <!-- Timestamp -->
      <div style="margin-bottom: 20px;">
        <div style="color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Submitted</div>
        <div style="color: #ffffff; font-size: 14px;">${sanitizeHtml(timestamp)} (EAT)</div>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="padding: 24px; color: #6b7280; font-size: 12px; border-top: 1px solid #1a1a1a; line-height: 1.6;">
      <div style="margin-bottom: 8px;">This inquiry was submitted via the Exact Solutions Limited website.</div>
      <div>Contact: <a href="mailto:expert@exactsolutions.co.ke" style="color: #ff6600; text-decoration: none;">expert@exactsolutions.co.ke</a> | +254 720 876 787</div>
    </div>
  </div>
</body>
</html>`
}

// Check if IP is blocked due to violations
function isIPBlocked(ip: string): boolean {
  const blockedUntil = rateLimitViolations.get(ip)
  if (!blockedUntil) return false
  
  const now = Date.now()
  if (now < blockedUntil) {
    return true // Still blocked
  }
  
  // Block expired, remove it
  rateLimitViolations.delete(ip)
  return false
}

// Check rate limit with violation tracking
function checkRateLimit(ip: string): { allowed: boolean; reason?: string } {
  const now = Date.now()
  
  // Check if IP is blocked
  if (isIPBlocked(ip)) {
    return { allowed: false, reason: 'IP temporarily blocked due to repeated violations' }
  }
  
  const lastSubmission = rateLimitMap.get(ip)
  
  if (lastSubmission && (now - lastSubmission) < RATE_LIMIT_WINDOW) {
    // Increment violation count
    const violations = (rateLimitViolations.get(ip) || 0) + 1
    rateLimitViolations.set(ip, violations)
    
    // Block if too many violations
    if (violations >= MAX_VIOLATIONS) {
      const blockUntil = now + BLOCK_DURATION
      rateLimitViolations.set(ip, blockUntil)
      console.warn(`IP ${ip} blocked for ${BLOCK_DURATION / 1000 / 60} minutes due to ${violations} violations`)
      return { allowed: false, reason: 'Too many rapid submissions. Please try again later.' }
    }
    
    return { allowed: false, reason: 'Please wait before submitting another message.' }
  }
  
  // Reset violation count on successful submission
  rateLimitViolations.delete(ip)
  rateLimitMap.set(ip, now)
  
  // Clean up old entries (keep map from growing indefinitely)
  if (rateLimitMap.size > 1000) {
    const cutoff = now - RATE_LIMIT_WINDOW
    for (const [key, value] of rateLimitMap.entries()) {
      if (value < cutoff) {
        rateLimitMap.delete(key)
      }
    }
  }
  
  return { allowed: true }
}

// Check for spam patterns in content
function detectSpam(content: string): boolean {
  const lowerContent = content.toLowerCase()
  return SPAM_PATTERNS.some(pattern => pattern.test(lowerContent))
}

// Validate field lengths
function validateFieldLengths(data: Record<string, string>): { valid: boolean; error?: string } {
  for (const [field, maxLength] of Object.entries(MAX_FIELD_LENGTH)) {
    const value = data[field]
    if (value && value.length > maxLength) {
      return { valid: false, error: `${field} exceeds maximum length of ${maxLength} characters` }
    }
  }
  return { valid: true }
}

// Validate request body size
function validateBodySize(body: string): { valid: boolean; error?: string } {
  const size = new Blob([body]).size
  if (size > MAX_BODY_SIZE) {
    return { valid: false, error: 'Request body too large' }
  }
  return { valid: true }
}

// Get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIP || 'unknown'
  return ip
}

export async function POST(request: NextRequest) {
  try {
    // Security: Check rate limit with violation tracking
    const clientIP = getClientIP(request)
    const rateLimitCheck = checkRateLimit(clientIP)
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { success: false, message: rateLimitCheck.reason || 'Please wait before submitting another message.' },
        { status: 429 }
      )
    }

    // Security: Validate request body size
    const contentType = request.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { success: false, message: 'Invalid content type' },
        { status: 400 }
      )
    }

    // Get raw body for size check
    const rawBody = await request.text()
    const bodySizeCheck = validateBodySize(rawBody)
    if (!bodySizeCheck.valid) {
      console.warn(`Large request body from IP ${clientIP}: ${new Blob([rawBody]).size} bytes`)
      return NextResponse.json(
        { success: false, message: 'Request too large' },
        { status: 413 }
      )
    }

    // Parse and validate request body
    let body: any
    try {
      body = JSON.parse(rawBody)
    } catch (parseError) {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    // Security: Honeypot check - if this field is filled, it's a bot
    if (body[HONEYPOT_FIELD] && body[HONEYPOT_FIELD].trim() !== '') {
      console.warn(`Honeypot triggered from IP ${clientIP}`)
      // Return success to bot (don't let them know they were caught)
      return NextResponse.json(
        { success: true, message: 'Message received successfully' },
        { status: 200 }
      )
    }
    
    // Validate required fields
    const { fullName, email, phone, serviceCategory, message } = body
    const company = body.company || ''
    
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return NextResponse.json(
        { success: false, message: 'Full name is required' },
        { status: 400 }
      )
    }
    
    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }
    
    // Security: Validate field lengths
    const fieldLengthCheck = validateFieldLengths({
      fullName: fullName.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: phone || '',
      message: message || '',
    })
    if (!fieldLengthCheck.valid) {
      return NextResponse.json(
        { success: false, message: fieldLengthCheck.error || 'Field length validation failed' },
        { status: 400 }
      )
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      )
    }
    
    if (!serviceCategory || typeof serviceCategory !== 'string' || !serviceCategory.trim()) {
      return NextResponse.json(
        { success: false, message: 'Service category is required' },
        { status: 400 }
      )
    }
    
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { success: false, message: 'Message is required' },
        { status: 400 }
      )
    }
    
    if (message.trim().length < 10) {
      return NextResponse.json(
        { success: false, message: 'Message must be at least 10 characters' },
        { status: 400 }
      )
    }

    // Security: Spam detection
    const combinedContent = `${fullName} ${company} ${email} ${message}`.toLowerCase()
    if (detectSpam(combinedContent)) {
      console.warn(`Spam detected from IP ${clientIP}: ${email}`)
      // Return generic success to avoid revealing spam detection
      return NextResponse.json(
        { success: true, message: 'Message received successfully' },
        { status: 200 }
      )
    }

    // Get service category display name
    const serviceDisplay = SERVICE_CATEGORY_MAP[serviceCategory] || serviceCategory
    
    // Generate email subject
    const subject = `[${serviceDisplay}] Inquiry - ${fullName.trim()}`

    // Generate HTML email
    const htmlEmail = generateContactEmail({
      name: fullName.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: phone || 'Not provided',
      service: serviceCategory,
      message: message.trim(),
    })

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      // Log submission for debugging
      console.log('Contact Form Submission (Email not sent - API key missing):', {
        fullName: fullName.trim(),
        company: company.trim(),
        email: email.trim(),
        phone: phone || 'Not provided',
        serviceCategory: serviceDisplay,
        message: message.trim(),
        timestamp: new Date().toISOString(),
      })
      
      return NextResponse.json(
        { success: false, message: 'Email service is not configured. Please contact support.' },
        { status: 500 }
      )
    }

    // Send email via Resend
    try {
      const resend = getResendClient()
      if (!resend) {
        throw new Error('Resend client not initialized')
      }

      const { RESEND_FROM_EMAIL, CONTACT_EMAIL } = getEmailConfig()
      
      const { data, error } = await resend.emails.send({
        from: RESEND_FROM_EMAIL,
        to: CONTACT_EMAIL,
        subject: subject,
        html: htmlEmail,
      })

      if (error) {
        console.error('Resend API error:', error)
        // Log submission for debugging
        console.log('Contact Form Submission (Email failed):', {
          fullName: fullName.trim(),
          company: company.trim(),
          email: email.trim(),
          phone: phone || 'Not provided',
          serviceCategory: serviceDisplay,
          message: message.trim(),
          timestamp: new Date().toISOString(),
          error: error,
        })
        
        return NextResponse.json(
          { success: false, message: 'Failed to send email. Please try again later or contact us directly.' },
          { status: 500 }
        )
      }

      // Log successful submission (without sensitive data)
      console.log('Contact Form Submission (Email sent successfully):', {
        fullName: fullName.trim(),
        email: email.trim(),
        serviceCategory: serviceDisplay,
        timestamp: new Date().toISOString(),
        emailId: data?.id,
      })

      // Send confirmation email to customer
      try {
        const confirmationEmail = generateConfirmationEmail({
          name: fullName.trim(),
          service: serviceCategory,
        })

        const { data: confirmationData, error: confirmationError } = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'contact@exactsolutions.co.ke',
          to: email.trim(),
          subject: `Thank You for Contacting Exact Solutions - We've Received Your Inquiry`,
          html: confirmationEmail,
        })

        if (confirmationError) {
          console.error('Confirmation email error:', confirmationError)
          // Don't fail the request if confirmation email fails - business email was sent successfully
        } else {
          console.log('Confirmation email sent successfully:', {
            to: email.trim(),
            emailId: confirmationData?.id,
          })
        }
      } catch (confirmationErr) {
        console.error('Confirmation email exception:', confirmationErr)
        // Don't fail the request if confirmation email fails
      }

      return NextResponse.json(
        { success: true, message: 'Message received successfully' },
        { status: 200 }
      )
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Log submission for debugging
      console.log('Contact Form Submission (Email exception):', {
        fullName: fullName.trim(),
        company: company.trim(),
        email: email.trim(),
        phone: phone || 'Not provided',
        serviceCategory: serviceDisplay,
        message: message.trim(),
        timestamp: new Date().toISOString(),
        error: emailError instanceof Error ? emailError.message : 'Unknown error',
      })
      
      return NextResponse.json(
        { success: false, message: 'Failed to send email. Please try again later or contact us directly.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to process request' },
      { status: 500 }
    )
  }
}
