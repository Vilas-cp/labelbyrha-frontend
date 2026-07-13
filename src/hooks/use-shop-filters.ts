"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { PRICE_MAX, PRICE_MIN, PRODUCT_CATEGORIES, PRODUCT_SIZES } from "@/constants/shop";
import type { ProductCategory, ProductSize, SortOption } from "@/types/product";

function parseList<T extends string>(
  value: string | null,
  allowed: readonly T[],
): T[] {
  if (!value) return [];
  return value.split(",").filter((v): v is T => (allowed as readonly string[]).includes(v));
}

export function useShopFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("q") ?? "";
  const categories = parseList<ProductCategory>(
    searchParams.get("category"),
    PRODUCT_CATEGORIES,
  );
  const sizes = parseList<ProductSize>(searchParams.get("size"), PRODUCT_SIZES);
  const colors = searchParams.get("color")?.split(",").filter(Boolean) ?? [];
  const minPrice = Number(searchParams.get("min") ?? PRICE_MIN);
  const maxPrice = Number(searchParams.get("max") ?? PRICE_MAX);
  const sort = (searchParams.get("sort") as SortOption) || "newest";
  const page = Number(searchParams.get("page") ?? 1);

  const updateParams = useCallback(
    (updates: Record<string, string | null>, options?: { resetPage?: boolean }) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      if (options?.resetPage !== false) {
        params.delete("page");
      }
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const toggleValue = useCallback(
    (key: string, value: string, current: string[]) => {
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      updateParams({ [key]: next.length ? next.join(",") : null });
    },
    [updateParams],
  );

  return {
    search,
    categories,
    sizes,
    colors,
    minPrice,
    maxPrice,
    sort,
    page,
    setSearch: (value: string) => updateParams({ q: value || null }),
    toggleCategory: (value: ProductCategory) =>
      toggleValue("category", value, categories),
    toggleSize: (value: ProductSize) => toggleValue("size", value, sizes),
    toggleColor: (value: string) => toggleValue("color", value, colors),
    setPriceRange: (min: number, max: number) =>
      updateParams({
        min: min > PRICE_MIN ? String(min) : null,
        max: max < PRICE_MAX ? String(max) : null,
      }),
    setSort: (value: SortOption) =>
      updateParams({ sort: value === "newest" ? null : value }),
    setPage: (value: number) =>
      updateParams({ page: value > 1 ? String(value) : null }, { resetPage: false }),
    clearFilters: () => router.push(pathname, { scroll: false }),
  };
}
