"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Product() {
  const products = [
    {
      id: 1,
      title: "AI Action Hub",
      graphic: "/landing/product/card1.svg",
    },
    {
      id: 2,
      title: "AI Action Hub",
      graphic: "/landing/product/card2.svg",
    },
    {
      id: 3,
      title: "Shopping Cart",
      graphic: "/landing/product/card3.svg",
    },
    {
      id: 4,
      title: "AI Action Hub",
      graphic: "/landing/product/card4.svg",
    },
    {
      id: 5,
      title: "AI Action Hub",
      graphic: "/landing/product/card5.svg",
    },
    {
      id: 6,
      title: "Shopping Cart",
      graphic: "/landing/product/card6.svg",
    },
  ];

  return (
    <section
      className="relative w-full py-20 px-4 overflow-hidden bg-dark"
    >
      <div className="relative container mx-auto max-w-7xl z-10">
        {/* Main Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center text-gradient-radial-white leading-tight">
          <span className="block">Protect your</span>
          <span className="block text-primary">organization from any threat</span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-center text-white-opacity-70 max-w-4xl mx-auto mb-16">
          Security AI Platform to Protect the Entire Enterprise. Break Down
          Security. Gain Enterprise-Wide Visibility. Action Your Data In
          Real-Time.
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
  return (
    <div className="product-card relative overflow-hidden">
      {/* Content */}
      <div className="relative p-8 h-full flex flex-col">
        {/* Product Graphic */}
        <div className="relative w-full h-48 flex items-center justify-center mb-6">
          <Image
            src={graphic}
            alt={`${title} illustration`}
            width={200}
            height={200}
            className="w-full h-full max-w-[180px] max-h-[180px] object-contain"
          />
        </div>

        {/* Card Title */}
        <h3 className="text-2xl font-bold mb-6 text-left text-gradient-radial-white">
          {title}
        </h3>

        {/* Discover Button */}
        <div className="flex justify-start mt-auto">
          <Button variant="surface">
            Discover
          </Button>
        </div>
      </div>
    </div>
  );
}

