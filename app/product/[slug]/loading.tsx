import {
  ProductHeroSkeleton,
  MissionCardSkeleton,
  AutomationHubSkeleton,
  SectionSkeleton,
  PerformanceMetricsSkeleton,
} from "@/components/ui/skeletons";

/**
 * Loading state for product detail pages.
 * Shows skeletons matching the ProductPage structure.
 */
export default function ProductPageLoading() {
  return (
    <main className="relative">
      <ProductHeroSkeleton />
      <SectionSkeleton
        showHeader={true}
        contentItems={3}
        className="py-10 lg:py-20"
      />
      <AutomationHubSkeleton />
      <SectionSkeleton
        showHeader={true}
        contentItems={4}
        className="py-10 lg:py-20"
      />
      <SectionSkeleton
        showHeader={false}
        contentItems={1}
        className="py-10 lg:py-20"
      />
      <PerformanceMetricsSkeleton />
    </main>
  );
}

