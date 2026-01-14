"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
    x: number;
    y: number;
    size: number;
    opacity: number;
    speedX: number;
    speedY: number;
}

import { cn } from "@/lib/utils";

interface NeuralBackgroundProps {
    className?: string;
}

export function NeuralBackground({ className }: NeuralBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let particles: Particle[] = [];
        let animationFrameId: number;

        // Configuration
        const particleCount = isMobile ? 150 : 800; // Reduced from 2000 to 800
        const colors = ["#13F584"]; // Brand Green

        const init = () => {
            canvas.width = width;
            canvas.height = height;
            particles = [];

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 2, // Varied size
                    opacity: Math.random() * 0.5 + 0.1, // Varied opacity
                    speedX: (Math.random() - 0.5) * 0.6, // Increased speed
                    speedY: (Math.random() - 0.5) * 0.6, // Increased speed
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw particles
            particles.forEach((p) => {
                // Move
                p.x += p.speedX;
                p.y += p.speedY;

                // Wrap around screen
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Render
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(19, 245, 132, ${p.opacity})`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            init();
        };

        init();
        draw();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isMobile]);

    return (
        <div className={cn("fixed inset-0 z-[-1] pointer-events-none bg-[#020305]", className)}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full block"
            />

            {/* Gradient Overlay for Depth/Nebula effect */}
            <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(19,245,132,0.03)_0%,transparent_70%)]"
                style={{ mixBlendMode: 'screen' }}
            />
        </div>
    );
}
