"use client";

import { useEffect, useRef } from "react";
import { useInView } from "motion/react";

/**
 * Hook to pause/resume animations based on viewport visibility
 * Useful for continuous animations (GSAP loops, Three.js scenes)
 */
export function useIntersectionAnimation(options: {
  threshold?: number;
  rootMargin?: string;
  onVisible?: () => void;
  onHidden?: () => void;
} = {}) {
  const { threshold = 0.1, rootMargin = "0px", onVisible, onHidden } = options;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { threshold, margin: rootMargin });

  useEffect(() => {
    if (isInView) {
      onVisible?.();
    } else {
      onHidden?.();
    }
  }, [isInView, onVisible, onHidden]);

  return { ref, isInView };
}

