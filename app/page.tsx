import { Hero } from "@/components/sections/hero/hero";
import { Mission } from "@/components/sections/about/mission";
import { Service } from "@/components/sections/features/home/service";
import { Vision } from "@/components/sections/about/vision";
import { Product } from "@/components/sections/features/home/product";
import { WorldMapSection } from "@/components/sections/features/home/world-map-section";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <WorldMapSection />
      <Mission />
      <Vision />
      <Service />
      <Product />
    </main>
  );
}
