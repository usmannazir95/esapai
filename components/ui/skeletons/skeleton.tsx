"use client";

import { cn } from "@/lib/utils";

export interface SkeletonProps {
  /**
   * Width of the skeleton
   */
  width?: string | number;
  /**
   * Height of the skeleton
   */
  height?: string | number;
  /**
   * Additional className
   */
  className?: string;
  /**
   * Whether to apply rounded corners
   */
  rounded?: boolean | string;
}

/**
 * Base skeleton component with pulse animation.
 * Used as the foundation for all other skeleton components.
 */
export function Skeleton({
  width,
  height,
  className,
  rounded = false,
}: SkeletonProps) {
  const widthStyle = typeof width === "number" ? `${width}px` : width;
  const heightStyle = typeof height === "number" ? `${height}px` : height;
  
  const roundedClass = typeof rounded === "boolean" 
    ? (rounded ? "rounded-lg" : "")
    : rounded;

  return (
    <div
      className={cn(
        "animate-pulse bg-white-opacity-10",
        roundedClass,
        className
      )}
      style={{
        width: widthStyle,
        height: heightStyle,
      }}
      aria-label="Loading..."
      role="status"
    />
  );
}

