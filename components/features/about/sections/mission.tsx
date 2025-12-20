"use client";

import { useRef } from "react";
import type { MissionCard as MissionCardType } from "@/lib/products";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { MissionCard } from "@/components/ui/mission-card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

interface MissionProps {
  title?: string;
  subtitle?: string;
  cards?: MissionCardType[];
}

const defaultTitle = "Intelligent AI Solutions";
const defaultSubtitle =
  "We build AI-powered systems that transform how businesses operate. From voice-activated ERP systems to intelligent knowledge agents, our solutions drive productivity, automation, and innovation across industries.";
const defaultCards: MissionCardType[] = [
  {
    title: "Voice-First Innovation",
    description:
      "Revolutionize business operations with voice-activated AI systems that make enterprise management accessible and intuitive for everyone.",
  },
  {
    title: "Intelligent Automation",
    description:
      "Deploy AI agents and automation frameworks that handle complex workflows, freeing your team to focus on strategic decision-making.",
  },
  {
    title: "Seamless Integration",
    description:
      "Connect legacy systems with modern AI capabilities through our Domain Expansion platform, modernizing without replacing infrastructure.",
  },
];

export function Mission({
  title = defaultTitle,
  subtitle = defaultSubtitle,
  cards = defaultCards,
}: MissionProps = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const isLeftCard = index === 0;
        const isMiddleCard = index === 1;
        const isRightCard = index === 2;

        if (isLeftCard) {
          gsap.set(card, { opacity: 0, x: -200, y: 0 });
        } else if (isMiddleCard) {
          gsap.set(card, { opacity: 0, x: 0, y: -200 });
        } else if (isRightCard) {
          gsap.set(card, { opacity: 0, x: 200, y: 0 });
        } else {
          gsap.set(card, { opacity: 0, y: 50 });
        }
      });

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

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const isLeftCard = index === 0;
        const isMiddleCard = index === 1;
        const isRightCard = index === 2;

        tl.to(
          card,
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: isMiddleCard ? "power2.out" : "power3.out",
          },
          isLeftCard || isRightCard ? "-=0.5" : "-=0.3"
        );
      });
    },
    { scope: sectionRef, dependencies: [isInView] }
  );

  return (
    <Section className="pb-6 sm:pb-8 md:pb-10">
      <div
        ref={(node) => {
          sectionRef.current = node;
          setIntersectionRef(node);
        }}
      >
        <SectionHeader title={title} subtitle={subtitle} />

        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="h-full"
            >
              <MissionCard title={card.title} description={card.description} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}



