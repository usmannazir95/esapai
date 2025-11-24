"use client";

import { useRef } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import Robot from "@/components/sections/shared/robot";
import DotCircle from "@/components/sections/shared/dotcircle";

export function Vision() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const botLightRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const robotWrapperRef = useRef<HTMLDivElement>(null);
  const dotCircleContainerRef = useRef<HTMLDivElement>(null);

  const anim = useGSAPAnimations(sectionRef as React.RefObject<HTMLElement>);

  useGSAP(() => {
    const tl = anim.createTimeline();

    // Entrance animations - sequenced
    tl.to(botLightRef.current, {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    })
      .to(
        robotRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
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

    // Breathing animation for bot light
    if (botLightRef.current) {
      anim.breathing(botLightRef.current, {
        duration: 2.5,
        delay: 1,
      });
    }

  }, { scope: sectionRef });

  // Cursor follower effect for robot
  useGSAP(() => {
    if (!robotWrapperRef.current || !sectionRef.current) return;

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
      
      // Increased movement range for more responsiveness
      const maxMove = 40; // Maximum pixels to move
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

          {/* Robot Icon with Bot Light behind and Dot Circle below */}
          <div className="relative w-full flex flex-col items-center justify-center">
          {/* Bot Light (glow effect behind robot) */}
          <div 
            ref={botLightRef}
            className="absolute -top-40 left-1/2 -translate-x-1/2 z-0 overflow-hidden gsap-fade-in"
            style={{ 
              mixBlendMode: 'screen',
              maskImage: 'radial-gradient(ellipse 80% 100% at 50% 50%, black 40%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 100% at 50% 50%, black 40%, transparent 100%)',
            }}
          >
            <Image
              src="/landing/vision/Bot light.svg"
              alt="Bot light glow"
              width={517}
              height={795}
              className="w-auto h-auto object-contain"
              priority
              style={{ 
                filter: 'blur(0.5px)',
              }}
            />
          </div>

          {/* Robot Icon (in front) - Animated */}
          <div
            ref={robotWrapperRef}
            className="relative z-10 mb-8"
          >
            <div
              ref={robotRef}
              className="gsap-fade-scale-in"
              style={{
                opacity: 0,
                transform: "translateY(50px) scale(0.8)",
              }}
            >
              <Robot
                className="w-full h-full max-w-[180px] md:max-w-[220px] object-contain"
                width={220}
                height={220}
              />
            </div>
          </div>

          {/* Dot Circle (at bottom of robot) */}
          <div 
            ref={dotCircleContainerRef}
            className="relative z-10 -mt-[280px] w-full flex items-center justify-center overflow-hidden gsap-fade-in"
            style={{ 
              mixBlendMode: 'screen',
              maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)',
              opacity: 0,
            }}
          >
            <DotCircle
              className="w-full max-w-[1400px] object-contain"
              style={{ 
                filter: 'blur(0.5px)',
              }}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

