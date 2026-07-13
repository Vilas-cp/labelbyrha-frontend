import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";

interface InstagramImage {
  id: string;
  src: string;
  alt: string;
  href: string;
}

interface InstagramGalleryProps {
  handle: string;
  profileHref: string;
  images: readonly InstagramImage[];
}

function InstagramGallery({ handle, profileHref, images }: InstagramGalleryProps) {
  return (
    <section className="py-20">
      <Container className="flex flex-col gap-12">
        <SectionTitle
          title="Follow Along"
          description={
            <>
              Share your look with{" "}
              <Link
                href={profileHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {handle}
              </Link>{" "}
              for a chance to be featured.
            </>
          }
        />
        <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-6">
          {images.map((image) => (
            <Link
              key={image.id}
              href={image.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl bg-secondary"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 16vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { InstagramGallery };
