"use client";

import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MarqueeScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right";
  speed?: number;
  scrub?: number | boolean;
  start?: string;
  end?: string;
  repeat?: number;
  fadeEdges?: boolean;
  fadeWidth?: string;
}

export function MarqueeScroll({
  children,
  className = "",
  direction = "left",
  speed = 25,
  scrub = 1,
  start = "top bottom",
  end = "bottom top",
  repeat = 3,
  fadeEdges = true,
  fadeWidth = "10%",
}: MarqueeScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useLayoutEffect(() => {
    if (!isClient || !containerRef.current || !marqueeRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const xValue = direction === "left" ? `-${speed}%` : `${speed}%`;

      gsap.to(marqueeRef.current, {
        x: xValue,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          end,
          scrub,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isClient, direction, speed, scrub, start, end]);

  // Create repeated content for seamless scroll
  const repeatedContent = Array(repeat)
    .fill(null)
    .map((_, i) => (
      <div key={i} className="flex-shrink-0">
        {children}
      </div>
    ));

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden relative", className)}
    >
      {/* Fade edges */}
      {fadeEdges && (
        <>
          <div
            className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{
              width: fadeWidth,
              background:
                "linear-gradient(to right, var(--background, #030303), transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{
              width: fadeWidth,
              background:
                "linear-gradient(to left, var(--background, #030303), transparent)",
            }}
          />
        </>
      )}

      {/* Marquee content */}
      <div
        ref={marqueeRef}
        className="flex gap-8"
        style={{
          willChange: "transform",
        }}
      >
        {repeatedContent}
      </div>
    </div>
  );
}

export default MarqueeScroll;
