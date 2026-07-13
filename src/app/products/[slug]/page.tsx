import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/common/container";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductOptions } from "@/components/product/product-options";
import {
  getProductBySlug,
  getProductDescription,
  getProductDetails,
  getProductImages,
  mockProducts,
} from "@/services/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return mockProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: getProductDescription(product),
    openGraph: {
      images: [{ url: product.imageSrc }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const images = getProductImages(product);
  const description = getProductDescription(product);
  const details = getProductDetails();

  return (
    <main className="flex-1">
      <Container className="flex flex-col gap-12 py-12">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link href="/shop" className="transition-colors hover:text-accent">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/shop?category=${product.category}`}
            className="transition-colors hover:text-accent"
          >
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={images} />

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              {product.isNew ? (
                <Badge variant="secondary" className="w-fit">
                  New
                </Badge>
              ) : null}
              <h1 className="font-heading text-3xl text-foreground sm:text-4xl">
                {product.name}
              </h1>
            </div>

            <ProductOptions
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              sizes={product.sizes}
              colors={product.colors}
            />
          </div>
        </div>

        <div className="max-w-2xl border-t border-border pt-10">
          <h2 className="font-heading mb-4 text-xl text-foreground">
            Description
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">{description}</p>
          <ul className="flex flex-col gap-2">
            {details.map((detail) => (
              <li
                key={detail}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </main>
  );
}
