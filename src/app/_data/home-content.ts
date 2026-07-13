import { RotateCcw, ShieldCheck, Sparkles, Truck } from "lucide-react";

/**
 * Placeholder content for the Home page. Replace with real data from
 * `services/` once the catalog, reviews, and social feed are backed by
 * the API.
 */

export const hero = {
  eyebrow: "New Season",
  title: "Effortless Elegance, Designed for You",
  description:
    "Discover the new collection — clean silhouettes, soft fabrics, and timeless pieces made to be worn for years.",
  ctaLabel: "Shop New Arrivals",
  ctaHref: "/shop?sort=newest",
  imageSrc: "https://picsum.photos/seed/lablebyrha-hero/1600/1000",
  imageAlt: "Model wearing a flowing pastel dress from the new collection",
};

export const categories = [
  {
    name: "Dresses",
    href: "/shop?category=Dresses",
    imageSrc: "https://picsum.photos/seed/lablebyrha-cat-dresses/800/1000",
    imageAlt: "Dresses category",
  },
  {
    name: "Outerwear",
    href: "/shop?category=Outerwear",
    imageSrc: "https://picsum.photos/seed/lablebyrha-cat-outerwear/800/1000",
    imageAlt: "Outerwear category",
  },
  {
    name: "Accessories",
    href: "/shop?category=Accessories",
    imageSrc: "https://picsum.photos/seed/lablebyrha-cat-accessories/800/1000",
    imageAlt: "Accessories category",
  },
  {
    name: "New Arrivals",
    href: "/shop?sort=newest",
    imageSrc: "https://picsum.photos/seed/lablebyrha-cat-new/800/1000",
    imageAlt: "New arrivals category",
  },
] as const;

export const bestSellers = [
  {
    id: "1",
    href: "/products/silk-wrap-dress",
    name: "Silk Wrap Dress",
    price: 2499,
    compareAtPrice: 3199,
    imageSrc: "https://picsum.photos/seed/lablebyrha-product-1/800/1000",
    imageAlt: "Silk wrap dress",
  },
  {
    id: "2",
    href: "/products/linen-blazer",
    name: "Linen Blazer",
    price: 2199,
    imageSrc: "https://picsum.photos/seed/lablebyrha-product-2/800/1000",
    imageAlt: "Linen blazer",
    isNew: true,
  },
  {
    id: "3",
    href: "/products/tailored-trousers",
    name: "Tailored Trousers",
    price: 1799,
    imageSrc: "https://picsum.photos/seed/lablebyrha-product-3/800/1000",
    imageAlt: "Tailored trousers",
  },
  {
    id: "4",
    href: "/products/cashmere-sweater",
    name: "Cashmere Sweater",
    price: 4499,
    imageSrc: "https://picsum.photos/seed/lablebyrha-product-4/800/1000",
    imageAlt: "Cashmere sweater",
  },
  {
    id: "5",
    href: "/products/pleated-midi-skirt",
    name: "Pleated Midi Skirt",
    price: 1499,
    compareAtPrice: 1899,
    imageSrc: "https://picsum.photos/seed/lablebyrha-product-5/800/1000",
    imageAlt: "Pleated midi skirt",
  },
  {
    id: "6",
    href: "/products/satin-slip-top",
    name: "Satin Slip Top",
    price: 1299,
    imageSrc: "https://picsum.photos/seed/lablebyrha-product-6/800/1000",
    imageAlt: "Satin slip top",
    isNew: true,
  },
  {
    id: "7",
    href: "/products/wool-trench-coat",
    name: "Wool Trench Coat",
    price: 5999,
    imageSrc: "https://picsum.photos/seed/lablebyrha-product-7/800/1000",
    imageAlt: "Wool trench coat",
  },
  {
    id: "8",
    href: "/products/leather-tote-bag",
    name: "Leather Tote Bag",
    price: 3999,
    imageSrc: "https://picsum.photos/seed/lablebyrha-product-8/800/1000",
    imageAlt: "Leather tote bag",
  },
] as const;

export const whyShopFeatures = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary shipping on all orders over ₹2,999.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns and exchanges.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "Your payment information is always protected.",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "Thoughtfully sourced fabrics, made to last.",
  },
] as const;

export const reviews = [
  {
    id: "1",
    name: "Amelia H.",
    avatarSrc: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    quote:
      "The quality is beyond what I expected. Every piece feels like it was made just for me.",
  },
  {
    id: "2",
    name: "Sophie L.",
    avatarSrc: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    quote:
      "Effortlessly elegant. I've never received so many compliments on an outfit before.",
  },
  {
    id: "3",
    name: "Grace M.",
    avatarSrc: "https://i.pravatar.cc/150?img=5",
    rating: 4,
    quote:
      "Beautiful fabrics and a perfect fit. Shipping was fast and the packaging felt so premium.",
  },
] as const;

export const instagramImages = [
  {
    id: "1",
    src: "https://picsum.photos/seed/lablebyrha-insta-1/600/600",
    alt: "Instagram post 1",
    href: "https://instagram.com",
  },
  {
    id: "2",
    src: "https://picsum.photos/seed/lablebyrha-insta-2/600/600",
    alt: "Instagram post 2",
    href: "https://instagram.com",
  },
  {
    id: "3",
    src: "https://picsum.photos/seed/lablebyrha-insta-3/600/600",
    alt: "Instagram post 3",
    href: "https://instagram.com",
  },
  {
    id: "4",
    src: "https://picsum.photos/seed/lablebyrha-insta-4/600/600",
    alt: "Instagram post 4",
    href: "https://instagram.com",
  },
  {
    id: "5",
    src: "https://picsum.photos/seed/lablebyrha-insta-5/600/600",
    alt: "Instagram post 5",
    href: "https://instagram.com",
  },
  {
    id: "6",
    src: "https://picsum.photos/seed/lablebyrha-insta-6/600/600",
    alt: "Instagram post 6",
    href: "https://instagram.com",
  },
] as const;
