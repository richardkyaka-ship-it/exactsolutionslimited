export type ProductCategoryValue = 'generators' | 'containers' | 'metal' | string;

export interface Category {
  id: string;
  name: string;
  value: ProductCategoryValue;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  category: ProductCategoryValue;
  shortDescription: string;
  keySpecs: string[];
  fullSpecs: Record<string, string>;
  applications: string[];
  installationReqs: string;
  images: string[];
  whatsappMessage?: string;
  active: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
