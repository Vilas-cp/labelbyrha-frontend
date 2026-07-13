import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: readonly Product[];
  emptyState?: React.ReactNode;
}

function ProductGrid({ products, emptyState }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center gap-2 text-center">
        {emptyState ?? (
          <p className="text-sm text-muted-foreground">
            No products match your filters.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          href={`/products/${product.slug}`}
          name={product.name}
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          imageSrc={product.imageSrc}
          imageAlt={product.imageAlt}
          isNew={product.isNew}
        />
      ))}
    </div>
  );
}

export { ProductGrid };
