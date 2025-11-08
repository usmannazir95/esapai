"use client";

import { motion } from "motion/react";

/**
 * Advanced SVG-based loading animation
 * Perfect for loading states, can replace or enhance existing spinners
 */

interface AnimatedSVGLoaderProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "white" | "gray";
  className?: string;
}

const sizeMap = {
  sm: 24,
  md: 48,
  lg: 96,
};

const colorMap = {
  primary: "rgba(19, 245, 132, 1)",
  white: "rgba(255, 255, 255, 1)",
  gray: "rgba(156, 163, 175, 1)",
};

export function AnimatedSVGLoader({
  size = "md",
  variant = "primary",
  className = "",
}: AnimatedSVGLoaderProps) {
  const dimension = sizeMap[size];
  const color = colorMap[variant];

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 100 100"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={`gradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.3" />
          </linearGradient>
          <filter id={`glow-${variant}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer rotating ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={`url(#gradient-${variant})`}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="125.6"
          strokeDashoffset="94.2"
          filter={`url(#glow-${variant})`}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "50% 50%" }}
        />

        {/* Inner pulsing circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeOpacity="0.5"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Center dot */}
        <motion.circle
          cx="50"
          cy="50"
          r="4"
          fill={color}
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}

/**
 * SVG Path-based loader - draws a path progressively
 */
export function SVGPathLoader({
  size = "md",
  variant = "primary",
  className = "",
}: AnimatedSVGLoaderProps) {
  const dimension = sizeMap[size];
  const color = colorMap[variant];

  const pathData = "M 20,50 Q 50,20 80,50 T 80,50";

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg width={dimension} height={dimension} viewBox="0 0 100 100">
        <motion.path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.circle
          cx="20"
          cy="50"
          r="4"
          fill={color}
          animate={{
            x: [0, 60, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}

/**
 * Morphing shape loader - transforms between different shapes
 */
export function MorphingLoader({
  size = "md",
  variant = "primary",
  className = "",
}: AnimatedSVGLoaderProps) {
  const dimension = sizeMap[size];
  const color = colorMap[variant];

  const shapes = {
    circle: "M 50,50 m -30,0 a 30,30 0 1,0 60,0 a 30,30 0 1,0 -60,0",
    triangle:
      "M 50,20 L 80,70 L 20,70 Z",
    square: "M 30,30 L 70,30 L 70,70 L 30,70 Z",
    hexagon:
      "M 50,20 L 75,35 L 75,65 L 50,80 L 25,65 L 25,35 Z",
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg width={dimension} height={dimension} viewBox="0 0 100 100">
        <motion.path
          d={shapes.circle}
          fill={color}
          fillOpacity="0.3"
          stroke={color}
          strokeWidth="2"
          animate={{
            d: [
              shapes.circle,
              shapes.triangle,
              shapes.square,
              shapes.hexagon,
              shapes.circle,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}

