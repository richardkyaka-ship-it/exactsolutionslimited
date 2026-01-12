/**
 * Image Optimizer for Airtable Images
 * 
 * Optimizes Airtable image URLs for Next.js Image component
 * Uses Airtable's thumbnail API when available
 */

/**
 * Get optimized image URL from Airtable attachment
 * Prefers large thumbnail if available, falls back to original URL
 */
export function getOptimizedAirtableImage(
  imageUrl: string | undefined,
  size: 'small' | 'large' | 'original' = 'large'
): string {
  if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') {
    console.warn('[getOptimizedAirtableImage] Invalid image URL provided:', imageUrl)
    return '/placeholder-product.jpg'
  }

  // Clean the URL
  const cleanUrl = imageUrl.trim()

  // Handle Airtable URLs
  // Airtable URLs can be:
  // 1. https://dl.airtable.com/.attachments/... (old format)
  // 2. https://v5.airtableusercontent.com/... (new format)
  // 3. Cloudinary URLs: https://res.cloudinary.com/...
  
  // For Airtable URLs, we can optionally request thumbnails
  // But Next.js Image will handle optimization, so we return the original URL
  if (cleanUrl.includes('airtable.com') || cleanUrl.includes('airtableusercontent.com')) {
    // Return the original URL - Next.js will optimize it
    return cleanUrl
  }

  // For Cloudinary URLs, they're already optimized
  if (cleanUrl.includes('cloudinary.com')) {
    return cleanUrl
  }

  // For any other URL, return as-is
  // Next.js Image component will handle optimization if domain is configured
  return cleanUrl
}

/**
 * Generate a simple blur data URL for placeholder
 * Creates a tiny 1x1 pixel base64 image
 * Works in both server and client contexts
 */
export function generateBlurDataURL(width = 1, height = 1): string {
  // Simple gray placeholder - base64 encoded SVG
  // This is a pre-encoded 1x1 gray pixel
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4='
}

/**
 * Get image dimensions for aspect ratio
 */
export function getImageDimensions(aspectRatio: 'square' | 'landscape' | 'portrait' = 'square') {
  const dimensions = {
    square: { width: 400, height: 400 },
    landscape: { width: 600, height: 400 },
    portrait: { width: 400, height: 600 },
  }
  return dimensions[aspectRatio]
}

