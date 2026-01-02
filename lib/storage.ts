import fs from 'fs/promises';
import path from 'path';
import { Product, Category } from '@/types/products';

const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json');
const CATEGORIES_FILE = path.join(process.cwd(), 'data', 'categories.json');

export async function getProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
}

export async function saveProducts(products: Product[]): Promise<void> {
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
}

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await fs.readFile(CATEGORIES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading categories:', error);
    return [];
  }
}

export async function saveCategories(categories: Category[]): Promise<void> {
  await fs.writeFile(CATEGORIES_FILE, JSON.stringify(categories, null, 2), 'utf8');
}

