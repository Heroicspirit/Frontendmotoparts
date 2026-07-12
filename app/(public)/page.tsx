import Hero from "./_components/Hero";
import FeaturedCategories from "./_components/FeaturedCategories";
import PopularProducts from "./_components/PropularProduct";
import FlashSale from "./_components/FlashSale";

export default function LandingPage() {
  return (
    <main className="pb-16">
      <Hero />
      <FeaturedCategories />
      <PopularProducts />
      <FlashSale />
    </main>
  );
}