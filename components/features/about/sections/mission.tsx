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

gsap.registerPlugin(ScrollTrigger);

import { Mic2, Rocket, Layers, Activity, Globe2 } from "lucide-react";

const defaultTitle = "Our Core Mission";
const defaultSubtitle =
  "At ESAP AI, we are committed to building the foundational intelligence layer for the modern world. We empower organizations to transcend traditional limits through the strategic application of advanced AI.";
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
  {
    title: "Operational Excellence",
    description: "Transforming workflows into self-learning systems for maximum operational efficiency.",
    icon: Activity,
  },
  {
    title: "Global Connectivity",
    description: "Bridging global domains with a unified intelligence layer for seamless collaboration.",
    icon: Globe2,
  }
];

export function Mission({
  title = defaultTitle,
  subtitle = defaultSubtitle,
  cards = defaultCards,
}: MissionProps = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current || !containerRef.current) return;

      const totalCards = cards.length;
      const angleStep = (Math.PI * 2) / totalCards;

      // Responsive radius calculation
      const getRadius = () => {
        if (typeof window === "undefined") return 300;
        if (window.innerWidth < 640) return 150;
        if (window.innerWidth < 1024) return 250;
        return 350;
      };

      let radius = getRadius();

      // Set initial positions
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.set(card, {
          position: "absolute",
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          transformPerspective: 2000,
          opacity: 0,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%", // Longer scroll for smoother rotation
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to({}, {
        duration: 3,
        onUpdate: function () {
          const progress = this.progress();
          const rotationOffset = progress * Math.PI * 2;

          cardRefs.current.forEach((card, i) => {
            if (!card) return;

            const angle = (i * angleStep) - rotationOffset;
            const x = Math.sin(angle) * (radius * (window.innerWidth < 768 ? 1 : 1.1));
            const z = Math.cos(angle) * radius;

            // Normalize z for depth calculations (0 = back, 1 = front)
            const normalizedZ = (z + radius) / (2 * radius);

            // Further reduced scaling for a more compact look
            const scale = 0.4 + (normalizedZ * 0.35);

            // Opacity and blur based on depth
            const opacity = normalizedZ > 0.3 ? 1 : normalizedZ + 0.1;
            const blur = normalizedZ < 0.5 ? (0.5 - normalizedZ) * 6 : 0;

            // Facing logic: cards rotate to maintain a "wheel" look but still face forward-ish
            const rotationY = (angle * 180) / Math.PI;

            gsap.set(card, {
              x: x,
              z: z,
              rotationY: rotationY,
              rotationX: -8 * (1 - normalizedZ), // Subtle tilt back cards away
              scale: scale,
              opacity: opacity,
              filter: `blur(${blur}px)`,
              zIndex: Math.round(normalizedZ * 1000),
              visibility: normalizedZ < 0.05 ? "hidden" : "visible",
            });
          });
        }
      });
    },
    { scope: sectionRef, dependencies: [cards] }
  );

  return (
    <Section ref={sectionRef} className="relative min-h-screen overflow-hidden flex flex-col pt-16">
      <div className="container mx-auto px-4 relative z-20">
        <SectionHeader title={title} subtitle={subtitle} />
      </div>

      <div
        ref={containerRef}
        className="flex-grow w-full relative perspective-[1000px] preserve-3d mt-12 md:mt-20"
      >
        <div className="absolute inset-x-0 top-[15%] h-[300px] md:h-[400px] w-full preserve-3d translate-x-[15px] md:translate-x-[40px]">
          {/* Central Logo Core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 z-[10] pointer-events-none">
            {/* Pulsing Background Glows */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] animate-pulse" />
            <div className="absolute inset-x-4 inset-y-4 bg-primary/10 rounded-full blur-[40px] animate-pulse-slow" />

            {/* Logo Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-32 h-12 md:w-48 md:h-16 flex items-center justify-center">
                <img
                  src="/logo/esaplogo.svg"
                  alt="ESAP Logo"
                  className="w-full h-full object-contain filter-glow-primary"
                />
              </div>
            </div>
          </div>

          {/* Carousel Cards */}
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="w-[160px] sm:w-[190px] md:w-[220px] h-[220px] sm:h-[260px] md:h-[300px]"
            >
              <MissionCard
                title={card.title}
                description={card.description}
                icon={card.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}



