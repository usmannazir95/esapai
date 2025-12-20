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
    <div className={className}>
      {/* Main Title - Unified responsive sizing */}
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-center text-gradient-radial-white leading-tight ${titleClassName}`}
      >
        {title}
      </h2>

      {/* Subtitle - Unified responsive styling */}
      {subtitle && (
        <p
          className={`text-base sm:text-lg md:text-xl lg:text-xl text-center text-light-gray-90 max-w-5xl mx-auto px-4 mb-12 sm:mb-14 md:mb-16 ${subtitleClassName}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

