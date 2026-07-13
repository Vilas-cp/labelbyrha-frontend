import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";

interface Category {
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

interface CategoryGridProps {
  title: string;
  description?: string;
  categories: readonly Category[];
}

function CategoryGrid({ title, description, categories }: CategoryGridProps) {
  return (
    <section className="py-20">
      <Container className="flex flex-col gap-12">
        <SectionTitle title={title} description={description} />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group flex flex-col gap-3"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden  bg-secondary">
                <Image
                  src={category.imageSrc}
                  alt={category.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <p className="text-center text-sm font-medium text-foreground">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { CategoryGrid };
