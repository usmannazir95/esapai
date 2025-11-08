"use client";

import { Skeleton, SkeletonText } from "./";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export interface RepetitiveWorkSkeletonProps {
  /**
   * Additional className
   */
  className?: string;
}

/**
 * RepetitiveWork section skeleton.
 * Matches the RepetitiveWork component structure.
 */
export function RepetitiveWorkSkeleton({
  className,
}: RepetitiveWorkSkeletonProps) {
  return (
    <Section className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text Content Skeleton */}
        <div className="space-y-6">
          <div>
            <SkeletonText
              lines={4}
              width={["90%", "85%", "80%", "75%"]}
              height="3rem"
              gap="1rem"
            />
          </div>
        </div>

        {/* Right Side - Target Graphic Skeleton */}
        <div className="flex items-center justify-center">
          <Skeleton
            width="400px"
            height="400px"
            rounded="rounded-full"
            className="max-w-full"
          />
        </div>
      </div>
    </Section>
  );
}

