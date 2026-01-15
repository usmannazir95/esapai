"use client";

import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface CharacterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  triggerOnView?: boolean;
  threshold?: number;
}

export function CharacterReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
  duration = 0.8,
  ease = "back.out(1.7)",
  triggerOnView = false,
  threshold = 0.2,
}: CharacterRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!triggerOnView);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Intersection observer for triggerOnView
  useEffect(() => {
    if (!triggerOnView) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [triggerOnView, threshold, hasAnimated]);

  // Delay trigger for non-triggerOnView mode
  useLayoutEffect(() => {
    if (triggerOnView) return;

    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay, triggerOnView]);

  // Animation
  useLayoutEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const chars = containerRef.current.querySelectorAll(".char");

    gsap.fromTo(
      chars,
      {
        y: "100%",
        opacity: 0,
        rotateX: -90,
      },
      {
        y: "0%",
        opacity: 1,
        rotateX: 0,
        duration,
        ease,
        stagger,
        force3D: true,
      }
    );
  }, [isVisible, duration, ease, stagger]);

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden", className)}
      style={{ perspective: "1000px" }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block"
          style={{
            opacity: 0,
            transformStyle: "preserve-3d",
            willChange: "transform, opacity",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}

export default CharacterReveal;
