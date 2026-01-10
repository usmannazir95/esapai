"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

export function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const anim = useGSAPAnimations(sectionRef as React.RefObject<HTMLElement>);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { setRef: setIntersectionRef, isInView } = useIntersectionAnimation({
    threshold: 0.15,
    rootMargin: "100px",
  });

  // Ensure component is mounted before running animations
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(
    () => {
      // Early returns for performance
      if (
        !isMounted ||
        !isInView ||
        prefersReducedMotion() ||
        !sectionRef.current ||
        hasAnimated
      ) {
        return;
      }

      const titleElement = sectionRef.current.querySelector("h1");
      const descriptionElement = sectionRef.current.querySelector("p");

      if (!titleElement && !descriptionElement) return;

      // Mark as animated to prevent re-triggering
      setHasAnimated(true);

      const tl = anim.createTimeline();

      if (titleElement) {
        gsap.set(titleElement, { opacity: 0, y: -20 });
        tl.to(
          titleElement,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          0
        );
      }

      if (descriptionElement) {
        gsap.set(descriptionElement, { opacity: 0, y: 10 });
        tl.to(
          descriptionElement,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          0.4
        );
      }
    },
    { scope: sectionRef, dependencies: [isInView, isMounted, hasAnimated] }
  );

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        setIntersectionRef(el);
      }}
      className="relative min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden bg-dark pt-20 sm:pt-24 md:pt-0"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary opacity-10 blur-[120px] rounded-full" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-[20%] left-[10%] z-0 pointer-events-none opacity-20">
        <Image
          src="/landing/circle.svg"
          alt="Circle decoration"
          width={200}
          height={200}
          priority
          sizes="200px"
          className="w-auto h-auto"
        />
      </div>
      <div className="absolute bottom-[20%] right-[10%] z-0 pointer-events-none opacity-20">
        <Image
          src="/landing/box.svg"
          alt="Box decoration"
          width={150}
          height={150}
          priority
          sizes="150px"
          className="w-auto h-auto"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-14 md:py-16 flex flex-col items-center text-center max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight">
          <span className="text-white">
            Our Services
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-light-gray-90 max-w-2xl mx-auto px-2 sm:px-4">
          Comprehensive AI solutions and services to help you transform your business with intelligent automation
        </p>
      </div>
    </section>
  );
}
