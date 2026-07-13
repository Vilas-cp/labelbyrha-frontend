import type {
  PRODUCT_CATEGORIES,
  PRODUCT_SIZES,
  SORT_OPTIONS,
} from "@/constants/shop";

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
export type ProductSize = (typeof PRODUCT_SIZES)[number];
export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  sizes: ProductSize[];
  colors: string[];
  imageSrc: string;
  imageAlt: string;
  isNew?: boolean;
  createdAt: string;
}

export interface ProductQuery {
  search?: string;
  categories?: ProductCategory[];
  sizes?: ProductSize[];
  colors?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
  page?: number;
  pageSize?: number;
}

export interface ProductQueryResult {
  items: Product[];
  total: number;
  totalPages: number;
  page: number;
}
