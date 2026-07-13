import { Container } from "@/components/common/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <main className="flex-1">
      <Container className="flex flex-col gap-12 py-12">
        <Skeleton className="h-4 w-64" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-4">
            <Skeleton className="aspect-4/5 w-full rounded-xl" />
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="size-16 rounded-lg sm:size-20" />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <Skeleton className="h-9 w-2/3" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-11 w-full" />
          </div>
        </div>
      </Container>
    </main>
  );
}
