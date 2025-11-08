"use client";

import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";

export interface SkeletonTextProps {
  /**
   * Number of text lines to render
   */
  lines?: number;
  /**
   * Width of each line (can be different for each line)
   */
  width?: string | string[];
  /**
   * Height of each line
   */
  height?: string;
  /**
   * Additional className
   */
  className?: string;
  /**
   * Spacing between lines
   */
  gap?: string;
}

/**
 * Text line placeholder component.
 * Renders multiple skeleton lines to simulate text content.
 */
export function SkeletonText({
  lines = 1,
  width = "100%",
  height = "1rem",
  className,
  gap = "0.5rem",
}: SkeletonTextProps) {
  const widthArray = Array.isArray(width) ? width : Array(lines).fill(width);
  
  // Ensure we have enough widths for all lines
  const widths = Array(lines)
    .fill(null)
    .map((_, index) => widthArray[index] || widthArray[widthArray.length - 1] || "100%");

  return (
    <div 
      className={cn("flex flex-col", className)}
      style={{ gap }}
      aria-label="Loading text..."
      role="status"
    >
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          width={widths[index]}
          height={height}
          rounded
          className="last:w-3/4" // Last line is typically shorter
        />
      ))}
    </div>
  );
}

