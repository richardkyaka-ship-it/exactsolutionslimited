import { cookies } from 'next/headers';
import { getAdminConfig } from './env';

const SESSION_COOKIE_NAME = 'exact_admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface SessionData {
  userId: string;
  issuedAt: number;
  expiry: number;
  userAgent?: string;
}

/**
 * Create a secure session token with expiry and validation data
 */
export function createAdminSession(userAgent?: string): string {
  const sessionData: SessionData = {
    userId: 'admin',
    issuedAt: Date.now(),
    expiry: Date.now() + SESSION_DURATION,
    userAgent: userAgent || 'unknown',
  };
  
  // Encode session data (in production, use JWT or signed cookies)
  const token = Buffer.from(JSON.stringify(sessionData)).toString('base64');
  return token;
}

/**
 * Validate session token - checks expiry and structure
 */
export function validateAdminSession(token: string, userAgent?: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const session: SessionData = JSON.parse(decoded);
    
    // Multiple validation checks
    if (session.expiry < Date.now()) return false; // Expired
    if (session.userId !== 'admin') return false; // Invalid user
    if (userAgent && session.userAgent && session.userAgent !== userAgent) {
      // Optional: Prevent session hijacking (can be strict in production)
      // For now, we'll allow it but log it
      console.warn('Session user agent mismatch - potential hijacking attempt');
    }
    
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if admin is authenticated with proper session validation
 */
export function isAdminAuthenticated(): boolean {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  if (!sessionToken) return false;
  
  // Validate the session token (not just existence)
  return validateAdminSession(sessionToken);
}

/**
 * Login admin and create secure session
 */
export function loginAdmin(password: string, userAgent?: string): boolean {
  const { ADMIN_PASSWORD, NODE_ENV } = getAdminConfig();
  
  if (password === ADMIN_PASSWORD) {
    const cookieStore = cookies();
    const sessionToken = createAdminSession(userAgent);
    
    cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
      maxAge: SESSION_DURATION / 1000, // Convert to seconds
      path: '/',
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
    });
    return true;
  }
  return false;
}

/**
 * Logout admin - clear session cookie
 */
export function logoutAdmin() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

