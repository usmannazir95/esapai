"use client";

import { Skeleton, SkeletonText, SkeletonImage } from "./";
import { cn } from "@/lib/utils";

export interface ServiceCardSkeletonProps {
  /**
   * Additional className
   */
  className?: string;
}

/**
 * Service card skeleton.
 * Matches the SpotlightCard structure used in /service page.
 */
export function ServiceCardSkeleton({ className }: ServiceCardSkeletonProps) {
  return (
    <div
      className={cn(
        "product-card relative overflow-hidden rounded-[32px] p-6 md:p-8 h-full flex flex-col",
        className
      )}
      aria-label="Loading service card..."
      role="status"
    >
      {/* Service Icon Skeleton */}
      <div className="relative w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center">
        <SkeletonImage width={80} height={80} rounded />
      </div>

      {/* Service Name Skeleton */}
      <div className="mb-4">
        <SkeletonText lines={1} width="75%" height="2rem" />
      </div>

      {/* Service Description Skeleton */}
      <div className="mb-6 flex-1">
        <SkeletonText lines={3} width={["100%", "95%", "90%"]} height="1.25rem" gap="0.5rem" />
      </div>

      {/* CTA Link Skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton width="100px" height="20px" rounded />
        <Skeleton width="20px" height="20px" rounded="rounded-full" />
      </div>
    </div>
  );
}

