"use client";

import { useCallback, useEffect, useRef } from "react";
import { useInView } from "motion/react";

type UseInViewOptions = Parameters<typeof useInView>[1];
type InViewMargin = UseInViewOptions extends { margin?: infer M } ? M : never;

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
  const isInView = useInView(ref, {
    amount: threshold,
    margin: rootMargin as InViewMargin,
  });

  /**
   * Callback-ref alternative to avoid mutating `ref.current` outside this hook.
   * Useful with strict immutability lint rules.
   */
  const setRef = useCallback((node: HTMLElement | null) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    if (isInView) {
      onVisible?.();
    } else {
      onHidden?.();
    }
  }, [isInView, onVisible, onHidden]);

  return { ref, setRef, isInView };
}

