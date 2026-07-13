import type { Metadata } from "next";
import { ShopPageClient } from "@/components/shop/shop-page-client";
import {
  PRICE_MAX,
  PRICE_MIN,
  PRODUCT_CATEGORIES,
  PRODUCT_SIZES,
  SORT_OPTIONS,
} from "@/constants/shop";
import { queryProducts } from "@/services/products";
import type { ProductCategory, ProductQuery, ProductSize, SortOption } from "@/types/product";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Browse the full Lablebyrha collection — dresses, tops, bottoms, outerwear, and accessories.",
};

type RawSearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseList<T extends string>(
  value: string | string[] | undefined,
  allowed: readonly T[],
): T[] {
  const raw = first(value);
  if (!raw) return [];
  return raw.split(",").filter((v): v is T => (allowed as readonly string[]).includes(v));
}

function parseQuery(searchParams: RawSearchParams): ProductQuery {
  const sortValues = SORT_OPTIONS.map((option) => option.value);
  const rawSort = first(searchParams.sort);
  const min = Number(first(searchParams.min));
  const max = Number(first(searchParams.max));
  const page = Number(first(searchParams.page));

  return {
    search: first(searchParams.q) ?? "",
    categories: parseList<ProductCategory>(searchParams.category, PRODUCT_CATEGORIES),
    sizes: parseList<ProductSize>(searchParams.size, PRODUCT_SIZES),
    colors: first(searchParams.color)?.split(",").filter(Boolean) ?? [],
    minPrice: Number.isFinite(min) && min > PRICE_MIN ? min : undefined,
    maxPrice: Number.isFinite(max) && max < PRICE_MAX ? max : undefined,
    sort: (sortValues as string[]).includes(rawSort ?? "") ? (rawSort as SortOption) : "newest",
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
}

interface ShopPageProps {
  searchParams: Promise<RawSearchParams>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const query = parseQuery(params);
  const { items, total, totalPages, page } = queryProducts(query);

  return (
    <main className="flex-1">
      <ShopPageClient products={items} total={total} totalPages={totalPages} page={page} />
    </main>
  );
}
