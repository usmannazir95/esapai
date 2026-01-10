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

import { Mic2, Rocket, Layers, Activity, Globe2 } from "lucide-react";

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
          end: "+=300%",
          scrub: 1, // Increased for smoother following
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / totalCards,
            duration: { min: 0.3, max: 0.7 },
            delay: 0.1,
            ease: "power2.inOut",
          },
        },
      });

      tl.to({}, {
        duration: 3,
        onUpdate: function () {
          const progress = this.progress();
          const rotationOffset = progress * Math.PI * 2;

          // Re-calculate radius on update for responsive scaling without full re-mounts
          const currentRadius = window.innerWidth < 640 ? 150 : window.innerWidth < 1024 ? 250 : 350;

          cardRefs.current.forEach((card, i) => {
            if (!card) return;

            const angle = (i * angleStep) - rotationOffset;
            const x = Math.sin(angle) * (currentRadius * (window.innerWidth < 768 ? 1 : 1.1));
            const z = Math.cos(angle) * currentRadius;

            const normalizedZ = (z + currentRadius) / (2 * currentRadius);
            const scale = 0.4 + (normalizedZ * 0.35);
            const opacity = normalizedZ > 0.3 ? 1 : normalizedZ + 0.1;
            const blur = normalizedZ < 0.5 ? (0.5 - normalizedZ) * 6 : 0;
            const rotationY = (angle * 180) / Math.PI;

            gsap.set(card, {
              x: x,
              z: z,
              rotationY: rotationY,
              rotationX: -8 * (1 - normalizedZ),
              scale: scale,
              opacity: opacity,
              filter: `blur(${blur}px)`,
              zIndex: Math.round(normalizedZ * 1000),
              visibility: normalizedZ < 0.05 ? "hidden" : "visible",
            });
          });
        }
      });

      return () => {
        if (tl.scrollTrigger) tl.scrollTrigger.kill();
        tl.kill();
      };
    },
    { scope: sectionRef, dependencies: [cards] }
  );

  return (
    <Section ref={sectionRef} className="relative min-h-screen overflow-hidden flex flex-col pt-16">
      <div className="container mx-auto px-4 relative z-20">
        <SectionHeader
          title={title}
          subtitle={subtitle}
        />
      </div>

      <div
        ref={containerRef}
        className="flex-grow w-full relative perspective-[1000px] preserve-3d mt-0 flex items-center justify-center min-h-[500px]"
      >
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[500px] md:h-[600px] w-full preserve-3d translate-x-[15px] md:translate-x-[40px]">
          {/* Central Globe Core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] z-[10]">
            {/* Pulsing Glow */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] animate-pulse" />
            <div className="absolute inset-4 bg-primary/10 rounded-full blur-[40px] animate-pulse" />

            {/* Globe */}
            <div className="relative w-full h-full flex items-center justify-center">
              <RotatingEarth width={300} height={300} className="w-full h-full" />
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



