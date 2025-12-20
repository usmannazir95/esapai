"use client";

import dynamic from "next/dynamic";
import type { Product } from "@/lib/products";
import { useProductContent } from "@/lib/hooks/use-product-content";
import { CardSkeleton } from "@/components/ui/skeletons";
import { LazySection } from "@/components/ui/lazy-section";

const ProductHeroSection = dynamic(
  () =>
    import("@/components/sections/hero/product-hero").then((mod) => ({
      default: mod.ProductHero,
    })),
);

const MissionSection = dynamic(
  () =>
    import("@/components/sections/about/mission").then((mod) => ({
      default: mod.Mission,
    })),
);

const AutomationHubSection = dynamic(
  () =>
    import("@/components/sections/features/product/automation-hub").then(
      (mod) => ({
        default: mod.AutomationHub,
      }),
    ),
);

const YouTubeVideoSection = dynamic(
  () =>
    import("@/components/sections/shared/youtube-video").then((mod) => ({
      default: mod.YouTubeVideo,
    })),
);

const PerformanceSection = dynamic(
  () =>
    import("@/components/sections/features/product/performance-section").then(
      (mod) => ({
        default: mod.PerformanceSection,
      }),
    ),
);


interface ProductPageClientProps {
  slug: string;
  initialProduct: Product;
}

export function ProductPage({ slug, initialProduct }: ProductPageClientProps) {
  const { product, loading, isFetching, error } = useProductContent(slug, {
    initialProduct,
  });

  if (loading && !product) {
    return (
      <div className="flex flex-col gap-8 p-6">
        <div className="space-y-4">
          <div className="h-8 w-1/3 rounded-full bg-white/10" />
          <div className="h-24 w-full rounded-3xl bg-white/5" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton key={index} lines={3} />
          ))}
        </div>
      </div>
    );
  }

  if (error && !product) {
    return <ErrorState message={error} />;
  }

  const hydratedProduct = product ?? initialProduct;
  const content = hydratedProduct.content ?? {};
  const heroSubtitle =
    content.hero?.subtitle ?? [
      "Where Innovation Meets Productivity Driven by agents Powered by automation",
      "Built for what's next",
    ];

  return (
    <div className="relative" aria-busy={isFetching}>
      {isFetching && (
        <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center">
          <span className="mt-4 rounded-full bg-dark px-4 py-1 text-xs uppercase tracking-wide text-light-gray-90 animate-pulse-slow">
            Updating content…
          </span>
        </div>
      )}

      {/* Hero loads immediately - critical for LCP */}
      <ProductHeroSection
        title={hydratedProduct.name}
        subtitle={heroSubtitle}
        centerIcon={content.hero?.centerIcon}
        centerIconAlt={content.hero?.centerIconAlt}
        productSlug={hydratedProduct.slug}
      />

      {/* Below-the-fold sections load progressively */}
      <LazySection minHeight="600px">
        <MissionSection
          title={content.mission?.title}
          subtitle={content.mission?.subtitle}
          cards={content.mission?.cards}
        />
      </LazySection>

      <LazySection minHeight="800px">
        <AutomationHubSection
          title={content.automationHub?.title}
          subtitle={content.automationHub?.subtitle}
          features={content.automationHub?.features}
        />
      </LazySection>

      <LazySection minHeight="600px">
        <YouTubeVideoSection
          videoId={content.youtubeVideo?.videoId ?? "ED2H_y6dmC8"}
          title={content.youtubeVideo?.title}
        />
      </LazySection>

      <LazySection minHeight="600px">
        <PerformanceSection metrics={content.performance?.metrics} />
      </LazySection>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-white/60">
        Unable to load product
      </p>
      <p className="text-lg text-white/70">{message}</p>
    </section>
  );
}



