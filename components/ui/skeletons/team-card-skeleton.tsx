"use client";

import { Skeleton, SkeletonText, SkeletonImage } from "./";
import { cn } from "@/lib/utils";

export interface TeamCardSkeletonProps {
  /**
   * Additional className
   */
  className?: string;
  /**
   * Whether this is a large card (for featured team member)
   */
  isLarge?: boolean;
}

/**
 * Team member card skeleton.
 * Matches the TeamCard component structure with circular avatar.
 */
export function TeamCardSkeleton({
  className,
  isLarge = false,
}: TeamCardSkeletonProps) {
  return (
    <div
      className={cn(
        "relative group",
        isLarge ? "w-full max-w-md" : "flex-1 max-w-sm",
        className
      )}
      aria-label="Loading team member..."
      role="status"
    >
      <div className="relative team-card overflow-hidden rounded-[32px] p-6 md:p-8 h-full">
        {/* Image Container Skeleton */}
        <div className="relative mb-6 flex items-center justify-center py-4">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            {/* Glow Halo Skeleton */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <SkeletonImage
                width={160}
                height={160}
                rounded="rounded-full"
                className="opacity-30"
              />
            </div>

            {/* Profile Image Skeleton */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white-opacity-20 z-10">
              <SkeletonImage
                width={160}
                height={160}
                rounded="rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Role Tag Skeleton */}
        <div className="mb-3 flex justify-center">
          <Skeleton
            width="120px"
            height="32px"
            rounded="rounded-full"
          />
        </div>

        {/* Name Skeleton */}
        <div className="mb-4 text-center">
          <SkeletonText
            lines={1}
            width="60%"
            height="2rem"
            className="mx-auto"
          />
        </div>

        {/* Description Skeleton */}
        <div className="text-center">
          <SkeletonText
            lines={3}
            width={["90%", "85%", "80%"]}
            height="1.25rem"
            gap="0.5rem"
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
}

