"use client";

import React, { useMemo, useRef, useLayoutEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

interface ConcaveFloorProps {
  className?: string;
  intensity?: number;
}

const PRIMARY_COLOR_HEX = "#13F584";
const SECONDARY_COLOR_HEX = "#8EFFC7";
const BG_COLOR_NEAR_HEX = "#001a0d";
const BG_COLOR_FAR_HEX = "#000000";

const PRIMARY_COLOR = new THREE.Color(PRIMARY_COLOR_HEX);
const SECONDARY_COLOR = new THREE.Color(SECONDARY_COLOR_HEX);

const getSurfaceHeight = (x: number, z: number) => {
  const distSq = x * x + z * z;
  return 0.02 * distSq;
};

type RingParticle = {
  x: number;
  y: number;
  z: number;
  baseScale: number;
  angle: number;
  ringIndex: number;
  phase: number;
};

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const ConcentricRings: React.FC<{ intensity: number }> = ({ intensity }) => {
  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const numRings = 18;

  const { particles, dummy, color } = useMemo(() => {
    const tempParticles: RingParticle[] = [];
    const tempDummy = new THREE.Object3D();
    const tempColor = new THREE.Color();

    for (let i = 0; i < numRings; i++) {
      const radiusX = 0.5 + i * 0.8;
      const radiusZ = 0.5 + i * 0.6;
      const dotsInRing = 20 + i * 6;

      for (let j = 0; j < dotsInRing; j++) {
        const angle = (j / dotsInRing) * Math.PI * 2;
        const x = Math.cos(angle) * radiusX;
        const z = Math.sin(angle) * radiusZ;
        const y = getSurfaceHeight(x, z);

        tempParticles.push({
          x,
          y,
          z,
          baseScale: 0.8 + pseudoRandom(i * 1000 + j) * 0.4,
          angle,
          ringIndex: i,
          phase: pseudoRandom(i * 2000 + j * 13) * Math.PI * 2,
        });
      }
    }

    return { particles: tempParticles, dummy: tempDummy, color: tempColor };
  }, []);

  useLayoutEffect(() => {
    if (!meshRef.current) return;

    particles.forEach((p, i) => {
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.baseScale * 0.1);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      meshRef.current!.setColorAt(i, PRIMARY_COLOR);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [dummy, particles]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const time = clock.getElapsedTime();

    particles.forEach((p, i) => {
      const waveSpeed = 2 * intensity;
      const waveFreq = 0.5;
      const wave = Math.sin(p.ringIndex * waveFreq - time * waveSpeed);
      const waveActivation = THREE.MathUtils.smoothstep(wave, 0.5, 1);
      const pulse = Math.sin(time * 3 + p.phase) * 0.2 + 1;

      dummy.position.set(p.x, p.y + waveActivation * 0.5, p.z);
      const scale = p.baseScale * 0.1 * pulse * (1 + waveActivation * 0.8);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);

      color.copy(PRIMARY_COLOR).lerp(SECONDARY_COLOR, waveActivation);
      const brightness = 0.8 + waveActivation * 1.2;
      color.multiplyScalar(brightness);
      meshRef.current!.setColorAt(i, color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particles.length]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial toneMapped={false} color={PRIMARY_COLOR_HEX} transparent opacity={0.75} />
    </instancedMesh>
  );
};

const WireframeFloor = () => {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 40, 60, 40);
    const posAttribute = geo.attributes.position;

    for (let i = 0; i < posAttribute.count; i++) {
      const x = posAttribute.getX(i);
      const y = posAttribute.getY(i);
      const z = getSurfaceHeight(x, y);
      posAttribute.setZ(i, z);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
      <primitive object={geometry} />
      <meshStandardMaterial
        color={BG_COLOR_NEAR_HEX}
        wireframe
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const ConcaveFloor: React.FC<ConcaveFloorProps> = ({ className = "", intensity = 1 }) => {
  return (
    <div className={`w-full h-full relative ${className}`}>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true, toneMapping: THREE.ReinhardToneMapping, toneMappingExposure: 1.1 }}
        style={{ background: "transparent" }}
      >
        <PerspectiveCamera makeDefault position={[0, 14, 32]} fov={67} />
        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.1}
          minDistance={5}
          maxDistance={50}
        />

        <fog attach="fog" args={[BG_COLOR_FAR_HEX, 10, 50]} />

        <ambientLight intensity={0.2} color={BG_COLOR_NEAR_HEX} />
        <pointLight position={[0, 15, 0]} intensity={1.25 * intensity} color={PRIMARY_COLOR_HEX} distance={40} decay={2} />
        <pointLight position={[10, 5, 10]} intensity={1} color={SECONDARY_COLOR_HEX} distance={30} decay={2} />
        <spotLight position={[0, 20, 0]} angle={0.5} penumbra={0.5} intensity={3} color="#ffffff" />

        <group>
          <WireframeFloor />
          <ConcentricRings intensity={intensity} />
        </group>

        <EffectComposer>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={0.8 * intensity} radius={0.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default ConcaveFloor;