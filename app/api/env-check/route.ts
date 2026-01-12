import { NextResponse } from 'next/server';
import { validateEnvironment } from '@/lib/env';

/**
 * Environment Check API Route
 * 
 * Used by the EnvStatus component to check environment configuration
 * in development mode only.
 */
export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  try {
    const env = validateEnvironment();
    
    return NextResponse.json({
      valid: true,
      config: {
        nodeEnv: env.NODE_ENV,
        airtable: !!(env.AIRTABLE_API_KEY && env.AIRTABLE_BASE_ID),
        email: !!(env.RESEND_API_KEY && env.RESEND_FROM_EMAIL && env.CONTACT_EMAIL),
        admin: !!env.ADMIN_PASSWORD,
        cloudinary: !!(env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET),
      },
    });
  } catch (error) {
    return NextResponse.json({
      valid: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
