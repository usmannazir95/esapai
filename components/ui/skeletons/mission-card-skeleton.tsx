"use client";

import { SkeletonText, SkeletonImage } from "./";
import { cn } from "@/lib/utils";

export interface MissionCardSkeletonProps {
  /**
   * Additional className
   */
  className?: string;
}

/**
 * Mission card skeleton.
 * Used in Mission sections (3-column grid).
 * Matches the MissionCard component structure.
 */
export function MissionCardSkeleton({ className }: MissionCardSkeletonProps) {
  return (
    <div
      className={cn(
        "mission-card relative overflow-hidden p-8 h-full flex flex-col",
        className
      )}
      aria-label="Loading mission card..."
      role="status"
    >
      {/* Title Skeleton */}
      <div className="mb-4">
        <SkeletonText lines={1} width="70%" height="2rem" />
      </div>

      {/* Description Skeleton */}
      <div className="mb-6 flex-1">
        <SkeletonText lines={4} width={["100%", "95%", "90%", "85%"]} height="1.25rem" gap="0.5rem" />
      </div>

      {/* Mission Graphic Skeleton */}
      <div className="relative w-full h-48 flex items-center justify-center">
        <SkeletonImage width={180} height={180} rounded />
      </div>
    </div>
  );
}

