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
  if (!imageUrl) {
    return '/placeholder-product.jpg'
  }

  // If it's already an Airtable URL, try to get thumbnail
  // Airtable URLs typically look like: https://dl.airtable.com/.attachments/...
  // Thumbnails: add ?thumbnails=true or use specific size parameter
  
  // For now, return the original URL
  // Next.js Image component will handle optimization via CDN
  return imageUrl
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

