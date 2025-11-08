"use client";

import { Skeleton, SkeletonText, SkeletonImage } from "./";
import { cn } from "@/lib/utils";

export interface ProductHeroSkeletonProps {
  /**
   * Additional className
   */
  className?: string;
}

/**
 * Product hero section skeleton.
 * Matches the ProductHero component structure with icon and decorative elements.
 */
export function ProductHeroSkeleton({ className }: ProductHeroSkeletonProps) {
  return (
    <section
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden bg-dark",
        className
      )}
      aria-label="Loading product hero..."
      role="status"
    >
      {/* Top Light Background Skeleton */}
      <div className="absolute top-0 left-0 right-0 z-[1] h-1/3">
        <Skeleton width="100%" height="100%" className="opacity-20" />
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
          <div className="mb-4 space-y-2">
            <SkeletonText
              lines={2}
              width={["70%", "65%"]}
              height="1.75rem"
              gap="0.5rem"
              className="mx-auto"
            />
          </div>

          {/* CTA Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
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

          {/* Central Icon and Decorative Elements Skeleton */}
          <div className="relative mt-0 h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center">
            {/* Watermark Background Skeleton */}
            <div className="absolute left-1/2 -translate-x-1/2 w-screen h-full z-0 flex items-center justify-center overflow-hidden opacity-20">
              <Skeleton width="100%" height="100%" />
            </div>

            {/* Left Side Elements Skeleton */}
            <div className="absolute left-[6%] top-[15%] z-[2]">
              <SkeletonImage width={80} height={80} rounded />
            </div>
            <div className="absolute left-[6%] top-[30%] z-[2]">
              <SkeletonImage width={96} height={96} rounded />
            </div>
            <div className="absolute left-[6%] top-[55%] z-[2]">
              <SkeletonImage width={64} height={64} rounded />
            </div>
            <div className="absolute left-[6%] top-[75%] z-[2]">
              <SkeletonImage width={112} height={112} rounded />
            </div>

            {/* Right Side Elements Skeleton */}
            <div className="absolute right-[6%] top-[15%] z-[2]">
              <SkeletonImage width={112} height={112} rounded />
            </div>
            <div className="absolute right-[6%] top-[30%] z-[2]">
              <SkeletonImage width={80} height={80} rounded />
            </div>
            <div className="absolute right-[6%] top-[55%] z-[2]">
              <SkeletonImage width={128} height={128} rounded />
            </div>
            <div className="absolute right-[6%] top-[75%] z-[2]">
              <SkeletonImage width={96} height={96} rounded />
            </div>

            {/* Central Product Icon Skeleton */}
            <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[3]">
              <SkeletonImage
                width={320}
                height={320}
                rounded
                className="md:w-64 md:h-64 lg:w-80 lg:h-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

