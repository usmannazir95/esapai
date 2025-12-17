"use client";

import dynamic from "next/dynamic";
import type { GlobeConfig } from "@/components/ui/globe";

const World = dynamic(
  () => import("@/components/ui/globe").then((mod) => mod.World),
  { ssr: false }
);

// Theme-matched globe configuration
const globeConfig: GlobeConfig = {
  pointSize: 4,
  globeColor: "#030303",
  showAtmosphere: true,
  atmosphereColor: "#13F584",
  atmosphereAltitude: 0.15,
  emissive: "#062013",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(19, 245, 132, 0.4)",
  ambientLight: "#13F584",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#13F584",
  pointLight: "#13F584",
  arcTime: 1500,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

export default function DemoPage() {
  return (
    <main className="relative min-h-screen bg-dark flex flex-col items-center justify-center">
      {/* Header */}
      <div className="text-center mb-8 px-4 z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Global <span className="text-primary">Network</span>
        </h1>
        <p className="text-light-gray-90 text-sm md:text-base max-w-2xl mx-auto">
          Visualizing our worldwide AI infrastructure with real-time data connections
        </p>
      </div>

      {/* Globe Container */}
      <div className="relative w-full max-w-4xl aspect-square">
        <World globeConfig={globeConfig} data={[]} />
      </div>
    </main>
  );
}

