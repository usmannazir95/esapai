"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { Product } from "@/types/product";
import { useProductContent } from "@/lib/hooks/use-product-content";
import { LazySection } from "@/components/ui/lazy-section";
import type { ProductPageClientProps } from "@/types/page";

// Hero loads immediately - critical for LCP
const ProductHeroSection = dynamic(
  () =>
    import("@/components/features/products/hero/product-hero").then((mod) => ({
      default: mod.ProductHero,
    })),
  {
    loading: () => (
      <div className="relative w-full overflow-hidden bg-dark pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-32">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 h-full flex flex-col justify-center">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <div className="h-12 sm:h-16 md:h-20 w-3/4 mx-auto mb-4 bg-white/10 rounded animate-pulse" />
              <div className="h-6 sm:h-8 w-1/2 mx-auto mb-2 bg-white/5 rounded animate-pulse" />
              <div className="h-6 sm:h-8 w-2/3 mx-auto bg-white/5 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    ),
  }
);

// Below-the-fold sections - lazy loaded with SSR disabled for heavy components
const MissionSection = dynamic(
  () =>
    import("@/components/features/about/sections/mission").then((mod) => ({
      default: mod.Mission,
    })),
  {
    ssr: true,
    loading: () => (
      <div className="p-6 bg-white/5 rounded-lg animate-pulse">
        <div className="h-5 w-3/4 bg-white/10 rounded mb-4" />
        <div className="h-4 w-full bg-white/5 rounded mb-2" />
        <div className="h-4 w-full bg-white/5 rounded" />
      </div>
    ),
  }
);

const AutomationHubSection = dynamic(
  () =>
    import("@/components/features/products/sections/automation-hub").then(
      (mod) => ({
        default: mod.AutomationHub,
      }),
    ),
  {
    ssr: true,
    loading: () => (
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="p-6 bg-white/5 rounded-lg animate-pulse">
            <div className="h-5 w-3/4 bg-white/10 rounded mb-4" />
            <div className="h-4 w-full bg-white/5 rounded mb-2" />
            <div className="h-4 w-full bg-white/5 rounded" />
          </div>
        ))}
      </div>
    ),
  }
);

const YouTubeVideoSection = dynamic(
  () =>
    import("@/components/shared/youtube-video").then((mod) => ({
      default: mod.default,
    })),
  {
    ssr: false, // YouTube embeds don't need SSR
    loading: () => (
      <div className="w-full aspect-video bg-white/5 rounded-lg animate-pulse" />
    ),
  }
);

const PerformanceSection = dynamic(
  () =>
    import("@/components/features/products/sections/performance-section").then(
      (mod) => ({
        default: mod.PerformanceSection,
      }),
    ),
  {
    ssr: true,
    loading: () => (
      <div className="p-6 bg-white/5 rounded-lg animate-pulse">
        <div className="h-5 w-3/4 bg-white/10 rounded mb-4" />
        <div className="h-4 w-full bg-white/5 rounded mb-2" />
        <div className="h-4 w-full bg-white/5 rounded" />
      </div>
    ),
  }
);



export function ProductPage({ slug, initialProduct }: ProductPageClientProps) {
  const { product } = useProductContent(slug, {
    initialProduct,
  });

  const hydratedProduct = product ?? initialProduct;
  const content = hydratedProduct.content ?? {};
  const heroSubtitle =
    content.hero?.subtitle ?? [
      "Where Innovation Meets Productivity Driven by agents Powered by automation",
      "Built for what's next",
    ];

  return (
    <div className="relative">

      {/* Hero loads immediately - critical for LCP */}
      <Suspense
        fallback={
          <div className="relative w-full overflow-hidden bg-dark pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-32">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 h-full flex flex-col justify-center">
              <div className="max-w-6xl mx-auto w-full">
                <div className="text-center mb-6 sm:mb-8 md:mb-10">
                  <div className="h-12 sm:h-16 md:h-20 w-3/4 mx-auto mb-4 bg-white/10 rounded animate-pulse" />
                  <div className="h-6 sm:h-8 w-1/2 mx-auto mb-2 bg-white/5 rounded animate-pulse" />
                  <div className="h-6 sm:h-8 w-2/3 mx-auto bg-white/5 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        }
      >
        <ProductHeroSection
          title={hydratedProduct.name}
          subtitle={heroSubtitle}
          centerIcon={content.hero?.centerIcon}
          centerIconAlt={content.hero?.centerIconAlt}
          productSlug={hydratedProduct.slug}
        />
      </Suspense>

      {/* Below-the-fold sections load progressively */}
      <LazySection minHeight="600px">
        <Suspense
          fallback={
            <div className="p-6 bg-white/5 rounded-lg animate-pulse">
              <div className="h-5 w-3/4 bg-white/10 rounded mb-4" />
              <div className="h-4 w-full bg-white/5 rounded mb-2" />
              <div className="h-4 w-full bg-white/5 rounded" />
            </div>
          }
        >
          <MissionSection
            title={content.mission?.title}
            subtitle={content.mission?.subtitle}
            cards={content.mission?.cards}
          />
        </Suspense>
      </LazySection>

      <LazySection minHeight="800px">
        <Suspense
          fallback={
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="p-6 bg-white/5 rounded-lg animate-pulse">
                  <div className="h-5 w-3/4 bg-white/10 rounded mb-4" />
                  <div className="h-4 w-full bg-white/5 rounded mb-2" />
                  <div className="h-4 w-full bg-white/5 rounded" />
                </div>
              ))}
            </div>
          }
        >
          <AutomationHubSection
            title={content.automationHub?.title}
            subtitle={content.automationHub?.subtitle}
            features={content.automationHub?.features}
          />
        </Suspense>
      </LazySection>

      <LazySection minHeight="600px">
        <Suspense
          fallback={
            <div className="w-full aspect-video bg-white/5 rounded-lg animate-pulse" />
          }
        >
          <YouTubeVideoSection
            videoId={content.youtubeVideo?.videoId ?? "oAuaVWvw0lM"}
            title={content.youtubeVideo?.title}
          />
        </Suspense>
      </LazySection>

      <LazySection minHeight="600px">
        <Suspense
          fallback={
            <div className="p-6 bg-white/5 rounded-lg animate-pulse">
              <div className="h-5 w-3/4 bg-white/10 rounded mb-4" />
              <div className="h-4 w-full bg-white/5 rounded mb-2" />
              <div className="h-4 w-full bg-white/5 rounded" />
            </div>
          }
        >
          <PerformanceSection metrics={content.performance?.metrics} />
        </Suspense>
      </LazySection>
    </div>
  );
}
