import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { WishlistButton } from "./wishlist-button";

interface ProductCardProps {
  href: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  currency?: string;
  imageSrc: string;
  imageAlt: string;
  isNew?: boolean;
  className?: string;
}

function ProductCard({
  href,
  name,
  price,
  compareAtPrice,
  currency = "INR",
  imageSrc,
  imageAlt,
  isNew = false,
  className,
}: ProductCardProps) {
  const isSale = typeof compareAtPrice === "number" && compareAtPrice > price;

  return (
    <div className={cn("group relative flex flex-col gap-3", className)}>
      <Link href={href} className="block">
        <div className="relative aspect-3/4 w-full overflow-hidden bg-secondary">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {isSale ? (
            <Badge variant="destructive" className="absolute top-3 left-3">
              Sale
            </Badge>
          ) : isNew ? (
            <Badge variant="secondary" className="absolute top-3 left-3">
              New
            </Badge>
          ) : null}
        </div>
        <div className="mt-3 flex flex-col gap-1">
          <p className="text-sm text-foreground">{name}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              {formatPrice(price, currency)}
            </span>
            {isSale ? (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(compareAtPrice, currency)}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
      <WishlistButton className="absolute top-3 right-3" />
    </div>
  );
}

export { ProductCard };
