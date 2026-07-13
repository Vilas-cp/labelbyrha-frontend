export const PRODUCT_CATEGORIES = [
  "Dresses",
  "Tops",
  "Bottoms",
  "Outerwear",
  "Accessories",
] as const;

export const PRODUCT_SIZES = ["XS", "S", "M", "L", "XL", "One Size"] as const;

export const PRODUCT_COLORS = [
  { name: "Black", value: "#1A1A1A" },
  { name: "Ivory", value: "#F3EEE4" },
  { name: "Blush", value: "#F3C9D6" },
  { name: "Sage", value: "#A8B5A0" },
  { name: "Charcoal", value: "#3B3B3D" },
  { name: "Rust", value: "#B5654A" },
  { name: "Navy", value: "#2C3550" },
] as const;

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
] as const;

export const PRICE_MIN = 0;
export const PRICE_MAX = 8000;
export const PRICE_STEP = 100;
export const PRODUCTS_PER_PAGE = 12;
