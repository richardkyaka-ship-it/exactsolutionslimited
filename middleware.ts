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

  // 2. Production Access Control
  // Pages allowed in PRODUCTION
  const allowedInProduction = [
    '/', 
    '/contact', 
    '/api/contact', 
    '/admin', 
    '/api/admin', 
    '/products',
    '/services',
    '/projects',
    '/about'
  ];

  // Check if current path starts with any allowed path
  const isAllowed = allowedInProduction.some(path =>
    pathname === path || pathname.startsWith(`${path}/`)
  );

  if (process.env.NODE_ENV === 'production' && !isAllowed) {
    // REWRITE to home page (splash) while keeping the URL
    // This allows the SplashScreen component to see the original pathname
    return NextResponse.rewrite(new URL('/', request.url));
  }

  // Allow access in all other cases (development, allowed pages)
  return NextResponse.next();
}

// Apply to all routes except static files
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)'],
};
