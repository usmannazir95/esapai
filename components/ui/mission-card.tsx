"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MissionCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  image?: string;
  className?: string;
  index?: number;
}

export function MissionCard({ title, description, icon: Icon, image, className }: MissionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  // Continuous breathing/floating animation
  useGSAP(() => {
    if (!gridRef.current) return;

    // Grid gentle float
    gsap.to(gridRef.current, {
      y: 6,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Image breathing float
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: -10,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    return () => {
      gsap.killTweensOf(gridRef.current);
      if (imageRef.current) gsap.killTweensOf(imageRef.current);
    };
  }, { scope: cardRef });

  const handleMouseEnter = () => {
    isHovering.current = true;
    if (gridRef.current) gsap.killTweensOf(gridRef.current);
    if (imageRef.current) gsap.killTweensOf(imageRef.current);
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
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
              y: 6,
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
              y: -10,
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

    if (gridRef.current) {
      gsap.to(gridRef.current, {
        x: x * 20,
        y: y * 20,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: x * -15,
        y: y * -10,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative flex flex-col justify-between h-full p-8",
        "rounded-[32px] border border-white/5",
        "shadow-[0_0_10px_rgba(19,245,132,0.3)] transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(19,245,132,0.5)] hover:-translate-y-1",
        className
      )}
      style={{
        background: `linear-gradient(160deg, #0d3025 0%, #0a2a1f 30%, #071d16 60%, #041510 100%)`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Background overlays container - clipped to card bounds */}
      <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none">
        {/* Green Grid Pattern Background */}
        <div
          ref={gridRef}
          className="absolute inset-[-10px] bg-grid-green opacity-40 mix-blend-plus-lighter"
        />

        {/* Subtle top glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(19,245,132,0.1),transparent_60%)]" />

        {/* Bottom gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030d0a]/90 via-transparent to-transparent" />
      </div>

      {/* Bento Grid Image - Top */}
      {image && (
        <div
          ref={imageRef}
          className="relative w-full h-48 mb-6 -mt-4 flex items-center justify-center z-10 transition-transform duration-500 group-hover:scale-105"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-2 drop-shadow-[0_0_15px_rgba(19,245,132,0.3)]"
          />
        </div>
      )}

      {/* Icon Section (Fallback if no image) */}
      {!image && Icon && (
        <div className="relative mb-6 z-10">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-primary/10 text-white/70 group-hover:text-primary group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500 shadow-[0_0_15px_-5px_rgba(19,245,132,0.2)]">
            <Icon size={28} />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col mt-auto">
        {/* Accent line */}
        <div className="w-8 h-[2px] bg-primary/60 mb-4 group-hover:w-12 transition-all duration-300" />

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-white leading-tight mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Divider dot */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1 h-1 rounded-full bg-primary/50" />
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span className="w-1 h-1 rounded-full bg-primary/20" />
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-white/60 font-normal leading-relaxed group-hover:text-white/80 transition-colors duration-300">
          {description}
        </p>
      </div>

    </div>
  );
}
