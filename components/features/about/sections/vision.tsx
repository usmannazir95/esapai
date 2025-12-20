"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import Robot from "@/components/sections/shared/robot";

const ConcaveFloor = dynamic(
  () => import("@/components/sections/shared/concave-floor"),
  { ssr: false }
);

const SpaceBackground = dynamic(
  () => import("@/components/sections/shared/space-background"),
  { ssr: false }
);

export function Vision() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const robotWrapperRef = useRef<HTMLDivElement>(null);
  const dotCircleContainerRef = useRef<HTMLDivElement>(null);
  const cursorAnimationTweenRef = useRef<gsap.core.Tween | null>(null);

  const anim = useGSAPAnimations(sectionRef as React.RefObject<HTMLElement>);

  const { setRef: setIntersectionRef, isInView } = useIntersectionAnimation({
    threshold: 0.1,
    rootMargin: "100px",
  });

  useGSAP(
    () => {
      if (!isInView || prefersReducedMotion() || !sectionRef.current) return;

      const tl = anim.createTimeline();

      const titleElement = sectionRef.current.querySelector("h2");
      const subtitleElement = sectionRef.current.querySelector("p");

      if (titleElement) {
        gsap.set(titleElement, { opacity: 0, y: -20 });
      }
      if (subtitleElement) {
        gsap.set(subtitleElement, { opacity: 0, y: 10 });
      }

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

      if (robotRef.current) {
        gsap.set(robotRef.current, { opacity: 0, y: 50, scale: 0.8 });
      }
      if (dotCircleContainerRef.current) {
        gsap.set(dotCircleContainerRef.current, { opacity: 0 });
      }

      tl.to(
        robotRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3"
      ).to(
        dotCircleContainerRef.current,
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );
    },
    { scope: sectionRef, dependencies: [isInView] }
  );

  // Cursor follower effect for robot - Disabled on touch devices and reduced motion
  useGSAP(
    () => {
      if (!robotWrapperRef.current || !sectionRef.current) return;
      if (!isInView || prefersReducedMotion()) return;

      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      if (isTouchDevice) return;

      const wrapper = robotWrapperRef.current;
      const section = sectionRef.current;

      gsap.set(wrapper, {
        x: 0,
        y: 0,
        force3D: true,
      });

      const handleMouseMove = (e: MouseEvent) => {
        if (!isInView) return;

        const rect = section.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const relativeX = (e.clientX - centerX) / (rect.width / 2);
        const relativeY = (e.clientY - centerY) / (rect.height / 2);

        const screenWidth = window.innerWidth;
        const maxMove = screenWidth < 768 ? 20 : screenWidth < 1024 ? 30 : 40;
        const targetX = relativeX * maxMove;
        const targetY = relativeY * maxMove;

        cursorAnimationTweenRef.current?.kill();

        cursorAnimationTweenRef.current = gsap.to(wrapper, {
          x: targetX,
          y: targetY,
          duration: 0.6,
          ease: "power2.out",
          force3D: true,
          overwrite: "auto",
        });
      };

      section.addEventListener("mousemove", handleMouseMove);

      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
        cursorAnimationTweenRef.current?.kill();
        cursorAnimationTweenRef.current = null;
        gsap.set(wrapper, { x: 0, y: 0 });
      };
    },
    { scope: sectionRef, dependencies: [isInView] }
  );

  // Holographic Glitch Effect
  useGSAP(
    () => {
      if (!robotRef.current || !isInView || prefersReducedMotion()) return;

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
    { scope: sectionRef, dependencies: [isInView] }
  );

  return (
    <div className="relative w-full overflow-hidden">
      <SpaceBackground />
      <Section background="transparent" className="pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10">
        <div
          ref={(el) => {
            sectionRef.current = el;
            setIntersectionRef(el);
          }}
          className={cn(!prefersReducedMotion() && "[will-change:transform]")}
        >
          <SectionHeader
            title="Our Vision"
            subtitle="We envision a future where AI seamlessly integrates into every aspect of business operations. Our mission is to make advanced AI technology accessible, practical, and transformative for enterprises of all sizes."
          />

          <div className="relative w-full flex items-center justify-center py-4 sm:py-6 md:py-8 z-0">
            <div className="relative w-full max-w-[1200px] aspect-[1.8/1] md:aspect-[2.5/1] z-0">
              <div
                ref={dotCircleContainerRef}
                className="absolute left-0 right-0 gsap-fade-in-optimized z-20 [mix-blend-mode:screen] opacity-0 top-[10%] h-full [isolation:isolate]"
              >
                <ConcaveFloor intensity={1} className="absolute inset-0" />
              </div>

              <div
                ref={robotWrapperRef}
                className="absolute left-1/2 -translate-x-1/2 z-20 animate-optimized top-[-15%]"
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] -z-10 pointer-events-none [background:radial-gradient(circle,rgba(19,245,132,0.6)_0%,rgba(19,245,132,0.3)_40%,transparent_70%)] [filter:blur(50px)] [transform:translateZ(0)]" />

                <div
                  ref={robotRef}
                  className="gsap-fade-scale-in opacity-0 translate-y-[50px] scale-[0.8]"
                >
                  <Robot
                    className="w-[120px] sm:w-[150px] md:w-[180px] lg:w-[220px] h-auto object-contain"
                    width={220}
                    height={220}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}



