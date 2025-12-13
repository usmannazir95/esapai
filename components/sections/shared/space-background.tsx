"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Float, Stars, Sparkles } from "@react-three/drei";
import { getPerformanceTier, getAdaptiveQuality } from '@/lib/utils/performance-utils';

interface SpaceBackgroundProps {
  className?: string;
}

// Theme Colors
const GRID_COLOR_SECONDARY = "#13F584"; // Primary Green
const BG_COLOR = "#000300"; // Dark Background

const FloatingDebris = ({ count = 50 }) => {
    const debris = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 40, // Spread vertically
                (Math.random() - 0.5) * 40
            ] as [number, number, number],
            scale: Math.random() * 0.5 + 0.1,
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number]
        }));
    }, [count]);

    return (
        <group>
            {debris.map((data, i) => (
                <Float key={i} speed={2} rotationIntensity={2} floatIntensity={2}>
                    <mesh position={data.position} rotation={data.rotation} scale={data.scale}>
                        <octahedronGeometry args={[1, 0]} />
                        <meshStandardMaterial color={GRID_COLOR_SECONDARY} wireframe />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};

const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ className = "" }) => {
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
        
        <group>
            <FloatingDebris count={quality.particleCount * 40} />
            <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={200} scale={30} size={2} speed={0.4} opacity={0.5} color={GRID_COLOR_SECONDARY} />
        </group>
      </Canvas>
    </div>
  );
};

export default SpaceBackground;
