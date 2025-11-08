import {
  ServiceHeroSkeleton,
  ServiceFeaturesSkeleton,
  RepetitiveWorkSkeleton,
  YouTubeVideoSkeleton,
} from "@/components/ui/skeletons";

/**
 * Loading state for service detail pages.
 * Shows skeletons matching the ServicePage structure.
 */
export default function ServicePageLoading() {
  return (
    <main className="relative">
      <ServiceHeroSkeleton />
      <ServiceFeaturesSkeleton count={5} />
      <RepetitiveWorkSkeleton />
      <YouTubeVideoSkeleton />
    </main>
  );
}

