import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Log the payload (in production, you'd send this to an email service, database, etc.)
    console.log('Contact Form Submission:', {
      fullName: body.fullName,
      company: body.company,
      email: body.email,
      phone: body.phone,
      serviceCategory: body.serviceCategory,
      message: body.message,
      timestamp: new Date().toISOString(),
    })

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // In production, you would:
    // - Send email via SendGrid, Resend, or similar
    // - Save to database
    // - Send notification to team
    // - etc.

    return NextResponse.json(
      { success: true, message: 'Message received successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to process request' },
      { status: 500 }
    )
  }
}
