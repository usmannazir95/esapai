"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Frame from "@/components/sections/shared/frame";
import { InteractiveProductIconHalo } from "@/components/ui/interactive-product-icon-halo";
import GridFloor from "@/components/sections/shared/grid-floor";

interface ProductHeroProps {
  title: string;
  subtitle: string[];
}

export function ProductHero({ title, subtitle }: ProductHeroProps) {
  return (
    <section className="relative overflow-hidden bg-dark pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Background Layers */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Grid Floor - Extended to cover product halo area */}
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="w-full h-full max-h-[80vh] relative overflow-hidden">
            <GridFloor className="opacity-60" perspective="dramatic" />
            {/* Subtle edge blending */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(ellipse 70% 50% at 50% 55%, 
                    transparent 0%, 
                    transparent 50%, 
                    rgba(0, 3, 0, 0.2) 65%, 
                    rgba(0, 3, 0, 0.5) 80%, 
                    rgba(0, 3, 0, 0.9) 95%
                  ),
                  radial-gradient(ellipse 80% 30% at 50% 100%, 
                    rgba(0, 3, 0, 1) 0%, 
                    rgba(0, 3, 0, 0.8) 50%, 
                    transparent 100%
                  )
                `
              }}
            />
            {/* Subtle edge fades - only at very edges */}
            <div 
              className="absolute top-0 left-0 right-0 h-[20%] pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, rgba(0, 3, 0, 0.4) 0%, transparent 60%)'
              }}
            />
            <div 
              className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none"
              style={{
                background: `
                  linear-gradient(to top, rgba(0, 3, 0, 1) 0%, rgba(0, 3, 0, 0.8) 30%, rgba(0, 3, 0, 0.4) 60%, transparent 100%),
                  radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0, 3, 0, 1) 0%, rgba(0, 3, 0, 0.9) 40%, rgba(0, 3, 0, 0.5) 70%, transparent 100%)
                `
              }}
            />
            <div 
              className="absolute top-0 bottom-0 left-0 w-[15%] pointer-events-none"
              style={{
                background: 'linear-gradient(to right, rgba(0, 3, 0, 0.4) 0%, transparent 70%)'
              }}
            />
            <div 
              className="absolute top-0 bottom-0 right-0 w-[15%] pointer-events-none"
              style={{
                background: 'linear-gradient(to left, rgba(0, 3, 0, 0.4) 0%, transparent 70%)'
              }}
            />
          </div>
        </div>
        
        {/* Frame Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <Frame className="w-full h-full max-w-[1200px] max-h-[1600px] object-contain" />
        </div>
        
        
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Text Content Section */}
          <div className="text-center mb-16 md:mb-20 lg:mb-24 xl:mb-28">
            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 leading-tight text-gradient-primary">
              {title}
            </h1>

            {/* Subtitle */}
            <div className="mb-10 md:mb-12 lg:mb-14 space-y-2 md:space-y-3">
              {subtitle.map((line, index) => (
                <p 
                  key={index} 
                  className="text-lg md:text-xl lg:text-2xl text-light-gray-90"
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <Button 
                variant="primary" 
                size="lg" 
                className="rounded-[40px] px-8 py-6 text-lg font-semibold min-w-[180px]" 
                asChild
              >
                <Link href="#explore">Explore Solution</Link>
              </Button>
              
              <Button 
                variant="watch-demo" 
                size="lg" 
                className="rounded-[40px] px-8 py-6 text-lg font-semibold min-w-[180px]" 
                asChild
              >
                <Link href="#demo">Watch Demo</Link>
              </Button>
            </div>
          </div>

          {/* Product Halo Section - Positioned on top of grid floor */}
          <div className="relative z-20 flex justify-center items-center -mt-8 md:-mt-12 lg:-mt-16">
            <InteractiveProductIconHalo scale={1.0} intensity="high">
              <div className="w-24 h-24 bg-black/50 backdrop-blur-md rounded-2xl border border-emerald-500/30 p-4 flex items-center justify-center shadow-2xl">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#13F584" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="#13F584" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="#13F584" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </InteractiveProductIconHalo>
          </div>
        </div>
      </div>
    </section>
  );
}
