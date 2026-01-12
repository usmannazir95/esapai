"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ServiceGridCardProps {
    title: string;
    description: string;
    href: string;
    className?: string;
    gradient?: string;
}

export function ServiceGridCard({
    title,
    description,
    href,
    className,
    gradient = "from-primary/20 via-primary/5 to-transparent",
}: ServiceGridCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLAnchorElement>(null);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    return (
        <Link
            ref={cardRef}
            href={href}
            className={cn(
                "group relative block h-full min-h-[280px] sm:min-h-[320px] lg:min-h-[360px] overflow-hidden rounded-[32px]",
                "bg-[#020305] border border-white/[0.08]", // Darker, cleaner base
                "transition-all duration-500 ease-out",
                className
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Animated Border Gradient (Pseudo-border) */}
            <div
                className={cn(
                    "absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none z-0",
                    "bg-gradient-to-r via-primary/10", // Fallback
                    gradient // Dynamic gradient mix
                )}
                style={{
                    maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    padding: "1.5px", // Border width
                }}
            >
                <div className="absolute inset-0 bg-transparent" /> {/* Spacer */}
            </div>



            {/* Main Content Background Layer */}
            <div className="absolute inset-0 z-0">
                {/* Subtle Grain or Texture could be added here */}
                <div className={cn(
                    "absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br blur-[100px] rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-20",
                    gradient
                )} />
            </div>


            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
                {/* Top Area: Icon or decorative element */}
                <div className="flex justify-between items-start">
                    {/* Status Dot / Decorative */}
                    <div className="flex items-center space-x-2">
                        <div className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            isHovered ? "bg-primary shadow-[0_0_8px_rgba(19,245,132,0.6)]" : "bg-white/20"
                        )} />
                        <div className={cn(
                            "h-[1px] w-0 bg-white/20 transition-all duration-500",
                            isHovered ? "w-12" : "w-0"
                        )} />
                    </div>

                    {/* Arrow Icon */}
                    <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500",
                        "group-hover:bg-primary group-hover:border-primary group-hover:rotate-45"
                    )}>
                        <ArrowUpRight
                            className={cn(
                                "w-5 h-5 transition-colors duration-300",
                                "text-white/70 group-hover:text-black"
                            )}
                        />
                    </div>
                </div>

                {/* Bottom Area: Text */}
                <div className="space-y-4">
                    <h3
                        className={cn(
                            "text-3xl md:text-4xl font-semibold text-white tracking-tight leading-[1.1]",
                            "transition-transform duration-500 ease-out group-hover:-translate-y-1"
                        )}
                    >
                        {title}
                    </h3>

                    <p
                        className={cn(
                            "text-lg text-white/50 leading-relaxed font-light max-w-md",
                            "transition-all duration-500 ease-out",
                            "group-hover:text-white/80 group-hover:translate-x-1"
                        )}
                    >
                        {description}
                    </p>
                </div>
            </div>

            {/* Glass Shine Effect on Hover */}
            <div
                className={cn(
                    "absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none z-20",
                    "bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                )}
            />
        </Link>
    );
}
