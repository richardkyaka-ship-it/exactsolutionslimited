import { NextResponse } from 'next/server';
import { CATEGORIES } from '@/constants/categories';

export async function GET() {
  // Return count of hardcoded categories
  return NextResponse.json({ count: CATEGORIES.length });
}

