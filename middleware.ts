// middleware.ts - Place in root directory
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Pages allowed in PRODUCTION
  const allowedInProduction = ['/', '/contact', '/api/contact'];
  
  // Block all other pages in PRODUCTION only
  if (process.env.NODE_ENV === 'production' && !allowedInProduction.includes(pathname)) {
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
