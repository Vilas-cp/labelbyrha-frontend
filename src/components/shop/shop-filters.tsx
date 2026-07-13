"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { PRICE_MAX, PRICE_MIN, PRICE_STEP, PRODUCT_CATEGORIES, PRODUCT_COLORS, PRODUCT_SIZES } from "@/constants/shop";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ProductCategory, ProductSize } from "@/types/product";

interface ShopFiltersProps {
  categories: ProductCategory[];
  sizes: ProductSize[];
  colors: string[];
  minPrice: number;
  maxPrice: number;
  onToggleCategory: (value: ProductCategory) => void;
  onToggleSize: (value: ProductSize) => void;
  onToggleColor: (value: string) => void;
  onPriceChange: (min: number, max: number) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
  className?: string;
}

function ShopFilters({
  categories,
  sizes,
  colors,
  minPrice,
  maxPrice,
  onToggleCategory,
  onToggleSize,
  onToggleColor,
  onPriceChange,
  onClear,
  hasActiveFilters,
  className,
}: ShopFiltersProps) {
  const [priceDraft, setPriceDraft] = useState<[number, number]>([minPrice, maxPrice]);

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div className="flex items-center justify-between">
        <p className="font-heading text-lg text-foreground">Filters</p>
        {hasActiveFilters ? (
          <Button variant="link" size="sm" className="h-auto p-0" onClick={onClear}>
            Clear all
          </Button>
        ) : null}
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-foreground">Category</p>
        <div className="flex flex-col gap-2.5">
          {PRODUCT_CATEGORIES.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2.5 text-sm text-foreground"
            >
              <Checkbox
                checked={categories.includes(category)}
                onCheckedChange={() => onToggleCategory(category)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium text-foreground">Price</p>
        <Slider
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={PRICE_STEP}
          value={priceDraft}
          onValueChange={(value) => setPriceDraft(value as [number, number])}
          onValueCommitted={(value) => {
            const [min, max] = value as [number, number];
            onPriceChange(min, max);
          }}
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{formatPrice(priceDraft[0])}</span>
          <span>{formatPrice(priceDraft[1])}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-foreground">Size</p>
        <div className="flex flex-wrap gap-2">
          {PRODUCT_SIZES.map((size) => {
            const isSelected = sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onToggleSize(size)}
                className={cn(
                  "flex h-9 min-w-9 items-center justify-center rounded-full border px-3 text-sm transition-colors",
                  isSelected
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:bg-muted",
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-foreground">Color</p>
        <div className="flex flex-wrap gap-3">
          {PRODUCT_COLORS.map((color) => {
            const isSelected = colors.includes(color.name);
            return (
              <button
                key={color.name}
                type="button"
                aria-pressed={isSelected}
                aria-label={color.name}
                onClick={() => onToggleColor(color.name)}
                className={cn(
                  "flex size-8 items-center justify-center rounded-full ring-1 ring-offset-2 ring-offset-background transition-shadow",
                  isSelected ? "ring-2 ring-accent" : "ring-border",
                )}
              >
                <span
                  className="size-6 rounded-full"
                  style={{ backgroundColor: color.value }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { ShopFilters };
