"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface HeroBadgeProps {
    /** The text to display in the badge */
    text: string;
    /** Optional custom class for the badge container */
    className?: string;
    /** Show the animated beam effect (default: true) */
    showBeam?: boolean;
    /** Beam animation duration in seconds (default: 2.5) */
    beamDuration?: number;
    /** Delay between beam animations in seconds (default: 3) */
    beamDelay?: number;
    /** Show the pulsing indicator dot (default: true) */
    showIndicator?: boolean;
}

/**
 * HeroBadge - A premium animated badge component for hero sections
 * 
 * Features:
 * - Animated beam/shimmer effect that sweeps across
 * - Pulsing indicator dot
 * - Glassmorphic styling
 * - Fully customizable
 */
export function HeroBadge({
    text,
    className,
    showBeam = true,
    beamDuration = 2.5,
    beamDelay = 3,
    showIndicator = true,
}: HeroBadgeProps) {
    return (
        <div
            className={cn(
                "hero-badge relative flex items-center py-1 px-4 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden",
                className
            )}
        >
            {/* Animated beam effect */}
            {showBeam && (
                <motion.div
                    className="absolute inset-0 w-[200%]"
                    style={{
                        background: 'linear-gradient(90deg, transparent 0%, transparent 45%, rgba(19, 245, 132, 0.2) 50%, transparent 55%, transparent 100%)',
                    }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{
                        duration: beamDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: beamDelay
                    }}
                />
            )}

            {/* Pulsing indicator */}
            {showIndicator && (
                <span className="relative flex h-2 w-2 rounded-full bg-primary animate-pulse mr-2" />
            )}

            {/* Badge text */}
            <span className="relative text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary">
                {text}
            </span>
        </div>
    );
}
