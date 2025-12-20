"use client";

import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import dynamic from "next/dynamic";
import type { GridFloorProps } from "@/types/props";

const FloorGrid = dynamic(() => import("@/components/three/floor-grid"), {
  ssr: false,
});

export default function GridFloor({ className = "", perspective = "normal" }: GridFloorProps) {
  const cameraPosition: [number, number, number] = perspective === "dramatic" ? [0, 20, 30] : [0, 16, 22];
  const cameraFov = perspective === "dramatic" ? 50 : 45;

  return (
    <div className={`w-full h-full relative ${className}`}>
      <Canvas
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <PerspectiveCamera makeDefault position={cameraPosition} fov={cameraFov} />
        <FloorGrid />
      </Canvas>
    </div>
  );
}
