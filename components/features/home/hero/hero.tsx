"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Button } from "@/components/ui/button";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import Box from "@/components/shared/box";

// Lazy-load heavy SVG components to reduce initial bundle size
// These are decorative and don't affect LCP
const FramerBackdrop = dynamic(() => import("./framer"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />
});

const Circle = dynamic(() => import("./circle"), {
  ssr: false,
  loading: () => <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const circleContainerRef = useRef<HTMLDivElement>(null);
  const circleGlowRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const continuousAnimationsRef = useRef<gsap.core.Tween[]>([]);
  const lightEffectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const anim = useGSAPAnimations(sectionRef);

  // Intersection observer to pause animations when off-screen
  const { setRef: setIntersectionRef, isInView } = useIntersectionAnimation({
    threshold: 0.1,
    rootMargin: "100px",
  });

  useGSAP(
    () => {
      const tl = anim.createTimeline();

      // Entrance animations - GSAP reads initial states from CSS classes
      tl.to(backdropRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(
          iconsRef.current,
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .to(
          badgeRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          buttonRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        );

      // Continuous animations (start after entrance sequence completes)
      if (!prefersReducedMotion()) {
        if (circleContainerRef.current) {
          const breathingTween = anim.breathing(circleContainerRef.current, {
            delay: 0.8,
          });
          if (breathingTween) {
            breathingTween.paused(!isInView);
            continuousAnimationsRef.current.push(breathingTween);
          }
        }
        if (circleGlowRef.current) {
          const glowTween = anim.glow(circleGlowRef.current, { delay: 0.8 });
          if (glowTween) {
            glowTween.paused(!isInView);
            continuousAnimationsRef.current.push(glowTween);
          }
        }
        if (iconsRef.current) {
          // Spread hexagons further apart to avoid overlapping the circle
          // Left side hexagons
          gsap.set(iconsRef.current.querySelectorAll('.hexagon-4, .hexagon-5, .hexagon-6'), { x: -80 });
          // Right side hexagons
          gsap.set(iconsRef.current.querySelectorAll('.hexagon-1, .hexagon-2, .hexagon-3'), { x: 80 });

          // Set initial states for smooth entrance animation
          gsap.set(iconsRef.current.querySelectorAll('[class^="hexagon-"]'), {
            opacity: 0,
            scale: 0.8,
          });

          // Smooth staggered entrance animation
          tl.to(
            iconsRef.current.querySelectorAll('[class^="hexagon-"]'),
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power2.out",
              stagger: {
                each: 0.15,
                from: "random",
              },
            },
            "-=0.3"
          );

          // Individual animations for each of the 6 hexagons - enhanced with more variety

          // Hexagon 1 - Intensified diagonal float (Right)
          const hex1 = gsap.to(iconsRef.current.querySelector('.hexagon-1'), {
            y: "-=40",
            x: "+=30",
            rotation: 12,
            duration: 4.5,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: 0,
          });
          continuousAnimationsRef.current.push(hex1);

          // Hexagon 2 - Intensified vertical bounce with horizontal drift (Right)
          const hex2 = gsap.to(iconsRef.current.querySelector('.hexagon-2'), {
            y: "-=50",
            x: "+=10",
            rotation: -8,
            duration: 5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 0.5,
          });
          continuousAnimationsRef.current.push(hex2);

          // Hexagon 3 - Intensified circular motion (Right)
          const hex3 = gsap.to(iconsRef.current.querySelector('.hexagon-3'), {
            y: "-=35",
            x: "-=25",
            rotation: 15,
            duration: 5.5,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1,
          });
          continuousAnimationsRef.current.push(hex3);

          // Hexagon 4 - Intensified horizontal sway (Left)
          const hex4 = gsap.to(iconsRef.current.querySelector('.hexagon-4'), {
            x: "-=40",
            y: "-=20",
            rotation: -10,
            duration: 4.8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 0.3,
          });
          continuousAnimationsRef.current.push(hex4);

          // Hexagon 5 - Intensified figure-8 pattern (Left)
          const hex5 = gsap.to(iconsRef.current.querySelector('.hexagon-5'), {
            y: "-=45",
            x: "+=30",
            rotation: 18,
            duration: 5.8,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: 0.8,
          });
          continuousAnimationsRef.current.push(hex5);

          // Hexagon 6 - Intensified pulse movement (Left)
          const hex6 = gsap.to(iconsRef.current.querySelector('.hexagon-6'), {
            y: "-=30",
            rotation: -12,
            duration: 4,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1.2,
          });
          continuousAnimationsRef.current.push(hex6);

          // Refined Pulsing Glow Animation for individual hexagons
          const hexagonGlow = gsap.to(iconsRef.current.querySelectorAll('[class^="hexagon-"]'), {
            filter: "drop-shadow(0 0 15px rgba(19,245,132,0.6)) drop-shadow(0 0 30px rgba(19,245,132,0.3))",
            duration: 3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: {
              each: 0.3,
              from: "random"
            }
          });
          continuousAnimationsRef.current.push(hexagonGlow);

          // Pause all animations if not in view
          [hex1, hex2, hex3, hex4, hex5, hex6, hexagonGlow].forEach(
            (anim) => anim.paused(!isInView)
          );
        }
      }

      // Cleanup function
      return () => {
        continuousAnimationsRef.current.forEach((tween) => {
          tween?.kill();
        });
        continuousAnimationsRef.current = [];
        if (lightEffectTimeoutRef.current) {
          clearTimeout(lightEffectTimeoutRef.current);
          lightEffectTimeoutRef.current = null;
        }
      };
    },
    { scope: sectionRef }
  );

  // Pause/resume animations based on viewport visibility
  useEffect(() => {
    if (!isInView || prefersReducedMotion()) {
      continuousAnimationsRef.current.forEach((tween) => tween?.pause());
    } else {
      continuousAnimationsRef.current.forEach((tween) => tween?.resume());
    }
  }, [isInView]);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        setIntersectionRef(el);
      }}
      className="relative w-full min-h-0 sm:min-h-screen flex items-start sm:items-center justify-center overflow-hidden pb-6 sm:pb-16 md:pb-24 lg:pb-32 xl:pb-40 pt-20 sm:pt-24 md:pt-0"
    >
      <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none select-none overflow-hidden">
        <div ref={backdropRef} className="absolute inset-0 gsap-fade-in-optimized overflow-hidden">
          <FramerBackdrop className="w-[120%] max-w-none min-h-full translate-x-[-10%] -translate-y-[35%] md:translate-y-[-5%]" />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background/80" />
      </div>

      {/* Circle behind content - animated glow and breathing effect */}
      <div
        ref={circleContainerRef}
        className="absolute top-[30%] sm:top-[35%] md:top-[45%] lg:top-[48%] left-1/2 -translate-x-1/2 z-0 pointer-events-none animate-optimized"
      >
        <div ref={circleGlowRef} className="relative">
          <Circle className="w-[250px] sm:w-[350px] md:w-[450px] lg:w-[550px] xl:w-[600px] max-w-[600px] h-auto" />
        </div>
      </div>

      {/* Hexagonal Icons (Box component) - floating with glow - Hidden on mobile/tablet */}
      <div
        ref={iconsRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none hidden xl:block gsap-fade-in-optimized animate-optimized"
      >
        <Box className="max-w-[1400px] xl:max-w-[1800px] w-auto h-auto opacity-100 filter drop-shadow-[0_0_30px_rgba(19,245,132,0.6)] drop-shadow-[0_0_60px_rgba(19,245,132,0.3)] brightness-[1.2]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-8 md:py-12 lg:py-16 flex flex-col items-center text-center">
        {/* Tagline Badge */}
        <div
          ref={badgeRef}
          className="hero-badge max-w-5xl gsap-slide-up-optimized scale-90 sm:scale-95 md:scale-100 mb-4 sm:mb-6 md:mb-8"
        >
          <div className="hero-badge-exclusive">
            <span className="hero-badge-exclusive-text text-[9px] sm:text-[10px] md:text-sm">
              Exclusive
            </span>
          </div>
          <div className="hero-badge-text">
            <span className="hero-badge-text-content text-[10px] sm:text-[11px] md:text-sm">
              Tomorrow&apos;s Edge, Built Today
            </span>
          </div>
        </div>

        {/* Main Title */}
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 overflow-hidden">
          <h1
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold mb-3 sm:mb-4 md:mb-6 leading-tight w-full gsap-slide-up-optimized"
          >
            <span className="block text-white">AI-Powered Solutions</span>
            <span className="block text-primary mt-1 sm:mt-2 animate-text-glow brightness-[1.3]">
              For Modern Enterprises
            </span>
          </h1>
        </div>

        {/* Subtitle/Description */}
        <div
          ref={subtitleRef}
          className="mb-5 sm:mb-6 md:mb-8 lg:mb-10 space-y-1 sm:space-y-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-light-gray-90 max-w-3xl mx-auto px-2 sm:px-4 gsap-fade-in-optimized"
        >
          <p>
            Transform your business with intelligent automation, voice-activated
            systems,
          </p>
          <p>and AI agents that drive productivity and innovation</p>
        </div>

        {/* CTA Button */}
        <div ref={buttonRef} className="gsap-scale-in-optimized">
          <Button
            variant="primary"
            className="text-xs sm:text-sm md:text-base lg:text-lg px-10 sm:px-12 md:px-16 lg:px-20 py-3 sm:py-4 md:py-5 lg:py-6 rounded-[32px] sm:rounded-[40px] font-semibold shadow-lg shadow-primary-30 hover:shadow-primary-50 transition-all min-h-[44px] sm:min-h-[48px]"
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}



