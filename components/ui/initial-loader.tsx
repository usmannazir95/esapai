"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoIconRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const initTextRef = useRef<HTMLParagraphElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    // Orb entrance and pulse
    tl.fromTo(
      orbRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 0.3, duration: 1, ease: "power2.out" }
    );

    // Start orb pulsing
    gsap.to(orbRef.current, {
      scale: 1.2,
      opacity: 0.5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Corner decorations fly in
    tl.fromTo(
      cornersRef.current,
      { scale: 0, opacity: 0, rotation: -90 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "-=0.5"
    );

    // Logo icon bounces in
    tl.fromTo(
      logoIconRef.current,
      { scale: 0, opacity: 0, y: 50 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(2)",
      },
      "-=0.3"
    );

    // Logo text slides in from right
    tl.fromTo(
      logoTextRef.current,
      { x: 30, opacity: 0, filter: "blur(10px)" },
      {
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // "Initializing" text types in effect
    tl.fromTo(
      initTextRef.current,
      { opacity: 0, letterSpacing: "0.8em" },
      {
        opacity: 1,
        letterSpacing: "0.4em",
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.3"
    );

    // Subtitle fades up
    tl.fromTo(
      subTextRef.current,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // Progress bar container scales in
    tl.fromTo(
      progressRef.current,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.2"
    );

    // Progress bar fills up
    tl.to(progressBarRef.current, {
      width: "100%",
      duration: 1.8,
      ease: "power1.inOut",
    });

    // === EXIT SEQUENCE ===

    // Logo icon zooms out with blur
    tl.to(logoIconRef.current, {
      scale: 2,
      opacity: 0,
      filter: "blur(20px)",
      duration: 0.5,
      ease: "power2.in",
    });

    // Logo text fades with blur
    tl.to(
      logoTextRef.current,
      {
        x: -30,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.4,
        ease: "power2.in",
      },
      "-=0.4"
    );

    // Text elements fade up
    tl.to(
      [initTextRef.current, subTextRef.current],
      {
        y: -20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.3"
    );

    // Progress bar fades
    tl.to(
      progressRef.current,
      {
        scaleX: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.2"
    );

    // Corners fly out
    tl.to(
      cornersRef.current,
      {
        scale: 0,
        opacity: 0,
        rotation: 90,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in",
      },
      "-=0.3"
    );

    // Orb expands and fades
    tl.to(
      orbRef.current,
      {
        scale: 3,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
      },
      "-=0.4"
    );

    // Container wipes up with slight scale
    tl.to(containerRef.current, {
      yPercent: -100,
      scale: 1.1,
      duration: 0.7,
      ease: "power3.inOut",
      onComplete: () => setIsLoading(false),
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center",
        "bg-[#020305] overflow-hidden"
      )}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(19,245,132,0.08)_0%,transparent_70%)]" />

      {/* Animated orb */}
      <div
        ref={orbRef}
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(19,245,132,0.4) 0%, rgba(19,245,132,0.1) 40%, transparent 70%)",
          filter: "blur(60px)",
          opacity: 0,
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(19, 245, 132, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(19, 245, 132, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Logo */}
      <div ref={logoRef} className="relative z-10 mb-8">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 blur-2xl bg-primary/30 rounded-full scale-150" />

          {/* Logo images */}
          <div className="relative flex items-center gap-3">
            <div ref={logoIconRef} style={{ opacity: 0 }}>
              <Image
                src="/logo/mainlogo.png"
                alt="ESAP Logo"
                width={60}
                height={60}
                className="h-14 w-auto drop-shadow-[0_0_20px_rgba(19,245,132,0.5)]"
                priority
              />
            </div>
            <div ref={logoTextRef} style={{ opacity: 0 }}>
              <Image
                src="/logo/esaplogo.svg"
                alt="ESAP"
                width={120}
                height={40}
                className="h-auto w-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Loading text */}
      <div ref={textRef} className="relative z-10 mb-6 text-center">
        <p
          ref={initTextRef}
          className="text-sm uppercase tracking-[0.4em] text-white/40 mb-1"
          style={{ opacity: 0 }}
        >
          Initializing
        </p>
        <p
          ref={subTextRef}
          className="text-lg text-white/70 font-light"
          style={{ opacity: 0 }}
        >
          Preparing your experience
        </p>
      </div>

      {/* Progress bar */}
      <div
        ref={progressRef}
        className="relative z-10 w-64 origin-center"
        style={{ opacity: 0 }}
      >
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(19,245,132,0.5), #13f584, rgba(19,245,132,0.5))",
              boxShadow:
                "0 0 20px rgba(19,245,132,0.5), 0 0 40px rgba(19,245,132,0.3)",
              width: "0%",
            }}
          />
        </div>
      </div>

      {/* Corner decorations */}
      <div
        ref={(el) => { cornersRef.current[0] = el; }}
        className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/20 rounded-tl-xl origin-top-left"
        style={{ opacity: 0 }}
      />
      <div
        ref={(el) => { cornersRef.current[1] = el; }}
        className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/20 rounded-tr-xl origin-top-right"
        style={{ opacity: 0 }}
      />
      <div
        ref={(el) => { cornersRef.current[2] = el; }}
        className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/20 rounded-bl-xl origin-bottom-left"
        style={{ opacity: 0 }}
      />
      <div
        ref={(el) => { cornersRef.current[3] = el; }}
        className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/20 rounded-br-xl origin-bottom-right"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
