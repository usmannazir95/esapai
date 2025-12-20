"use client";

import React, { useCallback, useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { TeamCard, type TeamMember } from "@/components/ui/team-card";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import type { TeamProps } from "@/types/props";

export type { TeamMember };

const defaultTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Baker Abukhater",
    role: "Founder",
    description:
      "Meet Baker Abukhater, the visionary and dynamic Founder of ESAP AI.",
    image: "/founder.png",
  },
  {
    id: "2",
    name: "Sarah Mitchell",
    role: "Chief Executive Officer",
    description:
      "Sarah champions our strategic direction, partnerships, and long-term growth initiatives.",
    image: "/founder.png",
  },
  {
    id: "3",
    name: "Liam Chen",
    role: "Chief Technology Officer",
    description:
      "Liam architects our AI-first platform and leads the engineering teams delivering intelligent automation.",
    image: "/founder.png",
  },
  {
    id: "4",
    name: "Ava Rodríguez",
    role: "Chief Operations Officer",
    description:
      "Ava ensures seamless execution across global operations and customer success programs.",
    image: "/founder.png",
  },
  {
    id: "5",
    name: "Noah Patel",
    role: "Head of Product",
    description:
      "Noah drives product strategy, translating customer insights into transformative AI experiences.",
    image: "/founder.png",
  },
  {
    id: "6",
    name: "Mia Thompson",
    role: "Lead AI Engineer",
    description:
      "Mia builds our voice-first agent models with a relentless focus on reliability and performance.",
    image: "/founder.png",
  },
  {
    id: "7",
    name: "Ethan Park",
    role: "Director of Customer Success",
    description:
      "Ethan partners with clients to implement AI ERP workflows that unlock measurable productivity gains.",
    image: "/founder.png",
  },
];

