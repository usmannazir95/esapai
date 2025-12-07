"use client";

import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getPerformanceTier, getAdaptiveQuality, createFrameThrottle } from "@/lib/utils/performance-utils";

interface GridUniforms {
  uTime: { value: number };
  uColorMain: { value: THREE.Color };
  uColorAccent: { value: THREE.Color };
}

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  
  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColorMain;
  uniform vec3 uColorAccent;
  
  varying vec2 vUv;
  varying vec3 vWorldPosition;

  float grid(vec2 uv, float scale) {
    vec2 grid = abs(fract(uv * scale - 0.5) - 0.5) / fwidth(uv * scale);
    float line = min(grid.x, grid.y);
    return 1.0 - min(line, 1.0);
  }

  void main() {
    float scale = 40.0;
    vec2 coord = vUv * scale;
    vec2 gridDist = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
    float line = min(gridDist.x, gridDist.y);
    float gridVal = 1.0 - min(line, 1.0);

    float waveSpeed = 0.5;
    float wavePos = mod(uTime * waveSpeed, 2.0) - 0.5;
    float distToWave = abs(vUv.y - wavePos);
    float waveIntensity = smoothstep(0.15, 0.0, distToWave);

    vec2 gridCell = floor(coord);
    float nodePulse = sin(uTime * 3.0 + gridCell.x * 0.5 + gridCell.y * 0.5) * 0.5 + 0.5;
    float distToIntersection = length(fract(coord - 0.5) - 0.5);
    float nodeVal = smoothstep(0.1, 0.0, distToIntersection) * nodePulse;

    float distFromCenter = distance(vUv, vec2(0.5));
    float alphaFade = smoothstep(0.5, 0.0, distFromCenter);

    vec3 baseGlow = uColorMain * 0.3;
    vec3 activeGlow = mix(uColorMain, uColorAccent, 0.5) * 2.0;

    vec3 finalColor = baseGlow * gridVal;
    finalColor += activeGlow * gridVal * waveIntensity;
    finalColor += uColorAccent * nodeVal * waveIntensity * 2.0;

    float finalAlpha = (gridVal + nodeVal) * alphaFade;
    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

const FloorGrid: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  
  // Performance optimizations
  const performanceTier = useMemo(() => getPerformanceTier(), []);
  const quality = useMemo(() => getAdaptiveQuality(performanceTier), [performanceTier]);
  const throttleFrame = useMemo(() => createFrameThrottle(quality.maxFPS), [quality.maxFPS]);

  const uniforms = useMemo<GridUniforms>(
    () => ({
      uTime: { value: 0 },
      uColorMain: { value: new THREE.Color("#13F584") },
      uColorAccent: { value: new THREE.Color("#8EFFC7") },
    }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Throttle frame updates based on performance tier
    if (!throttleFrame(() => {})) return;

    (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value =
      state.clock.getElapsedTime();

    const targetRotX = -Math.PI / 2 + mouse.y * 0.05;
    const targetRotZ = -(mouse.x * 0.05);

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotX,
      0.1
    );
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      targetRotZ,
      0.1
    );
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[100, 100, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default FloorGrid;
