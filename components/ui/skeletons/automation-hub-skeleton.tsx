"use client";

import { FeatureCardSkeleton } from "./feature-card-skeleton";
import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";

export interface AutomationHubSkeletonProps {
  /**
   * Additional className
   */
  className?: string;
}

/**
 * Automation Hub skeleton.
 * 4-column feature grid matching the AutomationHub component.
 */
export function AutomationHubSkeleton({ className }: AutomationHubSkeletonProps) {
  return (
    <section
      className={cn("relative z-20 py-10 lg:py-40 max-w-7xl mx-auto bg-dark", className)}
      aria-label="Loading automation hub..."
      role="status"
    >
      {/* Subtle background gradient skeleton */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white-opacity-10 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* Section Header Skeleton */}
      <div className="px-8 mb-16">
        <div className="mb-4">
          <Skeleton
            width="400px"
            height="3rem"
            className="mx-auto"
            rounded
          />
        </div>
        <div className="max-w-5xl mx-auto">
          <Skeleton
            width="80%"
            height="1.5rem"
            className="mx-auto mb-2"
            rounded
          />
          <Skeleton
            width="70%"
            height="1.5rem"
            className="mx-auto"
            rounded
          />
        </div>
      </div>

      {/* Feature Cards Grid - 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 px-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <FeatureCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

