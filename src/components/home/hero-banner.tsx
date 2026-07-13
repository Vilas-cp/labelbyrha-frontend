import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";

interface HeroBannerProps {
  eyebrow?: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}

function HeroBanner({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
}: HeroBannerProps) {
  return (
    <section className="relative h-[85vh] min-h-[520px] w-full overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-foreground/10 to-transparent" />
      <Container className="relative flex h-full items-end pb-20">
        <div className="flex max-w-lg flex-col gap-4">
          {eyebrow ? (
            <span className="text-xs font-medium tracking-[0.2em] text-white/90 uppercase">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="font-heading text-4xl font-medium text-white sm:text-5xl">
            {title}
          </h1>
          <p className="text-sm text-white/90 sm:text-base">{description}</p>
          <Button size="lg" render={<Link href={ctaHref} />} className="w-fit">
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}

export { HeroBanner };
