/**
 * Airtable Client Library
 * 
 * Handles all interactions with Airtable API for product management.
 * Includes caching, error handling, and type safety.
 */

// Type Definitions
export interface AirtableImage {
  url: string;
  filename: string;
  thumbnails?: {
    small: { url: string; width: number; height: number };
    large: { url: string; width: number; height: number };
  };
  size?: number;
  type?: string;
}

export interface AirtableProduct {
  id: string;
  fields: {
    Name: string;
    'Product Code': string;
    Category: 'Generators & Power' | 'Shipping Containers' | 'Building & Construction';
    'Short Description': string;
    'Key Spec 1'?: string;
    'Key Spec 2'?: string;
    'Key Spec 3'?: string;
    'WhatsApp Message'?: string;
    Status: 'Active' | 'Draft' | 'Archived';
    Featured: boolean;
    Images?: AirtableImage[];
    Notes?: string; // Stores Full Specs, Applications, Installation Requirements as JSON
    [key: string]: any; // Allow additional fields
  };
  createdTime: string;
}

export interface AirtableResponse<T> {
  records: T[];
  offset?: string;
}

// Cache Layer
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function cachedFetch<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  const data = await fetchFn();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}

function clearCache(pattern?: string) {
  if (pattern) {
    for (const key of cache.keys()) {
      if (key.includes(pattern)) {
        cache.delete(key);
      }
    }
  } else {
    cache.clear();
  }
}

// Retry logic with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      
      // Don't retry on 4xx errors (except 429)
      if (error.status >= 400 && error.status < 500 && error.status !== 429) {
        throw error;
      }
      
      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError!;
}

// Airtable Client Class
export class AirtableClient {
  private baseUrl: string;
  private headers: Record<string, string>;
  private tableName: string;

