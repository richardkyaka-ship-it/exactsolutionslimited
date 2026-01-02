import { NextResponse } from 'next/server';
import { getAirtableClient } from '@/lib/airtable';

export async function GET() {
  try {
    let client;
    try {
      client = getAirtableClient();
    } catch (initError: any) {
      console.error('Failed to initialize Airtable client:', initError.message);
      return NextResponse.json({ count: 0 });
    }
    
    // Get only Active products to match what the products list page shows
    const result = await client.getProducts({
      status: 'Active', // Only count Active products (matches products list page)
      limit: 1000, // Get all products for accurate count
    });
    
    // Count valid records
    const records = Array.isArray(result?.records) ? result.records : [];
    const validRecords = records.filter(record => record != null && record.fields != null);
    const count = validRecords.length;
    
    // Debug logging
    console.log('Product count debug:', {
      totalRecords: records.length,
      validRecords: validRecords.length,
      recordStatuses: validRecords.map(r => r.fields?.Status).filter(Boolean),
    });
    
    return NextResponse.json({ count });
  } catch (error: any) {
    console.error('Error fetching product count:', error);
    return NextResponse.json({ count: 0 });
  }
}

