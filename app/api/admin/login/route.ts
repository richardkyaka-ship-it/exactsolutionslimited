import { NextResponse } from 'next/server';
import { loginAdmin } from '@/lib/auth';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const userAgent = request.headers.get('user-agent') || undefined;
    
    if (loginAdmin(password, userAgent)) {
      const response = NextResponse.json({ success: true });
      // Ensure no caching of login response
      response.headers.set('Cache-Control', 'no-store, max-age=0');
      return response;
    }
    
    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

