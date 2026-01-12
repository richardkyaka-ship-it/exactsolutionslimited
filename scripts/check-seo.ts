/**
 * SEO Validation Script
 * 
 * Checks that all pages have proper meta descriptions with correct length.
 * Run with: npx tsx scripts/check-seo.ts
 */

import fs from 'fs';
import path from 'path';

interface PageConfig {
  file: string;
  path: string;
  minLength: number;
  maxLength: number;
}

const pages: PageConfig[] = [
  { file: 'app/page.tsx', path: '/', minLength: 120, maxLength: 160 },
  { file: 'app/services/page.tsx', path: '/services', minLength: 120, maxLength: 160 },
  { file: 'app/about/page.tsx', path: '/about', minLength: 120, maxLength: 160 },
  { file: 'app/projects/page.tsx', path: '/projects', minLength: 120, maxLength: 160 },
  { file: 'app/products/page.tsx', path: '/products', minLength: 120, maxLength: 160 },
  { file: 'app/contact/page.tsx', path: '/contact', minLength: 120, maxLength: 160 },
];

function checkMetaDescriptions() {
  console.log('🔍 Checking SEO Meta Descriptions...\n');
  
  let allPassed = true;
  const issues: string[] = [];
  
  pages.forEach(({ file, path: pagePath, minLength, maxLength }) => {
    const filePath = path.join(process.cwd(), file);
    
    if (!fs.existsSync(filePath)) {
      console.log(`❌ ${file} - File not found`);
      issues.push(`${pagePath}: File not found`);
      allPassed = false;
      return;
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract description from metadata
    // Match: description: '...' or description: "..."
    const descriptionMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/);
    
    if (!descriptionMatch) {
      console.log(`❌ ${pagePath} - No description found in metadata`);
      issues.push(`${pagePath}: No description found`);
      allPassed = false;
      return;
    }
    
    const description = descriptionMatch[1];
    const length = description.length;
    
    if (length < minLength) {
      console.log(`❌ ${pagePath} - Description too short: ${length} chars (min: ${minLength})`);
      console.log(`   "${description}"`);
      issues.push(`${pagePath}: Too short (${length} chars, min: ${minLength})`);
      allPassed = false;
    } else if (length > maxLength) {
      console.log(`❌ ${pagePath} - Description too long: ${length} chars (max: ${maxLength})`);
      console.log(`   "${description}"`);
      issues.push(`${pagePath}: Too long (${length} chars, max: ${maxLength})`);
      allPassed = false;
    } else {
      console.log(`✅ ${pagePath} - Good: ${length} chars`);
    }
  });
  
  console.log('\n' + '='.repeat(50));
  if (allPassed) {
    console.log('🎉 All meta descriptions pass SEO checks!');
  } else {
    console.log('⚠️  Some issues need fixing:');
    issues.forEach(issue => console.log(`   • ${issue}`));
  }
  console.log('='.repeat(50));
  
  return allPassed;
}

// Run the check
const passed = checkMetaDescriptions();
process.exit(passed ? 0 : 1);
