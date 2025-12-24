"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/types/ui";
import type { TeamCardProps } from "@/types/props";

export type { TeamMember };

export function TeamCard({ member, isLarge = false, isWide = false, className = "" }: TeamCardProps) {
  const imageHeight = isWide ? "h-full" : (isLarge ? "h-56 sm:h-64 md:h-72" : "h-48 sm:h-56 md:h-60");

  return (
    <div
      className={cn(
        "group relative w-full",
        isWide ? "max-w-4xl" : (isLarge ? "max-w-sm sm:max-w-md" : "max-w-xs sm:max-w-sm flex-1"),
        className
      )}
    >
      <div className={cn(
        "relative overflow-hidden rounded-[32px] border border-white/10 bg-linear-to-br from-[#0f241a] via-[#0b1712] to-[#050a08] shadow-[0_40px_80px_rgba(12,255,165,0.08)] transition-transform duration-500 group-hover:-translate-y-1",
        isWide && "flex flex-col md:flex-row min-h-[450px]"
      )}>
        {/* Top Image */}
        <div className={cn(
          "relative overflow-hidden",
          isWide ? "w-full md:w-[50%] min-h-[350px] md:min-h-full" : cn("w-full", imageHeight)
        )}>
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes={isWide ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
            className="object-cover object-[80%_top] transition-transform duration-500 group-hover:scale-105"
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
        <div className={cn(
          "relative px-6 sm:px-8 md:px-10 pt-6 sm:pt-8 md:pt-10 pb-8 sm:pb-10 md:pb-12 space-y-4 sm:space-y-6 bg-linear-to-b from-[#0d271b]/80 via-[#0a1b14]/70 to-[#06130d]/90",
          isWide ? "w-full md:w-[50%] flex flex-col justify-center py-10 md:py-16" : ""
        )}>
          <span className="inline-flex items-center rounded-full border border-[#1EF38A]/40 bg-[#1EF38A]/10 px-3 sm:px-4 py-1 text-xs sm:text-sm font-semibold text-[#1EF38A] shadow-[0_0_24px_rgba(30,243,138,0.45)] w-fit">
            {member.role}
          </span>

          <div className="space-y-1.5 sm:space-y-2">
            <h3 className={cn(
              "font-semibold text-white drop-shadow-[0_4px_20px_rgba(14,255,164,0.25)]",
              isWide ? "text-2xl sm:text-3xl md:text-4xl lg:text-5xl" : "text-xl sm:text-2xl md:text-3xl"
            )}>
              {member.name}
            </h3>
            <p className={cn(
              "leading-relaxed text-light-gray-90",
              isWide ? "text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl" : "text-xs sm:text-sm md:text-base"
            )}>
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

