"use client";

import type { JSX } from "react";
import { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Environment, shaderMaterial } from "@react-three/drei";
import { Logo3D } from "@/components/three/logo-3d";
import * as THREE from "three";

// Energy Pulse Ring Shader
const EnergyPulseRingMaterial = shaderMaterial(
    {
        uTime: 0,
        uProgress: 0,
        uColor: new THREE.Color("#13F584"),
        uOpacity: 1,
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    // Fragment Shader
    `
    uniform float uTime;
    uniform float uProgress;
    uniform vec3 uColor;
    uniform float uOpacity;
    varying vec2 vUv;
    
    void main() {
        vec2 center = vec2(0.5);
        float dist = distance(vUv, center);
        
        // Ring effect - thin expanding circle
        float ringWidth = 0.08;
        float ringRadius = uProgress * 0.5;
        float ring = smoothstep(ringRadius - ringWidth, ringRadius, dist) * 
                     smoothstep(ringRadius + ringWidth, ringRadius, dist);
        
        // Add glow around ring
        float glow = exp(-pow(dist - ringRadius, 2.0) * 50.0) * 0.5;
        
        // Energy crackling effect
        float noise = fract(sin(dot(vUv * 100.0 + uTime * 10.0, vec2(12.9898, 78.233))) * 43758.5453);
        float crackle = ring * noise * 0.3;
        
        // Fade out as ring expands
        float fade = 1.0 - uProgress;
        
        vec3 finalColor = uColor * (ring + glow + crackle);
        float alpha = (ring + glow * 0.5) * fade * uOpacity;
        
        gl_FragColor = vec4(finalColor, alpha);
    }
    `
);

extend({ EnergyPulseRingMaterial });

// Declare the JSX type for the custom material
declare module "@react-three/fiber" {
    interface ThreeElements {
        energyPulseRingMaterial: JSX.IntrinsicElements["shaderMaterial"] & {
            uTime?: number;
            uProgress?: number;
            uColor?: THREE.Color;
            uOpacity?: number;
        };
    }
}

// Energy Pulse Ring Component
const EnergyPulseRing: React.FC<{
    delay: number;
    onComplete?: () => void;
}> = ({ delay, onComplete }) => {
    const materialRef = useRef<THREE.ShaderMaterial & { uTime: number; uProgress: number; uOpacity: number }>(null);
    const [started, setStarted] = useState(false);
    const [progress, setProgress] = useState(0);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(timeout);
    }, [delay]);

    useFrame((state) => {
        if (!materialRef.current || !started) return;

        if (startTimeRef.current === null) {
            startTimeRef.current = state.clock.elapsedTime;
        }

        const elapsed = state.clock.elapsedTime - startTimeRef.current;
        const duration = 1.5;
        const newProgress = Math.min(elapsed / duration, 1);

        materialRef.current.uTime = state.clock.elapsedTime;
        materialRef.current.uProgress = newProgress;
        materialRef.current.uOpacity = 1 - Math.pow(newProgress, 2);

        setProgress(newProgress);

        if (newProgress >= 1 && onComplete) {
            onComplete();
        }
    });

    if (!started || progress >= 1) return null;

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[10, 10, 1, 1]} />
            <energyPulseRingMaterial
                ref={materialRef as React.MutableRefObject<null>}
                transparent
                side={THREE.DoubleSide}
                depthWrite={false}
            />
        </mesh>
    );
};

// Energy Particle System
const EnergyParticles: React.FC<{
    count: number;
    triggered: boolean;
}> = ({ count, triggered }) => {
    const pointsRef = useRef<THREE.Points>(null);
    const [visible, setVisible] = useState(false);
    const startTimeRef = useRef<number | null>(null);

    const { positions, velocities, delays } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);
        const del = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const radius = 0.1 + Math.random() * 0.2;

            // Start from center
            pos[i * 3] = Math.cos(angle) * radius;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
            pos[i * 3 + 2] = Math.sin(angle) * radius;

            // Outward velocity
            const speed = 2 + Math.random() * 3;
            vel[i * 3] = Math.cos(angle) * speed;
            vel[i * 3 + 1] = (Math.random() - 0.5) * 2;
            vel[i * 3 + 2] = Math.sin(angle) * speed;

            del[i] = Math.random() * 0.3;
        }

        return { positions: pos, velocities: vel, delays: del };
    }, [count]);

    useEffect(() => {
        if (triggered) {
            setVisible(true);
            startTimeRef.current = null;
        }
    }, [triggered]);

    useFrame((state) => {
        if (!pointsRef.current || !visible) return;

        if (startTimeRef.current === null) {
            startTimeRef.current = state.clock.elapsedTime;
        }

        const elapsed = state.clock.elapsedTime - startTimeRef.current;
        const geometry = pointsRef.current.geometry;
        const posArray = geometry.attributes.position.array as Float32Array;

        let allFaded = true;

        for (let i = 0; i < count; i++) {
            const particleElapsed = Math.max(0, elapsed - delays[i]);

            if (particleElapsed > 0 && particleElapsed < 2) {
                allFaded = false;
                const t = particleElapsed;
                const decay = Math.exp(-t * 1.5);

                posArray[i * 3] = positions[i * 3] + velocities[i * 3] * t * decay;
                posArray[i * 3 + 1] = positions[i * 3 + 1] + velocities[i * 3 + 1] * t * decay;
                posArray[i * 3 + 2] = positions[i * 3 + 2] + velocities[i * 3 + 2] * t * decay;
            }
        }

        geometry.attributes.position.needsUpdate = true;

        if (elapsed > 2.5) {
            setVisible(false);
        }
    });

    if (!visible) return null;

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#13F584"
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

