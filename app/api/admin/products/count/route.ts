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
    
    // Count valid records that are actually Active
    const records = Array.isArray(result?.records) ? result.records : [];
    const validRecords = records.filter(record => {
      // Must have record and fields
      if (!record || !record.fields) return false;
      // Must have Status field and it must be exactly 'Active'
      const status = record.fields.Status || record.fields['Status'];
      return status === 'Active';
    });
    
    const count = validRecords.length;
    
    // Debug logging
    console.log('[Product Count] Debug:', {
      totalRecords: records.length,
      validActiveRecords: count,
      allStatuses: records.map(r => r?.fields?.Status || r?.fields?.['Status'] || 'missing').filter(Boolean),
    });
    
    return NextResponse.json({ count });
  } catch (error: any) {
    console.error('Error fetching product count:', error);
    return NextResponse.json({ count: 0 });
  }
}