  constructor() {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME || 'Products';

    if (!apiKey || !baseId) {
      throw new Error('Missing Airtable credentials. Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID in .env.local');
    }

    this.baseUrl = `https://api.airtable.com/v0/${baseId}`;
    this.tableName = tableName;
    this.headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Get all products with optional filtering
   */
  async getProducts(options?: {
    featuredOnly?: boolean;
    category?: string;
    status?: 'Active' | 'Draft' | 'Archived' | 'all';
    limit?: number;
    offset?: string;
  }): Promise<{ records: AirtableProduct[]; offset?: string }> {
    const {
      featuredOnly = false,
      category,
      status = 'Active',
      limit = 100,
      offset,
    } = options || {};

    // Build filter formula
    const formulaParts: string[] = [];
    
    // Only filter by status if it's explicitly set and not 'all'
    if (status && status !== 'all') {
      formulaParts.push(`{Status} = "${status}"`);
    }
    
    if (featuredOnly) {
      formulaParts.push(`{Featured} = TRUE()`);
    }
    
    if (category) {
      // Map category values to Airtable format
      const categoryMap: Record<string, string> = {
        'generators': 'Generators & Power',
        'containers': 'Shipping Containers',
        'metal': 'Building & Construction',
      };
      const airtableCategory = categoryMap[category] || category;
      formulaParts.push(`{Category} = "${airtableCategory}"`);
    }

    const formula = formulaParts.length > 0 
      ? `AND(${formulaParts.join(', ')})`
      : undefined;

    // Don't cache when getting all products for count
    const cacheKey = status === 'all' ? `products_all_${Date.now()}` : `products_${JSON.stringify(options)}`;
    
    // Skip cache for 'all' status to get fresh count
    if (status === 'all') {
      const params = new URLSearchParams();
      params.append('maxRecords', limit.toString());
      if (offset) {
        params.append('offset', offset);
      }

      const url = `${this.baseUrl}/${this.tableName}?${params.toString()}`;

      return retryWithBackoff(async () => {
        const response = await fetch(url, {
          headers: this.headers,
        });

        if (!response.ok) {
          const error = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(`Airtable API error: ${response.status} - ${JSON.stringify(error)}`);
        }

        const data: AirtableResponse<AirtableProduct> = await response.json();
        return data;
      });
    }
    
    return cachedFetch(cacheKey, async () => {
      const params = new URLSearchParams();
      if (formula) {
        params.append('filterByFormula', formula);
      }
      params.append('maxRecords', limit.toString());
      if (offset) {
        params.append('offset', offset);
      }
      // Sort disabled - 'Created At' field doesn't exist in Airtable
      // Airtable automatically sorts by creation time via createdTime property
      // params.append('sort[0][field]', 'Created At');
      // params.append('sort[0][direction]', 'desc');

      const url = `${this.baseUrl}/${this.tableName}?${params.toString()}`;

      return retryWithBackoff(async () => {
        const response = await fetch(url, {
          headers: this.headers,
        });

        if (!response.ok) {
          const error = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(`Airtable API error: ${response.status} - ${JSON.stringify(error)}`);
        }

        const data: AirtableResponse<AirtableProduct> = await response.json();
        return data;
      });
    });
  }

  /**
   * Get single product by ID
   */
  async getProduct(id: string): Promise<AirtableProduct | null> {
    const cacheKey = `product_${id}`;
    
    return cachedFetch(cacheKey, async () => {
      const url = `${this.baseUrl}/${this.tableName}/${id}`;

      return retryWithBackoff(async () => {
        const response = await fetch(url, {
          headers: this.headers,
        });

        if (response.status === 404) {
          console.log(`Product with ID ${id} not found (404)`);
          return null;
        }

        if (!response.ok) {
          const error = await response.json().catch(() => ({ error: 'Unknown error' }));
          console.error(`Airtable API error for product ${id}:`, response.status, error);
          throw new Error(`Airtable API error: ${response.status} - ${JSON.stringify(error)}`);
        }

        const responseText = await response.text();
        console.log(`[getProduct] Airtable response for ${id}:`, responseText.substring(0, 1000));
        
        let data: any;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('[getProduct] Failed to parse Airtable response:', parseError);
          throw new Error(`Invalid JSON response from Airtable`);
        }

        // Airtable returns { record: {...} } for single record GET requests
        let record: AirtableProduct | null = null;
        if (data.record) {
          record = data.record;
        } else if (data.id && data.fields) {
          // Fallback: if it's already the record structure
          record = data;
        } else {
          console.error('[getProduct] Unexpected Airtable response structure:', data);
          return null;
        }
        
        // Log images from the record
        if (record && record.fields) {
          const imagesField = record.fields[FIELD_NAMES.IMAGES] || record.fields.Images;
          console.log(`[getProduct] Images in Airtable record:`, {
            fieldName: FIELD_NAMES.IMAGES,
            imagesField,
            isArray: Array.isArray(imagesField),
            length: Array.isArray(imagesField) ? imagesField.length : 'N/A',
          });
        }
        
        return record;
      });
    });
  }

  /**
   * Create new product
   */
  async createProduct(fields: AirtableProduct['fields']): Promise<AirtableProduct> {
    const url = `${this.baseUrl}/${this.tableName}`;

    return retryWithBackoff(async () => {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          fields: {
            ...fields,
            // Don't set Created At / Updated At - Airtable manages these automatically
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let error;
        try {
          error = JSON.parse(errorText);
        } catch {
          error = { error: errorText || 'Unknown error' };
        }
        console.error('Airtable API error response:', {
          status: response.status,
          statusText: response.statusText,
          error,
        });
        throw new Error(`Airtable API error: ${response.status} - ${JSON.stringify(error)}`);
      }

      const responseText = await response.text();
      console.log('Airtable createProduct raw response:', responseText);
      
      let record: AirtableProduct;
      try {
        // Airtable returns the record directly, not wrapped in { record: ... }
        record = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse Airtable response:', parseError, 'Response:', responseText);
        throw new Error(`Invalid JSON response from Airtable: ${responseText.substring(0, 200)}`);
      }
      
      if (!record) {
        console.error('Airtable returned null/undefined record');
        throw new Error('Airtable response is empty');
      }
      
      if (!record.fields) {
        console.error('Airtable record missing fields:', record);
        throw new Error('Airtable record missing fields property');
      }
      
      // Clear cache
      clearCache('products_');
      
      return record;
    });
  }

