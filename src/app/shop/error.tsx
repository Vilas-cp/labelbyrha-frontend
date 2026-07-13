"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";

export default function ShopError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex-1">
      <Container className="flex min-h-[50vh] flex-col items-center justify-center gap-4 py-20 text-center">
        <p className="font-heading text-2xl text-foreground">
          Something went wrong
        </p>
        <p className="max-w-sm text-sm text-muted-foreground">
          We couldn&apos;t load the shop right now. Please try again.
        </p>
        <Button onClick={reset}>Try again</Button>
      </Container>
    </main>
  );
}
