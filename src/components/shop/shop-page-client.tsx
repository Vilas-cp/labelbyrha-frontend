"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { Pagination } from "@/components/common/pagination";
import { ProductGrid } from "@/components/product/product-grid";
import { useShopFilters } from "@/hooks/use-shop-filters";
import { PRICE_MAX, PRICE_MIN } from "@/constants/shop";
import type { Product } from "@/types/product";
import { ShopFilters } from "./shop-filters";
import { ShopToolbar } from "./shop-toolbar";

interface ShopPageClientProps {
  products: readonly Product[];
  total: number;
  totalPages: number;
  page: number;
}

function ShopPageClient({ products, total, totalPages, page }: ShopPageClientProps) {
  const filters = useShopFilters();

  const activeFilterCount =
    filters.categories.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.minPrice > PRICE_MIN ? 1 : 0) +
    (filters.maxPrice < PRICE_MAX ? 1 : 0);

  const filtersPanel = (
    <ShopFilters
      key={`${filters.minPrice}-${filters.maxPrice}`}
      categories={filters.categories}
      sizes={filters.sizes}
      colors={filters.colors}
      minPrice={filters.minPrice}
      maxPrice={filters.maxPrice}
      onToggleCategory={filters.toggleCategory}
      onToggleSize={filters.toggleSize}
      onToggleColor={filters.toggleColor}
      onPriceChange={filters.setPriceRange}
      onClear={filters.clearFilters}
      hasActiveFilters={activeFilterCount > 0}
    />
  );

  return (
    <Container className="flex flex-col gap-8 py-12 lg:flex-row lg:items-start lg:gap-12">
      <aside className="hidden w-64 shrink-0 lg:block">{filtersPanel}</aside>

      <div className="flex min-w-0 flex-1 flex-col gap-8">
        <ShopToolbar
          resultCount={total}
          search={filters.search}
          onSearchChange={filters.setSearch}
          sort={filters.sort}
          onSortChange={filters.setSort}
          activeFilterCount={activeFilterCount}
          filtersSlot={filtersPanel}
        />

        <ProductGrid
          products={products}
          emptyState={
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-muted-foreground">
                No products match your filters.
              </p>
              {activeFilterCount > 0 ? (
                <Button variant="outline" onClick={filters.clearFilters}>
                  Clear all filters
                </Button>
              ) : null}
            </div>
          }
        />

        <Pagination page={page} totalPages={totalPages} onPageChange={filters.setPage} />
      </div>
    </Container>
  );
}

export { ShopPageClient };
