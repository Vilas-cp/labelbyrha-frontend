import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";
import { ProductCard } from "@/components/product/product-card";

interface Product {
  id: string;
  href: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  imageSrc: string;
  imageAlt: string;
  isNew?: boolean;
}

interface BestSellersProps {
  title: string;
  description?: string;
  products: readonly Product[];
  viewAllHref?: string;
  viewAllLabel?: string;
}

function BestSellers({
  title,
  description,
  products,
  viewAllHref,
  viewAllLabel = "View All",
}: BestSellersProps) {
  return (
    <section className="bg-secondary/40 py-20">
      <Container className="flex flex-col gap-12">
        <SectionTitle title={title} description={description} />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        {viewAllHref ? (
          <div className="flex justify-center">
            <Button variant="outline" size="lg" render={<Link href={viewAllHref} />}>
              {viewAllLabel}
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

export { BestSellers };
