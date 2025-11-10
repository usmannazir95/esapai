"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

interface TeamCardProps {
  member: TeamMember;
  isLarge?: boolean;
  className?: string;
}

export function TeamCard({ member, isLarge = false, className = "" }: TeamCardProps) {
  const imageHeight = isLarge ? "h-64 md:h-72" : "h-56 md:h-60";

  return (
    <div
      className={cn(
        "group relative w-full",
        isLarge ? "max-w-md" : "max-w-sm flex-1",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0f241a] via-[#0b1712] to-[#050a08] shadow-[0_40px_80px_rgba(12,255,165,0.08)] transition-transform duration-500 group-hover:-translate-y-1">
        {/* Top Image */}
        <div className={cn("relative w-full overflow-hidden", imageHeight)}>
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(min-width: 768px) 320px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Crect fill='%23131313' width='320' height='320'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2313f584' font-size='72' font-family='Arial'%3E" +
                encodeURIComponent(member.name.charAt(0)) +
                "%3C/text%3E%3C/svg%3E";
            }}
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#04120b]/70" />
        </div>

        {/* Content */}
        <div className="relative px-6 pt-6 pb-8 md:px-8 md:pb-10 space-y-4 bg-gradient-to-b from-[#0d271b]/80 via-[#0a1b14]/70 to-[#06130d]/90">
          <span className="inline-flex items-center rounded-full border border-[#1EF38A]/40 bg-[#1EF38A]/10 px-4 py-1 text-sm font-semibold text-[#1EF38A] shadow-[0_0_24px_rgba(30,243,138,0.45)]">
            {member.role}
          </span>

          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-semibold text-white drop-shadow-[0_4px_20px_rgba(14,255,164,0.25)]">
              {member.name}
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-light-gray-90">
              {member.description}
            </p>
          </div>
        </div>

        {/* Edge highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/10 mix-blend-screen opacity-60" />
        <div className="pointer-events-none absolute -left-24 top-10 h-32 w-32 rounded-full bg-[#16f585]/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
        <div className="pointer-events-none absolute -right-24 bottom-12 h-32 w-32 rounded-full bg-[#16f585]/10 blur-3xl transition-opacity duration-500 group-hover:opacity-70" />
      </div>
    </div>
  );
}

