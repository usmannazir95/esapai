"use client";

import { cn } from "@/lib/utils";

interface BaseSkeletonProps {
  className?: string;
  animated?: boolean;
}

export function BaseSkeleton({ className, animated = true }: BaseSkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "skeleton-surface bg-white/5",
        animated && "skeleton-animated",
        className,
      )}
    />
  );
}


