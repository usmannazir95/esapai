"use client";

import { SkeletonText } from "./";
import { cn } from "@/lib/utils";

export interface AboutHeroSkeletonProps {
  /**
   * Additional className
   */
  className?: string;
}

/**
 * About page hero skeleton.
 * Simple hero for the about page.
 */
export function AboutHeroSkeleton({ className }: AboutHeroSkeletonProps) {
  return (
    <section
      className={cn(
        "relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-dark pt-32 pb-20",
        className
      )}
      aria-label="Loading about hero..."
      role="status"
    >
      <div className="relative z-[2] container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline Skeleton */}
          <div className="mb-6">
            <SkeletonText
              lines={1}
              width="40%"
              height="4rem"
              className="mx-auto"
            />
          </div>

          {/* Sub-headline Skeleton */}
          <div className="mb-10 space-y-4">
            <SkeletonText
              lines={1}
              width="50%"
              height="2rem"
              className="mx-auto"
            />
            <SkeletonText
              lines={3}
              width={["90%", "85%", "80%"]}
              height="1.25rem"
              gap="0.75rem"
              className="mx-auto max-w-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

