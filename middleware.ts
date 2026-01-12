// middleware.ts - Place in root directory
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateAdminSession } from '@/lib/auth';

/**
 * Validate session token - server-side validation
 */
function isValidSession(token: string, userAgent?: string): boolean {
  if (!token) return false;
  return validateAdminSession(token, userAgent);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || undefined;

  // Skip middleware for static assets (favicons, icons, etc.)
  if (pathname === '/icon.svg' || pathname === '/favicon.ico' || pathname.startsWith('/_next/static') || pathname.startsWith('/_next/image')) {
    return NextResponse.next();
  }

  // 1. Admin Protection with PROPER SESSION VALIDATION
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionToken = request.cookies.get('exact_admin_session')?.value;
    
    // Validate session token (not just existence)
    if (!sessionToken || !isValidSession(sessionToken, userAgent)) {
      // Clear invalid session cookie and redirect
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('exact_admin_session');
      
      // Add cache-control to prevent caching of redirect
      response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      
      return response;
    }
    
    // Add Cache-Control: no-store for ALL admin pages (CRITICAL SECURITY FIX)
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate, private');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    
    return response;
  }

  // 2. Production Access Control - SPLASH SCREEN ENABLED
  const allowedInProduction = [
    '/splash',     // Splash screen route (for restricted pages)
    '/contact',    // Contact page only
    '/api/contact', // Contact API endpoint
    '/admin',      // Admin routes
    '/api/admin',  // Admin API routes
  ];

  // Check if current path starts with any allowed path
  const isAllowed = allowedInProduction.some(path =>
    pathname === path || pathname.startsWith(`${path}/`)
  );

  if (process.env.NODE_ENV === 'production' && !isAllowed) {
    // REWRITE to splash page while keeping the original URL
    return NextResponse.rewrite(new URL('/splash', request.url));
  }

  // 3. SEO Headers for all pages
  const response = NextResponse.next();
  
  // Add SEO-relevant headers (only if not already set for admin pages)
  if (!pathname.startsWith('/admin')) {
    response.headers.set('X-Robots-Tag', 'index, follow');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  }
  
  return response;
}

// Apply to all routes except static files
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg|icon.ico|apple-icon.png|public/).*)'],
};
