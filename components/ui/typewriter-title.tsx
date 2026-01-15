"use client";

import React, { useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TypewriterTitleProps {
    /** The full title text to animate */
    title: string;
    /** 
     * How to split the title for highlighting:
     * - "lastWord": Highlights the last word in primary color (default)
     * - "secondLine": Treats the title as two lines separated by newline
     */
    splitMode?: "lastWord" | "secondLine";
    /** Custom class for the main title wrapper */
    className?: string;
    /** Custom class for the white/main text portion */
    mainTextClassName?: string;
    /** Custom class for the highlighted/primary text portion */
    highlightTextClassName?: string;
    /** For secondLine mode: provide the second line separately */
    secondLine?: string;
    /** Delay before animation starts (in seconds) */
    startDelay?: number;
    /** Duration per letter animation (in seconds) */
    letterDuration?: number;
    /** Stagger delay between letters (in seconds) */
    staggerDelay?: number;
    /** Whether to show glow effect behind highlighted text */
    showGlow?: boolean;
    /** Text alignment */
    align?: "left" | "center" | "right";
}

/**
 * Animated letter component for typewriter effect
 */
const AnimatedLetter = ({
    letter,
    index,
    className,
    duration = 0.4,
    staggerDelay = 0.05,
    startDelay = 0,
}: {
    letter: string;
    index: number;
    className?: string;
    duration?: number;
    staggerDelay?: number;
    startDelay?: number;
}) => (
    <motion.span
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
            duration,
            delay: startDelay + (staggerDelay * index),
            ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={className}
    >
        {letter === " " ? "\u00A0" : letter}
    </motion.span>
);

/**
 * TypewriterTitle - A reusable animated title component with letter-by-letter reveal
 * 
 * Features:
 * - Smooth blur-to-clear animation per letter
 * - Configurable split modes for highlighting
 * - Optional glow effect behind highlighted text
 * - Fully customizable timing and styling
 */
export function TypewriterTitle({
    title,
    splitMode = "lastWord",
    className,
    mainTextClassName,
    highlightTextClassName,
    secondLine,
    startDelay = 0,
    letterDuration = 0.4,
    staggerDelay = 0.05,
    showGlow = true,
    align = "left",
}: TypewriterTitleProps) {
    // Parse title into main and highlighted parts
    const { mainText, highlightText } = useMemo(() => {
        if (splitMode === "secondLine" && secondLine) {
            return {
                mainText: title,
                highlightText: secondLine,
            };
        }

        // Default: highlight last word
        const words = title.split(' ');
        const mainTitle = words.slice(0, -1).join(' ');
        const highlightWord = words.slice(-1)[0];
        return {
            mainText: mainTitle,
            highlightText: highlightWord,
        };
    }, [title, splitMode, secondLine]);

    const alignmentClass = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
    }[align];

    return (
        <h1 className={cn(
            "font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] tracking-heading",
            alignmentClass,
            className
        )}>
            {/* Main text with typewriter animation */}
            <span className={cn("block text-white", mainTextClassName)}>
                {mainText.split('').map((letter, index) => (
                    <AnimatedLetter
                        key={index}
                        letter={letter}
                        index={index}
                        duration={letterDuration}
                        staggerDelay={staggerDelay}
                        startDelay={startDelay}
                    />
                ))}
            </span>

            {/* Highlighted text with typewriter + optional glow effect */}
            <span className="block relative">
                {showGlow && (
                    <span
                        className="absolute inset-0 blur-2xl bg-primary/20 animate-pulse-slow"
                        aria-hidden="true"
                    />
                )}
                <span className={cn("relative", highlightTextClassName)}>
                    {highlightText.split('').map((letter, index) => (
                        <AnimatedLetter
                            key={index}
                            letter={letter}
                            index={mainText.length + index + 1}
                            duration={letterDuration}
                            staggerDelay={staggerDelay}
                            startDelay={startDelay}
                            className="text-primary"
                        />
                    ))}
                </span>
            </span>
        </h1>
    );
}
