"use client";

import { useProductContent } from "@/lib/hooks/use-product-content";
import type { ProductPageClientProps } from "@/types/page";

import { ProductHero } from "@/components/features/products/hero/product-hero";
import { Mission as MissionSection } from "@/components/features/about/sections/mission";
import { AutomationHub as AutomationHubSection } from "@/components/features/products/sections/automation-hub";
import YouTubeVideoSection from "@/components/shared/youtube-video";
import { PerformanceSection } from "@/components/features/products/sections/performance-section";

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
      <ProductHero
        title={hydratedProduct.name}
        subtitle={heroSubtitle}
        centerIcon={content.hero?.centerIcon}
        centerIconAlt={content.hero?.centerIconAlt}
        productSlug={hydratedProduct.slug}
      />

      {/* Below-the-fold sections */}
      <div className="min-h-[600px]">
        <MissionSection
          title={content.mission?.title}
          subtitle={content.mission?.subtitle}
          cards={content.mission?.cards}
        />
      </div>

      <div className="min-h-[800px]">
        <AutomationHubSection
          title={content.automationHub?.title}
          subtitle={content.automationHub?.subtitle}
          features={content.automationHub?.features}
        />
      </div>

      <div className="min-h-[600px]">
        <YouTubeVideoSection
          videoId={content.youtubeVideo?.videoId ?? "oAuaVWvw0lM"}
          title={content.youtubeVideo?.title}
        />
      </div>

      <div className="min-h-[600px]">
        <PerformanceSection metrics={content.performance?.metrics} />
      </div>
    </div>
  );
}
