import { Zap, Container, Building2 } from 'lucide-react';

export const CATEGORIES = [
  {
    id: 'generators',
    name: 'Generators & Power',
    icon: Zap,
    slug: 'generators-power',
    description: 'Industrial power and energy solutions',
    color: 'orange',
  },
  {
    id: 'containers', 
    name: 'Shipping Containers',
    icon: Container,
    slug: 'shipping-containers',
    description: 'Storage and transport container solutions',
    color: 'blue',
  },
  {
    id: 'metal',
    name: 'Metal Fabrication',
    icon: Building2,
    slug: 'metal-fabrication',
    description: 'Custom metal and fabrication work',
    color: 'gray',
  },
] as const;

// Type for TypeScript
export type Category = typeof CATEGORIES[number];
export type CategoryId = Category['id'];

// Helper functions
export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find(cat => cat.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(cat => cat.slug === slug);
}

