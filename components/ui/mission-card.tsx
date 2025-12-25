import React from "react";
import Image from "next/image";
import type { MissionCardProps } from "@/types/props";

export function MissionCard({
  title,
  description,
  imageSrc = "/landing/mission/mission.svg",
  imageAlt = "Mission illustration",
  icon: Icon,
  className = "",
}: any) {
  return (
    <div className={`mission-card relative overflow-hidden h-full flex flex-col ${className}`}>
      {/* Animated Border Trail */}
      <div className="mission-card-border" />

      {/* Decorative Corner Glow */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/10 blur-[40px] rounded-full pointer-events-none z-0" />
      <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-primary/5 blur-[40px] rounded-full pointer-events-none z-0" />

      {/* Content */}
      <div className="relative p-6 h-full flex flex-col z-10">
        <h3 className="text-xl font-bold text-gradient-radial-white leading-tight mb-4">
          {title}
        </h3>

        {/* Card Description */}
        <p className="text-[14px] text-white-opacity-70 grow leading-relaxed">
          {description}
        </p>

        {/* Large Bottom Icon */}
        {Icon && (
          <div className="mt-4 flex justify-center pb-2">
            <div className="relative group/icon transition-all duration-500 hover:scale-110">
              {/* Intensified Glow Layer */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 w-12 bg-primary/40 blur-[24px] rounded-full pointer-events-none" />
              <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-primary/30 blur-[12px] rounded-full pointer-events-none" />

              <Icon size={40} className="text-primary relative z-10 opacity-90 filter brightness-[1.2] transition-transform duration-500" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

