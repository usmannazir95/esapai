"use client";

import { Skeleton, SkeletonText, SkeletonImage } from "./";
import { cn } from "@/lib/utils";

export interface FeatureCardSkeletonProps {
  /**
   * Additional className
   */
  className?: string;
  /**
   * Whether to show image/icon
   */
  showImage?: boolean;
}

/**
 * Feature card skeleton.
 * Used for feature cards in various sections.
 */
export function FeatureCardSkeleton({
  className,
  showImage = true,
}: FeatureCardSkeletonProps) {
  return (
    <div
      className={cn("relative overflow-hidden p-8 h-full flex flex-col", className)}
      aria-label="Loading feature card..."
      role="status"
    >
      {/* Feature Image/Icon Skeleton */}
      {showImage && (
        <div className="relative w-full h-64 flex items-center justify-center mb-6">
          <SkeletonImage width={220} height={220} rounded />
        </div>
      )}

      {/* Card Title Skeleton */}
      <div className="mb-4">
        <SkeletonText lines={1} width="80%" height="1.75rem" />
      </div>

      {/* Card Description Skeleton */}
      <div>
        <SkeletonText lines={2} width={["100%", "95%"]} height="1.25rem" gap="0.5rem" />
      </div>
    </div>
  );
}

