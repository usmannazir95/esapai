"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { Check, Terminal, Cpu, Zap, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Command } from "lucide-react";
import { cn } from "@/lib/utils";

const CODE_LINES = [
    { text: "import { Agent } from 'esapai';", color: "text-pink-500" },
    { text: "" },
    { text: "// Initialize your autonomous agent", color: "text-zinc-500 italic" },
    { text: "const agent = new Agent({", color: "text-blue-400" },
    { text: "  name: 'Growth-Bot-01',", color: "text-[#13F584]" },
    { text: "  model: 'gpt-4-turbo',", color: "text-orange-400" },
    { text: "  capabilities: ['analysis', 'execution']", color: "text-yellow-300" },
    { text: "});", color: "text-zinc-300" },
    { text: "" },
    { text: "await agent.connect();", color: "text-purple-400" },
    { text: "" },
    { text: "> npx esapai integrate", color: "text-zinc-400" },
    { text: "> Verifying credentials... [OK]", color: "text-[#13F584]" },
    { text: "> Connecting to Core Systems... [CONNECTED]", color: "text-[#13F584]" },
    { text: "> Analyzing 1.2M records...", color: "text-blue-400" },
    { text: "> Optimizing workflow efficiency...", color: "text-purple-400" },
    { text: "> INTEGRATION COMPLETE", color: "text-[#13F584] font-bold" },
];

export function TerminalDemoSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Transformations
    const terminalOpacity = useTransform(smoothProgress, [0, 0.6, 0.7], [1, 1, 0]);
    const terminalScale = useTransform(smoothProgress, [0.6, 0.8], [1, 0.8]);
    const terminalY = useTransform(smoothProgress, [0.6, 0.8], ["0%", "-20%"]);

    const successOpacity = useTransform(smoothProgress, [0.65, 0.8], [0, 1]);
    const successScale = useTransform(smoothProgress, [0.65, 0.8], [0.8, 1]);
    const successY = useTransform(smoothProgress, [0.65, 0.8], ["20%", "0%"]);

    // Calculate visible lines based on scroll
    const [visibleLines, setVisibleLines] = useState(0);

    // Update visible lines based on scroll progress (0 to 0.6 range)
    useEffect(() => {
        return smoothProgress.on("change", (latest) => {
            // Map 0-0.6 progress to 0-TotalLines
            const progress = Math.min(latest / 0.6, 1);
            const lines = Math.floor(progress * CODE_LINES.length);
            setVisibleLines(lines);
        });
    }, [smoothProgress]);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-transparent">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden p-4">

                {/* Background Ambient Glow */}
                <div className="absolute inset-0 bg-radial-gradient from-purple-900/10 via-transparent to-transparent pointer-events-none" />

                {/* TERMINAL WINDOW */}
                <motion.div
                    style={{
                        opacity: terminalOpacity,
                        scale: terminalScale,
                        y: terminalY
                    }}
                    className="relative w-full max-w-4xl bg-black/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden z-10"
                >
                    {/* Header */}
                    <div className="flex items-center px-4 py-3 border-b border-white/5 bg-white/5">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10" />
                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10" />
                            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10" />
                        </div>
                        <div className="flex-1 text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/5">
                                <Command className="w-3 h-3 text-white/40" />
                                <span className="text-xs font-mono text-white/50">integrate-agent.ts</span>
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 md:p-8 font-mono text-base md:text-lg leading-relaxed h-[500px] overflow-hidden relative">
                        {/* Scanline Effect */}
                        <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-[0.03] pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#13F584]/[0.02] to-transparent pointer-events-none" />

                        {CODE_LINES.map((line, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{
                                    opacity: index <= visibleLines ? 1 : 0,
                                    x: index <= visibleLines ? 0 : -10
                                }}
                                transition={{ duration: 0.05 }}
                                className="flex"
                            >
                                <span className="text-zinc-700 w-8 select-none flex-shrink-0 text-right mr-4 font-light opacity-50">{index + 1}</span>
                                <span className={cn(line.color || "text-zinc-300", "whitespace-pre font-medium")}>
                                    {line.text}
                                    {index === visibleLines && (
                                        <motion.span
                                            animate={{ opacity: [1, 1, 0, 0] }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                times: [0, 0.5, 0.5, 1],
                                                ease: "linear"
                                            }}
                                            className="inline-block w-2.5 h-5 bg-[#13F584] ml-1 align-middle shadow-[0_0_10px_#13F584]"
                                        />
                                    )}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* SUCCESS CARD */}
                <motion.div
                    style={{
                        opacity: successOpacity,
                        scale: successScale,
                        y: successY
                    }}
                    className="absolute z-20 w-full max-w-sm"
                >
                    <div className="relative bg-[#050505]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center gap-6">

                        {/* Glow Behind Icon (Subtler) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#13F584] blur-[60px] opacity-10 pointer-events-none" />

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="w-16 h-16 rounded-full bg-[#13F584]/5 flex items-center justify-center border border-[#13F584]/20 shadow-[0_0_15px_rgba(19,245,132,0.1)] relative"
                        >
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 rounded-full bg-[#13F584]/10 blur-sm"
                            />
                            <Check className="w-6 h-6 text-[#13F584]" strokeWidth={3} />
                        </motion.div>

                        <div className="space-y-2 relative">
                            <h3 className="text-2xl font-bold text-white tracking-tight">Integration Successful</h3>
                            <p className="text-base text-zinc-400 font-light">Agent is now live and engaged.</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
