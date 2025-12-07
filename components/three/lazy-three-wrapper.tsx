"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { getPerformanceTier } from "@/lib/utils/performance-utils";

interface LazyThreeWrapperProps {
  children: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
  threshold?: number; // Intersection observer threshold
  rootMargin?: string; // Intersection observer root margin
}

/**
 * Wrapper for heavy Three.js components that:
 * 1. Only loads when in viewport (Intersection Observer)
 * 2. Shows a loading state while chunks are fetching
 * 3. Handles hydration issues
 */
export function LazyThreeWrapper({
  children,
  className,
  fallback,
  threshold = 0.1,
  rootMargin = "100px", // Start loading 100px before it enters viewport
}: LazyThreeWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const isInView = useInView(ref, { once: true, margin: rootMargin });

  useEffect(() => {
    if (isInView) {
      setShouldLoad(true);
    }
  }, [isInView]);

  const DefaultFallback = () => {
    const tier = getPerformanceTier();
    // Show simpler fallback for low-end devices
    if (tier === "low") {
      return (
        <div 
          className="flex h-full w-full items-center justify-center bg-black/5"
          style={{ minHeight: '400px' }} // Prevent layout shift
        />
      );
    }
    
    return (
      <div 
        className="flex h-full w-full items-center justify-center bg-black/5"
        style={{ minHeight: '400px' }} // Prevent layout shift
      >
        <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
      </div>
    );
  };

  return (
    <div ref={ref} className={cn("relative h-full w-full", className)}>
      {shouldLoad ? (
        <Suspense fallback={fallback || <DefaultFallback />}>
          {children}
        </Suspense>
      ) : (
        fallback || <DefaultFallback />
      )}
    </div>
  );
}
