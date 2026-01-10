"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { products } from "@/lib/products";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightCard } from "@/components/ui/spotlight-card";

gsap.registerPlugin(ScrollTrigger);

export function ProductShowcase() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useGSAP(
    () => {
      if (!triggerRef.current || !containerRef.current) return;

      const totalCards = products.length;

      // Initial positioning: The "Stack"
      cardRefs.current.forEach((card, i) => {
        if (card) {
          gsap.set(card, {
            y: i * -12, // Offset upwards
            scale: 1 - i * 0.04,
            rotateX: i * 0.5,
            zIndex: totalCards - i,
            filter: `brightness(${1 - i * 0.15})`,
            transformOrigin: "bottom center",
          });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${totalCards * 100}%`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const segment = 1 / (totalCards - 1);
            // Using round instead of floor makes the indicator switch 
            // at the 50% mark of each card's transition, which feels more accurate.
            const rawIndex = Math.min(
              Math.round(self.progress / segment),
              totalCards - 1
            );
            setCurrentCardIndex(rawIndex);
          },
        },
      });

      // Animate the cards to exit one by one
      for (let i = 0; i < totalCards - 1; i++) {
        const exitDirection = i % 2 === 0 ? -1.3 : 1.3;
        const rotation = i % 2 === 0 ? -8 : 8;

        const currentCard = cardRefs.current[i];
        const nextCards = cardRefs.current.slice(i + 1);

        // Card exit sequence
        tl.to(
          currentCard,
          {
            xPercent: exitDirection * 100,
            y: -100,
            opacity: 0,
            scale: 0.85,
            rotateZ: rotation,
            duration: 1,
            ease: "power2.inOut",
          },
          i
        );

        // Remaining stack movement
        nextCards.forEach((card, idx) => {
          if (card) {
            tl.to(
              card,
              {
                y: idx * -12,
                scale: 1 - idx * 0.04,
                filter: `brightness(${1 - idx * 0.15})`,
                duration: 1,
                ease: "power2.inOut",
              },
              i
            );
          }
        });
      }

      return () => {
        tl.kill();
      };
    },
    { scope: triggerRef }
  );

  return (
    <section
      ref={triggerRef}
      className="relative w-full h-screen bg-transparent overflow-visible"
    >
      <div className="w-full h-screen flex flex-col overflow-hidden">
        {/* Extreme Right Fixed Sidebar - Minimalist Product Names */}
        <div className="absolute right-0 top-0 bottom-0 z-[100] hidden lg:flex flex-col justify-center px-4 md:px-8 select-none pointer-events-none">
          <div className="flex flex-col items-end gap-10">
            {products.map((product, idx) => (
              <div
                key={product.id}
                className="flex items-center gap-6"
              >
                <span
                  className={cn(
                    "text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-700 text-right backdrop-blur-sm px-2 py-1",
                    currentCardIndex === idx
                      ? "text-[#13F584] scale-110 drop-shadow-[0_0_10px_rgba(19,245,132,0.6)] opacity-100"
                      : "text-white/30 opacity-60"
                  )}
                >
                  {product.name}
                </span>
                <div
                  className={cn(
                    "w-1 transition-all duration-700 rounded-full",
                    currentCardIndex === idx
                      ? "h-10 bg-[#13F584] shadow-[0_0_20px_rgba(19,245,132,0.8)]"
                      : "h-2 bg-white/20"
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-32 shrink-0">
          <SectionHeader
            title="Our Product Suite"
            subtitle="Discover our comprehensive range of AI-powered solutions designed to transform your business operations."
          />
        </div>

        {/* Main viewport */}
        <div className="relative flex-1 w-full flex items-center justify-center">

          {/* Card Container */}
          <div
            ref={containerRef}
            className="relative w-full max-w-[1000px] h-[500px] px-4"
          >
            {products.map((product, index) => {
              const iconSrc = product.icon ?? product.content?.hero?.centerIcon;
              const iconAlt =
                product.content?.hero?.centerIconAlt ?? `${product.name} icon`;

              return (
                <div
                  key={product.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="absolute inset-0 w-full h-full p-4"
                >
                  <SpotlightCard className="h-full glass-cyber-strong group overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_0_80px_rgba(19,245,132,0.15)]">

                    {/* Interactive Glow Background */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary-500/10 via-transparent to-primary-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0">
                      <div className="absolute inset-0 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
                    </div>

                    <div className="relative h-full flex flex-col md:flex-row items-center p-8 md:p-12 gap-12 z-10">

                      {/* Left Side: Content */}
                      <div className="flex-1 text-left space-y-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-6">
                            {iconSrc && (
                              <div className="relative w-16 h-16 flex items-center justify-center">
                                <Image
                                  src={iconSrc}
                                  alt={iconAlt}
                                  width={64}
                                  height={64}
                                  className="object-contain filter-glow-primary"
                                />
                              </div>
                            )}
                            <span className="text-base font-mono text-white/40 tracking-[0.2em] uppercase pt-2">
                              / Product_{index.toString().padStart(3, "0")}
                            </span>
                          </div>
                          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-2xl">
                            {product.name}
                          </h3>
                        </div>

                        <p className="text-xl md:text-2xl text-white/80 font-medium leading-relaxed max-w-lg">
                          {product.description}
                        </p>

                        <Link href={`/product/${product.slug}`} className="inline-block mt-8">
                          <div
                            className="group/btn relative inline-flex items-center gap-4 px-8 py-3 bg-[#13F584] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(19,245,132,0.4)] cursor-pointer"
                          >
                            {/* Inner Shimmer Sweep */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform duration-1000"></div>

                            <span className="relative z-10 text-base font-black uppercase tracking-widest text-black">
                              Explore
                            </span>

                            <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black text-[#13F584] transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110">
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                              </svg>
                            </div>
                          </div>
                        </Link>
                      </div>

                      {/* Right Side: Tilted Video Placeholder / Graphic */}
                      <div className="flex-1 relative w-full h-full flex items-center justify-center [perspective:1500px]">
                        <div className="relative w-[90%] aspect-video bg-neutral-900/80 border border-white/20 rounded-2xl overflow-hidden shadow-[20px_40px_80px_rgba(0,0,0,0.8)] [transform:rotateY(-25deg)_rotateX(15deg)_rotateZ(-2deg)] group-hover:[transform:rotateY(-15deg)_rotateX(10deg)_rotateZ(-1deg)] transition-transform duration-700 ease-out flex items-center justify-center">
                          {/* Inner Glow */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 via-transparent to-white/5 opacity-50"></div>

                          {/* Video UI Overlay Mockup */}
                          <div className="absolute inset-0 p-6 flex flex-col justify-between">
                            <div className="flex justify-between items-start opacity-40">
                              <div className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              </div>
                              <div className="h-4 w-24 bg-white/10 rounded-full"></div>
                            </div>

                            <div className="flex-1 flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/20 group-hover:scale-110 transition-transform duration-500">
                                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent translate-x-1"></div>
                              </div>
                            </div>

                            <div className="space-y-3 opacity-30">
                              <div className="h-2 w-full bg-white/10 rounded-full"></div>
                              <div className="h-2 w-2/3 bg-white/10 rounded-full"></div>
                            </div>
                          </div>

                          {/* Large Icon Reflection/Glow */}
                          {iconSrc && (
                            <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700 flex items-center justify-center blur-3xl">
                              <Image
                                src={iconSrc}
                                alt=""
                                width={200}
                                height={200}
                                className="object-contain"
                              />
                            </div>
                          )}
                        </div>

                        {/* Floating Elements Around the Tilted Screen */}
                        <div className="absolute top-10 right-0 w-32 h-32 bg-primary-500/10 blur-3xl rounded-full"></div>
                        <div className="absolute bottom-10 left-0 w-40 h-40 bg-primary-500/20 blur-[100px] rounded-full"></div>
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>


        </div>


      </div>
    </section>
  );
}



