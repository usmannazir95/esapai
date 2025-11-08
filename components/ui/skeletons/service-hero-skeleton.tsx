"use client";

import { Skeleton, SkeletonText } from "./";
import { cn } from "@/lib/utils";

export interface ServiceHeroSkeletonProps {
  /**
   * Additional className
   */
  className?: string;
}

/**
 * Service hero section skeleton.
 * Matches the ServiceHero component structure.
 */
export function ServiceHeroSkeleton({ className }: ServiceHeroSkeletonProps) {
  return (
    <section
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden bg-dark",
        className
      )}
      aria-label="Loading service hero..."
      role="status"
    >
      {/* Frame SVG Skeleton */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none opacity-20">
        <Skeleton width="300px" height="300px" rounded />
      </div>

      <div className="relative z-[2] container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Headline Skeleton */}
          <div className="mb-6">
            <SkeletonText
              lines={1}
              width="60%"
              height="4rem"
              className="mx-auto"
            />
          </div>

          {/* Sub-headline Skeleton */}
          <div className="mb-10 space-y-2">
            <SkeletonText
              lines={2}
              width={["70%", "65%"]}
              height="1.75rem"
              gap="0.5rem"
              className="mx-auto"
            />
          </div>

          {/* CTA Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Skeleton
              width="180px"
              height="56px"
              rounded="rounded-[40px]"
            />
            <Skeleton
              width="180px"
              height="56px"
              rounded="rounded-[40px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

