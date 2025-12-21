import React from "react";
import type { SectionHeaderProps } from "@/types/props";

export function SectionHeader({
  title,
  subtitle,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  hasGreenGlow = false,
}: SectionHeaderProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Beautiful Layered Glow Background Effect */}
      {hasGreenGlow && (
        <>
          {/* Base Layer - Large radial gradient centered on content */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full max-w-5xl h-[140%] pointer-events-none"
            style={{
              background: `radial-gradient(
                ellipse 80% 50% at 50% 50%,
                rgba(19, 245, 132, 0.12) 0%,
                rgba(19, 245, 132, 0.08) 30%,
                rgba(19, 245, 132, 0.04) 50%,
                transparent 75%
              )`,
              filter: "blur(60px)",
              zIndex: 0,
            }}
            aria-hidden="true"
          />

          {/* Top Accent Layer - Above title for depth */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-[15%] w-[70%] max-w-4xl h-[40%] pointer-events-none"
            style={{
              background: `radial-gradient(
                ellipse 70% 45% at 50% 60%,
                rgba(19, 245, 132, 0.10) 0%,
                rgba(19, 245, 132, 0.06) 35%,
                transparent 65%
              )`,
              filter: "blur(55px)",
              zIndex: 0,
            }}
            aria-hidden="true"
          />

          {/* Center Accent Layer - At center for intensity */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[60%] max-w-3xl h-[60%] pointer-events-none"
            style={{
              background: `radial-gradient(
                circle at 50% 50%,
                rgba(19, 245, 132, 0.11) 0%,
                rgba(19, 245, 132, 0.07) 30%,
                rgba(19, 245, 132, 0.03) 55%,
                transparent 75%
              )`,
              filter: "blur(65px)",
              zIndex: 0,
            }}
            aria-hidden="true"
          />

          {/* Bottom Accent Layer - Below subtitle */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-[10%] w-[65%] max-w-3xl h-[35%] pointer-events-none"
            style={{
              background: `radial-gradient(
                ellipse 75% 50% at 50% 40%,
                rgba(19, 245, 132, 0.09) 0%,
                rgba(19, 245, 132, 0.05) 40%,
                transparent 70%
              )`,
              filter: "blur(58px)",
              zIndex: 0,
            }}
            aria-hidden="true"
          />

          {/* Top Blend Layer - Seamless fade from dark background */}
          <div
            className="absolute inset-x-0 top-0 h-[30%] pointer-events-none"
            style={{
              background: `linear-gradient(
                to bottom,
                transparent 0%,
                rgba(19, 245, 132, 0.03) 50%,
                rgba(19, 245, 132, 0.01) 100%
              )`,
              filter: "blur(45px)",
              zIndex: 0,
            }}
            aria-hidden="true"
          />

          {/* Bottom Blend Layer - Seamless fade to dark background */}
          <div
            className="absolute inset-x-0 bottom-0 h-[30%] pointer-events-none"
            style={{
              background: `linear-gradient(
                to top,
                transparent 0%,
                rgba(19, 245, 132, 0.03) 50%,
                rgba(19, 245, 132, 0.01) 100%
              )`,
              filter: "blur(45px)",
              zIndex: 0,
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
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
    </div>
  );
}

