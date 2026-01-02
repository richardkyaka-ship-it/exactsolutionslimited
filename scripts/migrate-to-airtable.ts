/**
 * Migration Script: JSON to Airtable
 * 
 * This script migrates existing product data from JSON files to Airtable.
 * 
 * Usage:
 *   npx tsx scripts/migrate-to-airtable.ts
 * 
 * Prerequisites:
 *   - Set AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME in .env.local
 *   - Airtable base and table must exist
 *   - Table must have the correct field names (see lib/airtable.ts)
 */

import fs from 'fs/promises';
import path from 'path';
import { getAirtableClient, productToAirtable } from '../lib/airtable';
import { Product } from '../types/products';

const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json');

interface MigrationResult {
  success: number;
  failed: number;
  errors: Array<{ product: string; error: string }>;
}

async function migrateProducts(): Promise<MigrationResult> {
  const result: MigrationResult = {
    success: 0,
    failed: 0,
    errors: [],
  };

  try {
    // Read products from JSON
    console.log('📖 Reading products from JSON file...');
    const jsonData = await fs.readFile(PRODUCTS_FILE, 'utf8');
    const products: Product[] = JSON.parse(jsonData);
    console.log(`✅ Found ${products.length} products to migrate\n`);

    // Initialize Airtable client
    const client = getAirtableClient();

    // Migrate each product
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(`[${i + 1}/${products.length}] Migrating: ${product.name} (${product.code})...`);

      try {
        // Convert product to Airtable format
        const fields = productToAirtable(product);

        // Check if product already exists (by code)
        // Note: This assumes you have a unique constraint on Product Code in Airtable
        // If not, you may want to check for existing records first
        
        // Create product in Airtable
        await client.createProduct(fields as any);
        
        result.success++;
        console.log(`  ✅ Successfully migrated\n`);
      } catch (error: any) {
        result.failed++;
        const errorMsg = error.message || 'Unknown error';
        result.errors.push({
          product: `${product.name} (${product.code})`,
          error: errorMsg,
        });
        console.log(`  ❌ Failed: ${errorMsg}\n`);
        
        // If rate limited, wait a bit
        if (error.status === 429 || errorMsg.includes('rate limit')) {
          console.log('  ⏳ Rate limited, waiting 2 seconds...\n');
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      // Small delay to avoid hitting rate limits (5 req/sec for free tier)
      if (i < products.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 250));
      }
    }

    return result;
  } catch (error: any) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

async function main() {
  console.log('🚀 Starting Airtable Migration\n');
  console.log('=' .repeat(50));
  console.log('');

  try {
    // Check if products file exists
    try {
      await fs.access(PRODUCTS_FILE);
    } catch {
      console.error(`❌ Products file not found: ${PRODUCTS_FILE}`);
      process.exit(1);
    }

    // Check environment variables
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      console.error('❌ Missing Airtable credentials in .env.local');
      console.error('   Required: AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME');
      process.exit(1);
    }

    // Run migration
    const result = await migrateProducts();

    // Print summary
    console.log('');
    console.log('=' .repeat(50));
    console.log('📊 Migration Summary');
    console.log('=' .repeat(50));
    console.log(`✅ Successfully migrated: ${result.success}`);
    console.log(`❌ Failed: ${result.failed}`);
    console.log('');

    if (result.errors.length > 0) {
      console.log('❌ Errors:');
      result.errors.forEach(({ product, error }) => {
        console.log(`   - ${product}: ${error}`);
      });
      console.log('');
    }

    if (result.failed === 0) {
      console.log('🎉 All products migrated successfully!');
    } else {
      console.log('⚠️  Some products failed to migrate. Check errors above.');
      process.exit(1);
    }
  } catch (error: any) {
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Run migration if called directly
if (typeof require !== 'undefined' && require.main === module) {
  main();
}

export { migrateProducts };

