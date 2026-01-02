import { NextResponse } from 'next/server';
import { CATEGORIES } from '@/constants/categories';
import { isAdminAuthenticated } from '@/lib/auth';

// Convert hardcoded categories to the format expected by the frontend
function formatCategories() {
  return CATEGORIES.map(cat => ({
    id: cat.id,
    name: cat.name,
    value: cat.id, // For backward compatibility
  }));
}

export async function GET() {
  // Return hardcoded categories
  return NextResponse.json(formatCategories());
}

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Categories are hardcoded - cannot create new ones
  return NextResponse.json(
    { error: 'Categories are fixed and cannot be created. Contact developer to add new categories.' },
    { status: 400 }
  );
}

export async function DELETE(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Categories are hardcoded - cannot delete
  return NextResponse.json(
    { error: 'Categories are fixed and cannot be deleted. Contact developer to modify categories.' },
    { status: 400 }
  );
}

