import dynamic from "next/dynamic";
const HeroSection = dynamic(
  () => import("@/components/sections/hero/hero").then((mod) => ({ default: mod.Hero })),
);

const MissionSection = dynamic(
  () => import("@/components/sections/about/mission").then((mod) => ({ default: mod.Mission })),
);

const ServiceSection = dynamic(
  () => import("@/components/sections/features/home/service").then((mod) => ({ default: mod.Service })),
);

const VisionSection = dynamic(
  () => import("@/components/sections/about/vision").then((mod) => ({ default: mod.Vision })),
);



const ProductShowcaseSection = dynamic(
  () => import("@/components/sections/features/home/product-showcase").then((mod) => ({ default: mod.ProductShowcase })),
);


export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <MissionSection />
      <VisionSection />
      <ServiceSection />
      <ProductShowcaseSection />
    </main>
  );
}
