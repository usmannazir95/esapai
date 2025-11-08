"use client";

import { Skeleton, SkeletonText } from "./";
import { cn } from "@/lib/utils";

export interface PerformanceMetricsSkeletonProps {
  /**
   * Additional className
   */
  className?: string;
  /**
   * Number of metrics to show
   */
  count?: number;
}

/**
 * Performance metrics skeleton.
 * Shows metric cards with large numbers and labels.
 */
export function PerformanceMetricsSkeleton({
  className,
  count = 3,
}: PerformanceMetricsSkeletonProps) {
  return (
    <section
      className={cn(
        "relative z-20 py-10 lg:py-40 max-w-7xl mx-auto bg-dark",
        className
      )}
      aria-label="Loading performance metrics..."
      role="status"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 px-4">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="product-card p-8 rounded-[32px] text-center"
          >
            {/* Large Number Skeleton */}
            <div className="mb-4">
              <Skeleton
                width="120px"
                height="4rem"
                rounded
                className="mx-auto"
              />
            </div>
            {/* Label Skeleton */}
            <div>
              <SkeletonText
                lines={1}
                width="80%"
                height="1.5rem"
                className="mx-auto"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

