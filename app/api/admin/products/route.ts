import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { getAirtableClient, airtableToProduct, productToAirtable, AirtableProduct } from '@/lib/airtable';
import { Product } from '@/types/products';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';
    const status = searchParams.get('status') as 'Active' | 'Draft' | 'Archived' | undefined;
    
    let client;
    try {
      client = getAirtableClient();
    } catch (initError: any) {
      console.error('Failed to initialize Airtable client:', initError.message);
      // Return empty array if client initialization fails (e.g., missing credentials)
      return NextResponse.json([], { status: 200 });
    }
    
    if (id) {
      // Get single product
      const record = await client.getProduct(id);
      if (!record || !record.fields) {
        return NextResponse.json(null, { status: 404 });
      }
      const product = airtableToProduct(record);
      return NextResponse.json(product);
    }
    
    // Get all products with filters
    const result = await client.getProducts({
      category: category || undefined,
      featuredOnly: featured,
      status: status || 'Active',
      limit: 100,
    });
    
    // Ensure records is always an array and filter out invalid records
    const records = Array.isArray(result?.records) ? result.records : [];
    const products = records
      .filter((record): record is AirtableProduct => record != null && record.fields != null)
      .map(airtableToProduct);
    
    const headers: Record<string, string> = {};
    if (result?.offset) {
      headers['X-Offset'] = result.offset;
    }
    
    return NextResponse.json(products, { headers });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    // Return empty array instead of error object to prevent frontend crashes
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const product: Partial<Product> = await request.json();
    
    // Validate required fields
    if (!product.name || !product.code || !product.category || !product.shortDescription) {
      return NextResponse.json(
        { error: 'Missing required fields: name, code, category, or shortDescription' },
        { status: 400 }
      );
    }
    
    const client = getAirtableClient();
    
    const fields = productToAirtable({
      ...product,
      active: product.active ?? true,
      featured: product.featured ?? false,
      // Ensure required fields are present
      name: product.name,
      code: product.code,
      category: product.category,
      shortDescription: product.shortDescription,
      keySpecs: product.keySpecs || [],
      fullSpecs: product.fullSpecs || {},
      applications: product.applications || [],
      installationReqs: product.installationReqs || '',
      images: product.images || [], // Include images
    });
    
    const record = await client.createProduct(fields as any);
    
    // Log the response for debugging
    console.log('Airtable createProduct response:', JSON.stringify(record, null, 2));
    
    if (!record) {
      console.error('Airtable returned null/undefined record');
      return NextResponse.json(
        { error: 'Failed to create product: Airtable returned no record' },
        { status: 500 }
      );
    }
    
    if (!record.fields) {
      console.error('Airtable record missing fields:', record);
      return NextResponse.json(
        { error: 'Failed to create product: Airtable record missing fields property' },
        { status: 500 }
      );
    }
    
    const createdProduct = airtableToProduct(record);
    
    return NextResponse.json({ success: true, product: createdProduct });
  } catch (error: any) {
    console.error('Error creating product:', error);
    // Log full error for debugging
    console.error('Full error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const updatedProduct: Product = await request.json();
    
    if (!updatedProduct.id) {
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
    }
    
    const client = getAirtableClient();
    
    // Log what we're receiving
    console.log('[PUT] Received product update:', {
      id: updatedProduct.id,
      name: updatedProduct.name,
      imagesCount: updatedProduct.images?.length || 0,
      images: updatedProduct.images,
    });
    
    const fields = productToAirtable({
      ...updatedProduct,
      // Only include images if they're explicitly provided (not undefined)
      // Don't default to empty array as that would clear existing images
      ...(updatedProduct.images !== undefined && { images: updatedProduct.images }),
    });
    
    console.log('[PUT] Fields being sent to Airtable:', JSON.stringify(fields, null, 2));
    
    const record = await client.updateProduct(updatedProduct.id, fields as any);
    
    if (!record || !record.fields) {
      return NextResponse.json(
        { error: 'Failed to update product: Invalid response from Airtable' },
        { status: 500 }
      );
    }
    
    const product = airtableToProduct(record);
    
    console.log('[PUT] Product after update:', {
      id: product.id,
      name: product.name,
      imagesCount: product.images?.length || 0,
      images: product.images,
    });
    
    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }
    
    const client = getAirtableClient();
    await client.deleteProduct(id);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete product' },
      { status: 500 }
    );
  }
}

