"use client";

import { BaseSkeleton } from "./base-skeleton";

interface CardSkeletonProps {
  lines?: number;
  withBadge?: boolean;
}

export function CardSkeleton({ lines = 3, withBadge = false }: CardSkeletonProps) {
  return (
    <div className="skeleton-surface p-6 flex flex-col gap-4">
      {withBadge && <BaseSkeleton className="h-3 w-24 rounded-full" />}
      <BaseSkeleton className="h-5 w-3/4 rounded-full" />
      {Array.from({ length: lines }).map((_, index) => (
        <BaseSkeleton key={index} className="h-4 w-full rounded-full opacity-70" />
      ))}
    </div>
  );
}


