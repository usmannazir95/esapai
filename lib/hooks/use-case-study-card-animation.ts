"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

/**
 * Hook to create a shared IntersectionObserver for all case study cards
 * This is more efficient than creating one observer per card and prevents memory leaks
 */
export function useSharedCardObserver<T extends HTMLElement = HTMLElement>(
  containerRef: React.RefObject<T | null>,
  enabled: boolean
) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const animatedCardsRef = useRef<Set<HTMLElement>>(new Set());

  useEffect(() => {
    if (!enabled || !containerRef.current || prefersReducedMotion()) {
      return;
    }

    const container = containerRef.current;
    const cards = container.querySelectorAll<HTMLElement>("article");

    // Create shared observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !animatedCardsRef.current.has(entry.target as HTMLElement)
          ) {
            const card = entry.target as HTMLElement;
            animatedCardsRef.current.add(card);

            const image = card.querySelector<HTMLElement>(".case-study-image");
            const title = card.querySelector<HTMLElement>("h2");
            const excerpt = card.querySelector<HTMLElement>("p");
            const tags = card.querySelectorAll<HTMLElement>(".case-study-tag");
            const button = card.querySelector<HTMLElement>(".case-study-button");

            const tl = gsap.timeline();

            // Image reveal with scale
            if (image) {
              tl.to(
                image,
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power2.out",
                },
                0
              );
            }

            // Title fade in
            if (title) {
              tl.to(
                title,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  ease: "power2.out",
                },
                "-=0.5"
              );
            }

            // Tags stagger
            if (tags.length > 0) {
              tl.to(
                tags,
                {
                  opacity: 1,
                  scale: 1,
                  duration: 0.5,
                  stagger: 0.1,
                  ease: "back.out(1.2)",
                },
                "-=0.4"
              );
            }

            // Excerpt fade in
            if (excerpt) {
              tl.to(
                excerpt,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out",
                },
                "-=0.3"
              );
            }

            // Button scale in
            if (button) {
              tl.to(
                button,
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.5,
                  ease: "back.out(1.4)",
                },
                "-=0.2"
              );
            }

            observerRef.current?.unobserve(card);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    // Set initial states and observe all cards
    cards.forEach((card) => {
      const image = card.querySelector<HTMLElement>(".case-study-image");
      const title = card.querySelector<HTMLElement>("h2");
      const excerpt = card.querySelector<HTMLElement>("p");
      const tags = card.querySelectorAll<HTMLElement>(".case-study-tag");
      const button = card.querySelector<HTMLElement>(".case-study-button");

      // Set initial states
      const elementsToAnimate: HTMLElement[] = [];
      if (image) elementsToAnimate.push(image);
      if (title) elementsToAnimate.push(title);
      if (excerpt) elementsToAnimate.push(excerpt);
      if (button) elementsToAnimate.push(button);

      if (elementsToAnimate.length > 0) {
        gsap.set(elementsToAnimate, { opacity: 0 });
      }
      if (image) {
        gsap.set(image, { scale: 1.1, y: 20 });
      }
      if (title) {
        gsap.set(title, { y: 20 });
      }
      if (excerpt) {
        gsap.set(excerpt, { y: 15 });
      }
      if (button) {
        gsap.set(button, { y: 10, scale: 0.95 });
      }
      if (tags.length > 0) {
        gsap.set(tags, { opacity: 0, scale: 0.8 });
      }

      observerRef.current?.observe(card);
    });

    // Cleanup function
    return () => {
      if (observerRef.current) {
        cards.forEach((card) => {
          observerRef.current?.unobserve(card);
        });
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      animatedCardsRef.current.clear();
    };
  }, [containerRef, enabled]);
}
