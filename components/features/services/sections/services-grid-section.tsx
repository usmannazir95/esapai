"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";

import { Section } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import type { Service } from "@/types/service";
import type { ServicesGridSectionProps } from "@/types/props";


export function ServicesGridSection({ services }: ServicesGridSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const anim = useGSAPAnimations(sectionRef as React.RefObject<HTMLElement>);

  const { setRef: setIntersectionRef, isInView } = useIntersectionAnimation({
    threshold: 0.1,
    rootMargin: "100px",
  });

  useGSAP(
    () => {
      if (!isInView || prefersReducedMotion() || !sectionRef.current) return;

      const cards = cardRefs.current.filter(Boolean);
      if (cards.length === 0) return;

      const tl = anim.createTimeline();

      cards.forEach((card, index) => {
        if (!card) return;

        gsap.set(card, {
          opacity: 0,
          y: 30,
          scale: 0.95,
          force3D: true,
        });

        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            force3D: true,
          },
          index * 0.1
        );
      });
    },
    { scope: sectionRef, dependencies: [isInView, services] }
  );

  return (
    <Section
      ref={(el) => {
        sectionRef.current = el;
        setIntersectionRef(el);
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto px-4">
        {services.map((service, index) => (
          <Link
            key={service.id}
            href={`/service/${service.slug}`}
            className="block h-full"
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
          >
            <SpotlightCard className="h-full">
              <div className="p-6 md:p-8 h-full flex flex-col">
                {/* Service Icon */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center">
                  <Image
                    src={service.icon || "/landing/service/serviceicon.svg"}
                    alt={`${service.name} icon`}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain filter-glow-primary"
                  />
                </div>

                {/* Service Name */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gradient-radial-white">
                  {service.name}
                </h3>

                {/* Service Description */}
                <p className="text-base md:text-lg text-light-gray-90 leading-relaxed mb-6 flex-1">
                  {service.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                  <span>Learn More</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </SpotlightCard>
          </Link>
        ))}
      </div>
    </Section>
  );
}
