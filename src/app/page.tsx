import { HeroBanner } from "@/components/home/hero-banner";
import { CategoryGrid } from "@/components/home/category-grid";
import { BestSellers } from "@/components/home/best-sellers";
import { WhyShopWithUs } from "@/components/home/why-shop-with-us";
import { CustomerReviews } from "@/components/home/customer-reviews";
import { InstagramGallery } from "@/components/home/instagram-gallery";
import {
  bestSellers,
  categories,
  hero,
  instagramImages,
  reviews,
  whyShopFeatures,
} from "./_data/home-content";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroBanner {...hero} />
      <CategoryGrid
        title="Shop by Category"
        description="Curated edits of our most-loved styles, from everyday essentials to statement pieces."
        categories={categories}
      />
      <BestSellers
        title="Best Sellers"
        description="The pieces our customers can't stop wearing."
        products={bestSellers}
        viewAllHref="/shop"
      />
      <WhyShopWithUs
        title="Why Shop With Us"
        description="Considered details, from checkout to your doorstep."
        features={whyShopFeatures}
      />
      <CustomerReviews
        title="What Our Customers Say"
        description="Real reviews from the Lablebyrha community."
        reviews={reviews}
      />
      <InstagramGallery
        handle="@lablebyrha"
        profileHref="https://instagram.com"
        images={instagramImages}
      />
    </main>
  );
}
