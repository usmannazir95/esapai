"use client";

import { Skeleton, SkeletonText } from "./";
import { cn } from "@/lib/utils";

export interface SectionSkeletonProps {
  /**
   * Additional className
   */
  className?: string;
  /**
   * Whether to show section header
   */
  showHeader?: boolean;
  /**
   * Number of content items to show
   */
  contentItems?: number;
}

/**
 * Generic section skeleton.
 * Used for sections with header and content area.
 */
export function SectionSkeleton({
  className,
  showHeader = true,
  contentItems = 3,
}: SectionSkeletonProps) {
  return (
    <section
      className={cn("relative z-20 py-10 lg:py-40 max-w-7xl mx-auto bg-dark", className)}
      aria-label="Loading section..."
      role="status"
    >
      {/* Section Header Skeleton */}
      {showHeader && (
        <div className="px-8 mb-16">
          <div className="mb-4">
            <SkeletonText
              lines={1}
              width="50%"
              height="3rem"
              className="mx-auto"
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
      )}

      {/* Content Area Skeleton */}
      <div className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {Array.from({ length: contentItems }).map((_, index) => (
            <div key={index} className="h-64">
              <Skeleton width="100%" height="100%" rounded="rounded-[32px]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

