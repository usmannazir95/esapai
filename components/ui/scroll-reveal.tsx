"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  delay?: number;
  duration?: number;
  threshold?: number;
  scale?: number;
  rootMargin?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  distance = 40,
  delay = 0,
  duration = 800,
  threshold = 0.15,
  scale = 1,
  rootMargin = "0px 0px -50px 0px",
  once = false,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (once && hasAnimated) return;

        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            setHasAnimated(true);
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, hasAnimated]);

  const getTransform = () => {
    if (isVisible) return "translate3d(0,0,0) scale(1)";

    let transform = "";

    if (scale !== 1) {
      transform += `scale(${scale}) `;
    }

    switch (direction) {
      case "up":
        transform += `translate3d(0, ${distance}px, 0)`;
        break;
      case "down":
        transform += `translate3d(0, -${distance}px, 0)`;
        break;
      case "left":
        transform += `translate3d(${distance}px, 0, 0)`;
        break;
      case "right":
        transform += `translate3d(-${distance}px, 0, 0)`;
        break;
      default:
        break;
    }

    return transform;
  };

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        transition: `all ${duration}ms cubic-bezier(0.2, 0.65, 0.3, 1) ${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
