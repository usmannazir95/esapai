import type { Metadata } from "next";
import { LazySection } from "@/components/ui/lazy-section";
import { Hero } from "@/components/features/home/hero";
import { generateHomeMetadata } from "@/lib/seo/metadata";
import dynamic from "next/dynamic";

export const metadata: Metadata = generateHomeMetadata();


// Below-the-fold sections - lazy loaded with code splitting
const MissionSection = dynamic(
  () => import("@/components/features/about/sections/mission").then((mod) => ({ default: mod.Mission })),
);

const VisionSection = dynamic(
  () => import("@/components/features/about/sections/vision").then((mod) => ({ default: mod.Vision })),
);

const ServiceSection = dynamic(
  () => import("@/components/features/home/sections/service").then((mod) => ({ default: mod.Service })),
);

const ProductShowcaseSection = dynamic(
  () => import("@/components/features/home/sections/product-showcase").then((mod) => ({ default: mod.ProductShowcase })),
);

const TextRevealSection = dynamic(
  () => import("@/components/features/home/sections/text-reveal").then((mod) => ({ default: mod.TextRevealSection })),
);

export default function Home() {
  return (
    <main className="relative">





      <Hero />

      {/* Process Visualization */}



      {/* Below-the-fold sections load progressively as user scrolls */}
      <LazySection minHeight="600px">
        <MissionSection />
      </LazySection>


      <LazySection minHeight="600px">
        <VisionSection />
      </LazySection>

      <LazySection minHeight="800px">
        <ServiceSection />
      </LazySection>

      <LazySection minHeight="600px">
        <ProductShowcaseSection />
      </LazySection>

      <LazySection minHeight="200vh">
        <TextRevealSection />
      </LazySection>
    </main>
  );
}
