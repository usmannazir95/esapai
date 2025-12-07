"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import FramerBackdrop from "./framer";
import Circle from "./circle";
import gsap from "gsap";

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

  const anim = useGSAPAnimations(sectionRef);
  
  // Intersection observer to pause animations when off-screen
  const { ref: intersectionRef, isInView } = useIntersectionAnimation({
    threshold: 0.1,
    rootMargin: "100px",
  });

  useGSAP(() => {
    const tl = anim.createTimeline();

    // Entrance animations - GSAP reads initial states from CSS classes
    // Using 'to' animations - GSAP automatically reads current computed styles
    tl.to(backdropRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    })
      .to(
        iconsRef.current,
        {
          opacity: 0.6,
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
    // Only if not reduced motion (viewport visibility handled by useEffect)
    if (!prefersReducedMotion()) {
      if (circleContainerRef.current) {
        const breathingTween = anim.breathing(circleContainerRef.current, { delay: 0.8 });
        if (breathingTween) {
          breathingTween.paused(!isInView); // Start paused if not in view
          continuousAnimationsRef.current.push(breathingTween);
        }
      }
      if (circleGlowRef.current) {
        const glowTween = anim.glow(circleGlowRef.current, { delay: 0.8 });
        if (glowTween) {
          glowTween.paused(!isInView); // Start paused if not in view
          continuousAnimationsRef.current.push(glowTween);
        }
      }
      // Animate the icons container (box.svg)
      if (iconsRef.current) {
        const floatTween = anim.float(iconsRef.current, { delay: 0.8 });
        if (floatTween) {
          floatTween.paused(!isInView); // Start paused if not in view
          continuousAnimationsRef.current.push(floatTween);
        }
      }
    }
    
    // Cleanup function
    return () => {
      continuousAnimationsRef.current.forEach(tween => {
        if (tween) tween.kill();
      });
      continuousAnimationsRef.current = [];
    };
  }, { scope: sectionRef });
  
  // Pause/resume animations based on viewport visibility
  useEffect(() => {
    if (!isInView || prefersReducedMotion()) {
      continuousAnimationsRef.current.forEach(tween => {
        if (tween) tween.pause();
      });
    } else {
      continuousAnimationsRef.current.forEach(tween => {
        if (tween) tween.resume();
      });
    }
  }, [isInView]);

  return (
    <section 
      ref={(el) => {
        sectionRef.current = el;
        intersectionRef.current = el;
      }} 
      className="relative w-full min-h-screen flex items-start md:items-center justify-center overflow-hidden pb-0 md:pb-32 pt-24 md:pt-0"
    >
      <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none select-none overflow-hidden">
        <div
          ref={backdropRef}
          className="absolute inset-0 gsap-fade-in-optimized"
        >
          <FramerBackdrop className="w-[120%] max-w-none min-h-full translate-x-[-10%] -translate-y-[35%] md:translate-y-[-5%]" />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background/80" />
      </div>

      {/* Circle behind content - animated glow and breathing effect - Responsive sizing */}
      <div
        ref={circleContainerRef}
        className="absolute top-[35%] md:top-[48%] left-1/2 -translate-x-1/2 z-0 pointer-events-none animate-optimized"
      >
        <div ref={circleGlowRef} className="relative">
          <Circle
            className="w-[200px] sm:w-[300px] md:w-[400px] lg:w-[450px] h-auto"
            style={{ maxWidth: "450px" }}
          />
        </div>
      </div>

      {/* Hexagonal Icons (box.svg) - floating with glow - Hidden on mobile/tablet for cleaner layout */}
      <div
        ref={iconsRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none hidden xl:block gsap-fade-in-optimized animate-optimized"
      >
        <Image
          src="/landing/box.svg"
          alt="Hexagonal icons decoration"
          width={1200}
          height={480}
          className="max-w-[1200px] xl:max-w-[1400px] w-auto h-auto opacity-60 filter drop-shadow-[0_0_20px_rgba(19,245,132,0.2)]"
          priority
          sizes="(max-width: 1280px) 100vw, 1400px"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 flex flex-col items-center text-center">
        {/* Tagline Badge */}
        <div
          ref={badgeRef}
          className="hero-badge max-w-5xl gsap-slide-up-optimized scale-95 md:scale-100 mb-6 md:mb-8"
        >
          <div className="hero-badge-exclusive">
            <span className="hero-badge-exclusive-text text-[10px] md:text-sm">Exclusive</span>
          </div>
          <div className="hero-badge-text">
            <span className="hero-badge-text-content text-[11px] md:text-sm">
              Tomorrow&apos;s Edge, Built Today
            </span>
          </div>
        </div>

        {/* Main Title - Full Width Container */}
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 overflow-hidden">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight w-full gsap-slide-up-optimized"
          >
            <span className="block text-white">AI-Powered Solutions</span>
            <span className="block text-gradient-primary mt-1 sm:mt-2">
              For Modern Enterprises
            </span>
          </h1>
        </div>

        {/* Subtitle/Description */}
        <div
          ref={subtitleRef}
          className="mb-6 sm:mb-8 md:mb-10 space-y-1 sm:space-y-2 text-sm sm:text-base md:text-xl text-light-gray-90 max-w-3xl mx-auto px-2 gsap-fade-in-optimized"
        >
          <p>
            Transform your business with intelligent automation, voice-activated
            systems,
          </p>
          <p>and AI agents that drive productivity and innovation</p>
        </div>

        {/* CTA Button */}
        <div
          ref={buttonRef}
          className="gsap-scale-in-optimized"
        >
          <Button
            variant="primary"
            className="text-sm sm:text-base md:text-lg px-6 sm:px-8 py-4 sm:py-5 md:py-6 rounded-[40px] font-semibold shadow-lg shadow-primary-30 hover:shadow-primary-50 transition-all"
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
