import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

import Image from "next/image";

interface MissionCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  image?: string;
  className?: string;
  index?: number;
}

export function MissionCard({ title, description, icon: Icon, image, className }: MissionCardProps) {
  return (
    <div className={cn(
      "group relative flex flex-col justify-between h-full p-8 overflow-hidden",
      "bg-[#050a05] rounded-[32px]",
      "transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_50px_-15px_rgba(19,245,132,0.3)] hover:-translate-y-1",
      className
    )}>
      {/* 
         Green Grid Pattern Background 
         - User Requested styles
      */}
      <div className="absolute inset-0 bg-grid-green opacity-40 mix-blend-plus-lighter pointer-events-none" />

      {/* Radial Gradient overlay to create the 'light/glow' effect user asked for to avoid being too dark */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(19,245,132,0.15),transparent_70%)] opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Bottom gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

      {/* Bento Grid Image - Top */}
      {image && (
        <div className="relative w-full h-48 mb-6 -mt-4 flex items-center justify-center z-10 transition-transform duration-500 group-hover:scale-105">
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
      <div className="relative z-10 flex flex-col gap-3 mt-auto">
        {/* Title - Large and bold */}
        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-300 drop-shadow-lg">
          {title}
        </h3>
        {/* Description - Lighter to avoid looking 'dark' */}
        <p className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Decorative Corner Glow */}
      <div className="absolute top-0 right-0 p-12 opacity-30 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none">
        <div className="w-32 h-32 bg-primary/20 blur-[80px] rounded-full" />
      </div>
    </div>
  );
}
