"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Frame from "@/components/sections/shared/frame";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface ProductHeroProps {
  title: string;
  subtitle: string[];
  centerIcon?: string;
  centerIconAlt?: string;
}

export function ProductHero({ title, subtitle, centerIcon, centerIconAlt }: ProductHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for animated elements
  const leftEl1Ref = useRef<HTMLDivElement>(null);
  const leftEl2Ref = useRef<HTMLDivElement>(null);
  const leftEl3Ref = useRef<HTMLDivElement>(null);
  const leftEl4Ref = useRef<HTMLDivElement>(null);
  
  const rightEl1Ref = useRef<HTMLDivElement>(null);
  const rightEl2Ref = useRef<HTMLDivElement>(null);
  const rightEl3Ref = useRef<HTMLDivElement>(null);
  const rightEl4Ref = useRef<HTMLDivElement>(null);
  
  const centerGlow1Ref = useRef<HTMLDivElement>(null);
  const centerGlow2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Helper for floating animation
    const float = (target: any, vars: any) => {
      gsap.to(target, {
        ...vars,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    };

    // Left side elements
    float(leftEl1Ref.current, {
      y: -15,
      opacity: 1, // from 0.7 to 1
      duration: 2, // half of 4s loop
    });
    
    float(leftEl2Ref.current, {
      y: 15,
      opacity: 0.9,
      duration: 2.5,
      delay: 0.5,
    });

    float(leftEl3Ref.current, {
      y: -10,
      opacity: 0.8,
      duration: 1.75,
      delay: 1,
    });

    float(leftEl4Ref.current, {
      y: 20,
      opacity: 0.95,
      duration: 2.4,
      delay: 1.2,
    });

    // Right side elements
    float(rightEl1Ref.current, {
      y: 12,
      opacity: 1,
      duration: 2.25,
    });

    float(rightEl2Ref.current, {
      y: -18,
      opacity: 0.9,
      duration: 1.9,
      delay: 0.7,
    });

    float(rightEl3Ref.current, {
      y: 14,
      opacity: 0.85,
      duration: 2.1,
      delay: 1.2,
    });

    float(rightEl4Ref.current, {
      y: -18,
      opacity: 0.9,
      duration: 2.2,
      delay: 1.4,
    });

    // Center glow effects
    float(centerGlow1Ref.current, {
      scale: 1.1,
      opacity: 0.35,
      duration: 3,
    });

    float(centerGlow2Ref.current, {
      scale: 1.05,
      opacity: 0.4,
      duration: 2,
      delay: 0.5,
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Animated Frame Background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <Frame className="w-full h-full max-w-[1200px] max-h-[1600px] object-contain" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/80" />
      </div>
      <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-40 pb-12 md:pb-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight text-gradient-primary">
            {title}
          </h1>

          {/* Sub-headline */}
          <div className="mb-6 space-y-2">
            {subtitle.map((line, index) => (
              <p key={index} className="text-lg md:text-xl lg:text-2xl text-light-gray-90">
                {line}
              </p>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button variant="primary" size="lg" className="rounded-[40px] px-8 py-6 text-lg font-semibold min-w-[180px]" asChild>
              <Link href="#explore">Explore Solution</Link>
            </Button>
            <Button 
              variant="watch-demo" 
              size="lg" 
              className="rounded-[40px] px-8 py-6 text-lg font-semibold min-w-[180px]" 
              asChild
            >
              <Link href="#demo">Watch Demo</Link>
            </Button>
          </div>
        </div>

        {/* Product Images - Watermakr and VoiceERP */}
        <div className="relative w-full flex justify-center -mt-4">
          <div className="relative w-full max-w-[95vw]">
            <Image
              src="/products/Watermakr.svg"
              alt="Watermark"
              width={1600}
              height={1000}
              className="w-full h-auto mx-auto"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1600px"
            />

            {/* Left side decorative elements */}
            <div
              ref={leftEl1Ref}
              className="absolute left-0 top-[20%] pointer-events-none z-10 opacity-70 drop-shadow-[0_0_8px_rgba(19,245,132,0.4)]"
            >
              <Image
                src="/products/element1.svg"
                alt="Decorative element"
                width={80}
                height={80}
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
                priority
              />
            </div>
            <div
              ref={leftEl2Ref}
              className="absolute left-[8%] top-[40%] pointer-events-none z-10 opacity-60 drop-shadow-[0_0_6px_rgba(19,245,132,0.3)]"
            >
              <Image
                src="/products/element2.svg"
                alt="Decorative element"
                width={60}
                height={60}
                className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                priority
              />
            </div>
            <div
              ref={leftEl3Ref}
              className="absolute left-[3%] top-[60%] pointer-events-none z-10 opacity-50 drop-shadow-[0_0_10px_rgba(19,245,132,0.4)]"
            >
              <Image
                src="/products/element3.svg"
                alt="Decorative element"
                width={100}
                height={100}
                className="w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28"
                priority
              />
            </div>
            <div
              ref={leftEl4Ref}
              className="absolute left-[12%] top-[72%] pointer-events-none z-10 opacity-55 drop-shadow-[0_0_10px_rgba(19,245,132,0.35)]"
            >
              <Image
                src="/products/elemnet4.svg"
                alt="Decorative element"
                width={90}
                height={90}
                className="w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] lg:w-24 lg:h-24"
                priority
              />
            </div>

            {/* Right side decorative elements */}
            <div
              ref={rightEl1Ref}
              className="absolute right-0 top-[15%] pointer-events-none z-10 opacity-70 drop-shadow-[0_0_8px_rgba(19,245,132,0.4)]"
            >
              <Image
                src="/products/element5.svg"
                alt="Decorative element"
                width={90}
                height={90}
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
                priority
              />
            </div>
            <div
              ref={rightEl2Ref}
              className="absolute right-[8%] top-[35%] pointer-events-none z-10 opacity-60 drop-shadow-[0_0_6px_rgba(19,245,132,0.3)]"
            >
              <Image
                src="/products/element6.svg"
                alt="Decorative element"
                width={70}
                height={70}
                className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
                priority
              />
            </div>
            <div
              ref={rightEl3Ref}
              className="absolute right-[3%] top-[55%] pointer-events-none z-10 opacity-50 drop-shadow-[0_0_8px_rgba(19,245,132,0.4)]"
            >
              <Image
                src="/products/element7.svg"
                alt="Decorative element"
                width={85}
                height={85}
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
                priority
              />
            </div>
            <div
              ref={rightEl4Ref}
              className="absolute right-[12%] top-[72%] pointer-events-none z-10 opacity-55 drop-shadow-[0_0_10px_rgba(19,245,132,0.35)]"
            >
              <Image
                src="/products/element8.svg"
                alt="Decorative element"
                width={75}
                height={75}
                className="w-12 h-12 md:w-16 md:h-16 lg:w-[5.5rem] lg:h-[5.5rem]"
                priority
              />
            </div>

            {centerIcon && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-20">
                <div
                  ref={centerGlow1Ref}
                  className="absolute w-[55%] max-w-[520px] aspect-square rounded-full bg-gradient-to-b from-emerald-400/50 via-emerald-400/20 to-transparent blur-3xl opacity-50 scale-95"
                />
                <div
                  ref={centerGlow2Ref}
                  className="absolute w-[32%] max-w-[320px] aspect-square rounded-full bg-emerald-400/40 blur-[120px] opacity-60 scale-90"
                />
                <Image
                  src={centerIcon}
                  alt={centerIconAlt || "Product Icon"}
                  width={640}
                  height={640}
                  className="w-[40%] md:w-[35%] lg:w-[30%] xl:w-[28%] h-auto drop-shadow-[0_10px_40px_rgba(0,255,170,0.35)]"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