// Core Glow Effect
const CoreGlow: React.FC<{ intensity: number }> = ({ intensity }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
        meshRef.current.scale.setScalar(pulse * intensity);
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshBasicMaterial
                color="#13F584"
                transparent
                opacity={0.15 * intensity}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
};

// Animated Logo Wrapper with Phase-in Effect
const PhasingLogo: React.FC<{
    triggered: boolean;
    onPhaseComplete?: () => void;
}> = ({ triggered, onPhaseComplete }) => {
    const groupRef = useRef<THREE.Group>(null);
    const [phase, setPhase] = useState(0);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (triggered) {
            startTimeRef.current = null;
        }
    }, [triggered]);

    useFrame((state) => {
        if (!groupRef.current || !triggered) return;

        if (startTimeRef.current === null) {
            startTimeRef.current = state.clock.elapsedTime;
        }

        const elapsed = state.clock.elapsedTime - startTimeRef.current;
        const duration = 1.2;
        const newPhase = Math.min(elapsed / duration, 1);

        // Easing function for smooth phase-in
        const eased = 1 - Math.pow(1 - newPhase, 3);
        setPhase(eased);

        // Scale animation
        const scale = 0.005 * eased;
        groupRef.current.scale.set(scale, scale, scale);

        // Opacity through material (handled in Logo3D)
        // Add a slight vibration during phase-in
        if (newPhase < 1) {
            const vibration = (1 - newPhase) * Math.sin(elapsed * 50) * 0.02;
            groupRef.current.position.x = vibration;
            groupRef.current.position.z = vibration * 0.5;
        } else {
            groupRef.current.position.x = 0;
            groupRef.current.position.z = 0;
            if (onPhaseComplete) onPhaseComplete();
        }
    });

    if (!triggered) return null;

    return (
        <group ref={groupRef}>
            <Logo3D
                scale={1}
                depth={20}
                floatSpeed={2}
                floatIntensity={0.3}
                rotationIntensity={0.15}
                autoRotate={true}
            />
        </group>
    );
};

// Main Scene Component
const EnergyPulseScene: React.FC = () => {
    const [animationStage, setAnimationStage] = useState(0);
    const [logoTriggered, setLogoTriggered] = useState(false);

    useEffect(() => {
        // Stage 0: Core glow appears
        const timer1 = setTimeout(() => setAnimationStage(1), 300);
        // Stage 1: First pulse ring
        const timer2 = setTimeout(() => {
            setAnimationStage(2);
            setLogoTriggered(true);
        }, 600);
        // Stage 2: Logo starts phasing in
        const timer3 = setTimeout(() => setAnimationStage(3), 1000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#13F584" />
            <pointLight position={[-5, 2.5, -2.5]} intensity={1} color="#ffffff" />
            <spotLight
                position={[0, 8, 0]}
                intensity={0.8}
                angle={0.5}
                penumbra={1}
                color="#13F584"
                castShadow
            />



            {/* Energy Pulse Rings - staggered */}
            <EnergyPulseRing delay={400} />
            <EnergyPulseRing delay={700} />
            <EnergyPulseRing delay={1000} />

            {/* Energy Particles */}
            <EnergyParticles count={100} triggered={animationStage >= 2} />

            {/* The 3D Logo with phase-in effect */}
            <PhasingLogo triggered={logoTriggered} />

            {/* Environment */}
            <Environment preset="city" />

            {/* Controls */}
            <OrbitControls
                enablePan={false}
                enableZoom={true}
                enableRotate={true}
                minDistance={3}
                maxDistance={10}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.5}
            />
        </>
    );
};

interface HeroLogoAnimationProps {
    className?: string;
}

export const HeroLogoAnimation: React.FC<HeroLogoAnimationProps> = ({
    className = "w-full h-full"
}) => {
    return (
        <div className={className} style={{ overflow: 'visible' }}>
            <Canvas
                shadows
                camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 1000 }}
                dpr={[1, 2]}
                style={{ overflow: 'visible' }}
            >
                <Suspense fallback={null}>
                    <EnergyPulseScene />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default HeroLogoAnimation;
