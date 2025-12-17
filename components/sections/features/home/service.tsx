"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInView } from "motion/react";
import { Canvas } from "@react-three/fiber";
import { SectionHeader } from "@/components/ui/section-header";
import { ServiceItem } from "@/components/ui/service-item";
import dynamic from "next/dynamic";
import { LazyThreeWrapper } from "@/components/three/lazy-three-wrapper";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import Brain from "@/components/sections/shared/brain";

const FloorGrid = dynamic(() => import("@/components/three/floor-grid"), {
  ssr: false,
});


export function Service() {
  const ellipseRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rotationAnimationRef = useRef<gsap.core.Tween | null>(null);
  
  // Intersection observer to pause animations when off-screen
  const isInView = useInView(sectionRef, { amount: 0.1, margin: "100px" });

  // Continuous circular rotation animation for the ellipse ring
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    
    if (!ellipseRef.current) return;
    
    // Set transform origin to center for proper rotation
    gsap.set(ellipseRef.current, { transformOrigin: "50% 50%" });
    
    // Continuous 360-degree rotation
    const rotationTween = gsap.to(ellipseRef.current, {
      rotation: 360,
      duration: 20, // Slow, smooth rotation (20 seconds for full circle)
      ease: "none", // Linear rotation for consistent speed
      repeat: -1, // Infinite loop
      paused: !isInView, // Start paused if not in view
    });
    
    rotationAnimationRef.current = rotationTween;
    
    // Cleanup function
    return () => {
      if (rotationAnimationRef.current) {
        rotationAnimationRef.current.kill();
        rotationAnimationRef.current = null;
      }
    };
  }, { scope: ellipseRef, dependencies: [isInView] });
  
  // Pause/resume rotation based on viewport visibility
  useEffect(() => {
    if (!rotationAnimationRef.current) return;
    
    if (!isInView || prefersReducedMotion()) {
      rotationAnimationRef.current.pause();
    } else {
      rotationAnimationRef.current.resume();
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className="relative w-full pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10 px-4 overflow-hidden bg-dark render-optimized">
      <div className="relative container mx-auto max-w-7xl z-10">
        <SectionHeader
          title="AI Services & Solutions"
          subtitle="From strategic consulting to complete integration, we offer end-to-end AI services that transform your business operations and drive innovation."
        />

        {/* MOBILE & TABLET LAYOUT (< 1024px) - Stacked Vertical */}
        <div className="lg:hidden flex flex-col items-center gap-6 sm:gap-8 py-8">
          {/* Service Items - Stacked */}
          <div className="w-full max-w-2xl space-y-4 sm:space-y-6">
            <ServiceItem
              title={
                <>
                  End-to-End Agentic <span className="text-white-opacity-70">AI</span> Integration
                </>
              }
              description="Complete AI agent integration from strategy to deployment"
              iconPosition="left"
              positionStyle={{
                left: '0',
                top: '0',
                transform: 'none'
              }}
            />

            <ServiceItem
              title="Enterprise Automation Strategy"
              description="Strategic consulting to identify and implement automation opportunities"
              iconPosition="right"
              positionStyle={{
                left: '0',
                top: '0',
                transform: 'none'
              }}
            />

            <ServiceItem
              title="Framework-as-a-Service"
              description="Managed AI framework platform with cloud infrastructure"
              iconPosition="left"
              positionStyle={{
                left: '0',
                top: '0',
                transform: 'none'
              }}
            />

            <ServiceItem
              title="Tailored AI Solutions"
              description="Custom AI solutions designed for your specific business needs"
              iconPosition="right"
              positionStyle={{
                left: '0',
                top: '0',
                transform: 'none'
              }}
            />

            <ServiceItem
              title="Industry-Specific Excellence"
              description="Specialized AI solutions for healthcare, finance, and manufacturing"
              iconPosition="left"
              positionStyle={{
                left: '0',
                top: '0',
                transform: 'none'
              }}
            />

            <ServiceItem
              title="Innovation & Research Lab"
              description="Cutting-edge AI research and development for next-gen solutions"
              iconPosition="right"
              positionStyle={{
                left: '0',
                top: '0',
                transform: 'none'
              }}
            />
          </div>
        </div>

        {/* DESKTOP LAYOUT (≥ 1024px) - Circular */}
        <div className="hidden lg:block">
          {/* Central Brain with Services */}
          <div className="relative w-full min-h-[700px] xl:min-h-[800px] flex items-center justify-center py-16 -mt-16 overflow-visible">
            {/* Ellipse around the brain - Rotating */}
            <div
              ref={ellipseRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
            >
              <Image
                src="/landing/service/ellipse.svg"
                alt="Ellipse glow"
                width={600}
                height={600}
                className="w-full h-full max-w-[600px] xl:max-w-[650px] object-contain"
              />
            </div>

            {/* Central Brain */}
            <div className="relative z-20 animate-float overflow-visible">
              <Brain
                className="w-full h-full max-w-[350px] xl:max-w-[400px] object-contain"
              />
            </div>

            {/* Service Modules - Circular Arrangement */}
            <div className="absolute inset-0 z-10 overflow-visible">
              {/* Positioning container centered */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-visible">
                {/* Top Left - ~120 degrees */}
                <ServiceItem
                  title={
                    <>
                      End-to-End Agentic <span className="text-white-opacity-70">AI</span> Integration
                    </>
                  }
                  description="Complete AI agent integration from strategy to deployment"
                  iconPosition="right"
                  positionStyle={{
                    left: 'calc(50% - 450px)',
                    top: 'calc(50% - 280px)',
                    transform: 'translate(-50%, -50%)'
                  }}
                />

                {/* Middle Left - 180 degrees */}
                <ServiceItem
                  title="Enterprise Automation Strategy"
                  description="Strategic consulting to identify and implement automation opportunities"
                  iconPosition="right"
                  positionStyle={{
                    left: 'calc(50% - 500px)',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />

                {/* Bottom Left - ~240 degrees */}
                <ServiceItem
                  title="Framework-as-a-Service"
                  description="Managed AI framework platform with cloud infrastructure"
                  iconPosition="right"
                  positionStyle={{
                    left: 'calc(50% - 450px)',
                    top: 'calc(50% + 280px)',
                    transform: 'translate(-50%, -50%)'
                  }}
                />

                {/* Top Right - ~60 degrees */}
                <ServiceItem
                  title="Tailored AI Solutions"
                  description="Custom AI solutions designed for your specific business needs"
                  iconPosition="left"
                  positionStyle={{
                    left: 'calc(50% + 450px)',
                    top: 'calc(50% - 280px)',
                    transform: 'translate(-50%, -50%)'
                  }}
                />

                {/* Middle Right - 0/360 degrees */}
                <ServiceItem
                  title="Industry-Specific Excellence"
                  description="Specialized AI solutions for healthcare, finance, and manufacturing"
                  iconPosition="left"
                  positionStyle={{
                    left: 'calc(50% + 500px)',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />

                {/* Bottom Right - ~300 degrees */}
                <ServiceItem
                  title="Innovation & Research Lab"
                  description="Cutting-edge AI research and development for next-gen solutions"
                  iconPosition="left"
                  positionStyle={{
                    left: 'calc(50% + 450px)',
                    top: 'calc(50% + 280px)',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floor Grid Pattern - Only on desktop for performance */}
      <div className="hidden lg:block absolute -bottom-60 left-0 right-0 z-0 pointer-events-none h-[360px]">
        <LazyThreeWrapper>
          <Canvas camera={{ position: [0, 5, 8], fov: 45 }} gl={{ alpha: true }}>
            <ambientLight intensity={0.1} />
            <FloorGrid />
          </Canvas>
        </LazyThreeWrapper>
      </div>
    </section>
  );
}

