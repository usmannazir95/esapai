"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

import { Button } from "@/components/ui/button";
import { TypewriterTitle } from "@/components/ui/typewriter-title";
import { HeroBadge } from "@/components/ui/hero-badge";
import { CharacterReveal } from "@/components/ui/character-reveal";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import Box from "@/components/shared/box";
import Frame from "@/components/shared/frame";
import { motion } from "motion/react";



const Circle = dynamic(() => import("./circle"), {
    ssr: false,
    loading: () => <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
});

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const pinnedBgRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const circleContainerRef = useRef<HTMLDivElement>(null);
    const circleGlowRef = useRef<HTMLDivElement>(null);
    const iconsRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const continuousAnimationsRef = useRef<gsap.core.Tween[]>([]);
    const lightEffectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const anim = useGSAPAnimations(sectionRef);

    // Intersection observer to pause animations when off-screen
    const { setRef: setIntersectionRef, isInView } = useIntersectionAnimation({
        threshold: 0.1,
        rootMargin: "100px",
    });

    useGSAP(
        () => {
            const tl = anim.createTimeline();

            // Fade in background first
            tl.to(
                pinnedBgRef.current,
                {
                    opacity: 1,
                    duration: 2,
                    ease: "power2.out",
                }
            );

            // Circle entrance - scale up and fade in
            gsap.set(circleContainerRef.current, { opacity: 0, scale: 0.75 });
            tl.to(
                circleContainerRef.current,
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: "back.out(1.2)",
                },
                0.3 // Start slightly after background
            );

            // Floating icons - animate independently (not blocked by timeline)
            gsap.to(
                iconsRef.current,
                {
                    opacity: 1,
                    duration: 1.5,
                    ease: "power2.out",
                    delay: 0.2,
                }
            );

            // Text content animations
            tl.to(
                    badgeRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    0.5 // Start after background begins
                )
                // Title animation is now handled by KineticText component
                .to(
                    subtitleRef.current,
                    {
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    "-=0.3"
                )
                .to(
                    buttonRef.current,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: "power2.out",
                    },
                    "-=0.3"
                );

            // Pin the background layer - extends through hero, mission, and vision sections
            if (pinnedBgRef.current && sectionRef.current) {
                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=1200%",
                    pin: pinnedBgRef.current,
                    pinSpacing: false,
                    invalidateOnRefresh: true,
                });

                // Fade grid when approaching vision section - delayed start
                if (gridRef.current) {
                    gsap.fromTo(gridRef.current,
                        { opacity: 1 },
                        {
                            opacity: 0.15,
                            ease: "power1.out",
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "+=400%",
                                end: "+=800%",
                                scrub: 0.5,
                            },
                        }
                    );
                }
            }

            // Exit animations for hero content - starts immediately on scroll
            if (contentRef.current && sectionRef.current) {
                gsap.to(contentRef.current, {
                    y: -100,
                    opacity: 0,
                    scale: 0.9,
                    filter: "blur(10px)",
                    ease: "power2.in",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "20% top",
                        scrub: 0.5,
                    },
                });
            }

            // Exit animation for floating icons - matches content exit
            if (iconsRef.current && sectionRef.current) {
                gsap.fromTo(iconsRef.current,
                    {
                        opacity: 1,
                        scale: 1,
                    },
                    {
                        opacity: 0,
                        scale: 0.85,
                        ease: "power2.in",
                        immediateRender: false,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top top",
                            end: "20% top",
                            scrub: 1,
                        },
                    }
                );
            }

            // Circle stays visible and transforms through mission and vision
            if (circleContainerRef.current && sectionRef.current) {
                const circleTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "+=1200%",
                        scrub: 0.5,
                    },
                });

                // Phase 1: Scale up during hero exit and mission (0-40%)
                circleTl.fromTo(circleContainerRef.current,
                    { scale: 1, y: "0%", opacity: 1 },
                    { scale: 2, y: "-25%", opacity: 0.5, duration: 0.4, ease: "power2.out" }
                );

                // Phase 2: Fade more as we approach vision (40-60%)
                circleTl.to(circleContainerRef.current, {
                    scale: 2.2,
                    y: "-30%",
                    opacity: 0.15,
                    duration: 0.2,
                    ease: "power1.out",
                });

                // Phase 3: Stay very faded through vision section (60-85%)
                circleTl.to(circleContainerRef.current, {
                    scale: 2.3,
                    y: "-35%",
                    opacity: 0.08,
                    duration: 0.25,
                    ease: "none",
                });

                // Phase 4: Fade out at end (85-100%)
                circleTl.to(circleContainerRef.current, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.15,
                    ease: "power2.in",
                });
            }

            // Fade out entire pinned background after Vision section (visible behind Vision)
            if (pinnedBgRef.current && sectionRef.current) {
                gsap.fromTo(pinnedBgRef.current,
                    { opacity: 1 },
                    {
                        opacity: 0,
                        ease: "power2.in",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "+=900%",
                            end: "+=1150%",
                            scrub: 0.5,
                        },
                    }
                );
            }

            // Exit animation for hexagon icons - individual elements for staggered effect
            if (iconsRef.current && sectionRef.current) {
                const hexagons = iconsRef.current.querySelectorAll('[class^="hexagon-"]');
                hexagons.forEach((hex, index) => {
                    gsap.to(hex, {
                        opacity: 0,
                        scale: 0.6,
                        y: -50,
                        ease: "power2.in",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: `${5 + index * 3}% top`,
                            end: `${40 + index * 5}% top`,
                            scrub: 1.5,
                        },
                    });
                });
            }

            // Continuous animations (start after entrance sequence completes)
            if (!prefersReducedMotion()) {
                if (circleContainerRef.current) {
                    const breathingTween = anim.breathing(circleContainerRef.current, {
                        delay: 0.8,
                    });
                    if (breathingTween) {
                        breathingTween.paused(!isInView);
                        continuousAnimationsRef.current.push(breathingTween);
                    }
                }
                if (circleGlowRef.current) {
                    const glowTween = anim.glow(circleGlowRef.current, { delay: 0.8 });
                    if (glowTween) {
                        glowTween.paused(!isInView);
                        continuousAnimationsRef.current.push(glowTween);
                    }
                }
                if (iconsRef.current) {
                    // Spread hexagons further apart to avoid overlapping the circle
                    // Left side hexagons
                    gsap.set(iconsRef.current.querySelectorAll('.hexagon-4, .hexagon-5, .hexagon-6'), { x: -80 });
                    // Right side hexagons
                    gsap.set(iconsRef.current.querySelectorAll('.hexagon-1, .hexagon-2, .hexagon-3'), { x: 80 });

                    // Set initial states for smooth entrance animation
                    gsap.set(iconsRef.current.querySelectorAll('[class^="hexagon-"]'), {
                        opacity: 0,
                        scale: 0.8,
                    });

                    // Smooth staggered entrance animation
                    tl.to(
                        iconsRef.current.querySelectorAll('[class^="hexagon-"]'),
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 1,
                            ease: "power2.out",
                            stagger: {
                                each: 0.15,
                                from: "random",
                            },
                        },
                        "-=0.3"
                    );

                    // Individual animations for each of the 6 hexagons - enhanced with more variety

                    // Hexagon 1 - Intensified diagonal float (Right)
                    const hex1 = gsap.to(iconsRef.current.querySelector('.hexagon-1'), {
                        y: "-=40",
                        x: "+=30",
                        rotation: 12,
                        duration: 4.5,
                        ease: "power1.inOut",
                        repeat: -1,
                        yoyo: true,
                        delay: 0,
                    });
                    continuousAnimationsRef.current.push(hex1);

                    // Hexagon 2 - Intensified vertical bounce with horizontal drift (Right)
                    const hex2 = gsap.to(iconsRef.current.querySelector('.hexagon-2'), {
                        y: "-=50",
                        x: "+=10",
                        rotation: -8,
                        duration: 5,
                        ease: "sine.inOut",
                        repeat: -1,
                        yoyo: true,
                        delay: 0.5,
                    });
                    continuousAnimationsRef.current.push(hex2);

                    // Hexagon 3 - Intensified circular motion (Right)
                    const hex3 = gsap.to(iconsRef.current.querySelector('.hexagon-3'), {
                        y: "-=35",
                        x: "-=25",
                        rotation: 15,
                        duration: 5.5,
                        ease: "power2.inOut",
                        repeat: -1,
                        yoyo: true,
                        delay: 1,
                    });
                    continuousAnimationsRef.current.push(hex3);

                    // Hexagon 4 - Intensified horizontal sway (Left)
                    const hex4 = gsap.to(iconsRef.current.querySelector('.hexagon-4'), {
                        x: "-=40",
                        y: "-=20",
                        rotation: -10,
                        duration: 4.8,
                        ease: "sine.inOut",
                        repeat: -1,
                        yoyo: true,
                        delay: 0.3,
                    });
                    continuousAnimationsRef.current.push(hex4);

                    // Hexagon 5 - Intensified figure-8 pattern (Left)
                    const hex5 = gsap.to(iconsRef.current.querySelector('.hexagon-5'), {
                        y: "-=45",
                        x: "+=30",
                        rotation: 18,
                        duration: 5.8,
                        ease: "power1.inOut",
                        repeat: -1,
                        yoyo: true,
                        delay: 0.8,
                    });
                    continuousAnimationsRef.current.push(hex5);

                    // Hexagon 6 - Intensified pulse movement (Left)
                    const hex6 = gsap.to(iconsRef.current.querySelector('.hexagon-6'), {
                        y: "-=30",
                        rotation: -12,
                        duration: 4,
                        ease: "power2.inOut",
                        repeat: -1,
                        yoyo: true,
                        delay: 1.2,
                    });
                    continuousAnimationsRef.current.push(hex6);


                    // Pause all animations if not in view
                    [hex1, hex2, hex3, hex4, hex5, hex6].forEach(
                        (anim) => anim.paused(!isInView)
                    );
                }
            }

            // Cleanup function
            return () => {
                continuousAnimationsRef.current.forEach((tween) => {
                    tween?.kill();
                });
                continuousAnimationsRef.current = [];
                if (lightEffectTimeoutRef.current) {
                    clearTimeout(lightEffectTimeoutRef.current);
                    lightEffectTimeoutRef.current = null;
                }
            };
        },
        { scope: sectionRef }
    );

    // Pause/resume animations based on viewport visibility
    useEffect(() => {
        if (!isInView || prefersReducedMotion()) {
            continuousAnimationsRef.current.forEach((tween) => tween?.pause());
        } else {
            continuousAnimationsRef.current.forEach((tween) => tween?.resume());
        }
    }, [isInView]);

    return (
        <section
            ref={(el) => {
                sectionRef.current = el;
                setIntersectionRef(el);
            }}
            className="relative w-full min-h-[110vh] z-30"
        >
            {/* Pinned Background Layer */}
            <div
                ref={pinnedBgRef}
                className="absolute inset-0 w-full h-screen overflow-hidden opacity-0"
                style={{
                    background: 'linear-gradient(180deg, #0d3025 0%, #0a2a1f 25%, #071d16 50%, #041510 75%, #030d0a 100%)',
                }}
            >
                {/* Frame Background - Added for depth */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none overflow-hidden select-none z-0">
                    <Frame className="w-full h-full max-w-[1500px] object-contain scale-110" />
                </div>

                {/* Grid overlay with fading edges and parallax */}
                <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
                    <div
                        ref={gridRef}
                        className="absolute inset-0 will-change-transform"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(19, 245, 132, 0.06) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(19, 245, 132, 0.06) 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px',
                            maskImage: 'radial-gradient(ellipse 50% 50% at 50% 40%, black 20%, transparent 70%)',
                            WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 40%, black 20%, transparent 70%)',
                        }}
                    />
                </div>

                {/* Circle behind content - animated glow and breathing effect */}
                <div
                    ref={circleContainerRef}
                    className="absolute inset-0 flex items-center justify-center pt-[40%] z-0 pointer-events-none animate-optimized"
                >
                    <div ref={circleGlowRef} className="relative">
                        <Circle className="w-[280px] sm:w-[380px] md:w-[480px] lg:w-[580px] xl:w-[650px] max-w-[650px] h-auto brightness-[1.8] drop-shadow-[0_0_40px_rgba(0,165,81,0.8)] drop-shadow-[0_0_80px_rgba(0,165,81,0.6)] drop-shadow-[0_0_120px_rgba(0,165,81,0.4)]" />
                    </div>
                </div>

            </div>

            {/* Hexagonal Icons (Box component) - floating with glow - Hidden on mobile/tablet - OUTSIDE pinnedBg for independent animation */}
            <div className="absolute inset-0 w-full h-screen overflow-hidden pointer-events-none">
                <div
                    ref={iconsRef}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none hidden xl:block opacity-0"
                >
                    <Box className="max-w-[1400px] xl:max-w-[1800px] w-auto h-auto opacity-100 brightness-[1.2]" />
                </div>
            </div>

            {/* Content Layer - will animate out */}
            <div
                ref={contentRef}
                className="relative z-10 min-h-screen flex items-start justify-center pt-20 sm:pt-24 md:pt-28 lg:pt-32"
            >
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-8 md:py-12 lg:py-16 flex flex-col items-center text-center">
                {/* Glossy Glassmorphism Badge */}
                <div
                    ref={badgeRef}
                    className="gsap-slide-up-optimized mb-6 sm:mb-8"
                >
                    <div className="relative group cursor-pointer">
                        {/* Outer glow */}
                        <div className="absolute -inset-1 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Main badge container */}
                        <div className="relative flex items-center rounded-full p-1 bg-black/40 backdrop-blur-xl border-[0.5px] border-primary/60 shadow-[0_0_15px_rgba(19,245,132,0.2)]">
                            {/* Green button on left */}
                            <div className="flex items-center justify-center px-4 py-1.5 rounded-full bg-primary text-black text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(19,245,132,0.4)]">
                                New
                            </div>

                            {/* Text */}
                            <span className="px-4 py-1.5 text-[11px] sm:text-xs text-white/90 font-medium tracking-wide">
                                Introducing AI-Powered Automation
                            </span>

                            {/* Arrow icon */}
                            <div className="pr-3">
                                <svg className="w-4 h-4 text-white/60 group-hover:text-primary group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Title - Kinetic Typography */}
                <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 overflow-hidden">
                    <TypewriterTitle
                        title="AI-Powered Solutions"
                        splitMode="secondLine"
                        secondLine="For Modern Enterprises"
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold mb-3 sm:mb-4 md:mb-6 leading-tight w-full"
                        align="center"
                        mainTextClassName="mt-1 sm:mt-2"
                    />
                </div>

                {/* Subtitle/Description */}
                <p
                    ref={subtitleRef}
                    className="mb-4 sm:mb-5 text-xs sm:text-sm md:text-base text-white/60 max-w-xl mx-auto px-2 sm:px-4 leading-relaxed font-light gsap-fade-in-optimized"
                >
                    We design intelligent solutions that redefine how industries operate, tackle real-world challenges, and lead the next wave of transformation.
                </p>

                {/* CTA Button */}
                <div ref={buttonRef} className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto gsap-scale-in-optimized">
                    <Button
                        variant="primary"
                        size="lg"
                    >
                        Get Started
                    </Button>
                </div>
                </div>
            </div>
        </section>
    );
}



