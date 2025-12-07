"use client";

import React, { useRef, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { getPerformanceTier, getAdaptiveQuality, createFrameThrottle } from '@/lib/utils/performance-utils';

// Adaptive grid configuration based on performance tier
const getGridSize = (tier: "high" | "medium" | "low") => {
  const quality = getAdaptiveQuality(tier);
  return quality.gridSize;
};

const TILE_SIZE = 1;
const TILE_GAP = 0.1;

interface InstancedGridProps {
  mousePos: React.MutableRefObject<THREE.Vector2>;
  gridSize: number;
}

const InstancedGrid: React.FC<InstancedGridProps> = memo(({ mousePos, gridSize }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const totalTiles = gridSize * gridSize;
  
  // Cache colors to reduce allocations
  const baseColor = useMemo(() => new THREE.Color('#001108'), []);
  const pulseColor = useMemo(() => new THREE.Color('#13F584'), []);
  const tempColor = useMemo(() => new THREE.Color(), []);
  
  // Arrays to store dynamic data
  const positions = useMemo(() => {
    const pos = new Float32Array(totalTiles * 3);
    let i = 0;
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        // Center the grid
        pos[i] = (x - gridSize / 2) * (TILE_SIZE + TILE_GAP);
        pos[i + 1] = 0; // Y is up
        pos[i + 2] = (z - gridSize / 2) * (TILE_SIZE + TILE_GAP);
        i += 3;
      }
    }
    return pos;
  }, [gridSize, totalTiles]);

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
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const id = i;
        const px = positions[i * 3];
        const pz = positions[i * 3 + 2];
        
        // Base Breathing Logic
        let py = Math.sin(time * 2 + phases[id]) * 0.1;
        
        // Mouse Interaction Logic (Simple distance check from a focal point projected on floor)
        // We approximate the mouse hit on the floor by checking X/Z distance relative to camera lookat
        // A robust raycast for tiles every frame is heavy, so we simulate interaction 
        // by creating a wave moving from center-bottom (viewer) outwards or following a "virtual cursor" on floor.
        
        // Let's make the "active" zone wander or react to simple mouse X
        const mouseXWorld = mousePos.current.x * 20; // Scale -1..1 to world units
        const mouseYWorld = mousePos.current.y * 10 + 5; // Tilt compensation
        
        const dist = Math.sqrt(Math.pow(px - mouseXWorld, 2) + Math.pow(pz - (mouseYWorld + 5), 2));
        
        // Ripple/Hover effect
        if (dist < 4) {
          const intensity = 1 - dist / 4;
          py += intensity * 0.5; // Elevate
        }
        
        dummy.position.set(px, py - 2, pz); // -2 to lower the floor below UI
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        
        meshRef.current.setMatrixAt(id, dummy.matrix);
        
        // Dynamic Color Logic - reuse cached colors
        // Mix based on height/interaction
        const alpha = Math.max(0, py * 2); 
        tempColor.copy(baseColor).lerp(pulseColor, alpha);
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

interface GridFloorProps {
  className?: string;
  perspective?: 'normal' | 'dramatic';
}

const GridFloorComponent: React.FC<GridFloorProps> = ({ className = "", perspective = 'normal' }) => {
  const mousePos = useRef(new THREE.Vector2(0, 0));
  
  // Get performance tier and adaptive settings
  const performanceTier = useMemo(() => getPerformanceTier(), []);
  const quality = useMemo(() => getAdaptiveQuality(performanceTier), [performanceTier]);
  const gridSize = useMemo(() => getGridSize(performanceTier), [performanceTier]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window === 'undefined') return;
    // Normalize mouse -1 to 1
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mousePos.current.set(x, y);
  };

  // Camera settings based on perspective mode
  const cameraConfig = perspective === 'dramatic' 
    ? { position: [0, 8, 15] as [number, number, number], fov: 65, rotation: [-0.5, 0, 0] as [number, number, number] }
    : { position: [0, 5, 12] as [number, number, number], fov: 50, rotation: [-0.4, 0, 0] as [number, number, number] };

  return (
    <div 
      className={`relative w-full h-full z-0 pointer-events-auto ${className}`}
      onMouseMove={handleMouseMove}
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
        
        <InstancedGrid mousePos={mousePos} gridSize={gridSize} />
        
        {/* Fog to hide the grid edge - match background color */}
        <fog attach="fog" args={['#000300', 4, 24]} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

// Export with dynamic import wrapper to prevent SSR issues
const GridFloor = GridFloorComponent;

export default GridFloor;

