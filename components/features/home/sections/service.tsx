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
import { NeuralBackground as NeuralCanvas } from "@/components/ui/background/neural-canvas";

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
    colSpan: "md:col-span-7",
    videoSrc: "/WKB 1.mp4",
    image: "/bentogird/agenticai.svg",
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
    colSpan: "md:col-span-5",
    videoSrc: "/WKB 1.mp4",
    image: "/bentogird/enterprise.svg",
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
    colSpan: "md:col-span-5",
    videoSrc: "/WKB 1.mp4",
    image: "/bentogird/faas.svg",
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
    colSpan: "md:col-span-7",
    videoSrc: "/WKB 1.mp4",
    image: "/bentogird/aisolution.svg",
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
    videoSrc: "/WKB 1.mp4",
    image: "/bentogird/industry.svg",
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
    videoSrc: "/WKB 1.mp4",
    image: "/bentogird/ailab.svg",
  },
];

interface ServiceCardProps {
  service: (typeof SERVICES)[0];
  index: number;
  setRef: (el: HTMLDivElement | null) => void;
}

function ServiceCard({ service, index, setRef }: ServiceCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((e) => {
        // Handle autoplay restrictions (though muted should work)
        console.warn("Video play failed", e);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      // Optional: reset to start
      // videoRef.current.currentTime = 0; 
    }
  };

  return (
    <div
      ref={setRef}
      className={cn(
        service.colSpan,
        "product-card group relative overflow-hidden transition-all duration-300 hover:shadow-glow-primary-feature cursor-pointer bg-black/60 backdrop-blur-sm"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >


      {/* Video Background */}
      {service.videoSrc && (
        <video
          ref={videoRef}
          src={service.videoSrc}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-30 transition-opacity duration-700 ease-out z-0 mix-blend-screen"
        />
      )}

      {/* Static Image Background (Visible when NOT hovered) */}
      {service.image && (
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-out z-0">
          <img
            src={service.image}
            alt=""
            className="absolute right-0 top-1/2 -translate-y-1/2 h-[90%] w-auto object-contain object-right pr-6 md:pr-10"
          />
        </div>
      )}

      {/* Card Content - z-10 ensures it sits above video */}
      <div className="relative z-10 flex flex-col p-6 sm:p-8 md:p-10 h-full">
        {/* Header Row - Product Card Style */}
        <div className="relative z-10 flex items-center mb-8">
          <span className="text-sm tracking-[0.2em] text-white">
            SERVICE_{service.index}
          </span>
        </div>

        {/* Main Content - Slides up on hover */}
        <div className="relative z-10 mt-auto transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]">
          {/* Title - Always Visible, moves up with content */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-500 ease-out max-w-[85%] md:max-w-[70%]">
            {service.title}
          </h3>

          {/* Description - Fades in on Hover */}
          <p className="text-white/90 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out delay-100 max-w-[90%] md:max-w-[65%]">
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
  );
}

export function Service() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

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

      // Smooth Header Reveal
      const header = containerRef.current.querySelector('[data-testid="section-header"]');
      if (header) {
        gsap.fromTo(header,
          {
            opacity: 0,
            y: 30,
            filter: "blur(8px)"
          },
          {
            scrollTrigger: {
              trigger: containerRef.current,
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
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className={cn("relative w-full py-24 md:py-32 bg-[#020305] z-20 overflow-hidden")}
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
      }}
    >
      <NeuralCanvas className="absolute inset-0 z-0" />

      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-primary/5 blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader
          title="Our Services"
          subtitle="Explore our comprehensive suite of AI solutions designed to transform your enterprise."
          align="center"
          className="mb-20"
        />

        {/* Stable Bento Grid Container */}
        <div className="">
          <div
            className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4"
          >
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                setRef={(el) => {
                  cardsRef.current[index] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
