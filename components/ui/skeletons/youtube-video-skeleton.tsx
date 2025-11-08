"use client";

import { Skeleton, SkeletonText } from "./";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export interface YouTubeVideoSkeletonProps {
  /**
   * Additional className
   */
  className?: string;
  /**
   * Whether to show title
   */
  showTitle?: boolean;
}

/**
 * YouTube video skeleton.
 * Matches the YouTubeVideo component structure.
 */
export function YouTubeVideoSkeleton({
  className,
  showTitle = true,
}: YouTubeVideoSkeletonProps) {
  return (
    <Section containerClassName="max-w-6xl mx-auto" className={className}>
      {/* Section Header Skeleton */}
      {showTitle && (
        <div className="mb-12 text-center">
          <SkeletonText
            lines={1}
            width="50%"
            height="3.5rem"
            className="mx-auto"
          />
        </div>
      )}

      {/* Video Frame Skeleton */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
        {/* Video Container */}
        <Skeleton
          width="100%"
          height="100%"
          rounded="rounded-lg"
          className="relative"
        />

        {/* Play Button Overlay Skeleton */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Play Button Circle */}
            <Skeleton
              width="80px"
              height="80px"
              rounded="rounded-full"
              className="opacity-80"
            />
            {/* Play Icon Triangle (simplified as a square) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Skeleton
                width="30px"
                height="30px"
                rounded
                className="opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

