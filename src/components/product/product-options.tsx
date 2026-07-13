"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/common/quantity-selector";
import { PRODUCT_COLORS } from "@/constants/shop";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ProductSize } from "@/types/product";
import { WishlistButton } from "./wishlist-button";

interface ProductOptionsProps {
  price: number;
  compareAtPrice?: number;
  sizes: ProductSize[];
  colors: string[];
}

function ProductOptions({ price, compareAtPrice, sizes, colors }: ProductOptionsProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(
    sizes.length === 1 ? sizes[0] : null,
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const isSale = typeof compareAtPrice === "number" && compareAtPrice > price;
  const canAddToCart = Boolean(selectedSize);

  function handleAddToCart() {
    if (!canAddToCart) return;
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <span className="text-2xl font-medium text-foreground">
          {formatPrice(price)}
        </span>
        {isSale ? (
          <span className="text-lg text-muted-foreground line-through">
            {formatPrice(compareAtPrice)}
          </span>
        ) : null}
      </div>

      {colors.length > 0 ? (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-foreground">
            Color <span className="font-normal text-muted-foreground">— {selectedColor}</span>
          </p>
          <div className="flex flex-wrap gap-3">
            {colors.map((colorName) => {
              const swatch = PRODUCT_COLORS.find((c) => c.name === colorName);
              const isSelected = colorName === selectedColor;
              return (
                <button
                  key={colorName}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={colorName}
                  onClick={() => setSelectedColor(colorName)}
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full ring-1 ring-offset-2 ring-offset-background transition-shadow",
                    isSelected ? "ring-2 ring-accent" : "ring-border",
                  )}
                >
                  <span
                    className="size-7 rounded-full"
                    style={{ backgroundColor: swatch?.value }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-foreground">
          Size{selectedSize ? <span className="font-normal text-muted-foreground"> — {selectedSize}</span> : null}
        </p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const isSelected = size === selectedSize;
            return (
              <button
                key={size}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "flex h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm transition-colors",
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
        {!selectedSize ? (
          <p className="text-xs text-muted-foreground">Please select a size</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-foreground">Quantity</p>
        <QuantitySelector value={quantity} onChange={setQuantity} />
      </div>

      <div className="flex items-center gap-3">
        <Button
          size="lg"
          className="flex-1"
          disabled={!canAddToCart}
          onClick={handleAddToCart}
        >
          {justAdded ? (
            <>
              <Check className="size-4" />
              Added to Bag
            </>
          ) : (
            "Add to Bag"
          )}
        </Button>
        <WishlistButton className="size-11 shrink-0" />
      </div>
    </div>
  );
}

export { ProductOptions };
