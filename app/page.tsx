import { Hero } from "@/components/sections/hero/hero";
import { Mission } from "@/components/sections/about/mission";
import { Service } from "@/components/sections/features/service";
import { Vision } from "@/components/sections/about/vision";
import { Product } from "@/components/sections/features/product";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Mission />
      <Vision />
      <Service />
      <Product />
    </main>
  );
}