export function Team({ members = defaultTeamMembers }: TeamProps) {
  const topMember = members[0];
  const middleMembers = members.slice(1, 4);
  const bottomMembers = members.slice(4, 7);

  const [rippleTrigger, setRippleTrigger] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [rippleTriggerKey, setRippleTriggerKey] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const topCardRef = useRef<HTMLDivElement>(null);
  const middleCardsRef = useRef<HTMLDivElement>(null);
  const bottomCardsRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  // Intersection observer to trigger animations when in view
  const { setRef: setIntersectionRef, isInView } = useIntersectionAnimation({
    threshold: 0.1,
    rootMargin: "100px",
  });

  // Reset animation refs on mount to ensure animations play on navigation
  useEffect(() => {
    hasAnimatedRef.current = false;
  }, []);

  const handlePointerDownCapture = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      setRippleTrigger({ x: e.clientX, y: e.clientY });
      setRippleTriggerKey((k) => k + 1);
    },
    []
  );

  // Set initial states once to prevent flash (only for non-reduced motion users)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!contentRef.current) return;

      if (headerRef.current) {
        const titleElement = headerRef.current.querySelector("h2");
        const subtitleElement = headerRef.current.querySelector("p");
        if (titleElement) {
          gsap.set(titleElement, { opacity: 0, y: -20 });
        }
        if (subtitleElement) {
          gsap.set(subtitleElement, { opacity: 0, y: 10 });
        }
      }

      if (topCardRef.current) {
        gsap.set(topCardRef.current, { opacity: 0, y: 20, scale: 0.95 });
      }

      if (middleCardsRef.current) {
        const cards = middleCardsRef.current.querySelectorAll<HTMLElement>(
          '[data-gsap="team-card"]'
        );
        gsap.set(cards, { opacity: 0, y: 20 });
      }

      if (bottomCardsRef.current) {
        const cards = bottomCardsRef.current.querySelectorAll<HTMLElement>(
          '[data-gsap="team-card"]'
        );
        gsap.set(cards, { opacity: 0, y: 20 });
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

      // Animate header first
      if (headerRef.current) {
        const titleElement = headerRef.current.querySelector("h2");
        const subtitleElement = headerRef.current.querySelector("p");

        if (titleElement) {
          tl.to(titleElement, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        }

        if (subtitleElement) {
          tl.to(
            subtitleElement,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.4"
          );
        }
      }

      // Animate top card
      if (topCardRef.current) {
        tl.to(
          topCardRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }

      // Animate middle row cards with stagger
      if (middleCardsRef.current) {
        const cards = middleCardsRef.current.querySelectorAll<HTMLElement>(
          '[data-gsap="team-card"]'
        );
        tl.to(
          cards,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
          },
          "-=0.4"
        );
      }

      // Animate bottom row cards with stagger
      if (bottomCardsRef.current) {
        const cards = bottomCardsRef.current.querySelectorAll<HTMLElement>(
          '[data-gsap="team-card"]'
        );
        tl.to(
          cards,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
          },
          "-=0.3"
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

        // Animate header first
        if (headerRef.current) {
          const titleElement = headerRef.current.querySelector("h2");
          const subtitleElement = headerRef.current.querySelector("p");

          if (titleElement) {
            tl.to(titleElement, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            });
          }

          if (subtitleElement) {
            tl.to(
              subtitleElement,
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
              },
              "-=0.4"
            );
          }
        }

        // Animate top card
        if (topCardRef.current) {
          tl.to(
            topCardRef.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.3"
          );
        }

        // Animate middle row cards with stagger
        if (middleCardsRef.current) {
          const cards = middleCardsRef.current.querySelectorAll<HTMLElement>(
            '[data-gsap="team-card"]'
          );
          tl.to(
            cards,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.1,
            },
            "-=0.4"
          );
        }

        // Animate bottom row cards with stagger
        if (bottomCardsRef.current) {
          const cards = bottomCardsRef.current.querySelectorAll<HTMLElement>(
            '[data-gsap="team-card"]'
          );
          tl.to(
            cards,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.1,
            },
            "-=0.3"
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

        if (headerRef.current) {
          const titleElement = headerRef.current.querySelector("h2");
          const subtitleElement = headerRef.current.querySelector("p");
          if (titleElement) {
            gsap.set(titleElement, { opacity: 1, y: 0 });
          }
          if (subtitleElement) {
            gsap.set(subtitleElement, { opacity: 1, y: 0 });
          }
        }

        if (topCardRef.current) {
          gsap.set(topCardRef.current, { opacity: 1, y: 0, scale: 1 });
        }

        if (middleCardsRef.current) {
          const cards = middleCardsRef.current.querySelectorAll<HTMLElement>(
            '[data-gsap="team-card"]'
          );
          gsap.set(cards, { opacity: 1, y: 0 });
        }

        if (bottomCardsRef.current) {
          const cards = bottomCardsRef.current.querySelectorAll<HTMLElement>(
            '[data-gsap="team-card"]'
          );
          gsap.set(cards, { opacity: 1, y: 0 });
        }
      }
    }, 500); // 500ms safety timeout

    return () => clearTimeout(safetyTimeout);
  }, []);

  return (
    <Section
      ref={(el) => {
        sectionRef.current = el;
        setIntersectionRef(el);
      }}
      padding="none"
      className="relative overflow-hidden"
      onPointerDownCapture={handlePointerDownCapture}
    >
      <div className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_82%,transparent_100%)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_82%,transparent_100%)]">
            <BackgroundRippleEffect
              interactive={false}
              mask={false}
              cellSize={56}
              triggerPoint={rippleTrigger}
              triggerKey={rippleTriggerKey}
              gridClassName="opacity-75"
              className="[--cell-border-color:rgba(19,245,132,0.20)] [--cell-fill-color:rgba(19,245,132,0.012)] [--cell-shadow-color:rgba(19,245,132,0.18)] opacity-85"
            />
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dark/75 via-dark/10 to-dark/75" />
        </div>
      </div>

      <div ref={contentRef} className="relative z-10 py-10 sm:py-12 md:py-16 lg:py-20">
        <div ref={headerRef}>
          <SectionHeader
            title="Our Team"
            subtitle="Meet the visionaries driving innovation and transforming the future of AI-powered automation."
            subtitleClassName="text-base sm:text-lg md:text-xl text-light-gray-90 max-w-3xl mx-auto px-4 mb-12 sm:mb-14 md:mb-16"
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          {topMember && (
            <div ref={topCardRef} className="flex justify-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
              <TeamCard member={topMember} isLarge />
            </div>
          )}

          <div
            ref={middleCardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-6 sm:mb-8 md:mb-10 lg:mb-12 justify-items-center"
          >
            {middleMembers.map((member) => (
              <div key={member.id} data-gsap="team-card">
                <TeamCard member={member} />
              </div>
            ))}
          </div>

          <div
            ref={bottomCardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 justify-items-center"
          >
            {bottomMembers.map((member) => (
              <div key={member.id} data-gsap="team-card">
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}



