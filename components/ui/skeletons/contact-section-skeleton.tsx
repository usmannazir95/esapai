"use client";

import { Skeleton, SkeletonText, SkeletonImage } from "./";
import { cn } from "@/lib/utils";

export interface ContactSectionSkeletonProps {
  /**
   * Additional className
   */
  className?: string;
}

/**
 * Contact section skeleton.
 * Matches the ContactSection component structure with form and social links.
 */
export function ContactSectionSkeleton({
  className,
}: ContactSectionSkeletonProps) {
  return (
    <section
      className={cn(
        "relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20",
        className
      )}
      aria-label="Loading contact section..."
      role="status"
    >
      {/* Green Gradient Background Effect Skeleton */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1200px] bg-white-opacity-10 blur-3xl rounded-full animate-pulse opacity-30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left Column - Contact Information */}
            <div className="lg:col-span-3 space-y-8">
              {/* Main Heading Skeleton */}
              <div className="space-y-4">
                <SkeletonText
                  lines={3}
                  width={["70%", "65%", "60%"]}
                  height="3rem"
                  gap="0.75rem"
                />
              </div>

              {/* Description Skeleton */}
              <div>
                <SkeletonText
                  lines={2}
                  width={["90%", "85%"]}
                  height="1.5rem"
                  gap="0.5rem"
                />
              </div>

              {/* Social Media Section Skeleton */}
              <div className="space-y-6 pt-8">
                <Skeleton width="250px" height="2rem" rounded />
                <div className="flex flex-wrap items-center gap-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      width="56px"
                      height="56px"
                      rounded="rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form Skeleton */}
            <div className="lg:col-span-2">
              <div className="relative product-card p-6 md:p-8 lg:p-10">
                <div className="space-y-6">
                  {/* Full Name Field Skeleton */}
                  <div className="space-y-2">
                    <Skeleton width="100px" height="1.25rem" rounded />
                    <Skeleton width="100%" height="48px" rounded="rounded-lg" />
                  </div>

                  {/* Email Field Skeleton */}
                  <div className="space-y-2">
                    <Skeleton width="60px" height="1.25rem" rounded />
                    <Skeleton width="100%" height="48px" rounded="rounded-lg" />
                  </div>

                  {/* Message Field Skeleton */}
                  <div className="space-y-2">
                    <Skeleton width="80px" height="1.25rem" rounded />
                    <Skeleton width="100%" height="120px" rounded="rounded-lg" />
                  </div>

                  {/* Submit Button Skeleton */}
                  <Skeleton
                    width="100%"
                    height="56px"
                    rounded="rounded-lg"
                  />

                  {/* Terms Checkbox Skeleton */}
                  <div className="flex items-start gap-3 pt-2">
                    <Skeleton width="20px" height="20px" rounded />
                    <SkeletonText
                      lines={1}
                      width="80%"
                      height="1.25rem"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

