import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { LazySection } from "@/components/ui/lazy-section";
import { generateHomeMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generateHomeMetadata();

// Hero section loads immediately (above the fold, critical for LCP)
const HeroSection = dynamic(
  () => import("@/components/features/home/hero").then((mod) => ({ default: mod.Hero })),
  {
    // Hero should load immediately, no SSR delay
  }
);

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

export default function Home() {
  return (
    <main className="relative">
      {/* Hero loads immediately - critical for LCP and above the fold */}
      <HeroSection />
      
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
    </main>
  );
}
