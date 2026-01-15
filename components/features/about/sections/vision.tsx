"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import Robot from "@/components/shared/robot";
import { VisionStatCards } from "@/components/features/about/components/vision-stat-cards";

const ConcaveFloor = dynamic(
  () => import("@/components/shared/concave-floor"),
  { ssr: false }
);


export function Vision() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const robotWrapperRef = useRef<HTMLDivElement>(null);
  const dotCircleContainerRef = useRef<HTMLDivElement>(null);
  const statCardsRef = useRef<HTMLDivElement>(null);


  const anim = useGSAPAnimations(sectionRef as React.RefObject<HTMLElement>);

  const spacerRef = useRef<HTMLDivElement>(null);

  // Curtain Reveal & Opacity Control
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Logic: Vision is fixed at z-0. Mission is z-20.
      // We want Vision to fade in as "Space" opens up (Mission scrolls away).
      // We use the spacer as the trigger.

      const spacer = spacerRef.current;
      const content = sectionRef.current;

      if (!spacer || !content) return;

      // Initial State: Hidden to prevent overlap with Mission
      gsap.set(content, { opacity: 0 });

      // Create a timeline that spans the entire passage of the spacer through the viewport
      const opacityTl = gsap.timeline({
        scrollTrigger: {
          trigger: spacer,
          start: "top bottom", // Starts when Spacer enters from bottom (Mission leaving)
          end: "bottom top",   // Ends when Spacer leaves to top (Service entering)
          scrub: true,
        }
      });

      opacityTl
        .to(content, {
          opacity: 1,
          duration: 0.15, // Fast fade in to simulate "reveal" while avoiding immediate overlap
          ease: "power1.in"
        })
        .to(content, {
          opacity: 1,
          duration: 0.7  // Stay fully visible for majority of scroll
        })
        .to(content, {
          opacity: 0,
          duration: 0.15, // Fast fade out as Service covers
          ease: "power1.out"
        });

      // Animation triggers for the internal elements (Robot, Text)
      // We want these to play when the Vision section is "active"
      const tl = anim.createTimeline({
        scrollTrigger: {
          trigger: spacer,
          start: "top center",
          end: "bottom center",
          toggleActions: "play reverse play reverse",
        }
      });

      // ... Rest of the animation definitions adapted for the new timeline logic ...
      // (Re-adding the title/subtitle/robot animations to this timeline or keeping them separate but triggered by spacer)

      const titleElement = content.querySelector("h2");
      const subtitleElement = content.querySelector("p");

      if (titleElement) gsap.set(titleElement, { opacity: 0, y: -20 });
      if (subtitleElement) gsap.set(subtitleElement, { opacity: 0, y: 10 });
      if (robotRef.current) gsap.set(robotRef.current, { opacity: 0, y: 50, scale: 0.8 });
      if (dotCircleContainerRef.current) gsap.set(dotCircleContainerRef.current, { opacity: 0, y: 30 });
      if (statCardsRef.current) gsap.set(statCardsRef.current, { opacity: 0, scale: 0.85 });

      // Stat cards entrance - small to big
      if (statCardsRef.current) {
        tl.to(statCardsRef.current, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.4)" }, 0);
      }
      if (titleElement) {
        tl.to(titleElement, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.1);
      }
      if (subtitleElement) {
        tl.to(subtitleElement, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.3);
      }
      if (robotRef.current) {
        tl.to(robotRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }, 0.2);
      }
      if (dotCircleContainerRef.current) {
        tl.to(dotCircleContainerRef.current, { opacity: 1, y: 0, duration: 1.5, ease: "sine.out" }, 0.1);
      }

    },
    { scope: sectionRef, dependencies: [] }
  );

  // Continuous Floating Animation - Replaces Cursor Follower
  useGSAP(
    () => {
      if (!robotWrapperRef.current || prefersReducedMotion()) return;

      const wrapper = robotWrapperRef.current;

      // Reset any existing transforms
      gsap.set(wrapper, { x: 0, y: 0 });

      // Create continuous floating motion
      gsap.to(wrapper, {
        y: -20, // Float up
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        force3D: true,
      });

      return () => {
        gsap.killTweensOf(wrapper);
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  // Holographic Glitch Effect
  useGSAP(
    () => {
      if (!robotRef.current || prefersReducedMotion()) return;

      const robot = robotRef.current;

      const triggerGlitch = () => {
        const skew = gsap.utils.random(-20, 20);
        const scaleX = gsap.utils.random(0.9, 1.1);
        const x = gsap.utils.random(-5, 5);

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(robot, {
              skewX: 0,
              scaleX: 1,
              x: 0,
              opacity: 1,
              filter: "none",
            });
            const nextDelay = gsap.utils.random(2, 6);
            gsap.delayedCall(nextDelay, triggerGlitch);
          },
        });

        tl.to(robot, {
          skewX: skew,
          scaleX,
          x,
          opacity: 0.8,
          filter: "brightness(1.5) hue-rotate(90deg)",
          duration: 0.05,
          ease: "power4.inOut",
        })
          .to(robot, {
            skewX: -skew / 2,
            scaleX: 1,
            x: -x / 2,
            opacity: 0.9,
            filter: "brightness(1.2) hue-rotate(-45deg)",
            duration: 0.05,
            ease: "rough({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false })",
          })
          .to(robot, {
            skewX: 0,
            scaleX: 1,
            x: 0,
            opacity: 1,
            filter: "none",
            duration: 0.05,
          });
      };

      const startDelay = gsap.utils.random(1, 3);
      gsap.delayedCall(startDelay, triggerGlitch);

      return () => {
        gsap.killTweensOf(robot);
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <>
      {/* Fixed Vision Layer - above hero (z-30) but below Services (z-40) */}
      <div className="fixed inset-0 w-full h-full z-[35] pointer-events-none">
        <div
          ref={(el) => {
            sectionRef.current = el;
            // Removed intersection ref as we use manual ScrollTrigger now
          }}
          className="w-full h-full relative flex flex-col justify-center bg-transparent"
        >
          {/* Background Elements - 3D Floating Stat Cards - Full viewport */}
          <div ref={statCardsRef} className="absolute inset-0 w-full h-full">
            <VisionStatCards className="w-full h-full" />
          </div>
          <Section background="transparent" className="pt-32 pb-6 sm:pb-8 md:pb-10 h-full flex flex-col z-10 pointer-events-auto">
            <div className="mt-20">
              <SectionHeader
                title="Our Vision"
                subtitle="Seamlessly integrating advanced AI to transform enterprises of all sizes."
              />
            </div>

            <div className="relative w-full flex items-center justify-center py-4 sm:py-6 md:py-8 lg:py-10 z-0 flex-grow">
              <div className="relative w-full max-w-[1200px] aspect-[1.5/1] sm:aspect-[1.8/1] md:aspect-[2.2/1] lg:aspect-[2.5/1] z-0">
                <div
                  ref={dotCircleContainerRef}
                  className="absolute left-0 right-0 z-20 [mix-blend-mode:screen] opacity-0 top-[10%] h-full [isolation:isolate]"
                >
                  <ConcaveFloor intensity={1} className="absolute inset-0" />
                </div>

                <div
                  ref={robotWrapperRef}
                  className="absolute left-1/2 -translate-x-1/2 z-20 top-[-15%]"
                >
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[250px] md:w-[300px] h-[200px] sm:h-[250px] md:h-[300px] -z-10 pointer-events-none [background:radial-gradient(circle,rgba(19,245,132,0.6)_0%,rgba(19,245,132,0.3)_40%,transparent_70%)] [filter:blur(50px)] [transform:translateZ(0)]" />

                  <div
                    ref={robotRef}
                    className="opacity-0 translate-y-[50px] scale-[0.8]"
                  >
                    <Robot
                      className="w-[100px] sm:w-[130px] md:w-[160px] lg:w-[200px] xl:w-[220px] h-auto object-contain"
                      width={220}
                      height={220}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>

      {/* Spacer Implementation - Reserves the scroll area, taller to account for mission animation */}
      <div ref={spacerRef} className="vision-spacer-container relative w-full h-[200vh] z-0 pointer-events-none" />
    </>
  );
}
