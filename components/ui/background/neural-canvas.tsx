"use client";

import { cn } from "@/lib/utils";

interface NeuralBackgroundProps {
    className?: string;
}

export function NeuralBackground({ className }: NeuralBackgroundProps) {
    return (
        <div className={cn("fixed inset-0 z-[-1] pointer-events-none overflow-hidden", className)}>
            {/* Main gradient background - matching image colors */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(ellipse 70% 50% at 50% 0%, rgba(13, 48, 37, 0.6) 0%, transparent 50%),
                        radial-gradient(ellipse 50% 40% at 20% 20%, rgba(10, 42, 31, 0.4) 0%, transparent 50%),
                        radial-gradient(ellipse 40% 35% at 85% 15%, rgba(11, 45, 33, 0.35) 0%, transparent 50%),
                        linear-gradient(180deg, #0d3025 0%, #0a2a1f 25%, #071d16 50%, #041510 75%, #030d0a 100%)
                    `,
                }}
            />

            {/* Subtle green glow at top center */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] h-[50%]"
                style={{
                    background: 'radial-gradient(ellipse at center top, rgba(19, 245, 132, 0.04) 0%, transparent 50%)',
                }}
            />

            {/* Bottom fades to near black */}
            <div
                className="absolute bottom-0 left-0 w-full h-[40%]"
                style={{
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(3, 13, 10, 0.8) 100%)',
                }}
            />

            {/* Very subtle noise texture */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}
