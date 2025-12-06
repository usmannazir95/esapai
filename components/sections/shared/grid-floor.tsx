"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Constants for grid configuration
const GRID_SIZE = 40;
const TILE_SIZE = 1;
const TILE_GAP = 0.1;
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;

interface InstancedGridProps {
  mousePos: React.MutableRefObject<THREE.Vector2>;
}

const InstancedGrid: React.FC<InstancedGridProps> = ({ mousePos }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Arrays to store dynamic data
  const positions = useMemo(() => {
    const pos = new Float32Array(TOTAL_TILES * 3);
    let i = 0;
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let z = 0; z < GRID_SIZE; z++) {
        // Center the grid
        pos[i] = (x - GRID_SIZE / 2) * (TILE_SIZE + TILE_GAP);
        pos[i + 1] = 0; // Y is up
        pos[i + 2] = (z - GRID_SIZE / 2) * (TILE_SIZE + TILE_GAP);
        i += 3;
      }
    }
    return pos;
  }, []);

  // Use simple random phases for breathing effect - only generate on client
  const phases = useMemo(() => {
    const p = new Float32Array(TOTAL_TILES);
    // Use a seeded random or only generate on client
    let seed = 12345; // Fixed seed for consistency
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < TOTAL_TILES; i++) p[i] = seededRandom() * Math.PI * 2;
    return p;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    let i = 0;
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let z = 0; z < GRID_SIZE; z++) {
        const id = i;
        const px = positions[i * 3];
        const pz = positions[i * 3 + 2];
        
        // Base Breathing Logic
        let py = Math.sin(time * 2 + phases[id]) * 0.1;
        
        // Mouse Interaction Logic (Simple distance check from a focal point projected on floor)
        // We approximate the mouse hit on the floor by checking X/Z distance relative to camera lookat
        // A robust raycast for 1600 tiles every frame is heavy, so we simulate interaction 
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
        
        // Dynamic Color Logic
        const baseColor = new THREE.Color('#001108'); // Dark green/black
        const pulseColor = new THREE.Color('#13F584'); // Emerald
        
        // Mix based on height/interaction
        const alpha = Math.max(0, py * 2); 
        const finalColor = baseColor.clone().lerp(pulseColor, alpha);
        meshRef.current.setColorAt(id, finalColor);
        i++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, TOTAL_TILES]}>
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
};

interface GridFloorProps {
  className?: string;
  perspective?: 'normal' | 'dramatic';
}

const GridFloor: React.FC<GridFloorProps> = ({ className = "", perspective = 'normal' }) => {
  const mousePos = useRef(new THREE.Vector2(0, 0));
  const [isMounted, setIsMounted] = React.useState(false);
  
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
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

  if (!isMounted) {
    return (
      <div 
        className={`relative w-full h-full z-0 pointer-events-auto ${className}`}
        style={{ backgroundColor: 'transparent' }}
      />
    );
  }

  return (
    <div 
      className={`relative w-full h-full z-0 pointer-events-auto ${className}`}
      onMouseMove={handleMouseMove}
    >
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera 
          makeDefault 
          position={cameraConfig.position} 
          fov={cameraConfig.fov} 
          rotation={cameraConfig.rotation} 
        />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#06b6d4" intensity={2} />
        <pointLight position={[-10, 10, -10]} color="#13F584" intensity={2} />
        
        <InstancedGrid mousePos={mousePos} />
        
        {/* Fog to hide the grid edge */}
        <fog attach="fog" args={['#000000', 5, 25]} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default GridFloor;

