"use client";

import React, {
  useState,
  useRef,
  MouseEvent,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import type { SpotlightCardProps } from "@/types/props";

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(19, 245, 132, 0.15)",
  glowColor = "rgba(19, 245, 132, 0.3)",
  enableTilt = false,
  tiltIntensity = 8,
  borderRadius = "32px",
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
}: SpotlightCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const rectRef = useRef<DOMRect | null>(null);

  // Cache bounding rect and only recalculate when needed
  const updateMousePosition = useCallback(
    (clientX: number, clientY: number) => {
      if (!cardRef.current) return;

      if (!rectRef.current) {
        rectRef.current = cardRef.current.getBoundingClientRect();
      }

      const x = clientX - rectRef.current.left;
      const y = clientY - rectRef.current.top;

      setMousePosition({ x, y });

      // 3D tilt effect with GSAP
      if (enableTilt && cardRef.current) {
        const rotateX = ((y / rectRef.current.height) - 0.5) * -tiltIntensity;
        const rotateY = ((x / rectRef.current.width) - 0.5) * tiltIntensity;

        gsap.to(cardRef.current, {
          rotateX,
          rotateY,
          duration: 0.6,
          ease: "power2.out",
          force3D: true,
        });
      }

      // Animate spotlight and glow with GSAP for smoother movement
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          left: x,
          top: y,
          duration: 0.4,
          ease: "power3.out",
        });
      }

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          left: x,
          top: y,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    },
    [enableTilt, tiltIntensity]
  );

  // Throttle mouse move using requestAnimationFrame for smooth 60fps updates
  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = requestAnimationFrame(() => {
        updateMousePosition(e.clientX, e.clientY);
        onMouseMove?.(e);
        rafRef.current = null;
      });
    },
    [updateMousePosition, onMouseMove]
  );

  const handleMouseEnter = useCallback(() => {
    rectRef.current = null;
    setIsHovered(true);
    onMouseEnter?.();

    // Animate spotlight and glow in
    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        opacity: 0.025,
        duration: 0.6,
      });
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.15,
        duration: 0.6,
      });
    }
  }, [onMouseEnter]);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsHovered(false);
    rectRef.current = null;
    onMouseLeave?.();

    // Reset 3D tilt with elastic bounce
    if (enableTilt && cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)",
      });
    }

    // Fade out spotlight and glow
    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        opacity: 0,
        duration: 0.4,
      });
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.4,
      });
    }
  }, [enableTilt, onMouseLeave]);

  // Invalidate rect cache on scroll when card is hovered
  useEffect(() => {
    if (!isHovered) return;

    const handleScroll = () => {
      rectRef.current = null;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isHovered]);

  // Legacy spotlight style for backward compatibility (non-GSAP mode)
  const spotlightStyle = useMemo(() => {
    if (!isHovered || enableTilt) return { opacity: 0 };

    return {
      background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor} 0%, ${spotlightColor.replace("0.15", "0.05")} 30%, transparent 60%)`,
    };
  }, [mousePosition.x, mousePosition.y, spotlightColor, isHovered, enableTilt]);

  const legacyGlowStyle = useMemo(() => {
    if (!isHovered || enableTilt)
      return { opacity: 0, boxShadow: "none" };

    return {
      boxShadow: `0 0 40px ${glowColor}, inset 0 0 40px ${glowColor.replace("0.3", "0.1")}`,
    };
  }, [isHovered, glowColor, enableTilt]);

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
      style={{
        transformStyle: enableTilt ? "preserve-3d" : undefined,
        borderRadius,
      }}
    >
      {/* Enhanced Spotlight Effect - GSAP animated (for tilt mode) */}
      {enableTilt && (
        <>
          <div
            ref={spotlightRef}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-[3000px] h-[3000px] opacity-0 blur-[500px] z-0"
            style={{
              background: `radial-gradient(circle, ${spotlightColor.replace("0.15", "1")} 0%, transparent 35%)`,
            }}
          />
          <div
            ref={glowRef}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-0 blur-[200px] z-0"
            style={{
              background: `radial-gradient(circle, ${glowColor.replace("0.3", "1")} 0%, transparent 45%)`,
            }}
          />
        </>
      )}

      {/* Legacy Spotlight Effect (for non-tilt mode) */}
      {!enableTilt && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none will-change-[opacity,background]"
          style={spotlightStyle}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Legacy Glow Effect (for non-tilt mode) */}
      {!enableTilt && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none will-change-[opacity,box-shadow]"
          style={{
            ...legacyGlowStyle,
            borderRadius,
          }}
        />
      )}
    </div>
  );
}

export default SpotlightCard;
