"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import type { ServicesHeaderSectionProps } from "@/types/props";

export function ServicesHeaderSection({
  title,
  subtitle,
  subtitleClassName,
}: ServicesHeaderSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
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
          scale: 1,
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
    },
    { scope: sectionRef, dependencies: [isInView] }
  );

  return (
    <Section
      ref={(el) => {
        sectionRef.current = el;
        setIntersectionRef(el);
      }}
    >
      <SectionHeader
        title={title}
        subtitle={subtitle}
        subtitleClassName={subtitleClassName}
      />
    </Section>
  );
}
