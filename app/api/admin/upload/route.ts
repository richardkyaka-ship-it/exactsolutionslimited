import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { isAdminAuthenticated } from '@/lib/auth';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if Cloudinary is configured
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('[Upload API] Cloudinary not configured. Missing environment variables.');
    return NextResponse.json({ 
      error: 'Image upload service not configured. Please set Cloudinary environment variables.',
      details: 'CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are required'
    }, { status: 500 });
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

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Convert buffer to base64 data URI
    const base64 = buffer.toString('base64');
    const dataUri = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    console.log('[Upload API] Uploading to Cloudinary...');
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        dataUri,
        {
          folder: 'exact-solutions/products',
          resource_type: 'auto',
          transformation: [
            { quality: 'auto' },
            { fetch_format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) {
            console.error('[Upload API] Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    }) as any;

    console.log('[Upload API] Cloudinary upload successful:', result.secure_url);

    return NextResponse.json({ 
      success: true, 
      url: result.secure_url // Use secure_url for HTTPS
    });
  } catch (error: any) {
    console.error('[Upload API] Upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: error.message || 'Unknown error'
    }, { status: 500 });
  }
}

