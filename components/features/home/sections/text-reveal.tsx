"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function TextRevealSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current || !textRef.current || !contentRef.current || !ctaRef.current) return;

            const words = textRef.current.querySelectorAll(".word");

            // Text reveal starts early as section enters viewport
            gsap.fromTo(
                words,
                {
                    opacity: 0.2,
                    filter: "blur(8px)",
                    y: 30,
                    color: "rgba(255, 255, 255, 0.2)",
                },
                {
                    opacity: 1,
                    filter: "blur(0px)",
                    y: 0,
                    stagger: 0.03,
                    ease: "power3.out",
                    color: "#ffffff",
                    textShadow: "0 0 20px rgba(19, 245, 132, 0.3)",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 40%",
                        end: "top top",
                        scrub: 0.5,
                    },
                }
            );

            // Set CTA initial state - hidden behind
            gsap.set(ctaRef.current, { opacity: 0 });

            // Pin and animate - text zooms, then whole section fades to reveal CTA behind
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=200%",
                    scrub: 0.5,
                    pin: true,
                },
            });

            // Phase 1: Text zooms past
            tl.to(
                textRef.current,
                {
                    scale: 3,
                    opacity: 0,
                    filter: "blur(10px)",
                    duration: 0.4,
                    ease: "power2.in",
                }
            );

            // Phase 2: Text reveal background fades, CTA fades in
            tl.to(
                contentRef.current,
                {
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.in",
                },
                "-=0.1"
            );

            tl.to(
                ctaRef.current,
                {
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out",
                },
                "-=0.3"
            );

            // Hold on CTA for a moment
            tl.to({}, { duration: 0.3 });
        },
        { scope: containerRef }
    );

    const text =
        "Forging the intelligence layer of tomorrow. Unlocking limitless potential.";
    const words = text.split(" ");

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden z-[52]"
        >
            {/* CTA Layer - Behind everything, fades in */}
            <div
                ref={ctaRef}
                className="absolute inset-0 w-full h-full flex items-center justify-center z-[1]"
                style={{
                    background: 'linear-gradient(180deg, #061a12 0%, #04120c 20%, #030d0a 40%, #020807 60%, #020305 85%, #020305 100%)',
                }}
            >
                {/* Bottom gradient fade to blend with footer */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-[30vh] z-[1] pointer-events-none"
                    style={{
                        background: 'linear-gradient(180deg, transparent 0%, #020305 100%)',
                    }}
                />
                {/* CTA Grid overlay - glowy, centered */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(rgba(19, 245, 132, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 245, 132, 0.25) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                        maskImage: 'radial-gradient(ellipse 70% 55% at 50% 50%, black 0%, transparent 60%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 70% 55% at 50% 50%, black 0%, transparent 60%)',
                        filter: 'drop-shadow(0 0 10px rgba(19, 245, 132, 0.5))',
                    }}
                />
                {/* Extra glow layer */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(rgba(19, 245, 132, 0.15) 2px, transparent 2px), linear-gradient(90deg, rgba(19, 245, 132, 0.15) 2px, transparent 2px)`,
                        backgroundSize: '60px 60px',
                        maskImage: 'radial-gradient(ellipse 50% 40% at 50% 50%, black 0%, transparent 50%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 50% 40% at 50% 50%, black 0%, transparent 50%)',
                        filter: 'blur(3px)',
                    }}
                />

                {/* CTA Content */}
                <div className="relative z-20 container mx-auto px-4 sm:px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                            <span className="text-white">Ready to Transform </span>
                            <span className="text-primary">Your Business?</span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-zinc-400 mb-8 md:mb-10 max-w-2xl mx-auto tracking-tight">
                            Join hundreds of enterprises leveraging AI-powered automation to drive growth, efficiency, and innovation.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-semibold rounded-full hover:bg-primary/90 transition-all"
                            >
                                Start Building Now
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                            <a
                                href="/products"
                                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
                            >
                                Explore Products
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Text Reveal Content wrapper that fades out */}
            <div
                ref={contentRef}
                className="absolute inset-0 w-full h-full z-[2]"
                style={{
                    background: 'linear-gradient(180deg, #0d3025 0%, #0a2a1f 25%, #071d16 50%, #041510 75%, #030d0a 100%)',
                }}
            >
                {/* Grid overlay */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(rgba(19, 245, 132, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 245, 132, 0.06) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 70%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 70%)',
                    }}
                />

                {/* Top gradient fade for smooth transition */}
                <div
                    className="absolute top-0 left-0 right-0 h-[30vh] z-[1] pointer-events-none"
                    style={{
                        background: 'linear-gradient(180deg, #030d0a 0%, transparent 100%)',
                    }}
                />
            </div>

            {/* Text content - on top */}
            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
                <div className="max-w-5xl mx-auto flex-1 flex items-center justify-center min-h-[60vh]">
                    <h2
                        ref={textRef}
                        className="text-center font-bold leading-tight tracking-tighter origin-center will-change-transform"
                    >
                        {words.map((word, i) => (
                            <span
                                key={i}
                                className="word inline-block mr-[0.2em] text-5xl md:text-6xl lg:text-7xl text-white/10"
                            >
                                {word}
                            </span>
                        ))}
                    </h2>
                </div>
            </div>
        </section>
    );
}
