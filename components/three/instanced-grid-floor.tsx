"use client";

import React, { useRef, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { getPerformanceTier, getAdaptiveQuality, createFrameThrottle } from '@/lib/utils/performance-utils';
import type { GridFloorProps } from "@/types/props";

// Adaptive grid configuration based on performance tier
const getGridSize = (tier: "high" | "medium" | "low") => {
  const quality = getAdaptiveQuality(tier);
  return quality.gridSize;
};

const TILE_SIZE = 1;
const TILE_GAP = 0.1;

interface InstancedGridProps {
  gridSize: number;
}

const InstancedGrid: React.FC<InstancedGridProps> = memo(({ gridSize }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Make grid wider horizontally (left-right) - 1.8x wider than depth
  // Extended depth for better infinite fade effect
  const gridWidth = Math.floor(gridSize * 1.8); // X-axis (left-right)
  const gridDepth = Math.floor(gridSize * 1.3); // Z-axis (front-back) - extended for depth fade
  const totalTiles = gridWidth * gridDepth;
  
  // Cache colors to reduce allocations
  const baseColor = useMemo(() => new THREE.Color('#001108'), []);
  const pulseColor = useMemo(() => new THREE.Color('#13F584'), []);
  const tempColor = useMemo(() => new THREE.Color(), []);
  
  // Arrays to store dynamic data
  const positions = useMemo(() => {
    const pos = new Float32Array(totalTiles * 3);
    let i = 0;
    for (let x = 0; x < gridWidth; x++) {
      for (let z = 0; z < gridDepth; z++) {
        // Center the grid
        pos[i] = (x - gridWidth / 2) * (TILE_SIZE + TILE_GAP);
        pos[i + 1] = 0; // Y is up
        pos[i + 2] = (z - gridDepth / 2) * (TILE_SIZE + TILE_GAP);
        i += 3;
      }
    }
    return pos;
  }, [gridWidth, gridDepth, totalTiles]);

  // Use simple random phases for breathing effect - only generate on client
  const phases = useMemo(() => {
    const p = new Float32Array(totalTiles);
    // Use a seeded random or only generate on client
    let seed = 12345; // Fixed seed for consistency
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < totalTiles; i++) p[i] = seededRandom() * Math.PI * 2;
    return p;
  }, [totalTiles]);
  
  // Store grid dimensions for useFrame
  const gridDimensions = useMemo(() => ({ width: gridWidth, depth: gridDepth }), [gridWidth, gridDepth]);
  
  // Frame rate throttling based on performance tier
  const performanceTier = useMemo(() => getPerformanceTier(), []);
  const quality = useMemo(() => getAdaptiveQuality(performanceTier), [performanceTier]);
  const throttleFrame = useMemo(() => createFrameThrottle(quality.maxFPS), [quality.maxFPS]);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Throttle frame updates based on performance tier
    if (!throttleFrame(() => {})) return;

    const time = state.clock.getElapsedTime();
    
    let i = 0;
    for (let x = 0; x < gridDimensions.width; x++) {
      for (let z = 0; z < gridDimensions.depth; z++) {
        const id = i;
        const px = positions[i * 3];
        const pz = positions[i * 3 + 2];
        
        // Base Breathing Logic
        const py = Math.sin(time * 2 + phases[id]) * 0.1;
        
        dummy.position.set(px, py - 2, pz); // -2 to lower the floor below UI
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        
        meshRef.current.setMatrixAt(id, dummy.matrix);
        
        // Distance-based opacity for infinite fade effect
        // Tiles further back (positive Z) fade out more
        const maxZ = (gridDimensions.depth / 2) * (TILE_SIZE + TILE_GAP);
        const normalizedZ = Math.max(0, (pz + maxZ) / (maxZ * 2));
        const distanceFade = 1 - Math.pow(normalizedZ, 1.5); // Exponential fade for smoother transition
        
        // Dynamic Color Logic - reuse cached colors
        // Mix based on height/interaction
        const heightAlpha = Math.max(0, py * 2); 
        tempColor.copy(baseColor).lerp(pulseColor, heightAlpha);
        
        // Apply distance-based opacity to color
        tempColor.multiplyScalar(0.3 + distanceFade * 0.7); // Fade from 100% to 30% opacity
        meshRef.current.setColorAt(id, tempColor);
        i++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, totalTiles]}>
      <boxGeometry args={[TILE_SIZE, 0.1, TILE_SIZE]} />
      <meshStandardMaterial 
        roughness={0.2} 
        metalness={0.8} 
        transparent 
        opacity={0.8}
        emissive="#002211"
        emissiveIntensity={0.2}
      />
    </instancedMesh>
  );
});

InstancedGrid.displayName = 'InstancedGrid';

const InstancedGridFloor: React.FC<GridFloorProps> = ({ className = "", perspective = 'normal' }) => {
  // Get performance tier and adaptive settings
  const performanceTier = useMemo(() => getPerformanceTier(), []);
  const quality = useMemo(() => getAdaptiveQuality(performanceTier), [performanceTier]);
  const gridSize = useMemo(() => getGridSize(performanceTier), [performanceTier]);

  // Camera settings based on perspective mode
  const cameraConfig = perspective === 'dramatic' 
    ? { position: [0, 8, 15] as [number, number, number], fov: 65, rotation: [-0.5, 0, 0] as [number, number, number] }
    : { position: [0, 5, 12] as [number, number, number], fov: 50, rotation: [-0.4, 0, 0] as [number, number, number] };

  return (
    <div 
      className={`relative w-full h-full z-0 pointer-events-auto ${className}`}
      style={{ willChange: 'transform' }}
    >
      <Canvas 
        shadows={quality.shadows} 
        dpr={quality.dpr as [number, number]}
        gl={{ 
          antialias: quality.antialias, 
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <PerspectiveCamera 
          makeDefault 
          position={cameraConfig.position} 
          fov={cameraConfig.fov} 
          rotation={cameraConfig.rotation} 
        />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#06b6d4" intensity={2} />
        <pointLight position={[-10, 10, -10]} color="#13F584" intensity={2} />
        
        <InstancedGrid gridSize={gridSize} />
        
        {/* Fog to hide the grid edge - match background color, extended for smoother fade */}
        <fog attach="fog" args={['#000300', 6, 35]} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default InstancedGridFloor;
