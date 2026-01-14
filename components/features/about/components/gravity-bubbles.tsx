"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

interface BubbleData {
    id: number;
    text: string;
    size: number; // width/height in px
    initialX: number; // % relative to container
    initialY: number; // % relative to container
    color?: string;
}

const VISION_BUBBLES: BubbleData[] = [
    { id: 1, text: "Innovation", size: 180, initialX: 15, initialY: 30, color: "rgba(19, 245, 132, 0.3)" }, // Left-mid
    { id: 2, text: "Scalability", size: 150, initialX: 85, initialY: 20, color: "rgba(19, 245, 132, 0.2)" }, // Right-top
    { id: 3, text: "Security", size: 140, initialX: 20, initialY: 75, color: "rgba(19, 245, 132, 0.25)" }, // Left-bottom
    { id: 4, text: "Intelligence", size: 200, initialX: 75, initialY: 65, color: "rgba(19, 245, 132, 0.35)" }, // Right-mid

];

export function GravityBubbles({ className }: { className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const bubblesRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            if (prefersReducedMotion() || !containerRef.current) return;

            bubblesRef.current.forEach((bubble, index) => {
                if (!bubble) return;

                // Spring Drop Animation
                // Starts from above and drops into place with elasticity
                gsap.fromTo(
                    bubble,
                    {
                        y: -1000,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 2.5,
                        ease: "elastic.out(1, 0.3)",
                        delay: index * 0.2, // Stagger effect
                        onComplete: () => {
                            // Start continuous floating after drop settles

                            // Y Motion (Gravity/Buoyancy)
                            gsap.to(bubble, {
                                y: "random(-30, 30)",
                                duration: "random(3, 6)",
                                ease: "sine.inOut",
                                repeat: -1,
                                yoyo: true,
                            });

                            // X Motion (Drift)
                            gsap.to(bubble, {
                                x: "random(-20, 20)",
                                duration: "random(4, 7)",
                                ease: "sine.inOut",
                                repeat: -1,
                                yoyo: true,
                            });

                            // Slight Rotation
                            gsap.to(bubble, {
                                rotation: "random(-10, 10)",
                                duration: "random(5, 10)",
                                ease: "sine.inOut",
                                repeat: -1,
                                yoyo: true,
                            });
                        },
                    }
                );
            });
        },
        { scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className={cn("absolute inset-0 w-full h-full pointer-events-none overflow-hidden", className)}
            aria-hidden="true"
        >
            {VISION_BUBBLES.map((bubble, i) => (
                <div
                    key={bubble.id}
                    ref={(el) => { bubblesRef.current[i] = el; }}
                    className="absolute flex items-center justify-center rounded-full backdrop-blur-[2px] border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                    style={{
                        left: `${bubble.initialX}%`,
                        top: `${bubble.initialY}%`,
                        width: `${bubble.size}px`,
                        height: `${bubble.size}px`,
                        background: `radial-gradient(120% 154% at 50% 10%, rgba(255, 255, 255, 0.05) 0%, transparent 100%)`, // Glassy
                        transform: "translate(-50%, -50%)", // Center on coordinate
                        boxShadow: `inset 0 0 20px rgba(255,255,255,0.05), 0 0 20px ${bubble.color ? bubble.color.replace('0.4', '0.1') : 'rgba(255,255,255,0.1)'}`,
                    }}
                >
                    {/* Inner Glow/Highlight */}
                    <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-50" />

                    <span
                        className="relative z-10 text-white/80 font-light tracking-wider text-sm sm:text-base md:text-lg text-center px-4 mix-blend-plus-lighter"
                        style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}
                    >
                        {bubble.text}
                    </span>
                </div>
            ))}
        </div>
    );
}
