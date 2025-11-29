"use client";

import Frame from "@/components/sections/shared/frame";

export function AboutHero() {
  return (
    <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden bg-dark pt-24 pb-16 md:pt-32 md:pb-20">
      {/* Animated Frame Background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <Frame className="w-full h-full max-w-[1200px] max-h-[1600px] object-contain" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/80" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight text-gradient-primary">
            About Us
          </h1>

          {/* Sub-headline */}
          <div className="mb-10 space-y-4">
            <p className="text-lg md:text-xl lg:text-2xl text-light-gray-90">
              Where Innovation Meets Productivity
            </p>
            <p className="text-base md:text-lg text-white-opacity-70 max-w-3xl mx-auto">
              Driven by agents, powered by automation, built for what&apos;s next. 
              We&apos;re a team of visionaries dedicated to transforming how businesses 
              operate through cutting-edge AI technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

