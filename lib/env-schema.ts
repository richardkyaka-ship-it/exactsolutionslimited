import { z } from 'zod';

/**
 * Environment Variable Schema
 * 
 * Defines the complete schema for all environment variables used in the application.
 * This ensures type safety and runtime validation.
 */
const envSchema = z.object({
  // ============================================
  // REQUIRED VARIABLES
  // ============================================
  
  // Airtable Configuration
  AIRTABLE_API_KEY: z.string().min(1, 'Airtable API key is required'),
  AIRTABLE_BASE_ID: z.string().min(1, 'Airtable Base ID is required'),
  AIRTABLE_TABLE_NAME: z.string().default('Products'),
  
  // Email Configuration (Resend)
  RESEND_API_KEY: z.string().min(1, 'Resend API key is required'),
  RESEND_FROM_EMAIL: z.string().email('Valid email required for RESEND_FROM_EMAIL'),
  CONTACT_EMAIL: z.string().email('Valid email required for CONTACT_EMAIL'),
  
  // Admin Portal Security
  ADMIN_PASSWORD: z.string().min(8, 'Admin password must be at least 8 characters'),
  
  // ============================================
  // OPTIONAL VARIABLES (with defaults)
  // ============================================
  
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  
  // ============================================
  // FUTURE/OPTIONAL VARIABLES
  // ============================================
  
  DATABASE_URL: z.string().url().optional(),
  SENTRY_DSN: z.string().url().optional(),
  
  // ============================================
  // CLOUDINARY (Optional - for image uploads)
  // ============================================
  
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  
  // ============================================
  // INTERNAL NEXT.JS VARIABLES (validated but not documented)
  // ============================================
  
  NEXT_PUBLIC_VERCEL_URL: z.string().optional(),
  VERCEL_ENV: z.string().optional(),
});

/**
 * Inferred type from the schema
 * Use this type throughout the application for type-safe environment access
 */
export type Env = z.infer<typeof envSchema>;

export { envSchema };
