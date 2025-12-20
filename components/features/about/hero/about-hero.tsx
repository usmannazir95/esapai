"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Frame from "@/components/sections/shared/frame";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const hasAnimatedRef = useRef(false);

  // Intersection observer to trigger animations when in view
  const { setRef: setIntersectionRef, isInView } = useIntersectionAnimation({
    threshold: 0.15,
    rootMargin: "100px",
  });

  // Reset animation refs on mount to ensure animations play on navigation
  useEffect(() => {
    hasAnimatedRef.current = false;
  }, []);

  // Set initial states once to prevent flash (only for non-reduced motion users)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!contentRef.current) return;

      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: -20 });
      }
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 10 });
      }
      if (descriptionRef.current) {
        gsap.set(descriptionRef.current, { opacity: 0, y: 10 });
      }
    },
    { scope: sectionRef }
  );

  // Entrance animation when the section scrolls into view (plays once)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!contentRef.current) return;
      if (hasAnimatedRef.current) return;

      // If IntersectionObserver hasn't fired yet, fall back to a simple viewport check
      const rect = contentRef.current.getBoundingClientRect();
      const isCurrentlyVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isInView && !isCurrentlyVisible) return;

      hasAnimatedRef.current = true;

      const tl = gsap.timeline();

      if (titleRef.current) {
        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (subtitleRef.current) {
        tl.to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }

      if (descriptionRef.current) {
        tl.to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }
    },
    { scope: sectionRef, dependencies: [isInView] }
  );

  // Fallback: Ensure content is visible if already in viewport on mount
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!contentRef.current) return;
    if (hasAnimatedRef.current) return;

    const checkAndAnimate = () => {
      if (!contentRef.current || hasAnimatedRef.current) return;

      const rect = contentRef.current.getBoundingClientRect();
      const isCurrentlyVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isCurrentlyVisible || isInView) {
        // Trigger animation manually if element is already visible
        hasAnimatedRef.current = true;

        const tl = gsap.timeline();

        if (titleRef.current) {
          tl.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        }

        if (subtitleRef.current) {
          tl.to(
            subtitleRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.3"
          );
        }

        if (descriptionRef.current) {
          tl.to(
            descriptionRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.2"
          );
        }
      }
    };

    // Check immediately and after a short delay to handle navigation cases
    checkAndAnimate();
    const timeoutId = setTimeout(checkAndAnimate, 100);

    return () => clearTimeout(timeoutId);
  }, [isInView]);

  // Safety fallback: Ensure content is visible after a delay if animations haven't triggered
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const safetyTimeout = setTimeout(() => {
      // If content hasn't animated yet, make it visible
      if (contentRef.current && !hasAnimatedRef.current) {
        hasAnimatedRef.current = true;
        if (titleRef.current) {
          gsap.set(titleRef.current, { opacity: 1, y: 0 });
        }
        if (subtitleRef.current) {
          gsap.set(subtitleRef.current, { opacity: 1, y: 0 });
        }
        if (descriptionRef.current) {
          gsap.set(descriptionRef.current, { opacity: 1, y: 0 });
        }
      }
    }, 500); // 500ms safety timeout

    return () => clearTimeout(safetyTimeout);
  }, []);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        setIntersectionRef(el);
      }}
      className="relative min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] lg:min-h-[65vh] flex items-center justify-center overflow-hidden bg-dark pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20"
    >
      {/* Animated Frame Background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <Frame className="w-full h-full max-w-[1200px] max-h-[1600px] object-contain" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/80" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight text-gradient-primary"
          >
            About Us
          </h1>

          <div className="mb-8 sm:mb-10 space-y-3 sm:space-y-4">
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-light-gray-90"
            >
              Where Innovation Meets Productivity
            </p>
            <p
              ref={descriptionRef}
              className="text-sm sm:text-base md:text-lg text-white-opacity-70 max-w-3xl mx-auto px-2 sm:px-4"
            >
              Driven by agents, powered by automation, built for what&apos;s next.
              We&apos;re a team of visionaries dedicated to transforming how
              businesses operate through cutting-edge AI technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}



