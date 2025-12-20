"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

export function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const anim = useGSAPAnimations(sectionRef as React.RefObject<HTMLElement>);

  const { setRef: setIntersectionRef, isInView } = useIntersectionAnimation({
    threshold: 0.15,
    rootMargin: "100px",
  });

  useGSAP(
    () => {
      if (!isInView || prefersReducedMotion() || !sectionRef.current) return;

      const tl = anim.createTimeline();

      const titleElement = sectionRef.current.querySelector("h1");
      const descriptionElement = sectionRef.current.querySelector("p");

      if (titleElement) {
        gsap.set(titleElement, { opacity: 0, y: -20 });
      }
      if (descriptionElement) {
        gsap.set(descriptionElement, { opacity: 0, y: 10 });
      }

      if (titleElement) {
        tl.to(titleElement, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (descriptionElement) {
        tl.to(
          descriptionElement,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }
    },
    { scope: sectionRef, dependencies: [isInView] }
  );

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        setIntersectionRef(el);
      }}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-dark"
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
          className="w-auto h-auto"
        />
      </div>
      <div className="absolute bottom-[20%] right-[10%] z-0 pointer-events-none opacity-20">
        <Image
          src="/landing/box.svg"
          alt="Box decoration"
          width={150}
          height={150}
          className="w-auto h-auto"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-gradient-primary">
          Our Services
        </h1>
        <p className="text-lg md:text-xl text-light-gray-90 max-w-2xl mx-auto">
          Comprehensive AI solutions and services to help you transform your business with intelligent automation
        </p>
      </div>
    </section>
  );
}
