import { getFeaturedProducts } from "@/lib/repositories/products";
import { HeroSlider } from "@/components/home/hero-slider";
import { MissionSection } from "@/components/home/mission-section";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { FeaturedCollection } from "@/components/home/featured-collection";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name: "Fastlane Mini Bikes LLC",
    image: "https://fastlaneminibikes.com/cdn/shop/files/FL_1_d39e2372-6212-4da8-a635-345ca33bc321.png?v=1685030855",
    description: "Est 2015 in Los Angeles Fast Lane Mini Bikes LLC is Your 1 Stop Mini Bike Shop For Parts & Upgrades.",
    url: "https://fastlaneminibikes.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      addressCountry: "US",
    },
    sameAs: ["https://instagram.com/FLR_MINIBIKES"],
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Shogun Reference Hero Slider */}
      <HeroSlider />

      {/* Fastlane Bio & CTA */}
      <MissionSection />

      {/* Product Categories */}
      <CategoriesGrid />

      {/* Featured Products */}
      <FeaturedCollection products={featuredProducts} />
    </div>
  );
}
