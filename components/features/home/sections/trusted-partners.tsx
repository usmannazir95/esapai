"use client";

import React from "react";

const PARTNERS = [
    { name: "NVIDIA", logo: "/placeholder.svg" },
    { name: "GOOGLE", logo: "/placeholder.svg" },
    { name: "OPENAI", logo: "/placeholder.svg" },
    { name: "ANTHROPIC", logo: "/placeholder.svg" },
    { name: "MICROSOFT", logo: "/placeholder.svg" },
    { name: "META", logo: "/placeholder.svg" },
    { name: "AWS", logo: "/placeholder.svg" },
    { name: "TESLA", logo: "/placeholder.svg" },
];

export function TrustedPartners() {
    return (
        <section className="w-full py-12 overflow-hidden">
            <div className="container mx-auto px-4 mb-8 text-center">
                <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-primary/80">
                    Trusted by Industry Leaders
                </h2>
            </div>

            <div className="relative flex overflow-hidden">
                {/* Marquee Row */}
                <div className="flex animate-marquee whitespace-nowrap py-4">
                    {[...PARTNERS, ...PARTNERS].map((partner, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center px-12 sm:px-16 gap-3"
                        >
                            <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/40">
                                {partner.name.substring(0, 2)}
                            </div>
                            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/20 hover:text-primary/60 transition-colors cursor-default select-none uppercase tracking-tighter">
                                {partner.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
