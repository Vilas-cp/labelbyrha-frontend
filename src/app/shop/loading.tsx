import { Container } from "@/components/common/container";
import { ProductCardSkeleton } from "@/components/product/product-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShopLoading() {
  return (
    <main className="flex-1">
      <Container className="flex flex-col gap-8 py-12 lg:flex-row lg:items-start lg:gap-12">
        <aside className="hidden w-64 shrink-0 flex-col gap-6 lg:flex">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-24 w-full" />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-full max-w-xs" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
