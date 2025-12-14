"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import { getPerformanceTier, getAdaptiveQuality } from '@/lib/utils/performance-utils';

interface SpaceBackgroundProps {
  className?: string;
}

// Theme Colors
const GRID_COLOR_SECONDARY = "#13F584"; // Primary Green
const BG_COLOR = "#000300"; // Dark Background

// Shooting Star Component with visible trail
interface ShootingStarProps {
  delay: number;
  duration: number;
  startPosition: [number, number, number];
  direction: [number, number, number];
}

const ShootingStar: React.FC<ShootingStarProps> = ({ delay, duration, startPosition, direction }) => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(-delay);
  const isActive = useRef(false);
  
  // Create trail segments for a comet-like effect
  const trailSegments = 12;
  const trailRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((_, delta) => {
    timeRef.current += delta;
    
    // Start shooting after delay
    if (timeRef.current >= 0 && !isActive.current) {
      isActive.current = true;
      timeRef.current = 0;
    }

    if (isActive.current && groupRef.current) {
      const progress = timeRef.current / duration;
      
      if (progress <= 1) {
        groupRef.current.visible = true;
        
        // Update each trail segment position
        for (let i = 0; i < trailSegments; i++) {
          const mesh = trailRefs.current[i];
          if (mesh) {
            // Each segment is slightly behind the previous
            const segmentProgress = Math.max(0, progress - (i * 0.015));
            const x = startPosition[0] + direction[0] * segmentProgress * 50;
            const y = startPosition[1] + direction[1] * segmentProgress * 50;
            const z = startPosition[2] + direction[2] * segmentProgress * 0.5;
            
            mesh.position.set(x, y, z);
            
            // Fade and shrink segments further back
            const fadeRatio = 1 - (i / trailSegments);
            const material = mesh.material as THREE.MeshBasicMaterial;
            material.opacity = fadeRatio * (1 - progress * 0.5);
            
            // Scale down trailing segments
            const scale = fadeRatio * 0.8 + 0.2;
            mesh.scale.setScalar(scale);
          }
        }
      } else {
        // Reset for next cycle
        groupRef.current.visible = false;
        isActive.current = false;
        timeRef.current = -(3 + Math.random() * 6); // Random delay before next appearance
      }
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      {/* Trail segments - elongated spheres */}
      {Array.from({ length: trailSegments }).map((_, i) => (
        <mesh 
          key={i} 
          ref={(el) => { trailRefs.current[i] = el; }}
        >
          <sphereGeometry args={[i === 0 ? 0.15 : 0.1, 8, 8]} />
          <meshBasicMaterial 
            color={i === 0 ? "#ffffff" : "#aaddff"} 
            transparent 
            opacity={1 - (i / trailSegments) * 0.7} 
          />
        </mesh>
      ))}
    </group>
  );
};

// Shooting Stars Group
const ShootingStars: React.FC<{ count?: number }> = ({ count = 5 }) => {
  const shootingStars = useMemo(() => {
    return new Array(count).fill(0).map((_, i) => ({
      delay: Math.random() * 8 + i * 2, // Stagger the starts
      duration: 0.8 + Math.random() * 0.5,
      startPosition: [
        (Math.random() - 0.3) * 40,
        15 + Math.random() * 10,
        -10 + Math.random() * 5
      ] as [number, number, number],
      direction: [
        0.5 + Math.random() * 0.3,
        -0.8 - Math.random() * 0.2,
        0
      ] as [number, number, number]
    }));
  }, [count]);

  return (
    <group>
      {shootingStars.map((star, i) => (
        <ShootingStar key={i} {...star} />
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
            {/* Stars and sparkles */}
            <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={200} scale={30} size={2} speed={0.4} opacity={0.5} color={GRID_COLOR_SECONDARY} />
            
            {/* Shooting stars */}
            <ShootingStars count={5} />
        </group>
      </Canvas>
    </div>
  );
};

export default SpaceBackground;
