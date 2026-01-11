"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Cpu,
  Globe,
  Zap,
  Layers,
  BarChart,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Data ---
const SERVICES = [
  // Row 1: Wide Left (8) + Narrow Right (4) - Zig
  {
    index: "01",
    id: "agentic",
    title: "Agentic AI Integration",
    subtitle: "Autonomous Workforce",
    description:
      "Deploy autonomous AI agents that seamlessly integrate with your existing systems to automate complex workflows and decision-making processes.",
    href: "/service/end-to-end-integration",
    icon: Cpu,
    colSpan: "md:col-span-8",
  },
  {
    index: "02",
    id: "strategy",
    title: "Enterprise Strategy",
    subtitle: "Future-Proofing",
    description:
      "Strategic consulting to identify high-impact automation opportunities and design future-proof AI roadmaps.",
    href: "/service/enterprise-automation",
    icon: BarChart,
    colSpan: "md:col-span-4",
  },
  // Row 2: Narrow Left (4) + Wide Right (8) - Zag
  {
    index: "03",
    id: "faas",
    title: "FaaS Infrastructure",
    subtitle: "Infinite Scale",
    description:
      "Battle-tested AI frameworks and serverless infrastructure scaling to millions of requests.",
    href: "/service/faas",
    icon: Layers,
    colSpan: "md:col-span-4",
  },
  {
    index: "04",
    id: "tailored",
    title: "Tailored Solutions",
    subtitle: "Bespoke Architecture",
    description:
      "Custom-built AI architectures designed specifically for your unique business challenges and data.",
    href: "/service/tailored-solutions",
    icon: Zap,
    colSpan: "md:col-span-8",
  },
  // Row 3: Balanced (6 + 6) - Zig
  {
    index: "05",
    id: "industry",
    title: "Industry Excellence",
    subtitle: "Vertical Specialist",
    description:
      "Specialized vertical solutions optimized for compliance-heavy sectors like healthcare and finance.",
    href: "/service/industry-excellence",
    icon: Globe,
    colSpan: "md:col-span-6",
  },
  {
    index: "06",
    id: "lab",
    title: "Innovation Lab",
    subtitle: "R&D Partners",
    description:
      "Partner with our R&D team to explore emerging technologies before they hit the mainstream. From Quantum AI to Neuromorphic computing.",
    href: "/service/innovation-lab",
    icon: Lightbulb,
    colSpan: "md:col-span-6",
  },
];

export function Service() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Mouse tracking logic for the flowing spotlight border effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return;

    cardsRef.current.forEach((card) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  };

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(cards, {
        y: 40,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "all",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className={cn("relative w-full py-24 md:py-32 bg-[#020305] overflow-hidden")}
    >
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader
          title="Holistic Intelligence"
          subtitle="Explore our comprehensive suite of AI solutions designed to transform your enterprise."
          align="center"
          className="mb-20"
        />

        {/* Stable Bento Grid Container */}
        <div
          ref={gridRef}
          onMouseMove={handleMouseMove}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
        >
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={cn(
                service.colSpan,
                "product-card group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-primary-feature cursor-pointer"
              )}
            >
              {/* Mouse-tracking border glow */}
              <div
                className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(19, 245, 132, 0.4), transparent 40%)`,
                }}
              />

              {/* Inner spotlight effect */}
              <div
                className="absolute inset-[1px] rounded-[31px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(19, 245, 132, 0.12), transparent 50%)`,
                }}
              />

              {/* Card Content */}
              <div className="relative flex flex-col p-6 sm:p-8 md:p-10">
                {/* Header Row - Product Card Style */}
                <div className="relative z-10 flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-xl text-primary filter-glow-primary-small">
                    <service.icon size={20} strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-mono tracking-[0.2em] text-white/60">
                    / SERVICE_{service.index}
                  </span>
                </div>

                {/* Main Content - Slides up on hover */}
                <div className="relative z-10 mt-auto transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]">
                  {/* Title - Always Visible, moves up with content */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-500 ease-out">
                    {service.title}
                  </h3>

                  {/* Description - Fades in on Hover */}
                  <p className="text-light-gray-90 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out delay-100">
                    {service.description}
                  </p>

                  {/* Button - Fades in with Stagger */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out delay-200 inline-block">
                    <Button variant="primary" size="default">
                      EXPLORE
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
