"use client";

import { useRef } from "react";
import type { MissionCard as MissionCardType } from "@/types/product";
import type { MissionProps } from "@/types/props";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { MissionCard } from "@/components/ui/mission-card";
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
  },
  {
    title: "Accelerating Innovation",
    description: "Deploying autonomous agents to eliminate friction and accelerate business growth.",
    icon: Rocket,
  },
  {
    title: "Unified Ecosystems",
    description: "Connecting legacy systems with future AI for seamless organizational evolution.",
    icon: Layers,
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
    <Section ref={sectionRef} className="relative min-h-screen flex flex-col pt-24 overflow-hidden">
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
              className="w-[300px] sm:w-[350px] md:w-[400px] h-[380px] sm:h-[450px] md:h-[500px] flex-shrink-0"
            >
              <MissionCard
                title={card.title}
                description={card.description}
                icon={card.icon}
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] -translate-y-1/2" />
      </div>
    </Section>
  );
}



