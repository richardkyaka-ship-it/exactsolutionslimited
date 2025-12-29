export type ProductCategory = 'generators' | 'containers' | 'metal';

export interface Product {
  id: string;
  code: string;
  name: string;
  category: ProductCategory;
  image: string;
  keySpecs: string[];
  fullSpecs: Record<string, string>;
  applications: string[];
  installationReqs: string;
}

