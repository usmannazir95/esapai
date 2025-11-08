"use client";

import { FeatureCardSkeleton } from "./feature-card-skeleton";
import { SectionSkeleton } from "./section-skeleton";
import { cn } from "@/lib/utils";

export interface ServiceFeaturesSkeletonProps {
  /**
   * Additional className
   */
  className?: string;
  /**
   * Number of features to show
   */
  count?: number;
}

/**
 * Service features skeleton.
 * Grid of feature cards for service pages.
 */
export function ServiceFeaturesSkeleton({
  className,
  count = 5,
}: ServiceFeaturesSkeletonProps) {
  return (
    <section
      className={cn("relative z-20 py-10 lg:py-40 max-w-7xl mx-auto bg-dark", className)}
      aria-label="Loading service features..."
      role="status"
    >
      {/* Section Header Skeleton */}
      <div className="px-8 mb-16">
        <div className="mb-4">
          <Skeleton
            width="500px"
            height="3rem"
            className="mx-auto"
            rounded
          />
        </div>
        <div className="max-w-2xl mx-auto">
          <SkeletonText
            lines={2}
            width={["90%", "85%"]}
            height="1.25rem"
            gap="0.5rem"
            className="mx-auto"
          />
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4">
        {Array.from({ length: count }).map((_, index) => (
          <FeatureCardSkeleton key={index} showImage={false} />
        ))}
      </div>
    </section>
  );
}

