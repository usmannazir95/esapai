import { Hero } from "@/components/sections/hero";
import { Mission } from "@/components/sections/mission";
import { Service } from "@/components/sections/service";
import { Vision } from "@/components/sections/vision";
import { Product } from "@/components/sections/product";

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
