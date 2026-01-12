/**
 * Environment Variable Validation
 * 
 * This module provides type-safe, validated access to environment variables.
 * It ensures the application fails fast with clear error messages when required
 * variables are missing or invalid.
 * 
 * This is a server-only utility - environment variables should never be
 * accessed directly from client components.
 */

import { envSchema, type Env } from './env-schema';

/**
 * Custom error class for environment validation errors
 */
class EnvironmentError extends Error {
  constructor(message: string, public missingVariables: string[] = []) {
    super(message);
    this.name = 'EnvironmentError';
    Object.setPrototypeOf(this, EnvironmentError.prototype);
  }
}

/**
 * Validates all environment variables against the schema
 * 
 * @returns Validated environment configuration
 * @throws EnvironmentError if validation fails
 */
export function validateEnvironment(): Env {
  try {
    // Collect all environment variables
    const env = {
      AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
      AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
      AIRTABLE_TABLE_NAME: process.env.AIRTABLE_TABLE_NAME || 'Products',
      
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
      CONTACT_EMAIL: process.env.CONTACT_EMAIL,
      
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
      
      NODE_ENV: (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test',
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
      
      DATABASE_URL: process.env.DATABASE_URL,
      SENTRY_DSN: process.env.SENTRY_DSN,
      
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
      
      NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
      VERCEL_ENV: process.env.VERCEL_ENV,
    };

    // Validate against schema
    const result = envSchema.safeParse(env);

    if (!result.success) {
      const errors = result.error.issues || [];
      const missing = errors
        .filter(err => err.message?.includes('required') || err.code === 'too_small')
        .map(err => err.path.join('.'));
      
      const messages = errors.length > 0 
        ? errors.map(err => 
            `• ${err.path.join('.')}: ${err.message || 'Invalid value'}`
          ).join('\n')
        : 'Unknown validation error';
      
      throw new EnvironmentError(
        `Environment validation failed:\n${messages}`,
        missing
      );
    }

    // Check for common issues and generate warnings
    const warnings: string[] = [];
    
    // Warn if using default site URL in production
    if (result.data.NODE_ENV === 'production' && 
        result.data.NEXT_PUBLIC_SITE_URL.includes('localhost')) {
      warnings.push('NEXT_PUBLIC_SITE_URL is set to localhost in production');
    }
    
    // Warn about missing analytics in production
    if (result.data.NODE_ENV === 'production' && !result.data.NEXT_PUBLIC_GA_ID) {
      warnings.push('Google Analytics ID is missing in production');
    }
    
    // Warn about weak admin password
    if (result.data.ADMIN_PASSWORD.length < 12) {
      warnings.push('Admin password is less than 12 characters - consider using a stronger password');
    }
    
    // Warn about missing Cloudinary config if it might be needed
    if (!result.data.CLOUDINARY_CLOUD_NAME || !result.data.CLOUDINARY_API_KEY || !result.data.CLOUDINARY_API_SECRET) {
      warnings.push('Cloudinary configuration is missing - image uploads will not work');
    }
    
    // Log warnings in development
    if (warnings.length > 0 && result.data.NODE_ENV === 'development') {
      console.warn('\n⚠️  Environment warnings:');
      warnings.forEach(w => console.warn(`   ${w}`));
      console.warn('');
    }
    
    return result.data;
    
  } catch (error) {
    if (error instanceof EnvironmentError) {
      // Format a user-friendly error message
      const errorMessage = `
🚨 ENVIRONMENT CONFIGURATION ERROR
===================================
${error.message}

Required variables missing: ${error.missingVariables.join(', ')}

QUICK FIXES:
1. Copy .env.example to .env.local
2. Fill in the missing values
3. Restart the development server

For production deployment (Vercel):
1. Add these variables in Vercel Project Settings → Environment Variables
2. Redeploy the application

===================================
      `.trim();
      
      console.error(errorMessage);
      
      // In development, throw immediately
      if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        throw new Error(errorMessage);
      }
      
      // In production, log and use defaults where possible
      console.error('Production environment error:', error.message);
    }
    
    throw error;
  }
}

// Cached validated environment
let validatedEnv: Env | null = null;

/**
 * Get validated environment configuration
 * 
 * This function caches the validated environment after first call.
 * Use this throughout the application instead of accessing process.env directly.
 * 
 * @returns Validated environment configuration
 */
export function env(): Env {
  if (!validatedEnv) {
    validatedEnv = validateEnvironment();
  }
  return validatedEnv;
}

/**
 * Reset the cached environment (useful for testing)
 */
export function resetEnvCache() {
  validatedEnv = null;
}

// ============================================
// CONVENIENCE GETTERS
// ============================================

/**
 * Get Airtable configuration
 */
export function getAirtableConfig() {
  const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = env();
  return { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME };
}

/**
 * Get email configuration
 */
export function getEmailConfig() {
  const { RESEND_API_KEY, RESEND_FROM_EMAIL, CONTACT_EMAIL } = env();
  return { RESEND_API_KEY, RESEND_FROM_EMAIL, CONTACT_EMAIL };
}

/**
 * Get admin configuration
 */
export function getAdminConfig() {
  const { ADMIN_PASSWORD, NODE_ENV } = env();
  return { ADMIN_PASSWORD, NODE_ENV };
}

/**
 * Get Cloudinary configuration
 */
export function getCloudinaryConfig() {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = env();
  return { 
    CLOUDINARY_CLOUD_NAME, 
    CLOUDINARY_API_KEY, 
    CLOUDINARY_API_SECRET,
    isConfigured: !!(CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET)
  };
}
