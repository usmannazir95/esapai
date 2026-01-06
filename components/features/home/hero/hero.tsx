"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ChevronRight, Globe as GlobeIcon } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const HeroLogoAnimation = dynamic(
    () => import("./hero-logo-animation").then((mod) => mod.HeroLogoAnimation),
    { ssr: false }
);

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLDivElement>(null);
    const titleLinesRef = useRef<(HTMLSpanElement | null)[]>([]);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Initial Set
        gsap.set(containerRef.current, { visibility: "visible" });
        gsap.set(titleLinesRef.current, { y: 100, autoAlpha: 0, rotateX: -20 });
        gsap.set(".hero-fade-in", { y: 20, autoAlpha: 0 });
        gsap.set(rightColRef.current, { scale: 0.8, autoAlpha: 0 });

        // Animation Sequence
        tl.to(rightColRef.current, {
            scale: 1,
            autoAlpha: 1,
            duration: 1.5,
            ease: "power3.out"
        })
            .to(titleLinesRef.current, {
                y: 0,
                rotateX: 0,
                autoAlpha: 1,
                stagger: 0.1,
                duration: 1.2,
                ease: "power3.out"
            }, "-=1.2")
            .to(".hero-fade-in", {
                y: 0,
                autoAlpha: 1,
                stagger: 0.1,
                duration: 0.8
            }, "-=0.8");

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] invisible pt-24 md:pt-32"
        >
            {/* Background Grid/Mesh */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)] pointer-events-none" />

            <div className="container relative z-10 px-4 md:px-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Column: Content */}
                    <div ref={leftColRef} className="flex flex-col items-start text-left lg:max-w-xl">
                        {/* Status Badge */}
                        <div className="hero-fade-in hero-badge mb-8 cursor-pointer group">
                            <div className="hero-badge-exclusive">
                                <span className="hero-badge-exclusive-text">NEW</span>
                            </div>
                            <div className="hero-badge-text">
                                <span className="hero-badge-text-content group-hover:text-white transition-colors">
                                    ESAP AI v2.0 is now live
                                </span>
                                <ChevronRight className="w-4 h-4 text-[var(--color-primary)] group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </div>

                        {/* Kinetic Typography Title */}
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-white overflow-hidden">
                            <span className="block overflow-hidden">
                                <span ref={el => { if (el) titleLinesRef.current[0] = el }} className="block">EMPOWERING</span>
                            </span>
                            <span className="block overflow-hidden">
                                <span ref={el => { if (el) titleLinesRef.current[1] = el }} className="block text-white/40">BUSINESSES WITH</span>
                            </span>
                            <span className="block overflow-hidden">
                                <span ref={el => { if (el) titleLinesRef.current[2] = el }} className="block text-[var(--color-primary)]">INTELLIGENT AI</span>
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="hero-fade-in text-lg text-white/60 mb-10 max-w-md leading-relaxed">
                            Specializing in enterprise AI solutions, voice-activated ERP systems, and agentic integrations to transform your daily workflows.
                        </p>

                        {/* Actions */}
                        <div className="hero-fade-in flex flex-wrap gap-4">
                            <Link href="/signup">
                                <button className="group relative px-8 py-4 bg-[var(--color-primary)] text-black font-bold text-lg rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95">
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <span className="relative flex items-center gap-2">
                                        Start Deploying
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </Link>

                            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium text-lg rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm flex items-center gap-2">
                                <GlobeIcon className="w-5 h-5" />
                                View Network
                            </button>
                        </div>


                    </div>

                    {/* Right Column: 3D Logo Animation */}
                    <div ref={rightColRef} className="relative w-full h-[500px] lg:h-[700px] flex items-center justify-center lg:justify-end">
                        {/* Glow Effect behind logo */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(19,245,132,0.15)_0%,transparent_70%)] pointer-events-none blur-3xl" />

                        {/* The 3D Logo */}
                        <div className="w-full h-full max-w-[600px] relative z-10">
                            <HeroLogoAnimation className="w-full h-full" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
