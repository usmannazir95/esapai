"use client";

import { Skeleton, SkeletonText } from "./";
import { cn } from "@/lib/utils";

export interface HeroSkeletonProps {
  /**
   * Additional className
   */
  className?: string;
  /**
   * Whether to show badge skeleton
   */
  showBadge?: boolean;
  /**
   * Whether to show subtitle
   */
  showSubtitle?: boolean;
  /**
   * Whether to show CTA button
   */
  showButton?: boolean;
}

/**
 * Generic hero section skeleton.
 * Used for simple hero sections without complex layouts.
 */
export function HeroSkeleton({
  className,
  showBadge = true,
  showSubtitle = true,
  showButton = true,
}: HeroSkeletonProps) {
  return (
    <section
      className={cn(
        "relative w-full min-h-[calc(100vh-120px)] flex items-center justify-center overflow-hidden bg-dark",
        className
      )}
      aria-label="Loading hero section..."
      role="status"
    >
      {/* Background gradient effect skeleton */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white-opacity-10 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center text-center max-w-5xl">
        {/* Badge Skeleton */}
        {showBadge && (
          <div className="mb-8 flex flex-col items-center gap-2">
            <Skeleton width="120px" height="24px" rounded className="mb-2" />
            <Skeleton width="300px" height="20px" rounded />
          </div>
        )}

        {/* Title Skeleton */}
        <div className="mb-6 w-full max-w-4xl mx-auto">
          <SkeletonText
            lines={2}
            width={["80%", "60%"]}
            height="3rem"
            gap="1rem"
            className="mx-auto"
          />
        </div>

        {/* Subtitle Skeleton */}
        {showSubtitle && (
          <div className="mb-10 w-full max-w-3xl mx-auto">
            <SkeletonText
              lines={2}
              width={["90%", "85%"]}
              height="1.5rem"
              gap="0.75rem"
              className="mx-auto"
            />
          </div>
        )}

        {/* CTA Button Skeleton */}
        {showButton && (
          <Skeleton
            width="200px"
            height="56px"
            rounded="rounded-[40px]"
            className="mx-auto"
          />
        )}
      </div>
    </section>
  );
}

