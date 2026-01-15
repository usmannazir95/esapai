"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
  height?: number;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  showGlow?: boolean;
  glowColor?: string;
  fixed?: boolean;
  zIndex?: number;
}

export function ScrollProgress({
  className = "",
  height = 3,
  gradientFrom = "#a855f7",
  gradientVia = "#ec4899",
  gradientTo = "#a855f7",
  showGlow = true,
  glowColor = "rgba(168, 85, 247, 0.6)",
  fixed = true,
  zIndex = 9999,
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "left-0 top-0 w-full pointer-events-none",
        fixed ? "fixed" : "absolute",
        className
      )}
      style={{
        height: `${height}px`,
        zIndex,
      }}
    >
      {/* Background track */}
      <div className="absolute inset-0 bg-white/5" />

      {/* Progress bar */}
      <div
        className="absolute inset-y-0 left-0 transition-[width] duration-100 ease-out"
        style={{
          width: `${progress}%`,
          background: `linear-gradient(to right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`,
        }}
      />

      {/* Glowing tail effect */}
      {showGlow && (
        <div
          className="absolute top-0 h-full w-24 transition-[left] duration-100 ease-out"
          style={{
            left: `calc(${progress}% - 96px)`,
            background: `linear-gradient(to right, transparent, ${glowColor})`,
            filter: "blur(8px)",
          }}
        />
      )}

      {/* Bright point at the end */}
      {showGlow && (
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-[left] duration-100 ease-out"
          style={{
            left: `calc(${progress}% - 6px)`,
            background: glowColor,
            boxShadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`,
          }}
        />
      )}
    </div>
  );
}

export default ScrollProgress;
