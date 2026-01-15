"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Green color scheme for all cards (matching site theme)
const cardStyle = {
  bg: "from-emerald-950 via-[#0a2a1f] to-black",
  accent: "text-primary",
  accentBg: "bg-primary/20",
  glow: "rgba(19, 245, 132, 0.3)",
};

export function ProductShowcase() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
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

        // Remaining stack movement - Batched for performance
        if (nextCards.length > 0) {
          tl.to(
            nextCards,
            {
              y: (idx) => idx * -12, // Function based value for stagger effect/offset
              scale: (idx) => 1 - idx * 0.04,
              filter: (idx) => `brightness(${1 - idx * 0.15})`,
              duration: 1,
              ease: "power2.inOut",
              // We need to calculate the correct y/scale based on their NEW position in the stack (0 to N)
              // But here nextCards[0] becomes the top.
              // Logic check: When card i leaves, card i+1 becomes the new top (index 0 relative to stack).
              // The `y` value needs to be calculated based on the index WITHIN the nextCards array.
              // GSAP function-based values receive (index, target, targets).
            },
            i
          );
        }
      }

      // Smooth Header Reveal
      const header = triggerRef.current.querySelector('[data-testid="section-header"]');
      if (header) {
        gsap.fromTo(header,
          {
            opacity: 0,
            y: 30,
            filter: "blur(8px)"
          },
          {
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top 85%",
              end: "top 60%",
              scrub: 1,
            },
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power3.out",
          }
        );
      }

      return () => {
        tl.kill();
      };
    },
    { scope: triggerRef }
  );

  // Manage video playback based on active card
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === currentCardIndex) {
        // Play the active card's video
        video.currentTime = 0; // Optional: restart video
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // Auto-play might be blocked, handle silently
            console.debug("Video autoplay blocked", error);
          });
        }
      } else {
        // Pause others
        video.pause();
      }
    });
  }, [currentCardIndex]);

  return (
    <section
      ref={triggerRef}
      className="relative w-full h-screen overflow-visible z-40"
      style={{
        background: 'linear-gradient(180deg, #0d3025 0%, #0a2a1f 25%, #071d16 50%, #041510 75%, #030d0a 100%)',
      }}
    >
      {/* Grid overlay matching hero */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(19, 245, 132, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(19, 245, 132, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)',
        }}
      />
      {/* Top gradient fade - blends with Services background */}
      <div
        className="absolute top-0 left-0 right-0 h-[50vh] z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #041510 0%, rgba(4,21,16,0.75) 20%, rgba(7,29,22,0.55) 40%, rgba(10,42,31,0.35) 60%, rgba(13,48,37,0.15) 80%, transparent 100%)',
        }}
      />
      <div className="relative w-full h-screen flex flex-col overflow-hidden z-10">
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

        <div className="pt-28 md:pt-32 shrink-0">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-white/50 mb-2">Discover our comprehensive AI-powered solutions</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Our Product Suite</h2>
          </div>
        </div>

        {/* Main viewport */}
        <div className="relative flex-1 w-full flex items-start justify-center pt-2">

          {/* Card Container */}
          <div
            ref={containerRef}
            className="relative w-full max-w-[1200px] h-[65vh] md:h-[70vh] px-4"
          >
            {products.map((product, index) => {
              const iconSrc = product.icon ?? product.content?.hero?.centerIcon;

              return (
                <div
                  key={product.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="absolute inset-0 w-full h-full p-4"
                >
                  {/* Agency-style colorful card */}
                  <div
                    className={cn(
                      "relative w-full h-full rounded-[32px] md:rounded-[48px] bg-gradient-to-br border border-white/10 shadow-2xl overflow-hidden group",
                      cardStyle.bg
                    )}
                  >
                    {/* Background accent glow */}
                    <div className="absolute top-0 right-0 w-[50%] h-[50%] opacity-20 pointer-events-none">
                      <div className="absolute top-[-30%] right-[-20%] w-full h-full bg-white blur-[150px] rounded-full"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12 lg:p-14">
                      {/* Top Row - Category & Index */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className={cn("text-xs md:text-sm font-medium uppercase tracking-wider", cardStyle.accent)}>
                            AI Product
                          </span>
                          <span className="w-1 h-1 rounded-full bg-white/30" />
                          <span className="text-xs md:text-sm text-white/40 font-mono">
                            {(index + 1).toString().padStart(2, "0")}
                          </span>
                        </div>
                        <Link href={`/product/${product.slug}`}>
                          <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white hover:text-black transition-all duration-300">
                            <ArrowUpRight size={18} />
                          </button>
                        </Link>
                      </div>

                      {/* Middle - Title & Description */}
                      <div className="flex-1 flex flex-col justify-center py-6 md:py-10">
                        <div className="flex items-center gap-4 mb-4">
                          {iconSrc && (
                            <div className="w-12 h-12 md:w-16 md:h-16">
                              <Image
                                src={iconSrc}
                                alt={product.name}
                                width={64}
                                height={64}
                                className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                              />
                            </div>
                          )}
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight mb-4 md:mb-6">
                          {product.name}
                        </h2>
                        <p className="text-lg md:text-xl lg:text-2xl text-white/50 max-w-2xl leading-relaxed font-light">
                          {product.description}
                        </p>
                      </div>

                      {/* Bottom Row - Tags & CTA */}
                      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          {["AI-Powered", "Enterprise", "Scalable"].map((tag, j) => (
                            <span
                              key={j}
                              className={cn(
                                "px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-white/10 text-white/70",
                                cardStyle.accentBg
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link href={`/product/${product.slug}`}>
                          <button className="group/btn flex items-center gap-3 text-white hover:gap-4 transition-all">
                            <span className="text-sm md:text-base font-semibold uppercase tracking-wider">Explore Product</span>
                            <div className={cn(
                              "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors",
                              cardStyle.accentBg,
                              "group-hover/btn:bg-white"
                            )}>
                              <ArrowUpRight size={20} className="text-white group-hover/btn:text-black transition-colors" />
                            </div>
                          </button>
                        </Link>
                      </div>

                      {/* Card number watermark */}
                      <div className="absolute bottom-6 md:bottom-10 right-6 md:right-10 text-white/[0.03] text-[10rem] md:text-[14rem] font-black pointer-events-none leading-none select-none">
                        {index + 1}
                      </div>
                    </div>

                    {/* Video overlay (if available) */}
                    {product.content?.hero?.demoVideo && (
                      <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <video
                          ref={(el) => {
                            videoRefs.current[index] = el;
                          }}
                          src={product.content.hero.demoVideo}
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>


        </div>


      </div>
    </section>
  );
}



