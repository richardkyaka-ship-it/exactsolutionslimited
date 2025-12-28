# Logo Implementation Guide

## Overview
This guide explains how to implement the two new logo images while preserving the existing animated text logo.

## Logo Files

### Required Assets
Place these files in the `public/` directory:

1. **`logo-white-bg.png`** (or `.svg`)
   - White background version
   - Use for: Light backgrounds, print materials, documents
   - Recommended: SVG or PNG @2x (e.g., 360x120px for 180x60px display)

2. **`logo-black-bg.png`** (or `.svg`)
   - Black background version  
   - Use for: Dark backgrounds (matches current site theme)
   - Recommended: SVG or PNG @2x (e.g., 360x120px for 180x60px display)

## Components Created

### 1. `components/Logo.tsx`
- **Purpose**: Displays the image-based logos
- **Props**:
  - `variant`: `'white-bg' | 'black-bg' | 'auto'` (default: `'auto'`)
  - `className`: Additional CSS classes
  - `width`: Logo width (default: 180)
  - `height`: Logo height (default: 60)
  - `priority`: Load with priority for above-fold (default: false)

### 2. `components/AnimatedTextLogo.tsx`
- **Purpose**: Preserves your original animated text logo
- **Props**:
  - `className`: Additional CSS classes
  - `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)

## Implementation Steps

### Step 1: Add Logo Images
1. Save your logo images to `public/`:
   - `public/logo-white-bg.png` (or `.svg`)
   - `public/logo-black-bg.png` (or `.svg`)

2. **Important**: If using PNG, ensure they're optimized:
   - Use 2x resolution for retina displays
   - Compress with tools like TinyPNG or ImageOptim
   - Recommended dimensions: 360x120px (for 180x60px display)

### Step 2: Update Navigation Component
The `Navigation.tsx` component has been updated to use the new `Logo` component.

**Current Implementation** (lines 200-214):
```tsx
{/* Logo / Home Link */}
<Logo 
  variant="black-bg" 
  className="fixed top-6 left-6 md:top-8 md:left-8 z-[70]"
  priority={true}
/>
```

### Step 3: Place Animated Text Logo Elsewhere

You mentioned you like the animated text logo. Here are suggested locations:

#### Option A: Footer (Recommended)
Add to `SplashScreen.tsx` or create a `Footer.tsx` component:

```tsx
<footer className="px-6 md:px-12 lg:px-20 py-12 border-t border-gray-900">
  <div className="max-w-[1800px] mx-auto">
    <AnimatedTextLogo size="sm" />
  </div>
</footer>
```

#### Option B: Contact Page Footer
Add to `app/contact/ContactPageClient.tsx`:

```tsx
<section className="px-6 md:px-12 lg:px-20 py-16 border-t border-gray-900">
  <AnimatedTextLogo size="sm" />
</section>
```

#### Option C: Navigation Overlay
Add to the navigation overlay (inside `Navigation.tsx`):

```tsx
<motion.nav>
  {/* ... existing nav items ... */}
  
  {/* Animated Logo at bottom */}
  <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
    <AnimatedTextLogo size="sm" />
  </div>
</motion.nav>
```

## Usage Examples

### Basic Usage (Navigation)
```tsx
import Logo from '@/components/Logo'

<Logo 
  variant="black-bg" 
  className="fixed top-6 left-6"
  priority={true}
/>
```

### Auto-Detection (Footer with different background)
```tsx
<Logo variant="auto" className="mb-4" />
```

### Animated Text Logo
```tsx
import AnimatedTextLogo from '@/components/AnimatedTextLogo'

<AnimatedTextLogo size="lg" className="mb-8" />
```

## Logo Sizing Guidelines

### Navigation Logo
- **Desktop**: 180x60px (or proportional)
- **Mobile**: 140x47px (or proportional)
- Use `priority={true}` for above-fold logos

### Footer/Secondary Logo
- **Desktop**: 120x40px
- **Mobile**: 100x33px

## Next.js Image Optimization

The `Logo` component uses Next.js `Image` component which:
- Automatically optimizes images
- Lazy loads by default (unless `priority={true}`)
- Serves WebP when supported
- Responsive sizing

## Testing Checklist

- [ ] Logo images added to `public/` directory
- [ ] Navigation shows new logo correctly
- [ ] Logo links to home page (`/`)
- [ ] Logo is responsive on mobile/tablet/desktop
- [ ] Animated text logo placed in chosen location
- [ ] Hover states work correctly
- [ ] Logo loads quickly (check Network tab)
- [ ] Logo looks sharp on retina displays

## Troubleshooting

### Logo not appearing
1. Check file paths: `public/logo-black-bg.png` (not `public/images/...`)
2. Verify file names match exactly (case-sensitive)
3. Clear `.next` cache: `rm -rf .next` (or `Remove-Item -Recurse -Force .next` on Windows)
4. Restart dev server

### Logo looks blurry
1. Use SVG format (best) or 2x resolution PNG
2. Ensure `width` and `height` props match actual image dimensions
3. Check browser zoom level

### Logo too large/small
1. Adjust `width` and `height` props in `Logo` component
2. Use `className` for additional sizing: `className="w-32 h-auto"`

## Next Steps

1. **Add logo images** to `public/` directory
2. **Test the implementation** in development
3. **Choose location** for animated text logo
4. **Adjust sizing** if needed
5. **Optimize images** for production

## Notes

- The current animated text logo in Navigation will be replaced with the image logo
- The animated text logo component is preserved and can be used anywhere
- Both logos link to home page (`/`)
- All logos maintain the premium, minimal aesthetic

