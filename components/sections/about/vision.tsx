"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import Robot from "@/components/sections/shared/robot";

const ConcaveFloor = dynamic(() => import("@/components/sections/shared/concave-floor"), {
  ssr: false,
});

export function Vision() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const robotWrapperRef = useRef<HTMLDivElement>(null);
  const dotCircleContainerRef = useRef<HTMLDivElement>(null);

  const anim = useGSAPAnimations(sectionRef as React.RefObject<HTMLElement>);

  useGSAP(() => {
    const tl = anim.createTimeline();

    // Entrance animations - sequenced
    tl.to(
      robotRef.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }
    )
      .to(
        dotCircleContainerRef.current,
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );

  }, { scope: sectionRef });

  // Cursor follower effect for robot - Disabled on touch devices
  useGSAP(() => {
    if (!robotWrapperRef.current || !sectionRef.current) return;

    // Detect touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Skip cursor follower on touch devices
    if (isTouchDevice) return;

    const wrapper = robotWrapperRef.current;
    const section = sectionRef.current;
    let animationTween: gsap.core.Tween | null = null;

    // Initialize GSAP transform values
    gsap.set(wrapper, {
      x: 0,
      y: 0,
      force3D: true,
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate relative position from center (-1 to 1)
      const relativeX = (e.clientX - centerX) / (rect.width / 2);
      const relativeY = (e.clientY - centerY) / (rect.height / 2);
      
      // Responsive movement range - smaller on smaller screens
      const screenWidth = window.innerWidth;
      const maxMove = screenWidth < 768 ? 20 : screenWidth < 1024 ? 30 : 40;
      const targetX = relativeX * maxMove;
      const targetY = relativeY * maxMove;

      // Kill existing animation if running
      if (animationTween) {
        animationTween.kill();
      }

      // Use GSAP for smooth, eased animation with explicit transform properties
      animationTween = gsap.to(wrapper, {
        x: targetX,
        y: targetY,
        duration: 0.6,
        ease: "power2.out",
        force3D: true,
        overwrite: "auto",
      });
    };

    section.addEventListener("mousemove", handleMouseMove);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      if (animationTween) {
        animationTween.kill();
      }
      // Reset transform on cleanup
      gsap.set(wrapper, { x: 0, y: 0 });
    };
  }, { scope: sectionRef, dependencies: [] });

  return (
    <Section>
      <div ref={sectionRef}>
        <SectionHeader
          title="Our Vision"
          subtitle="We envision a future where AI seamlessly integrates into every aspect of business operations. Our mission is to make advanced AI technology accessible, practical, and transformative for enterprises of all sizes."
        />

        {/* Scene Wrapper - Responsive */}
        <div className="relative w-full flex items-center justify-center py-6 sm:py-8 md:py-10">
          <div
            className="relative w-full max-w-[1100px] aspect-square md:aspect-[1/1] lg:aspect-[1.2/1]"
          >
            {/* Concave Floor */}
            <div
              ref={dotCircleContainerRef}
              className="absolute inset-0 gsap-fade-in-optimized"
              style={{ mixBlendMode: "screen", opacity: 0 }}
            >
              <ConcaveFloor intensity={1} className="absolute inset-0" />
            </div>

            {/* Robot Icon - Responsive Sizing */}
            <div
              ref={robotWrapperRef}
              className="absolute left-1/2 -translate-x-1/2 z-20 animate-optimized"
              style={{ top: "-8%" }}
            >
              <div
                ref={robotRef}
                className="gsap-fade-scale-in"
                style={{ opacity: 0, transform: "translateY(50px) scale(0.8)" }}
              >
                <Robot
                  className="w-[120px] sm:w-[150px] md:w-[180px] lg:w-[220px] h-auto object-contain"
                  width={220}
                  height={220}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

