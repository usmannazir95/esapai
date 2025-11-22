"use client";

import { motion } from "motion/react";
import { AnimatedSVGLoader } from "@/components/ui/animated-svg-loader";
import { cn } from "@/lib/utils";

interface GlobalLoaderProps {
  className?: string;
  message?: string;
  subMessage?: string;
}

/**
 * Full-viewport loader that matches the product neon aesthetic.
 * Combines subtle gradients, animated orbs, and the SVG loader.
 */
export function GlobalLoader({
  className,
  message = "Preparing your experience",
  subMessage = "Loading intelligence",
}: GlobalLoaderProps) {
  return (
    <div
      className={cn(
        "isolate flex min-h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden bg-[#050505] text-white",
        "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(19,245,132,0.18),transparent_60%)] before:content-['']",
        className,
      )}
    >
      <motion.div
        aria-hidden
        className="absolute h-[420px] w-[420px] rounded-[40%] bg-[rgba(19,245,132,0.18)] blur-[140px]"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: [0.8, 1, 0.9] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="absolute right-20 top-20 h-24 w-24 rounded-full bg-white/10 blur-3xl"
        initial={{ opacity: 0.2, scale: 0.8 }}
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.8, 1.2, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="absolute bottom-28 left-24 h-32 w-32 rounded-full bg-[rgba(19,245,132,0.3)] blur-3xl"
        initial={{ opacity: 0.2, scale: 0.8 }}
        animate={{ opacity: [0.2, 0.5, 0.25], scale: [0.7, 1.05, 0.8] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <AnimatedSVGLoader size="lg" variant="primary" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-1"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-white/60">
            {subMessage}
          </p>
          <p className="text-2xl font-semibold text-white md:text-3xl">
            {message}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

