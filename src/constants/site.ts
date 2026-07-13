export const siteConfig = {
  name: "Lablebyrha",
  title: "Lablebyrha | Premium Women's Fashion",
  description:
    "Lablebyrha is a premium women's fashion label offering clean, minimal, and elegant clothing designed to last.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og-image.png",
  keywords: [
    "Lablebyrha",
    "women's fashion",
    "premium clothing",
    "minimal fashion",
    "designer clothing",
  ],
  links: {
    instagram: "https://instagram.com",
    pinterest: "https://pinterest.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
