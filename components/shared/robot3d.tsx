"use client";

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  RoundedBox, 
  Sphere, 
  Cylinder, 
  Float, 
  ContactShadows, 
  Environment,
  PerspectiveCamera,
  OrbitControls,
  Html,
  useProgress
} from '@react-three/drei';
import * as THREE from 'three';

// Constants for animation
const HEAD_TRACKING_SPEED = 0.1;
const BLINK_DURATION = 0.15; // seconds
const DOUBLE_BLINK_GAP = 0.1; // seconds

// Types
import type { Robot3DProps } from "@/types/component";

export type { Robot3DProps };

// Loader Component
const Loader: React.FC = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#13F584] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#13F584] font-mono text-sm">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  );
};

// Robot Mesh Component
const RobotMesh: React.FC<{ 
  primaryColor: string; 
  secondaryColor: string;
  isSpeaking: boolean;
}> = ({ 
  primaryColor, 
  secondaryColor,
  isSpeaking
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const eyesRef = useRef<THREE.Group>(null);
  const antennaRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const nextBlinkTime = useRef<number>(0);
  const blinkQueue = useRef<number[]>([]);
  
  // Materials (memoized for performance)
  const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: 'white',
    roughness: 0.2,
    metalness: 0.1,
  }), []);

  const accentMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: primaryColor,
    roughness: 0.2,
    metalness: 0.3,
    emissive: primaryColor,
    emissiveIntensity: 0.2
  }), [primaryColor]);

  const glowMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: secondaryColor,
    emissive: primaryColor,
    emissiveIntensity: 2,
    toneMapped: false
  }), [primaryColor, secondaryColor]);

  const jointMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#333333',
    roughness: 0.7,
    metalness: 0.5
  }), []);

  // Face plate material - dark screen that glows when talking
  const facePlateMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#111',
    roughness: 0.1,
    emissive: primaryColor,
    emissiveIntensity: 0
  }), [primaryColor]);

  useEffect(() => {
    if (hovered) {
      const now = Date.now() / 1000;
      blinkQueue.current = [
        now,
        now + BLINK_DURATION + DOUBLE_BLINK_GAP,
      ];
    }
  }, [hovered]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const now = Date.now() / 1000;

    if (groupRef.current && headRef.current && eyesRef.current) {
      // 1. Interactive Head/Body Tracking (Look at mouse)
      const mouseX = state.pointer.x;
      const mouseY = state.pointer.y;

      // Smoothly interpolate rotation for the whole group (slight body turn)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseX * 0.2,
        HEAD_TRACKING_SPEED
      );

      // Head tracking calculations
      let targetHeadY = mouseX * 0.5;
      let targetHeadX = -mouseY * 0.3;

      // Add nodding animation when speaking
      if (isSpeaking) {
        targetHeadX += Math.sin(t * 12) * 0.05; // Rapid slight nodding
      }

      // Head turns more than body
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetHeadY, HEAD_TRACKING_SPEED);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetHeadX, HEAD_TRACKING_SPEED);

      // 2. Eye Glow & Face Plate Pulsing
      const pulseSpeed = isSpeaking ? 15 : 8; // Faster pulse when talking
      const minIntensity = isSpeaking ? 2 : 1.5;
      const maxIntensity = isSpeaking ? 4 : 2.5;
      const pulse = minIntensity + Math.sin(t * pulseSpeed) * (maxIntensity - minIntensity) * 0.5;

      if(eyesRef.current.children) {
          eyesRef.current.children.forEach((child) => {
             if(child instanceof THREE.Mesh) {
                 (child.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
             }
          });
      }

      // 3. Eye Blink Scale
      if (nextBlinkTime.current === 0) {
        nextBlinkTime.current = now + 4 + Math.random() * 2;
      }

      let shouldBlink = false;
      if (blinkQueue.current.length > 0 && now >= blinkQueue.current[0]) {
        shouldBlink = true;
        if (now > blinkQueue.current[0] + BLINK_DURATION) {
          blinkQueue.current.shift();
        }
      } else if (now >= nextBlinkTime.current) {
        shouldBlink = true;
        if (now > nextBlinkTime.current + BLINK_DURATION) {
          nextBlinkTime.current = now + 4 + Math.random() * 2;
        }
      }

      const targetScale = shouldBlink ? 0.1 : 1;
      eyesRef.current.scale.y = THREE.MathUtils.lerp(eyesRef.current.scale.y || 1, targetScale, 0.3);

      // 4. Arm Idle Animation
      if (leftArmRef.current && rightArmRef.current) {
        const armSpeed = isSpeaking ? 4 : 2; // Arms move more when excited/talking
        const armAmp = isSpeaking ? 0.15 : 0.1;

        leftArmRef.current.rotation.z = 0.2 + Math.sin(t * armSpeed) * armAmp;
        rightArmRef.current.rotation.z = -0.2 - Math.sin(t * armSpeed + 1) * armAmp;
      }

      // 5. Antenna Animation
      if (antennaRef.current && isSpeaking) {
        antennaRef.current.rotation.z = Math.sin(t * 20) * 0.1; // Fast wiggle
      } else if (antennaRef.current) {
        antennaRef.current.rotation.z = THREE.MathUtils.lerp(antennaRef.current.rotation.z, 0, 0.1);
      }

      // 6. Core Glow Pulse
      if (coreRef.current) {
        (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse * 0.8;
      }
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
    >
      <Float 
        speed={isSpeaking ? 3 : 2} 
        rotationIntensity={0.2} 
        floatIntensity={1} 
        floatingRange={[-0.1, 0.1]}
      >
        {/* --- HEAD GROUP --- */}
        <group ref={headRef} position={[0, 1.4, 0]}>
          {/* Main Head Shape */}
          <RoundedBox args={[1.2, 0.9, 1]} radius={0.3} smoothness={4} material={bodyMaterial} castShadow receiveShadow />
          
          {/* Face Plate (Screen) */}
          <RoundedBox args={[1.0, 0.6, 0.1]} radius={0.1} position={[0, 0, 0.46]} material={facePlateMaterial} />

          {/* Eyes Group */}
          <group ref={eyesRef} position={[0, 0, 0.52]}>
             {/* Left Eye */}
             <Sphere args={[0.12, 32, 32]} position={[-0.25, 0, 0]} material={glowMaterial} />
             {/* Right Eye */}
             <Sphere args={[0.12, 32, 32]} position={[0.25, 0, 0]} material={glowMaterial} />
          </group>

          {/* Antenna */}
          <group ref={antennaRef} position={[0, 0.5, 0]}>
             <Cylinder args={[0.05, 0.05, 0.4]} position={[0, 0.2, 0]} material={jointMaterial} />
             <Sphere args={[0.1, 16, 16]} position={[0, 0.4, 0]} material={glowMaterial} />
          </group>
          
          {/* Headphones/Ears */}
          <Cylinder args={[0.2, 0.2, 0.2]} rotation={[0, 0, Math.PI / 2]} position={[0.65, 0, 0]} material={accentMaterial} />
          <Cylinder args={[0.2, 0.2, 0.2]} rotation={[0, 0, Math.PI / 2]} position={[-0.65, 0, 0]} material={accentMaterial} />
        </group>

        {/* --- NECK --- */}
        <Cylinder args={[0.3, 0.3, 0.4]} position={[0, 0.85, 0]} material={jointMaterial} />

        {/* --- BODY --- */}
        <group position={[0, 0, 0]}>
           {/* Torso */}
           <RoundedBox args={[1, 1.2, 0.8]} radius={0.3} smoothness={4} position={[0, 0.1, 0]} material={bodyMaterial} castShadow receiveShadow />
           
           {/* Chest Plate/Detail */}
           <RoundedBox args={[0.6, 0.5, 0.1]} radius={0.1} position={[0, 0.2, 0.41]} material={accentMaterial} />
           
           {/* Core Glow */}
           <Cylinder ref={coreRef} args={[0.15, 0.15, 0.1]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.2, 0.47]} material={glowMaterial} />
        </group>

        {/* --- ARMS --- */}
        {/* Left Arm Pivot Group (Shoulder) */}
        <group position={[-0.6, 0.5, 0]}>
           <Sphere args={[0.25]} material={accentMaterial} />
           <group ref={leftArmRef} position={[0, -0.6, 0]}>
              <RoundedBox args={[0.3, 0.9, 0.3]} radius={0.15} material={bodyMaterial} castShadow />
              <Sphere args={[0.2]} position={[0, -0.5, 0]} material={jointMaterial} />
           </group>
        </group>

        {/* Right Arm Pivot Group */}
        <group position={[0.6, 0.5, 0]}>
           <Sphere args={[0.25]} material={accentMaterial} />
           <group ref={rightArmRef} position={[0, -0.6, 0]}>
              <RoundedBox args={[0.3, 0.9, 0.3]} radius={0.15} material={bodyMaterial} castShadow />
              <Sphere args={[0.2]} position={[0, -0.5, 0]} material={jointMaterial} />
           </group>
        </group>

        {/* --- BASE / PROPULSION --- */}
        <group position={[0, -0.6, 0]}>
           <Sphere args={[0.4, 32, 16]} position={[0, 0, 0]} scale={[1, 0.5, 1]} material={jointMaterial} />
           {/* Thruster Glow */}
           <Cylinder args={[0.2, 0.05, 0.5]} position={[0, -0.3, 0]} material={glowMaterial} />
        </group>

      </Float>
    </group>
  );
};

const Robot3D: React.FC<Robot3DProps> = ({ 
  className, 
  style, 
  primaryColor = "#13F584", 
  secondaryColor = "#8EFFC7",
  scale = 1,
}) => {
  return (
    <div className={`relative ${className}`} style={style}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          enableRotate={true}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI / 1.5}
          minDistance={4}
          maxDistance={12}
        />
        
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color={secondaryColor} />
        
        {/* Rim Light for depth */}
        <spotLight position={[0, 5, -5]} intensity={2} color={primaryColor} distance={10} />

        {/* Environment for shiny reflections */}
        <Environment preset="city" />

        <React.Suspense fallback={<Loader />}>
           <group scale={scale}>
              <RobotMesh 
                primaryColor={primaryColor} 
                secondaryColor={secondaryColor} 
                isSpeaking={false}
              />
           </group>
           
           {/* Ground Shadow */}
           <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2.5} 
            far={4} 
            color={primaryColor}
           />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default Robot3D;

