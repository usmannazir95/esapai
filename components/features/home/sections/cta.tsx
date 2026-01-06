"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function CTASection() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Star Warp Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let stars: { x: number; y: number; z: number; o: number }[] = [];
        let width = 0;
        let height = 0;
        const cx = width / 2;
        const cy = height / 2;

        const initStars = () => {
            stars = [];
            for (let i = 0; i < 800; i++) { // Increased star count
                stars.push({
                    x: Math.random() * width - width / 2,
                    y: Math.random() * height - height / 2,
                    z: Math.random() * width,
                    o: Math.random(),
                });
            }
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight; // Full viewport height for better immersion
            canvas.width = width;
            canvas.height = height;
            initStars();
        };

        window.addEventListener("resize", resize);
        resize();

        const draw = () => {
            // Clear with trail effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
            ctx.fillRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;

            // Speed factor based on hover
            const speed = isHovered ? 15 : 2;

            stars.forEach((star) => {
                // Move star closer
                star.z -= speed;

                // Reset if behind camera
                if (star.z <= 0) {
                    star.z = width;
                    star.x = Math.random() * width - width / 2;
                    star.y = Math.random() * height - height / 2;
                }

                // Project 3D coordinates to 2D
                const x = cx + (star.x / star.z) * width;
                const y = cy + (star.y / star.z) * height;

                // Calculate size and brightness based on depth (z)
                const size = (1 - star.z / width) * 4;
                const opacity = (1 - star.z / width);

                if (x >= 0 && x < width && y >= 0 && y < height) {
                    ctx.beginPath();
                    ctx.fillStyle = `rgba(19, 245, 132, ${opacity})`; // Primary green color
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isHovered]);

    // Entrance Interactions
    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%", // Trigger earlier
                    toggleActions: "play none none reverse",
                },
            });

            tl.from(".cta-content", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            });

            tl.from(".cta-button", {
                scale: 0.8,
                opacity: 0,
                duration: 0.5,
                ease: "back.out(1.7)",
            }, "-=0.4");

        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Canvas Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 w-full h-full block"
            />

            {/* Radial Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/50 to-black z-10 pointer-events-none" />

            {/* Content */}
            <div ref={contentRef} className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                <div className="cta-content inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-6 backdrop-blur-md">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>The Future of Enterprise AI</span>
                </div>

                <h2 className="cta-content text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
                    Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary bg-[200%_auto] animate-shine">Launch</span>?
                </h2>

                <p className="cta-content text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Join the innovators who are reshaping their industries with autonomous agents.
                    Deployment takes minutes, scaling is infinite.
                </p>

                <div className="cta-content flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                    <Link href="/auth/register">
                        <Button
                            variant="primary"
                            size="lg"
                            className="cta-button h-14 px-8 text-base group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Get Started Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        </Button>
                    </Link>

                    <Link href="/contact">
                        <Button
                            variant="outline"
                            size="lg"
                            className="cta-button h-14 px-8 text-base border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 text-white"
                        >
                            Talk to Sales
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
