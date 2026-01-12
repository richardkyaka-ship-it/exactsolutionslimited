/**
 * Generate Open Graph Image
 * 
 * Creates /public/og-image.jpg (1200x630px) using the logo-white-bg.png
 * Run with: npm run generate-og-image
 */

import sharp from 'sharp';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { writeFile } from 'fs/promises';

async function generateOGImage() {
  try {
    const publicDir = join(process.cwd(), 'public');
    const logoPath = join(publicDir, 'logo-white-bg.png');
    const outputPath = join(publicDir, 'og-image.jpg');

    console.log('🎨 Generating Open Graph image...');
    console.log(`   Logo: ${logoPath}`);
    console.log(`   Output: ${outputPath}`);

    // Read and resize the logo
    const logoBuffer = await readFile(logoPath);
    
    // Get logo dimensions
    const logoMetadata = await sharp(logoBuffer).metadata();
    const originalLogoWidth = logoMetadata.width || 400;
    const originalLogoHeight = logoMetadata.height || 120;

    // OG image dimensions
    const ogWidth = 1200;
    const ogHeight = 630;

    // Resize logo to fit nicely (max 600px width, maintain aspect ratio)
    const maxLogoWidth = 600;
    const logoScale = Math.min(maxLogoWidth / originalLogoWidth, 1);
    const logoWidth = Math.floor(originalLogoWidth * logoScale);
    const logoHeight = Math.floor(originalLogoHeight * logoScale);

    // Resize the logo
    const resizedLogo = await sharp(logoBuffer)
      .resize(logoWidth, logoHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .png()
      .toBuffer();

    // Calculate logo position (centered, slightly above center)
    const logoX = Math.floor((ogWidth - logoWidth) / 2);
    const logoY = Math.floor((ogHeight - logoHeight) / 2) - 80; // Slightly above center

    // Create the OG image
    const ogImage = await sharp({
      create: {
        width: ogWidth,
        height: ogHeight,
        channels: 3,
        background: { r: 250, g: 250, b: 250 }, // #fafafa light background
      },
    })
      .composite([
        {
          input: resizedLogo,
          left: logoX,
          top: logoY,
        },
      ])
      .jpeg({ quality: 90 })
      .toBuffer();

    // Save the image
    await writeFile(outputPath, ogImage);

    console.log('\n✅ Open Graph image generated successfully!');
    console.log(`   Saved to: ${outputPath}`);
    console.log(`   Dimensions: ${ogWidth}x${ogHeight}px`);
    console.log(`   Logo size: ${logoWidth}x${logoHeight}px (resized from ${originalLogoWidth}x${originalLogoHeight}px)\n`);
  } catch (error: any) {
    console.error('❌ Error generating OG image:', error.message);
    if (error.code === 'ENOENT') {
      console.error('   Make sure logo-white-bg.png exists in /public/');
    }
    process.exit(1);
  }
}

generateOGImage();
