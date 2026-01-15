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

gsap.registerPlugin(ScrollTrigger);

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
  className?: string;
}

function ServiceCard({ service, className }: ServiceCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  // Continuous ambient floating animation (breathing effect)
  useGSAP(() => {
    if (!gridRef.current || !imageRef.current) return;

    // Grid gentle float
    gsap.to(gridRef.current, {
      y: 8,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Image breathing float - simple up and down
    gsap.to(imageRef.current, {
      y: -12,
      duration: 2.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      gsap.killTweensOf(gridRef.current);
      gsap.killTweensOf(imageRef.current);
    };
  }, { scope: cardRef });

  const handleMouseEnter = () => {
    isHovering.current = true;
    if (videoRef.current) {
      videoRef.current.play().catch((e) => {
        console.warn("Video play failed", e);
      });
    }
    // Pause ambient animation and take over with mouse control
    if (gridRef.current) gsap.killTweensOf(gridRef.current);
    if (imageRef.current) gsap.killTweensOf(imageRef.current);
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    if (videoRef.current) {
      videoRef.current.pause();
    }
    // Resume breathing animation
    if (gridRef.current) {
      gsap.to(gridRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "sine.out",
        onComplete: () => {
          if (!isHovering.current && gridRef.current) {
            gsap.to(gridRef.current, {
              y: 8,
              duration: 3,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          }
        }
      });
    }
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "sine.out",
        onComplete: () => {
          if (!isHovering.current && imageRef.current) {
            gsap.to(imageRef.current, {
              y: -12,
              duration: 2.5,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          }
        }
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovering.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Parallax on grid
    if (gridRef.current) {
      gsap.to(gridRef.current, {
        x: x * 30,
        y: y * 30,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    // Parallax on image (opposite direction for depth)
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: x * -20,
        y: y * -15,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden transition-all duration-500 cursor-pointer h-full rounded-[32px] md:rounded-[40px] border border-white/10 shadow-[0_0_30px_rgba(19,245,132,0.15)] hover:shadow-[0_0_80px_rgba(19,245,132,0.5)] hover:border-primary/50",
        className
      )}
      style={{
        background: `linear-gradient(160deg, #0d3025 0%, #0a2a1f 30%, #071d16 60%, #041510 100%)`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Background overlays with parallax */}
      <div className="absolute inset-0 rounded-[32px] md:rounded-[40px] overflow-hidden pointer-events-none">
        <div
          ref={gridRef}
          className="absolute inset-[-20px] bg-grid-green opacity-25 mix-blend-plus-lighter transition-transform"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(19,245,132,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030d0a]/80 via-transparent to-transparent" />
      </div>

      {/* Accent glow - enhanced on hover */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] opacity-15 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-[-30%] right-[-20%] w-full h-full bg-primary blur-[120px] group-hover:blur-[150px] rounded-full transition-all duration-500"></div>
      </div>

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

      {/* Static Image Background with parallax */}
      {service.image && (
        <div
          ref={imageRef}
          className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-100 group-hover:opacity-20 transition-opacity duration-500 ease-out z-0"
        >
          <img
            src={service.image}
            alt=""
            className="absolute right-0 top-1/2 -translate-y-1/2 h-[80%] w-auto object-contain object-right pr-4 md:pr-10"
          />
        </div>
      )}

      {/* Card Content */}
      <div className="relative z-10 flex flex-col p-8 md:p-10 lg:p-12 h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs md:text-sm font-bold tracking-[0.3em] text-primary/70 uppercase">
            SERVICE_{service.index}
          </span>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
            <ArrowRight size={18} className="text-white/60 group-hover:text-black transform group-hover:rotate-[-45deg] transition-all duration-500" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 group-hover:text-primary transition-colors duration-500 ease-out leading-tight max-w-[85%]">
            {service.title}
          </h3>

          <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6 max-w-[90%] md:max-w-[70%] group-hover:text-white/70 transition-colors duration-500">
            {service.description}
          </p>
        </div>

        {/* Footer CTA */}
        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
            <Button variant="primary" size="default">
              EXPLORE SERVICE
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Group services into pairs
const SERVICE_GROUPS = [
  [SERVICES[0], SERVICES[1]], // Group 1: Services 01 & 02
  [SERVICES[2], SERVICES[3]], // Group 2: Services 03 & 04
  [SERVICES[4], SERVICES[5]], // Group 3: Services 05 & 06
];

export function Service() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Fixed background opacity control - fades in when Services arrives, stays for Product Showcase
  useGSAP(
    () => {
      if (!bgRef.current || !sectionRef.current) return;

      // Background fades in as Services section enters viewport
      gsap.to(bgRef.current, {
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      });
    },
    { dependencies: [] }
  );

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      const groups = trackRef.current.querySelectorAll('.service-group');
      const totalGroups = groups.length;

      if (totalGroups === 0) return;


      // Get header elements for animations
      const headerEl = sectionRef.current.querySelector('[data-testid="section-header"]');
      const titleEl = headerEl?.querySelector('h2');
      const subtitleEl = headerEl?.querySelector('p');

      // Set initial state for header - hidden for reveal
      if (titleEl) {
        gsap.set(titleEl, { opacity: 0, y: 60, filter: "blur(10px)" });
      }
      if (subtitleEl) {
        gsap.set(subtitleEl, { opacity: 0, y: 40, filter: "blur(8px)" });
      }

      // Header reveal animation - triggers as section enters
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
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

      // Set initial state - all groups start invisible and non-interactive
      groups.forEach((group, groupIndex) => {
        gsap.set(group, {
          opacity: 0,
          pointerEvents: groupIndex === 0 ? "auto" : "none", // Only first group interactive initially
        });

        // Set initial state for cards within each group - circular arc animation
        const cards = group.querySelectorAll('.service-card-wrapper');
        cards.forEach((card, cardIndex) => {
          const isLeft = cardIndex === 0;
          gsap.set(card, {
            x: isLeft ? -250 : 250,
            y: 150,
            opacity: 0,
            scale: 0.8,
            rotation: isLeft ? -12 : 12,
          });
        });
      });

      // Create main timeline with pin - Services scrolls over Vision then pins
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalGroups * 120}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate each group: enter → display → exit
      groups.forEach((group, i) => {
        const cards = group.querySelectorAll('.service-card-wrapper');

        // Phase 1: Group becomes visible and interactive
        tl.to(group, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.1,
        });

        // Phase 2: Cards enter with circular arc animation (like Agency)
        cards.forEach((card, cardIndex) => {
          tl.to(card, {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: "back.out(1.2)",
          }, i === 0 ? ">" : `-=${cardIndex === 0 ? 0 : 0.3}`);
        });

        // Phase 3: Hold for viewing
        tl.to({}, { duration: 0.6 });

        // Phase 4: Exit (except for the last group)
        if (i < totalGroups - 1) {
          // Cards exit with scale down, blur, and move up (like Agency stack)
          cards.forEach((card, cardIndex) => {
            tl.to(card, {
              scale: 0.85,
              opacity: 0,
              y: -100,
              filter: "blur(8px)",
              duration: 0.4,
              ease: "power2.in",
            }, cardIndex === 0 ? ">" : "-=0.3");
          });

          // Disable pointer events on exiting group, enable on next group
          tl.to(group, {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.1,
          });
        }
      });

      // Final hold
      tl.to({}, { duration: 0.4 });

      // Exit animation for entire section
      const lastGroup = groups[groups.length - 1];

      if (lastGroup) {
        const lastCards = lastGroup.querySelectorAll('.service-card-wrapper');
        lastCards.forEach((card, cardIndex) => {
          tl.to(card, {
            scale: 0.8,
            opacity: 0,
            y: -120,
            filter: "blur(10px)",
            duration: 0.4,
            ease: "power2.in",
          }, cardIndex === 0 ? ">" : "-=0.3");
        });
      }

      // Exit header with blur effect
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
    { scope: sectionRef }
  );

  return (
    <>
      {/* Fixed Background Layer - shared by Services and Product Showcase */}
      <div
        ref={bgRef}
        className="fixed inset-0 w-full h-full z-[38] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #0d3025 0%, #0a2a1f 25%, #071d16 50%, #041510 75%, #030d0a 100%)',
          opacity: 0,
        }}
      >
        {/* Grid overlay matching hero */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(19, 245, 132, 0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(19, 245, 132, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)',
          }}
        />
        {/* Ambient Background Glows */}
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full z-0" />
        <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-primary/5 blur-[100px] rounded-full z-0" />
      </div>

      {/* Content Section - scrolls and pins */}
      <section
        ref={sectionRef}
        className="relative min-h-screen flex flex-col pt-24 z-[40]"
        style={{
          background: 'linear-gradient(180deg, #0d3025 0%, #0a2a1f 25%, #071d16 50%, #041510 75%, #030d0a 100%)',
        }}
      >
        {/* Grid overlay matching hero */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(19, 245, 132, 0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(19, 245, 132, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)',
          }}
        />
        {/* Bottom gradient fade - softens edge when Product Showcase scrolls over */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[50vh] z-50 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(13,48,37,0.15) 20%, rgba(10,42,31,0.35) 40%, rgba(7,29,22,0.55) 60%, rgba(4,21,16,0.75) 80%, #041510 100%)',
          }}
        />
        <div className="container mx-auto px-4 md:px-6 relative z-10 mt-16 mb-6">
          <SectionHeader
            title="Our Services"
            subtitle="Explore our comprehensive suite of AI solutions designed to transform your enterprise."
            align="center"
          />
        </div>

        {/* Groups Container */}
        <div
          ref={trackRef}
          className="flex-grow flex items-start justify-center w-full relative z-10 px-4 md:px-8 lg:px-12 -mt-8"
        >
          <div className="relative w-full max-w-7xl h-[550px] md:h-[500px]">
            {SERVICE_GROUPS.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="service-group absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
              >
                {group.map((service) => (
                  <div
                    key={service.id}
                    className="service-card-wrapper h-[480px] md:h-[500px]"
                  >
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
