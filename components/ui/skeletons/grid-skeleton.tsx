"use client";

import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";
import { ComponentType } from "react";

export interface GridSkeletonProps {
  /**
   * Number of columns on mobile/tablet/desktop
   */
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  /**
   * Number of items to render
   */
  items?: number;
  /**
   * Custom skeleton component to use for each item
   */
  itemComponent?: ComponentType<{ className?: string }>;
  /**
   * Gap between items
   */
  gap?: string;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * Generic grid skeleton component.
 * Flexible grid layout for any type of skeleton cards.
 */
export function GridSkeleton({
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  items = 6,
  itemComponent: ItemComponent,
  gap = "1.5rem",
  className,
}: GridSkeletonProps) {
  const mobileCols = columns.mobile || 1;
  const tabletCols = columns.tablet || 2;
  const desktopCols = columns.desktop || 3;

  // Map column numbers to Tailwind classes
  const colClasses: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };

  const gridClasses = cn(
    "grid",
    colClasses[mobileCols] || "grid-cols-1",
    tabletCols && colClasses[tabletCols] ? `md:${colClasses[tabletCols]}` : "",
    desktopCols && colClasses[desktopCols] ? `lg:${colClasses[desktopCols]}` : "",
    className
  );

  return (
    <div
      className={gridClasses}
      style={{ gap }}
      aria-label="Loading grid..."
      role="status"
    >
      {Array.from({ length: items }).map((_, index) => (
        <div key={index}>
          {ItemComponent ? (
            <ItemComponent />
          ) : (
            <Skeleton width="100%" height="300px" rounded="rounded-[32px]" />
          )}
        </div>
      ))}
    </div>
  );
}

