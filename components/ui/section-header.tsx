import React from "react";
import type { SectionHeaderProps } from "@/types/props";

export function SectionHeader({
  title,
  subtitle,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
}: SectionHeaderProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        {/* Main Title - Modern gradient with green accent */}
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-center leading-tight bg-gradient-to-br from-white via-gray-100 to-primary/60 bg-clip-text text-transparent ${titleClassName}`}
        >
          {title}
        </h2>

        {/* Subtitle - Refined gray with subtle warmth */}
        {subtitle && (
          <p
            className={`text-base sm:text-lg md:text-xl lg:text-xl text-center text-gray-400/90 max-w-5xl mx-auto px-4 mb-12 sm:mb-14 md:mb-16 leading-relaxed ${subtitleClassName}`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

