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
import { NeuralBackground as NeuralCanvas } from "@/components/ui/background/neural-canvas";

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

      const viewportWidth = window.innerWidth;

      // Glide in from right and settle in the natural position (centered by CSS)
      gsap.fromTo(trackRef.current,
        {
          x: viewportWidth, // Start from off-screen right
        },
        {
          x: 0, // Settle at natural position
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=250%", // Good balance of duration
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }
      );

      // Add clip-path reveal animation to individual cards
      const cardElements = trackRef.current?.querySelectorAll('.mission-card-wrapper');
      if (cardElements) {
        gsap.fromTo(cardElements,
          {
            clipPath: "inset(0 100% 0 0)",
            opacity: 0.3,
          },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "top 20%",
              scrub: 1,
            },
          }
        );
      }

      // Smooth Header Reveal
      const header = sectionRef.current.querySelector('[data-testid="section-header"]');
      if (header) {
        gsap.fromTo(header,
          {
            opacity: 0,
            y: 30,
            filter: "blur(8px)"
          },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "top 60%",
              scrub: 1,
            },
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power3.out",
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [cards] }
  );

  return (
    <Section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col pt-24 overflow-hidden z-20 bg-[#020305]"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
      }}
    >
      <div className="container mx-auto px-4 relative z-20 mb-12">
        <SectionHeader
          title={title}
          subtitle={subtitle}
        />
      </div>

      <div className="flex-grow flex items-center justify-center w-full relative z-10">
        <div
          ref={trackRef}
          className="flex gap-6 sm:gap-8 md:gap-10 px-4 sm:px-12 md:px-24 w-max"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="mission-card-wrapper w-[260px] sm:w-[300px] md:w-[340px] h-[320px] sm:h-[380px] md:h-[420px] flex-shrink-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <MissionCard
                title={card.title}
                description={card.description}
                icon={card.icon}
                image={card.image}
                className="h-full w-full glass-card glass-card-hover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Background Ambience */}
      <NeuralCanvas className="absolute inset-0 z-0" />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] -translate-y-1/2" />
      </div>
    </Section>
  );
}



