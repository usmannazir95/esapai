"use client";

import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollFillTextProps {
  children: string;
  className?: string;
  startOpacity?: number;
  endOpacity?: number;
  stagger?: number;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  highlightWords?: number[];
  highlightClassName?: string;
}

export function ScrollFillText({
  children,
  className = "",
  startOpacity = 0.15,
  endOpacity = 1,
  stagger = 0.1,
  start = "top 80%",
  end = "top 30%",
  scrub = 1,
  highlightWords = [],
  highlightClassName = "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400",
}: ScrollFillTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useLayoutEffect(() => {
    if (!isClient || !containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // If reduced motion, show text at full opacity
      const words = containerRef.current.querySelectorAll(".scroll-word");
      gsap.set(words, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const words = containerRef.current?.querySelectorAll(".scroll-word");
      if (!words) return;

      gsap.fromTo(
        words,
        {
          opacity: startOpacity,
          y: 10,
        },
        {
          opacity: endOpacity,
          y: 0,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            end,
            scrub,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isClient, startOpacity, endOpacity, stagger, start, end, scrub]);

  const words = children.split(" ");

  return (
    <div ref={containerRef} className={cn(className)}>
      {words.map((word, i) => (
        <span
          key={i}
          className={cn(
            "scroll-word inline-block mr-2 md:mr-3",
            highlightWords.includes(i) && highlightClassName
          )}
          style={{
            opacity: isClient ? startOpacity : 1,
            willChange: "opacity, transform",
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

export default ScrollFillText;
