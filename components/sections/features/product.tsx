"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useRef, MouseEvent } from "react";

export function Product() {
  const products = [
    {
      id: 1,
      title: "Voice ERP",
      graphic: "/products/voiceerp.svg",
    },
    {
      id: 2,
      title: "AI Framework",
      graphic: "/products/voiceerp.svg",
    },
    {
      id: 3,
      title: "Zakra",
      graphic: "/products/voiceerp.svg",
    },
    {
      id: 4,
      title: "Jawib",
      graphic: "/products/voiceerp.svg",
    },
    {
      id: 5,
      title: "Fasih",
      graphic: "/products/voiceerp.svg",
    },
    {
      id: 6,
      title: "Domain Expansion",
      graphic: "/products/voiceerp.svg",
    },
  ];

  return (
    <section
      className="relative w-full py-20 px-4 overflow-hidden bg-dark"
    >
      <div className="relative container mx-auto max-w-7xl z-10">
        {/* Main Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center text-gradient-radial-white leading-tight">
          <span className="block">Our</span>
          <span className="block text-primary">AI Product Suite</span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-center text-white-opacity-70 max-w-4xl mx-auto mb-16">
          Discover our comprehensive range of AI-powered products designed to transform your business operations, from voice-activated ERP systems to intelligent knowledge agents and customer service solutions.
        </p>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              graphic={product.graphic}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ title, graphic }: { title: string; graphic: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="product-card relative overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight Effect - Radial Gradient Background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(19, 245, 132, 0.15) 0%, rgba(19, 245, 132, 0.05) 30%, transparent 60%)`,
        }}
      />

      {/* Content */}
      <div className="relative p-8 h-full flex flex-col z-10">
        {/* Product Graphic */}
        <div className="relative w-full h-48 flex items-center justify-center mb-6">
          <Image
            src={graphic}
            alt={`${title} illustration`}
            width={200}
            height={200}
            className="w-full h-full max-w-[180px] max-h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Card Title */}
        <h3 className="text-2xl font-bold mb-6 text-left text-gradient-radial-white transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>

        {/* Discover Button */}
        <div className="flex justify-start mt-auto">
          <Button variant="surface" className="transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary/30">
            Discover
          </Button>
        </div>
      </div>

      {/* Additional Glow Effect on Hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[32px]"
        style={{
          boxShadow: isHovered
            ? `0 0 40px rgba(19, 245, 132, 0.3), inset 0 0 40px rgba(19, 245, 132, 0.1)`
            : "none",
        }}
      />
    </div>
  );
}

