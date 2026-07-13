"use client";

import { ZoomIn } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types/product";

interface ProductGalleryProps {
  images: ProductImage[];
}

function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const active = images[activeIndex];

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className="group relative aspect-4/5 w-full cursor-zoom-in overflow-hidden  bg-secondary"
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={active.src}
          alt={active.alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        {isZooming ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden sm:block"
            style={{
              backgroundImage: `url(${active.src})`,
              backgroundSize: "200%",
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
          />
        ) : (
          <div className="pointer-events-none absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-card/90 text-foreground opacity-0 shadow-sm ring-1 ring-foreground/10 backdrop-blur transition-opacity group-hover:opacity-100">
            <ZoomIn className="size-4" />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Show image ${index + 1} of ${images.length}`}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative aspect-square w-16 shrink-0 overflow-hidden  ring-1 transition-shadow sm:w-20",
              index === activeIndex ? "ring-2 ring-accent" : "ring-border",
            )}
          >
            <Image src={image.src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export { ProductGallery };
