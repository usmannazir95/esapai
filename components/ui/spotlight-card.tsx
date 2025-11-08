"use client";

import React, { useState, useRef, MouseEvent, useCallback, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  glowColor?: string;
  onMouseMove?: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(19, 245, 132, 0.15)",
  glowColor = "rgba(19, 245, 132, 0.3)",
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
}: SpotlightCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const rectRef = useRef<DOMRect | null>(null);

  // Cache bounding rect and only recalculate when needed
  const updateMousePosition = useCallback((clientX: number, clientY: number) => {
    if (!cardRef.current) return;

    // Only recalculate rect if card position might have changed (e.g., after scroll)
    // For mouse moves within the same frame, reuse cached rect
    if (!rectRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }

    const x = clientX - rectRef.current.left;
    const y = clientY - rectRef.current.top;

    setMousePosition({ x, y });
  }, []);

  // Throttle mouse move using requestAnimationFrame for smooth 60fps updates
  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (rafRef.current !== null) {
      return; // Skip if already scheduled
    }

    rafRef.current = requestAnimationFrame(() => {
      updateMousePosition(e.clientX, e.clientY);
      onMouseMove?.(e);
      rafRef.current = null;
    });
  }, [updateMousePosition, onMouseMove]);

  const handleMouseEnter = useCallback(() => {
    // Reset rect cache on enter to ensure accurate position
    rectRef.current = null;
    setIsHovered(true);
    onMouseEnter?.();
  }, [onMouseEnter]);

  const handleMouseLeave = useCallback(() => {
    // Cancel any pending animation frame
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsHovered(false);
    rectRef.current = null; // Clear cache on leave
    onMouseLeave?.();
  }, [onMouseLeave]);

  // Invalidate rect cache on scroll when card is hovered
  useEffect(() => {
    if (!isHovered) return;

    const handleScroll = () => {
      rectRef.current = null; // Invalidate cache on scroll
    };

    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isHovered]);

  // Memoize style calculations to avoid recreating on every render
  const spotlightStyle = useMemo(() => {
    if (!isHovered) return { opacity: 0 };
    
    return {
      background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor} 0%, ${spotlightColor.replace("0.15", "0.05")} 30%, transparent 60%)`,
    };
  }, [mousePosition.x, mousePosition.y, spotlightColor, isHovered]);

  const glowStyle = useMemo(() => {
    if (!isHovered) return { opacity: 0, boxShadow: "none" };
    
    return {
      boxShadow: `0 0 40px ${glowColor}, inset 0 0 40px ${glowColor.replace("0.3", "0.1")}`,
    };
  }, [isHovered, glowColor]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "product-card relative overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-[1.02] will-change-transform",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight Effect - Radial Gradient Background */}
      {/* Note: Dynamic styles required for mouse position tracking - cannot use static Tailwind classes */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none will-change-[opacity,background]"
        style={spotlightStyle}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Additional Glow Effect on Hover */}
      {/* Note: Dynamic styles required for conditional hover glow - cannot use static Tailwind classes */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[32px] will-change-[opacity,box-shadow]"
        style={glowStyle}
      />
    </div>
  );
}