  /**
   * Update product
   */
  async updateProduct(id: string, fields: Partial<AirtableProduct['fields']>): Promise<AirtableProduct> {
    const url = `${this.baseUrl}/${this.tableName}/${id}`;
    
    console.log(`[updateProduct] Updating product ${id} with fields:`, JSON.stringify(fields, null, 2));

    return retryWithBackoff(async () => {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          fields: {
            ...fields,
            // Don't set Updated At - Airtable manages this automatically
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(`Airtable API error: ${response.status} - ${JSON.stringify(error)}`);
      }

      // Airtable returns the record directly, not wrapped in { record: ... }
      const responseText = await response.text();
      console.log(`[updateProduct] Airtable response for ${id}:`, responseText.substring(0, 500));
      
      let record: AirtableProduct;
      try {
        record = JSON.parse(responseText);
      } catch (parseError) {
        console.error('[updateProduct] Failed to parse response:', parseError);
        throw new Error(`Invalid JSON response from Airtable: ${responseText.substring(0, 200)}`);
      }
      
      if (!record || !record.fields) {
        console.error('[updateProduct] Invalid record returned:', record);
        throw new Error('Airtable returned invalid record');
      }
      
      console.log(`[updateProduct] Successfully updated product ${id}, images in response:`, 
        record.fields[FIELD_NAMES.IMAGES] || record.fields.Images || 'none');
      
      // Clear cache
      clearCache('products_');
      cache.delete(`product_${id}`);
      
      return record;
    });
  }

  /**
   * Delete product (soft delete by setting status to Archived)
   */
  async deleteProduct(id: string): Promise<void> {
    await this.updateProduct(id, { Status: 'Archived' });
  }

  /**
   * Upload image to Airtable
   * Note: Airtable doesn't support direct file uploads via API.
   * Images must be uploaded through Airtable UI or use a workaround.
   * This method documents the expected format.
   */
  async uploadImage(file: File): Promise<{ url: string; filename: string }> {
    // For now, return a placeholder. In production, you might:
    // 1. Upload to a CDN (Cloudinary, AWS S3, etc.)
    // 2. Get the URL
    // 3. Attach URL to Airtable record
    throw new Error('Direct image upload not supported. Upload images via Airtable UI or use a CDN.');
  }
}

// Singleton instance
let clientInstance: AirtableClient | null = null;

export function getAirtableClient(): AirtableClient {
  if (!clientInstance) {
    clientInstance = new AirtableClient();
  }
  return clientInstance;
}

// Field Name Configuration
// ⚠️ IMPORTANT: These must match EXACTLY with your Airtable table field names (case-sensitive!)
// Updated to match actual Airtable table structure
const FIELD_NAMES = {
  NAME: 'Name',
  PRODUCT_CODE: 'Product Code',
  CATEGORY: 'Category',
  SHORT_DESCRIPTION: 'Short Description',
  KEY_SPEC_1: 'Key Spec 1',
  KEY_SPEC_2: 'Key Spec 2',
  KEY_SPEC_3: 'Key Spec 3',
  WHATSAPP_MESSAGE: 'WhatsApp Message',
  STATUS: 'Status',
  FEATURED: 'Featured',
  IMAGES: 'Images',
  // Note: Full Specs, Applications, Installation Requirements don't exist in Airtable
  // These will be stored in Notes field or skipped
  NOTES: 'Notes',
} as const;

// Helper functions to convert between Airtable format and Product type
import { Product } from '@/types/products';

