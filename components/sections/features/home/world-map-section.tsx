"use client";

import WorldMap from "@/components/ui/world-map";

export function WorldMapSection() {
  // Define connections between major cities/regions
  const connections = [
    {
      start: { lat: 40.7128, lng: -74.006, label: "New York" },
      end: { lat: 51.5074, lng: -0.1278, label: "London" },
    },
    {
      start: { lat: 51.5074, lng: -0.1278, label: "London" },
      end: { lat: 35.6895, lng: 139.6917, label: "Tokyo" },
    },
    {
      start: { lat: 35.6895, lng: 139.6917, label: "Tokyo" },
      end: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
    },
    {
      start: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
      end: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
    },
    {
      start: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
      end: { lat: 40.7128, lng: -74.006, label: "New York" },
    },
    {
      start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
      end: { lat: 22.3193, lng: 114.1694, label: "Hong Kong" },
    },
    {
      start: { lat: 22.3193, lng: 114.1694, label: "Hong Kong" },
      end: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
    },
  ];

  return (
    <section className="relative w-full py-20 px-4 overflow-hidden bg-dark">
      <div className="relative container mx-auto max-w-7xl z-10">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center text-gradient-radial-white leading-tight">
          <span className="block">Global Reach,</span>
          <span className="block text-primary">Local Impact</span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-center text-white-opacity-70 max-w-4xl mx-auto mb-16">
          Our AI solutions are deployed across the globe, connecting businesses and enabling innovation worldwide.
        </p>

        {/* World Map */}
        <div className="relative w-full max-w-6xl mx-auto">
          <WorldMap
            dots={connections}
            lineColor="rgba(19, 245, 132, 1)"
          />
        </div>
      </div>
    </section>
  );
}

