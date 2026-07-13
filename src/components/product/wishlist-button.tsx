"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  defaultWishlisted?: boolean;
  onToggle?: (wishlisted: boolean) => void;
  className?: string;
}

function WishlistButton({
  defaultWishlisted = false,
  onToggle,
  className,
}: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(defaultWishlisted);

  return (
    <button
      type="button"
      aria-pressed={isWishlisted}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      onClick={() => {
        const next = !isWishlisted;
        setIsWishlisted(next);
        onToggle?.(next);
      }}
      className={cn(
        "flex size-9 items-center justify-center rounded-full bg-card/90 shadow-sm ring-1 ring-foreground/10 backdrop-blur transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <Heart
        className={cn(
          "size-4 transition-colors",
          isWishlisted ? "fill-accent text-accent" : "text-foreground",
        )}
      />
    </button>
  );
}

export { WishlistButton };
