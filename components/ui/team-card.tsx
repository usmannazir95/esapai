"use client";

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
  const imageHeight = isLarge ? "h-56 sm:h-64 md:h-72" : "h-48 sm:h-56 md:h-60";

  return (
    <div
      className={cn(
        "group relative w-full",
        isLarge ? "max-w-sm sm:max-w-md" : "max-w-xs sm:max-w-sm flex-1",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-linear-to-br from-[#0f241a] via-[#0b1712] to-[#050a08] shadow-[0_40px_80px_rgba(12,255,165,0.08)] transition-transform duration-500 group-hover:-translate-y-1">
        {/* Top Image */}
        <div className={cn("relative w-full overflow-hidden", imageHeight)}>
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Crect fill='%23131313' width='320' height='320'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2313f584' font-size='72' font-family='Arial'%3E" +
                encodeURIComponent(member.name.charAt(0)) +
                "%3C/text%3E%3C/svg%3E";
            }}
          />

          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#04120b]/70" />
        </div>

        {/* Content */}
        <div className="relative px-4 sm:px-6 md:px-8 pt-4 sm:pt-5 md:pt-6 pb-6 sm:pb-7 md:pb-8 lg:pb-10 space-y-3 sm:space-y-4 bg-linear-to-b from-[#0d271b]/80 via-[#0a1b14]/70 to-[#06130d]/90">
          <span className="inline-flex items-center rounded-full border border-[#1EF38A]/40 bg-[#1EF38A]/10 px-3 sm:px-4 py-1 text-xs sm:text-sm font-semibold text-[#1EF38A] shadow-[0_0_24px_rgba(30,243,138,0.45)]">
            {member.role}
          </span>

          <div className="space-y-1.5 sm:space-y-2">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white drop-shadow-[0_4px_20px_rgba(14,255,164,0.25)]">
              {member.name}
            </h3>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-light-gray-90">
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

