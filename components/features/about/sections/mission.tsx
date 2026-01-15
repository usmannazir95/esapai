"use client";

import { useRef } from "react";
import type { MissionCard as MissionCardType } from "@/types/product";
import type { MissionProps } from "@/types/props";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { MissionCard } from "@/components/ui/mission-card";
import { CharacterReveal } from "@/components/ui/character-reveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RotatingEarth from "@/components/globe/wireframe-globe";

gsap.registerPlugin(ScrollTrigger);

import { Mic2, Rocket, Layers, Activity } from "lucide-react";

const defaultTitle = "Our Core Mission";
const defaultSubtitle =
  "Building the foundational intelligence layer to empower organizations beyond traditional limits.";
const defaultCards: MissionCardType[] = [
  {
    title: "Democratizing Intelligence",
    description: "Making advanced AI intuitive and accessible through voice-first innovation.",
    icon: Mic2,
    image: "/bentogird/agenticai.svg",
  },
  {
    title: "Accelerating Innovation",
    description: "Deploying autonomous agents to eliminate friction and accelerate business growth.",
    icon: Rocket,
    image: "/bentogird/aisolution.svg",
  },
  {
    title: "Unified Ecosystems",
    description: "Connecting legacy systems with future AI for seamless organizational evolution.",
    icon: Layers,
    image: "/bentogird/enterprise.svg",
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade security protocols ensuring your data remains protected and compliant.",
    icon: Activity,
    image: "/bentogird/industry.svg",
  },
];

export function Mission({
  title = defaultTitle,
  subtitle = defaultSubtitle,
  cards = defaultCards,
}: MissionProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      const cardElements = trackRef.current.querySelectorAll('.mission-card-wrapper');
      const totalCards = cardElements.length;

      if (totalCards === 0) return;

      const cardWidth = 340;
      const gap = 30;
      const viewportWidth = window.innerWidth;
      const viewportCenter = viewportWidth / 2;

      // Final positions - all cards lined up, centered as a group
      const totalWidth = (cardWidth * totalCards) + (gap * (totalCards - 1));
      const finalStartX = (viewportWidth - totalWidth) / 2;

      // Get header elements for animations
      const headerEl = sectionRef.current?.querySelector('[data-testid="section-header"]');
      const titleEl = headerEl?.querySelector('h2');
      const subtitleEl = headerEl?.querySelector('p');

      // Set initial state for header - hidden for reveal
      if (titleEl) {
        gsap.set(titleEl, { opacity: 0, y: 60, filter: "blur(10px)" });
      }
      if (subtitleEl) {
        gsap.set(subtitleEl, { opacity: 0, y: 40, filter: "blur(8px)" });
      }

      // Header reveal animation - triggers on section entry (before pin)
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 20%",
          scrub: 0.3,
        }
      });

      if (titleEl) {
        revealTl.to(titleEl, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power2.out",
        }, 0);
      }
      if (subtitleEl) {
        revealTl.to(subtitleEl, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out",
        }, 0.2);
      }

      // Set initial state - all cards start off-screen right, stacked
      // Later cards have higher z-index so they appear in front
      cardElements.forEach((card, i) => {
        gsap.set(card, {
          x: viewportWidth + 100,
          scale: 0.85,
          opacity: 0,
          zIndex: i + 1,
        });
      });

      // Create main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalCards * 150}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (totalCards * 2),
            duration: { min: 0.2, max: 0.4 },
            ease: "power2.inOut",
          },
          invalidateOnRefresh: true,
        },
      });

      // Animate each card: enter → center (big) → final position (small)
      cardElements.forEach((card, i) => {
        const finalX = finalStartX + (i * (cardWidth + gap));
        const centerX = viewportCenter - (cardWidth / 2);

        // Phase 1: Card enters and goes to center (big) with bounce
        tl.to(card, {
          x: centerX,
          scale: 1.15,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.4)",
        });

        // Phase 2: Card moves to final position (smaller) with bounce
        tl.to(card, {
          x: finalX,
          scale: 0.9,
          opacity: 0.85,
          duration: 0.5,
          ease: "back.out(1.2)",
        });
      });

      // After all cards are placed, make them all equal with bounce
      tl.to(cardElements, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        stagger: 0.05,
        ease: "back.out(1.7)",
      });

      // Hold for a moment
      tl.to({}, { duration: 0.3 });

      // Exit animation - cards scale down and fade out with stagger
      cardElements.forEach((card, i) => {
        tl.to(card, {
          scale: 0.7,
          opacity: 0,
          y: -100,
          duration: 0.15,
          ease: "power2.in",
        }, `-=${i > 0 ? 0.1 : 0}`);
      });

      // Fade out the header with blur effect
      if (titleEl) {
        tl.to(titleEl, {
          opacity: 0,
          y: -40,
          filter: "blur(10px)",
          duration: 0.25,
          ease: "power2.in",
        }, "-=0.3");
      }
      if (subtitleEl) {
        tl.to(subtitleEl, {
          opacity: 0,
          y: -30,
          filter: "blur(8px)",
          duration: 0.2,
          ease: "power2.in",
        }, "-=0.2");
      }
    },
    { scope: sectionRef, dependencies: [cards] }
  );

  return (
    <Section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col pt-24 z-40"
      overflow="visible"
    >
      <div className="container mx-auto px-4 relative z-20 mb-12 mt-16">
        <SectionHeader
          title={title}
          subtitle={subtitle}
        />
      </div>

      <div className="flex-grow flex items-center justify-center w-screen relative z-10 overflow-visible -ml-[50vw] left-1/2">
        <div
          ref={trackRef}
          className="relative w-screen h-[450px]"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="mission-card-wrapper absolute top-0 left-0 w-[340px] h-[420px] origin-center"
            >
              <MissionCard
                title={card.title}
                description={card.description}
                icon={card.icon}
                image={card.image}
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>

    </Section>
  );
}



