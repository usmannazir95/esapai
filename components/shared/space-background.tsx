"use client";

import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import { getPerformanceTier, getAdaptiveQuality } from '@/lib/utils/performance-utils';

interface SpaceBackgroundProps {
  className?: string;
  hideSparkles?: boolean;
}

// Theme Colors
const GRID_COLOR_SECONDARY = "#13F584"; // Primary Green
const BG_COLOR = "transparent"; // Transparent Background for global neural lattice

const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ className = "", hideSparkles = false }) => {
  const performanceTier = useMemo(() => getPerformanceTier(), []);
  const quality = useMemo(() => getAdaptiveQuality(performanceTier), [performanceTier]);

  return (
    <div className={`w-full h-full absolute inset-0 -z-10 ${className}`} style={{ willChange: 'transform' }}>
      <Canvas
        dpr={quality.dpr as [number, number]}
        gl={{
          antialias: quality.antialias,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: BG_COLOR }}
        camera={{ position: [0, 0, 20], fov: 60 }}
      >
        <ambientLight intensity={0.5} />

        {!hideSparkles && (
          <group>
            {/* Stars and sparkles */}
            <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={200} scale={30} size={2} speed={0.4} opacity={0.5} color={GRID_COLOR_SECONDARY} />
          </group>
        )}
      </Canvas>
    </div>
  );
};

export default SpaceBackground;
