import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { isAdminAuthenticated } from '@/lib/auth';

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    console.log('[Upload API] Received file:', {
      name: file.name,
      size: file.size,
      type: file.type,
    });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase()}`;
    const uploadDir = path.join(process.cwd(), 'public', 'products');
    
    try {
      // Ensure directory exists
      await fs.mkdir(uploadDir, { recursive: true });
      
      const filepath = path.join(uploadDir, filename);
      await fs.writeFile(filepath, buffer);

      const imageUrl = `/products/${filename}`;
      console.log('[Upload API] File saved successfully:', imageUrl);

      return NextResponse.json({ 
        success: true, 
        url: imageUrl 
      });
    } catch (fsError: any) {
      // On Vercel, filesystem is read-only at runtime
      // This will fail, but we'll provide a helpful error
      console.error('[Upload API] Filesystem error (expected on Vercel):', fsError.message);
      
      // For now, return a placeholder URL - in production you'd use a CDN
      // TODO: Integrate with Cloudinary, AWS S3, or Vercel Blob Storage
      return NextResponse.json({ 
        error: 'File upload not supported on this platform. Please use a CDN integration.',
        details: process.env.VERCEL ? 'Vercel filesystem is read-only at runtime' : fsError.message
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('[Upload API] Upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: error.message 
    }, { status: 500 });
  }
}

