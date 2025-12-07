"use client";

import React, { useRef, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { lerp, randomRange } from '@/lib/utils/animation';
import { prefersReducedMotion } from '@/lib/utils/performance-utils';
import { useIntersectionAnimation } from '@/lib/hooks/use-intersection-animation';

interface InteractiveProductIconHaloProps {
  children: React.ReactNode;
  scale?: number;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

interface BurstParticle {
  id: string;
  x: number;
  y: number;
  color: string;
}

interface ParticleItemProps {
  x: number;
  y: number;
  color: string;
}

// Subcomponent for individual particle animation
const ParticleItem: React.FC<ParticleItemProps> = ({ x, y, color }) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const angle = Math.random() * Math.PI * 2;
    const dist = randomRange(50, 100);
    const duration = randomRange(0.6, 1.0);

    gsap.fromTo(
      ref.current,
      {
        scale: randomRange(1.5, 3),
        opacity: 1,
        x: 0,
        y: 0,
      },
      {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        opacity: 0,
        scale: 0,
        duration: duration,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div
      className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-none"
      style={{
        marginLeft: x,
        marginTop: y,
      }}
    >
      <div
        ref={ref}
        className="rounded-full absolute top-[-2px] left-[-2px] w-1 h-1"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 4px ${color}`,
        }}
      />
    </div>
  );
};

export const InteractiveProductIconHalo: React.FC<InteractiveProductIconHaloProps> = ({
  children,
  scale = 1,
  className = '',
}) => {
  // Refs for DOM manipulation
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<SVGSVGElement>(null);

  // State for burst particles
  const [particles, setParticles] = useState<BurstParticle[]>([]);

  // Mutable refs for animation loop
  const mouseRef = useRef({ x: 0, y: 0, rawX: 0, rawY: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);
  const isAnimatingRef = useRef(true);
  const lastFrameTimeRef = useRef(0);
  const targetFPS = 60;
  const frameInterval = 1000 / targetFPS;

  // Intersection observer to pause animations when off-screen
  const { ref: intersectionRef, isInView } = useIntersectionAnimation({
    threshold: 0.1,
    rootMargin: "50px",
    onVisible: () => {
      isAnimatingRef.current = true;
    },
    onHidden: () => {
      isAnimatingRef.current = false;
    },
  });

  // --- Animation Loop ---
  const animate = useCallback((currentTime: number) => {
    if (!containerRef.current || !isAnimatingRef.current) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    // Throttle to target FPS
    const elapsed = currentTime - lastFrameTimeRef.current;
    if (elapsed < frameInterval) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }
    lastFrameTimeRef.current = currentTime - (elapsed % frameInterval);

    // Respect reduced motion
    if (prefersReducedMotion()) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    // Smooth Mouse Interpolation
    mouseRef.current.x = lerp(mouseRef.current.x, targetMouseRef.current.x, 0.1);
    mouseRef.current.y = lerp(mouseRef.current.y, targetMouseRef.current.y, 0.1);

    const { x: mx, y: my } = mouseRef.current;

    // 1. Update Spotlight & Cursor Glow
    if (spotlightRef.current && cursorGlowRef.current) {
      gsap.set(spotlightRef.current, {
        x: mx * 1.2,
        y: my * 1.2,
        opacity: 0.2,
        force3D: true, // GPU acceleration
      });
      gsap.set(cursorGlowRef.current, {
        x: mx,
        y: my,
        scale: 1,
        opacity: 0.1,
        force3D: true, // GPU acceleration
      });
    }

    // 2. Update Rings
    if (ringsRef.current) {
      const rotateX = -my * 0.1;
      const rotateY = mx * 0.1;

      gsap.set(ringsRef.current, {
        rotateX: rotateX,
        rotateY: rotateY,
        x: mx * 0.05,
        y: my * 0.05,
        force3D: true, // GPU acceleration
      });
    }

    // 3. Icon Parallax
    if (iconRef.current) {
      gsap.set(iconRef.current, {
        x: mx * 0.08,
        y: my * 0.08,
        scale: 1,
        filter: `drop-shadow(0 0 5px rgba(19, 245, 132, 0.1))`,
        force3D: true, // GPU acceleration
      });
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      lastFrameTimeRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(animate);
    }, containerRef);

    return () => {
      ctx.revert();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  // --- Event Handlers ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    targetMouseRef.current = { x, y };
    mouseRef.current.rawX = x;
    mouseRef.current.rawY = y;
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const clickX = e.clientX - rect.left - centerX;
    const clickY = e.clientY - rect.top - centerY;

    // 1. Burst Particles
    const count = 16;
    const newParticles: BurstParticle[] = [];
    const batchId = Date.now().toString() + Math.random();

    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: `${batchId}-${i}`,
        x: clickX,
        y: clickY,
        color: i % 2 === 0 ? '#13F584' : i % 3 === 0 ? '#8EFFC7' : '#06b6d4',
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);

    // Cleanup particles after animation
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !p.id.startsWith(batchId)));
    }, 1200);

    // 2. Impact Scale Pulse
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        intersectionRef.current = el;
      }}
      className={`relative flex items-center justify-center cursor-pointer select-none ${className}`}
      style={{ 
        width: `${300 * scale}px`, 
        height: `${300 * scale}px`,
        willChange: prefersReducedMotion() ? 'auto' : 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        targetMouseRef.current = { x: 0, y: 0 };
      }}
      onClick={handleClick}
    >
      {/* Layer 8: Background Pulse */}
      <div className="absolute inset-0 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ backgroundColor: 'rgba(19, 245, 132, 0.1)' }} />

      {/* Layer 6: Energy Field */}
      <div className="absolute inset-0 rounded-full transition-opacity duration-500 blur-xl opacity-30" style={{ background: 'linear-gradient(to top right, rgba(19, 245, 132, 0.05), rgba(6, 182, 212, 0.05))' }} />

      {/* Layer 5: Interactive Rings */}
      <svg
        ref={ringsRef}
        className="absolute w-full h-full pointer-events-none opacity-40"
        viewBox="0 0 300 300"
        style={{ transition: 'transform 0.1s linear' }}
      >
        {/* Outer Ring */}
        <circle
          cx="150"
          cy="150"
          r="140"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="2"
          strokeDasharray="10 20"
          className="origin-center"
          style={{ 
            animation: 'spin 20s linear infinite', 
            transformOrigin: 'center',
            opacity: 0.8
          }}
        />

        {/* Inner Ring */}
        <circle
          cx="150"
          cy="150"
          r="100"
          fill="none"
          stroke="#13F584"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          className="origin-center opacity-50"
          style={{ 
            animation: 'spin 12s linear infinite reverse',
            transformOrigin: 'center'
          }}
        />

        {/* Core Ring */}
        <circle
          cx="150"
          cy="150"
          r="70"
          fill="none"
          stroke="#8EFFC7"
          strokeWidth="0.5"
          className="opacity-20"
        />
      </svg>

      {/* Layer 4: Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute w-64 h-64 rounded-full blur-[80px] pointer-events-none mix-blend-overlay"
        style={{ left: 'calc(50% - 128px)', top: 'calc(50% - 128px)', opacity: 0, backgroundColor: 'rgba(142, 255, 199, 0.3)' }}
      />

      {/* Layer 1: Cursor Glow */}
      <div
        ref={cursorGlowRef}
        className="absolute w-32 h-32 rounded-full blur-[40px] pointer-events-none opacity-0 mix-blend-screen"
        style={{ left: 'calc(50% - 64px)', top: 'calc(50% - 64px)', backgroundColor: 'rgba(19, 245, 132, 0.5)' }}
      />

      {/* Burst Particles (Replaces Ripples) */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {particles.map((p) => (
          <ParticleItem key={p.id} x={p.x} y={p.y} color={p.color} />
        ))}
      </div>

      {/* Layer 7: Icon Content */}
      <div ref={iconRef} className="relative z-10 p-8 transition-transform duration-100 ease-linear">
        {children}
      </div>
    </div>
  );
};

