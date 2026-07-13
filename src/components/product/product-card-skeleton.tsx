import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Skeleton className="aspect-3/4 w-full rounded-xl" />
      <div className="mt-1 flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}

export { ProductCardSkeleton };
