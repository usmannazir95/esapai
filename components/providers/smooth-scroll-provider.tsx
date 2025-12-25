"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

interface SmoothScrollProviderProps {
    children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Sync Lenis with GSAP ScrollTrigger
        // This will be handled globally if GSAP is used elsewhere, 
        // but good to keep in mind.

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
