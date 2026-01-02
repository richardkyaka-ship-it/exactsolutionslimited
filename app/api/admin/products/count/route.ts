import { NextResponse } from 'next/server';
import { getAirtableClient, airtableToProduct, AirtableProduct } from '@/lib/airtable';

export async function GET() {
  try {
    let client;
    try {
      client = getAirtableClient();
    } catch (initError: any) {
      console.error('Failed to initialize Airtable client:', initError.message);
      return NextResponse.json({ count: 0 });
    }
    
    // Get ALL products (Active, Draft, Archived) for total count
    // But only count records that can actually be converted to valid products
    const result = await client.getProducts({
      status: 'all', // Get all products regardless of status
      limit: 1000, // Get all products for accurate count
    });
    
    // Use the SAME logic as the products API route:
    // Filter out invalid records and only count ones that can be converted to products
    const records = Array.isArray(result?.records) ? result.records : [];
    
    // Only count records that:
    // 1. Have valid record and fields
    // 2. Have at least a Name field (required for a product to be valid)
    // 3. Can be successfully converted to a Product (won't throw errors)
    const validProducts = records
      .filter((record): record is AirtableProduct => {
        if (!record || !record.fields) return false;
        // Must have at least a Name field to be a valid product
        const name = record.fields.Name || record.fields['Name'];
        return name && typeof name === 'string' && name.trim() !== '';
      })
      .filter(record => {
        // Try to convert - if it throws, it's not a valid product
        try {
          airtableToProduct(record);
          return true;
        } catch {
          return false;
        }
      });
    
    const count = validProducts.length;
    
    // Debug logging
    console.log('[Product Count] Debug:', {
      totalRecords: records.length,
      validProducts: count,
      statusBreakdown: {
        Active: validProducts.filter(r => (r?.fields?.Status || r?.fields?.['Status']) === 'Active').length,
        Draft: validProducts.filter(r => (r?.fields?.Status || r?.fields?.['Status']) === 'Draft').length,
        Archived: validProducts.filter(r => (r?.fields?.Status || r?.fields?.['Status']) === 'Archived').length,
      },
    });
    
    return NextResponse.json({ count });
  } catch (error: any) {
    console.error('Error fetching product count:', error);
    return NextResponse.json({ count: 0 });
  }
}

