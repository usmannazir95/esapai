"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

interface ServicesCTASectionProps {
  text: string;
  buttonText: string;
  buttonHref: string;
}

export function ServicesCTASection({
  text,
  buttonText,
  buttonHref,
}: ServicesCTASectionProps) {
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

      const textElement = sectionRef.current.querySelector("p");
      const buttonElement = sectionRef.current.querySelector("a");

      if (textElement) {
        gsap.set(textElement, { opacity: 0, y: 10 });
      }
      if (buttonElement) {
        gsap.set(buttonElement, { opacity: 0, y: 10, scale: 0.95 });
      }

      if (textElement) {
        tl.to(textElement, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        });
      }

      if (buttonElement) {
        tl.to(
          buttonElement,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
          },
          "-=0.3"
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
      <div className="text-center">
        <p className="text-lg md:text-xl text-light-gray-90 mb-6">
          {text}
        </p>
        <Button
          variant="primary"
          size="lg"
          className="rounded-[40px] px-8 py-6 text-lg font-semibold"
          asChild
        >
          <Link href={buttonHref}>{buttonText}</Link>
        </Button>
      </div>
    </Section>
  );
}
