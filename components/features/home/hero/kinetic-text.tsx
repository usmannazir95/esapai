"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

interface KineticTextProps {
    children: string;
    className?: string;
    delay?: number;
    glitchIntensity?: "subtle" | "medium" | "high";
    enableGlitch?: boolean;
    decodeSpeed?: number; // ms per character change
    revealDuration?: number; // total reveal duration in seconds
}

// Character sets for decode effect
const DECODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
const SIMILAR_CHARS: Record<string, string> = {
    A: "4@Δ",
    E: "3€Σ",
    I: "1!|",
    O: "0Ø",
    S: "5$§",
    T: "7†",
    G: "6&",
    B: "8ß",
    Z: "2",
};

export function KineticText({
    children,
    className = "",
    delay = 0,
    glitchIntensity = "subtle",
    enableGlitch = true,
    decodeSpeed = 50,
    revealDuration = 1.2,
}: KineticTextProps) {
    const textRef = useRef<HTMLSpanElement>(null);
    const splitInstanceRef = useRef<SplitType | null>(null);

    useEffect(() => {
        if (!textRef.current) return;

        const element = textRef.current;
        const shouldReduceMotion = prefersReducedMotion();

        // If reduced motion is preferred, just do a simple fade
        if (shouldReduceMotion) {
            gsap.fromTo(
                element,
                { opacity: 0 },
                { opacity: 1, duration: 0.6, delay, ease: "power2.out" }
            );
            return;
        }

        // Split text into characters
        const split = new SplitType(element, {
            types: "chars",
            tagName: "span",
        });
        splitInstanceRef.current = split;

        const chars = split.chars;
        if (!chars || chars.length === 0) return;

        // Store original characters
        const originalChars = chars.map((char) => char.textContent || "");

        // Set initial state
        gsap.set(chars, {
            opacity: 0,
            y: 20,
            scale: 0.8,
        });

        // Digital decode effect
        const decodeTimeline = gsap.timeline({ delay });

        // Phase 1: Random character cycling (decode effect)
        chars.forEach((char, index) => {
            const originalChar = originalChars[index];
            const cycleCount = gsap.utils.random(3, 8, 1); // Random cycles per character
            let currentCycle = 0;

            const interval = setInterval(() => {
                if (currentCycle >= cycleCount) {
                    clearInterval(interval);
                    char.textContent = originalChar;
                    return;
                }

                // Use similar characters if available, otherwise random
                const similarSet = SIMILAR_CHARS[originalChar.toUpperCase()];
                if (similarSet && Math.random() > 0.3) {
                    const randomIndex = Math.floor(Math.random() * similarSet.length);
                    char.textContent = similarSet[randomIndex];
                } else {
                    const randomIndex = Math.floor(Math.random() * DECODE_CHARS.length);
                    char.textContent = DECODE_CHARS[randomIndex];
                }

                currentCycle++;
            }, decodeSpeed);

            // Cleanup interval after decode phase
            setTimeout(() => clearInterval(interval), cycleCount * decodeSpeed + delay * 1000);
        });

        // Phase 2: Staggered character reveal
        decodeTimeline.to(
            chars,
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: revealDuration,
                ease: "power2.out",
                stagger: {
                    each: 0.03,
                    from: "start",
                },
            },
            delay + 0.2
        );

        // Phase 3: Subtle ongoing glitch effect (optional)
        if (enableGlitch) {
            const glitchInterval = setInterval(() => {
                if (!chars || chars.length === 0) return;

                // Pick 1-3 random characters to glitch
                const numGlitches = Math.floor(Math.random() * 3) + 1;
                const glitchIndices = new Set<number>();

                while (glitchIndices.size < numGlitches) {
                    glitchIndices.add(Math.floor(Math.random() * chars.length));
                }

                glitchIndices.forEach((index) => {
                    const char = chars[index];
                    const originalChar = originalChars[index];

                    // Intensity settings
                    const intensitySettings = {
                        subtle: { duration: 0.05, offset: 2 },
                        medium: { duration: 0.08, offset: 4 },
                        high: { duration: 0.12, offset: 6 },
                    };

                    const { duration, offset } = intensitySettings[glitchIntensity];

                    // Quick glitch animation
                    const glitchTl = gsap.timeline();

                    glitchTl
                        .to(char, {
                            x: gsap.utils.random(-offset, offset),
                            y: gsap.utils.random(-offset, offset),
                            opacity: 0.7,
                            duration: duration,
                            ease: "power2.inOut",
                        })
                        .to(char, {
                            x: 0,
                            y: 0,
                            opacity: 1,
                            duration: duration,
                            ease: "power2.inOut",
                        });

                    // Occasionally change character briefly
                    if (Math.random() > 0.7) {
                        setTimeout(() => {
                            const similarSet = SIMILAR_CHARS[originalChar.toUpperCase()];
                            if (similarSet) {
                                const randomIndex = Math.floor(Math.random() * similarSet.length);
                                char.textContent = similarSet[randomIndex];
                                setTimeout(() => {
                                    char.textContent = originalChar;
                                }, duration * 1000);
                            }
                        }, duration * 500);
                    }
                });
            }, gsap.utils.random(3000, 6000)); // Random interval between glitches

            // Cleanup glitch interval on unmount
            return () => {
                clearInterval(glitchInterval);
                if (splitInstanceRef.current) {
                    splitInstanceRef.current.revert();
                }
            };
        }

        // Cleanup
        return () => {
            if (splitInstanceRef.current) {
                splitInstanceRef.current.revert();
            }
        };
    }, [children, delay, glitchIntensity, enableGlitch, decodeSpeed, revealDuration]);

    return (
        <span ref={textRef} className={className} style={{ display: "inline-block" }}>
            {children}
        </span>
    );
}
