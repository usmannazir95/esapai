"use client";

import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";

export interface SkeletonImageProps {
  /**
   * Width of the image skeleton
   */
  width?: string | number;
  /**
   * Height of the image skeleton
   */
  height?: string | number;
  /**
   * Whether to apply rounded corners
   */
  rounded?: boolean | string;
  /**
   * Additional className
   */
  className?: string;
  /**
   * Aspect ratio (e.g., "16/9", "1/1", "4/3")
   */
  aspectRatio?: string;
}

/**
 * Image/icon placeholder component.
 * Used for product icons, team avatars, feature images, etc.
 */
export function SkeletonImage({
  width,
  height,
  rounded = true,
  className,
  aspectRatio,
}: SkeletonImageProps) {
  const roundedClass = typeof rounded === "boolean"
    ? (rounded ? "rounded-lg" : "")
    : rounded;

  // Handle aspect ratio
  let finalWidth = width;
  let finalHeight = height;
  let aspectRatioClass = "";

  if (aspectRatio && !width && !height) {
    aspectRatioClass = `aspect-[${aspectRatio.replace("/", "_")}]`;
    finalWidth = "100%";
  }

  return (
    <div
      className={cn("flex-shrink-0", aspectRatioClass, className)}
      style={aspectRatio && !width && !height ? { width: "100%" } : undefined}
    >
      <Skeleton
        width={finalWidth}
        height={finalHeight}
        rounded={roundedClass}
        className="w-full h-full"
        aria-label="Loading image..."
        role="status"
      />
    </div>
  );
}

