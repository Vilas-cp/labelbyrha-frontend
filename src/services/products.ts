import { PRODUCTS_PER_PAGE } from "@/constants/shop";
import type { Product, ProductQuery, ProductQueryResult } from "@/types/product";

/**
 * Mock product catalog. Replace with a real API call (via `apiClient`) once
 * the backend catalog endpoint exists — `queryProducts` is written to match
 * the shape a real paginated/filtered endpoint would take and return, so the
 * swap only touches this file.
 */
export const mockProducts: Product[] = [
  {
    id: "1",
    slug: "silk-wrap-dress",
    name: "Silk Wrap Dress",
    category: "Dresses",
    price: 2499,
    compareAtPrice: 3199,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blush", "Black"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-1/800/1000",
    imageAlt: "Silk wrap dress",
    createdAt: "2026-05-02",
  },
  {
    id: "2",
    slug: "floral-midi-dress",
    name: "Floral Midi Dress",
    category: "Dresses",
    price: 2199,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ivory", "Blush"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-2/800/1000",
    imageAlt: "Floral midi dress",
    createdAt: "2026-04-18",
  },
  {
    id: "3",
    slug: "satin-slip-dress",
    name: "Satin Slip Dress",
    category: "Dresses",
    price: 1899,
    sizes: ["XS", "S", "M"],
    colors: ["Black", "Navy"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-3/800/1000",
    imageAlt: "Satin slip dress",
    isNew: true,
    createdAt: "2026-07-01",
  },
  {
    id: "4",
    slug: "linen-shirt-dress",
    name: "Linen Shirt Dress",
    category: "Dresses",
    price: 2799,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ivory", "Sage"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-4/800/1000",
    imageAlt: "Linen shirt dress",
    createdAt: "2026-03-22",
  },
  {
    id: "5",
    slug: "velvet-evening-gown",
    name: "Velvet Evening Gown",
    category: "Dresses",
    price: 6499,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Navy"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-5/800/1000",
    imageAlt: "Velvet evening gown",
    createdAt: "2026-02-14",
  },
  {
    id: "6",
    slug: "silk-camisole-top",
    name: "Silk Camisole Top",
    category: "Tops",
    price: 1299,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Blush", "Black"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-6/800/1000",
    imageAlt: "Silk camisole top",
    createdAt: "2026-04-05",
  },
  {
    id: "7",
    slug: "cashmere-sweater",
    name: "Cashmere Sweater",
    category: "Tops",
    price: 4499,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal", "Ivory", "Sage"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-7/800/1000",
    imageAlt: "Cashmere sweater",
    createdAt: "2026-03-10",
  },
  {
    id: "8",
    slug: "satin-slip-top",
    name: "Satin Slip Top",
    category: "Tops",
    price: 1299,
    sizes: ["XS", "S", "M"],
    colors: ["Black", "Blush"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-8/800/1000",
    imageAlt: "Satin slip top",
    isNew: true,
    createdAt: "2026-06-28",
  },
  {
    id: "9",
    slug: "cotton-poplin-blouse",
    name: "Cotton Poplin Blouse",
    category: "Tops",
    price: 1699,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ivory", "Sage"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-9/800/1000",
    imageAlt: "Cotton poplin blouse",
    createdAt: "2026-02-27",
  },
  {
    id: "10",
    slug: "ribbed-turtleneck",
    name: "Ribbed Turtleneck",
    category: "Tops",
    price: 1899,
    sizes: ["S", "M", "L"],
    colors: ["Charcoal", "Black", "Rust"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-10/800/1000",
    imageAlt: "Ribbed turtleneck",
    createdAt: "2026-01-30",
  },
  {
    id: "11",
    slug: "tailored-trousers",
    name: "Tailored Trousers",
    category: "Bottoms",
    price: 1799,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Charcoal", "Navy"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-11/800/1000",
    imageAlt: "Tailored trousers",
    createdAt: "2026-04-11",
  },
  {
    id: "12",
    slug: "pleated-midi-skirt",
    name: "Pleated Midi Skirt",
    category: "Bottoms",
    price: 1499,
    compareAtPrice: 1899,
    sizes: ["S", "M", "L"],
    colors: ["Blush", "Ivory"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-12/800/1000",
    imageAlt: "Pleated midi skirt",
    createdAt: "2026-05-19",
  },
  {
    id: "13",
    slug: "wide-leg-linen-pants",
    name: "Wide-Leg Linen Pants",
    category: "Bottoms",
    price: 1999,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sage", "Ivory"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-13/800/1000",
    imageAlt: "Wide-leg linen pants",
    createdAt: "2026-03-04",
  },
  {
    id: "14",
    slug: "denim-straight-jeans",
    name: "Denim Straight Jeans",
    category: "Bottoms",
    price: 2299,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "Black"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-14/800/1000",
    imageAlt: "Denim straight jeans",
    isNew: true,
    createdAt: "2026-06-15",
  },
  {
    id: "15",
    slug: "a-line-midi-skirt",
    name: "A-Line Midi Skirt",
    category: "Bottoms",
    price: 1599,
    sizes: ["XS", "S", "M"],
    colors: ["Rust", "Black"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-15/800/1000",
    imageAlt: "A-line midi skirt",
    createdAt: "2026-02-08",
  },
  {
    id: "16",
    slug: "wool-trench-coat",
    name: "Wool Trench Coat",
    category: "Outerwear",
    price: 5999,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal", "Rust"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-16/800/1000",
    imageAlt: "Wool trench coat",
    createdAt: "2026-01-20",
  },
  {
    id: "17",
    slug: "linen-blazer",
    name: "Linen Blazer",
    category: "Outerwear",
    price: 2199,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Black"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-17/800/1000",
    imageAlt: "Linen blazer",
    isNew: true,
    createdAt: "2026-06-22",
  },
  {
    id: "18",
    slug: "quilted-puffer-jacket",
    name: "Quilted Puffer Jacket",
    category: "Outerwear",
    price: 3999,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-18/800/1000",
    imageAlt: "Quilted puffer jacket",
    createdAt: "2026-03-29",
  },
  {
    id: "19",
    slug: "longline-wool-coat",
    name: "Longline Wool Coat",
    category: "Outerwear",
    price: 6999,
    sizes: ["S", "M", "L"],
    colors: ["Charcoal", "Black"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-19/800/1000",
    imageAlt: "Longline wool coat",
    createdAt: "2026-02-02",
  },
  {
    id: "20",
    slug: "cropped-denim-jacket",
    name: "Cropped Denim Jacket",
    category: "Outerwear",
    price: 2499,
    compareAtPrice: 2999,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Navy", "Rust"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-20/800/1000",
    imageAlt: "Cropped denim jacket",
    createdAt: "2026-05-27",
  },
  {
    id: "21",
    slug: "leather-tote-bag",
    name: "Leather Tote Bag",
    category: "Accessories",
    price: 3999,
    sizes: ["One Size"],
    colors: ["Black", "Rust"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-21/800/1000",
    imageAlt: "Leather tote bag",
    createdAt: "2026-04-24",
  },
  {
    id: "22",
    slug: "silk-scarf",
    name: "Silk Scarf",
    category: "Accessories",
    price: 999,
    sizes: ["One Size"],
    colors: ["Blush", "Ivory", "Rust"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-22/800/1000",
    imageAlt: "Silk scarf",
    isNew: true,
    createdAt: "2026-07-05",
  },
  {
    id: "23",
    slug: "leather-belt",
    name: "Leather Belt",
    category: "Accessories",
    price: 1499,
    sizes: ["S", "M", "L"],
    colors: ["Black", "Rust", "Charcoal"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-23/800/1000",
    imageAlt: "Leather belt",
    createdAt: "2026-01-12",
  },
  {
    id: "24",
    slug: "statement-earrings",
    name: "Statement Earrings",
    category: "Accessories",
    price: 899,
    sizes: ["One Size"],
    colors: ["Black", "Ivory"],
    imageSrc: "https://picsum.photos/seed/lablebyrha-shop-24/800/1000",
    imageAlt: "Statement earrings",
    createdAt: "2026-03-16",
  },
];

export function queryProducts(query: ProductQuery = {}): ProductQueryResult {
  const {
    search = "",
    categories = [],
    sizes = [],
    colors = [],
    minPrice,
    maxPrice,
    sort = "newest",
    page = 1,
    pageSize = PRODUCTS_PER_PAGE,
  } = query;

  const normalizedSearch = search.trim().toLowerCase();

  const filtered = mockProducts.filter((product) => {
    if (
      normalizedSearch &&
      !product.name.toLowerCase().includes(normalizedSearch)
    ) {
      return false;
    }
    if (categories.length && !categories.includes(product.category)) {
      return false;
    }
    if (sizes.length && !sizes.some((size) => product.sizes.includes(size))) {
      return false;
    }
    if (colors.length && !colors.some((color) => product.colors.includes(color))) {
      return false;
    }
    if (typeof minPrice === "number" && product.price < minPrice) {
      return false;
    }
    if (typeof maxPrice === "number" && product.price > maxPrice) {
      return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "newest":
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: sorted.slice(start, start + pageSize),
    total,
    totalPages,
    page: safePage,
  };
}
