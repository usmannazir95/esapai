"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { useGSAP } from "@gsap/react";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import Robot3D from "@/components/sections/shared/robot3d";

export function Vision() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const robotContainerRef = useRef<HTMLDivElement>(null);

  const anim = useGSAPAnimations(sectionRef as React.RefObject<HTMLElement>);

  useGSAP(() => {
    const tl = anim.createTimeline();

    // Entrance animation for robot
    tl.to(
      robotContainerRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
      }
    );

  }, { scope: sectionRef });

  return (
    <Section>
      <div ref={sectionRef}>
        <SectionHeader
          title="Our Vision"
          subtitle="We envision a future where AI seamlessly integrates into every aspect of business operations. Our mission is to make advanced AI technology accessible, practical, and transformative for enterprises of all sizes."
        />

        {/* Robot 3D */}
        <div className="relative w-full flex flex-col items-center justify-center min-h-[600px]">
          {/* Robot 3D - Animated */}
          <div
            ref={robotContainerRef}
            className="relative z-10 gsap-fade-scale-in"
              style={{
                opacity: 0,
                transform: "translateY(50px) scale(0.8)",
              }}
            >
            <Robot3D
              className="w-full h-[500px] md:h-[600px]"
              primaryColor="#13F584"
              secondaryColor="#8EFFC7"
              scale={1.2}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

