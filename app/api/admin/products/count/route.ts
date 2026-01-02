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
    
    // Get ALL products (Active, Draft, Archived) for total count
    // The dashboard should show total products, not just active ones
    const result = await client.getProducts({
      status: 'all', // Get all products regardless of status
      limit: 1000, // Get all products for accurate count
    });
    
    // Count all valid records (any status)
    const records = Array.isArray(result?.records) ? result.records : [];
    const validRecords = records.filter(record => {
      // Must have record and fields
      return record != null && record.fields != null;
    });
    
    const count = validRecords.length;
    
    // Debug logging
    console.log('[Product Count] Debug:', {
      totalRecords: records.length,
      validRecords: count,
      statusBreakdown: {
        Active: records.filter(r => (r?.fields?.Status || r?.fields?.['Status']) === 'Active').length,
        Draft: records.filter(r => (r?.fields?.Status || r?.fields?.['Status']) === 'Draft').length,
        Archived: records.filter(r => (r?.fields?.Status || r?.fields?.['Status']) === 'Archived').length,
        Other: records.filter(r => {
          const status = r?.fields?.Status || r?.fields?.['Status'];
          return status && !['Active', 'Draft', 'Archived'].includes(status);
        }).length,
      },
    });
    
    return NextResponse.json({ count });
  } catch (error: any) {
    console.error('Error fetching product count:', error);
    return NextResponse.json({ count: 0 });
  }
}