export function airtableToProduct(record: AirtableProduct | null | undefined): Product {
  // Safety check: ensure record and fields exist
  if (!record || !record.fields) {
    throw new Error('Invalid Airtable record: record or fields is missing');
  }
  
  const fields = record.fields as any;
  
  // Combine Key Spec 1, 2, 3 into an array
  const keySpecs: string[] = [];
  if (fields[FIELD_NAMES.KEY_SPEC_1]?.trim()) keySpecs.push(fields[FIELD_NAMES.KEY_SPEC_1].trim());
  if (fields[FIELD_NAMES.KEY_SPEC_2]?.trim()) keySpecs.push(fields[FIELD_NAMES.KEY_SPEC_2].trim());
  if (fields[FIELD_NAMES.KEY_SPEC_3]?.trim()) keySpecs.push(fields[FIELD_NAMES.KEY_SPEC_3].trim());

  // Parse additional data from Notes field (if stored as JSON)
  let fullSpecs: Record<string, string> = {};
  let applications: string[] = [];
  let installationReqs = '';
  
  if (fields[FIELD_NAMES.NOTES]) {
    try {
      // Try to parse Notes as JSON containing fullSpecs, applications, installationReqs
      const notesData = JSON.parse(fields[FIELD_NAMES.NOTES]);
      if (notesData.fullSpecs) fullSpecs = notesData.fullSpecs;
      if (notesData.applications) applications = Array.isArray(notesData.applications) ? notesData.applications : [];
      if (notesData.installationReqs) installationReqs = notesData.installationReqs;
    } catch {
      // If not JSON, treat Notes as plain text (could be installation requirements)
      installationReqs = fields[FIELD_NAMES.NOTES];
    }
  }

  // Map category from Airtable format to internal format
  const categoryMap: Record<string, string> = {
    'Generators & Power': 'generators',
    'Shipping Containers': 'containers',
    'Building & Construction': 'metal',
  };

  // Extract image URLs from Images attachment field
  const imageAttachments = fields[FIELD_NAMES.IMAGES] || fields.Images || [];
  const images = Array.isArray(imageAttachments) 
    ? imageAttachments
        .filter((img: any) => img != null) // Filter out null/undefined
        .map((img: AirtableImage | string) => {
          // Handle both AirtableImage objects and plain URL strings
          if (typeof img === 'string') {
            return img;
          }
          // AirtableImage object should have url property
          return img?.url || '';
        })
        .filter(url => url && url.trim() !== '') // Filter out empty URLs
    : [];
  
  console.log(`[airtableToProduct] Extracted ${images.length} images from Airtable:`, images);

  return {
    id: record.id,
    code: fields[FIELD_NAMES.PRODUCT_CODE] || fields['Product Code'] || '',
    name: fields[FIELD_NAMES.NAME] || fields.Name || '',
    category: categoryMap[fields[FIELD_NAMES.CATEGORY] || fields.Category] || fields.Category?.toLowerCase() || 'generators',
    shortDescription: fields[FIELD_NAMES.SHORT_DESCRIPTION] || fields['Short Description'] || '',
    keySpecs,
    fullSpecs,
    applications,
    installationReqs,
    images,
    whatsappMessage: fields[FIELD_NAMES.WHATSAPP_MESSAGE] || fields['WhatsApp Message'] || '',
    active: (fields[FIELD_NAMES.STATUS] || fields.Status) === 'Active',
    featured: fields[FIELD_NAMES.FEATURED] ?? fields.Featured ?? false,
    createdAt: record.createdTime,
    updatedAt: record.createdTime,
  };
}

