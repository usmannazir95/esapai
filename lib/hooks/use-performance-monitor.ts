"use client";

import { useEffect, useRef, useState } from "react";
import { getPerformanceTier, type PerformanceTier } from "@/lib/utils/performance-utils";

/**
 * Hook to monitor frame rate and detect performance degradation
 */
export function usePerformanceMonitor(options: {
  sampleSize?: number;
  threshold?: number;
  onDegrade?: (tier: PerformanceTier) => void;
} = {}) {
  const { sampleSize = 60, threshold = 45, onDegrade } = options;
  const [fps, setFps] = useState<number>(60);
  const [tier, setTier] = useState<PerformanceTier>(getPerformanceTier());
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const fpsHistoryRef = useRef<number[]>([]);
  const rafRef = useRef<number>();

  useEffect(() => {
    const measureFPS = () => {
      frameCountRef.current++;
      const now = performance.now();
      const elapsed = now - lastTimeRef.current;

      if (elapsed >= 1000) {
        const currentFPS = Math.round((frameCountRef.current * 1000) / elapsed);
        setFps(currentFPS);

        // Track FPS history
        fpsHistoryRef.current.push(currentFPS);
        if (fpsHistoryRef.current.length > sampleSize) {
          fpsHistoryRef.current.shift();
        }

        // Calculate average FPS
        const avgFPS =
          fpsHistoryRef.current.reduce((a, b) => a + b, 0) /
          fpsHistoryRef.current.length;

        // Detect performance degradation
        if (avgFPS < threshold && tier !== "low") {
          const newTier: PerformanceTier = avgFPS < 30 ? "low" : "medium";
          setTier(newTier);
          onDegrade?.(newTier);
        }

        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      rafRef.current = requestAnimationFrame(measureFPS);
    };

    rafRef.current = requestAnimationFrame(measureFPS);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [sampleSize, threshold, tier, onDegrade]);

  return { fps, tier };
}

