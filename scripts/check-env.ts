#!/usr/bin/env node
/**
 * Environment Configuration Checker
 * 
 * Validates all environment variables before starting the application.
 * Run this script manually or as part of your CI/CD pipeline.
 */

import { validateEnvironment } from '../lib/env';

console.log('🔍 Checking environment configuration...\n');

try {
  const env = validateEnvironment();
  
  console.log('✅ Environment validation passed!\n');
  
  console.log('Configuration Summary:');
  console.log('=====================');
  console.log(`Environment: ${env.NODE_ENV}`);
  console.log(`Site URL: ${env.NEXT_PUBLIC_SITE_URL}`);
  console.log(`Airtable: ${env.AIRTABLE_TABLE_NAME} table configured`);
  console.log(`Email: ${env.RESEND_FROM_EMAIL} → ${env.CONTACT_EMAIL}`);
  console.log(`Admin: ${env.ADMIN_PASSWORD ? 'Password set' : 'NO PASSWORD'}`);
  
  // Check Cloudinary
  if (env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET) {
    console.log(`Cloudinary: Configured`);
  } else {
    console.log(`Cloudinary: Not configured (image uploads will not work)`);
  }
  
  // Production-specific checks
  if (env.NODE_ENV === 'production') {
    console.log('\n📊 Production Checks:');
    console.log('=====================');
    
    const warnings: string[] = [];
    
    if (!env.NEXT_PUBLIC_SITE_URL.includes('https://')) {
      warnings.push('⚠️  Site URL should use HTTPS in production');
    }
    
    if (!env.NEXT_PUBLIC_GA_ID) {
      warnings.push('⚠️  Google Analytics not configured');
    }
    
    if (env.ADMIN_PASSWORD.length < 12) {
      warnings.push('⚠️  Admin password is less than 12 characters - consider using a stronger password');
    }
    
    if (!env.CLOUDINARY_CLOUD_NAME) {
      warnings.push('⚠️  Cloudinary not configured - image uploads will not work');
    }
    
    if (warnings.length > 0) {
      warnings.forEach(w => console.warn(w));
    } else {
      console.log('✅ All production checks passed');
    }
  }
  
  console.log('\n🚀 All checks passed!');
  process.exit(0);
  
} catch (error) {
  console.error('\n❌ Environment validation failed:');
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }
  console.error('\nPlease fix the issues above and try again.');
  process.exit(1);
}