export function productToAirtable(product: Partial<Product>): any {
  // Map category from internal format to Airtable format
  const categoryMap: Record<string, string> = {
    'generators': 'Generators & Power',
    'containers': 'Shipping Containers',
    'metal': 'Building & Construction',
  };

  const fields: any = {};

  // Required fields - always include
  if (product.name !== undefined && product.name.trim() !== '') {
    fields[FIELD_NAMES.NAME] = product.name.trim();
  }
  if (product.code !== undefined && product.code.trim() !== '') {
    fields[FIELD_NAMES.PRODUCT_CODE] = product.code.trim();
  }
  if (product.category !== undefined) {
    fields[FIELD_NAMES.CATEGORY] = categoryMap[product.category] || product.category as any;
  }
  if (product.shortDescription !== undefined && product.shortDescription.trim() !== '') {
    fields[FIELD_NAMES.SHORT_DESCRIPTION] = product.shortDescription.trim();
  }
  
  // Key Specs - split array into Key Spec 1, 2, 3
  if (product.keySpecs !== undefined && Array.isArray(product.keySpecs)) {
    const validSpecs = product.keySpecs.filter(spec => spec && spec.trim() !== '');
    if (validSpecs.length > 0) {
      fields[FIELD_NAMES.KEY_SPEC_1] = validSpecs[0]?.trim() || '';
    }
    if (validSpecs.length > 1) {
      fields[FIELD_NAMES.KEY_SPEC_2] = validSpecs[1]?.trim() || '';
    }
    if (validSpecs.length > 2) {
      fields[FIELD_NAMES.KEY_SPEC_3] = validSpecs[2]?.trim() || '';
    }
  }
  
  // Store Full Specs, Applications, Installation Requirements in Notes field as JSON
  // Only include Notes field if there's actual data to store (don't send empty Notes)
  const notesData: any = {};
  if (product.fullSpecs !== undefined && Object.keys(product.fullSpecs).length > 0) {
    notesData.fullSpecs = product.fullSpecs;
  }
  if (product.applications !== undefined && Array.isArray(product.applications)) {
    const validApps = product.applications.filter(app => app && app.trim() !== '');
    if (validApps.length > 0) {
      notesData.applications = validApps;
    }
  }
  if (product.installationReqs !== undefined && product.installationReqs.trim() !== '') {
    notesData.installationReqs = product.installationReqs.trim();
  }
  
  // Notes field is DISABLED - Airtable doesn't have this field
  // Full Specs, Applications, Installation Requirements are not stored for now
  // If you want to store these, add a "Notes" field to your Airtable table first
  // if (Object.keys(notesData).length > 0) {
  //   fields[FIELD_NAMES.NOTES] = JSON.stringify(notesData);
  // }
  
  // Optional fields
  if (product.whatsappMessage !== undefined && product.whatsappMessage.trim() !== '') {
    fields[FIELD_NAMES.WHATSAPP_MESSAGE] = product.whatsappMessage.trim();
  }
  
  // Status and Featured - always include with defaults
  fields[FIELD_NAMES.STATUS] = product.active !== undefined && product.active ? 'Active' : 'Draft';
  fields[FIELD_NAMES.FEATURED] = product.featured !== undefined ? product.featured : false;

  // Handle Images - convert URL array to Airtable attachment format
  // Only update images if explicitly provided AND not empty
  // This prevents accidentally clearing images when updating other fields
  if (product.images !== undefined && Array.isArray(product.images) && product.images.length > 0) {
    // Convert image URLs to Airtable attachment format
    // Airtable expects an array of objects with url property
    // IMPORTANT: Airtable requires publicly accessible URLs (absolute URLs)
    const validImages = product.images
      .filter(url => url && typeof url === 'string' && url.trim() !== '') // Filter out empty/invalid URLs
      .map(url => {
        let imageUrl = url.trim();
        
        // Convert relative URLs to absolute URLs for Airtable
        // Airtable cannot access relative URLs like /products/image.jpg
        // Cloudinary URLs are already absolute, so skip conversion
        if (imageUrl.startsWith('/') && !imageUrl.startsWith('//')) {
          // Get the base URL from environment
          // On Vercel, VERCEL_URL is automatically available
          // For production, set NEXT_PUBLIC_SITE_URL in Vercel dashboard
          let baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
          
          if (!baseUrl) {
            // Fallback to Vercel's automatic URL
            if (process.env.VERCEL_URL) {
              baseUrl = `https://${process.env.VERCEL_URL}`;
            } else if (process.env.NEXT_PUBLIC_VERCEL_URL) {
              baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
            } else {
              // Last resort - localhost (won't work with Airtable but won't crash)
              baseUrl = 'http://localhost:3000';
              console.warn('[productToAirtable] No base URL found, using localhost. Images may not work with Airtable.');
            }
          }
          
          imageUrl = `${baseUrl}${imageUrl}`;
          console.log(`[productToAirtable] Converted relative URL to absolute: ${imageUrl}`);
        }
        // Cloudinary URLs (https://res.cloudinary.com/...) are already absolute, no conversion needed
        
        return {
          url: imageUrl,
          filename: imageUrl.split('/').pop() || 'image.jpg', // Extract filename from URL
        };
      });
    
    if (validImages.length > 0) {
      fields[FIELD_NAMES.IMAGES] = validImages;
      console.log(`[productToAirtable] Setting ${validImages.length} images:`, validImages.map(img => img.url));
    }
  } else if (product.images !== undefined && Array.isArray(product.images) && product.images.length === 0) {
    // Explicitly empty array means clear images
    fields[FIELD_NAMES.IMAGES] = [];
    console.log('[productToAirtable] Clearing images (empty array provided)');
  }
  // If images is undefined, don't include it in fields
  // This preserves existing images in Airtable when updating other fields

  return fields;
}

