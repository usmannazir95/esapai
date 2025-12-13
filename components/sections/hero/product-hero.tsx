"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Frame from "@/components/sections/shared/frame";
import { InteractiveProductIconHalo } from "@/components/ui/interactive-product-icon-halo";
import { ProductHaloFlow } from "@/components/sections/hero/product-halo-flow";
import { LazyThreeWrapper } from "@/components/three/lazy-three-wrapper";
import GridFloorWrapper from "@/components/sections/shared/grid-floor-wrapper";

interface ProductHeroProps {
  title: string;
  subtitle: string[];
}

export function ProductHero({ title, subtitle }: ProductHeroProps) {
  return (
    <section className="relative overflow-hidden bg-dark pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Background Layers */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Grid Floor with seamless edge fade - Lazy loaded */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full max-h-[80vh] relative overflow-hidden">
            <div className="w-full h-full pointer-events-auto">
              <LazyThreeWrapper
                fallback={
                  <div 
                    className="w-full h-full opacity-60"
                    style={{ 
                      backgroundColor: 'transparent',
                      minHeight: '400px', // Prevent layout shift
                    }}
                  />
                }
              >
                <GridFloorWrapper className="opacity-60" perspective="dramatic" />
              </LazyThreeWrapper>
            </div>
            {/* Center radial fade - fades from center outward */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(ellipse at center, transparent 0%, transparent 30%, rgba(0, 3, 0, 0.2) 50%, rgba(0, 3, 0, 0.4) 70%, rgba(0, 3, 0, 0.6) 100%)'
              }}
            />
            {/* Seamless edge fade - subtle gradients only at edges */}
            <div 
              className="absolute top-0 left-0 right-0 h-[12%] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(to bottom, rgba(0, 3, 0, 0.8) 0%, rgba(0, 3, 0, 0.3) 60%, transparent 100%)'
              }}
            />
            <div 
              className="absolute bottom-0 left-0 right-0 h-[15%] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(to top, rgba(0, 3, 0, 0.9) 0%, rgba(0, 3, 0, 0.4) 60%, transparent 100%)'
              }}
            />
            <div 
              className="absolute top-0 bottom-0 left-0 w-[8%] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(to right, rgba(0, 3, 0, 0.7) 0%, rgba(0, 3, 0, 0.3) 60%, transparent 100%)'
              }}
            />
            <div 
              className="absolute top-0 bottom-0 right-0 w-[8%] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(to left, rgba(0, 3, 0, 0.7) 0%, rgba(0, 3, 0, 0.3) 60%, transparent 100%)'
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
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full">
          {/* Text Content Section */}
          <div className="text-center mb-8 md:mb-10">
            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight text-gradient-primary">
              {title}
            </h1>

            {/* Subtitle */}
            <div className="mb-6 md:mb-8 space-y-2">
              {subtitle.map((line, index) => (
                <p 
                  key={index} 
                  className="text-base md:text-lg lg:text-xl text-light-gray-90"
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-5">
              <Button 
                variant="primary" 
                size="lg" 
                className="rounded-[40px] px-6 py-4 md:px-8 md:py-6 text-base md:text-lg font-semibold min-w-[160px]" 
                asChild
              >
                <Link href="#explore">Explore Solution</Link>
              </Button>
              
              <Button 
                variant="watch-demo" 
                size="lg" 
                className="rounded-[40px] px-6 py-4 md:px-8 md:py-6 text-base md:text-lg font-semibold min-w-[160px]" 
                asChild
              >
                <Link href="#demo">Watch Demo</Link>
              </Button>
            </div>
          </div>

          {/* Product Halo Flow Section */}
          <div className="relative z-20 flex items-center justify-center">
            {/* Connection Flow Diagram */}
            <div className="w-full h-[450px] md:h-[500px] relative">
              <ProductHaloFlow 
                centerNode={{
                  title: "ESAP AI Platform",
                  icon: (
                    <InteractiveProductIconHalo scale={1.0} intensity="high">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-black/50 backdrop-blur-md rounded-2xl border border-emerald-500/30 p-3 md:p-4 flex items-center justify-center shadow-2xl">
                        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#13F584" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 17L12 22L22 17" stroke="#13F584" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 12L12 17L22 12" stroke="#13F584" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </InteractiveProductIconHalo>
                  )
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
