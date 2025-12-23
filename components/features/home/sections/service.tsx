"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInView } from "motion/react";
import { Canvas } from "@react-three/fiber";

import { SectionHeader } from "@/components/ui/section-header";
import { ServiceItem } from "@/components/ui/service-item";
import { LazyThreeWrapper } from "@/components/three/lazy-three-wrapper";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import Brain from "@/components/shared/brain";

const ShaderFloorGrid = dynamic(() => import("@/components/three/shader-floor-grid"), {
  ssr: false,
});

// Mapping service keys to their slugs
const SERVICE_SLUG_MAP: Record<string, string> = {
  agentic: "end-to-end-integration",
  strategy: "enterprise-automation",
  faas: "faas",
  tailored: "tailored-solutions",
  industry: "industry-excellence",
  lab: "innovation-lab",
};

const MOBILE_ITEMS = [
  {
    key: "agentic",
    title: (
      <>
        End-to-End Agentic <span className="text-white-opacity-70">AI</span>{" "}
        Integration
      </>
    ),
    description: "Complete AI agent integration from strategy to deployment",
    iconPosition: "left" as const,
  },
  {
    key: "strategy",
    title: "Enterprise Automation Strategy",
    description:
      "Strategic consulting to identify and implement automation opportunities",
    iconPosition: "right" as const,
  },
  {
    key: "faas",
    title: "Framework-as-a-Service",
    description: "Managed AI framework platform with cloud infrastructure",
    iconPosition: "left" as const,
  },
  {
    key: "tailored",
    title: "Tailored AI Solutions",
    description: "Custom AI solutions designed for your specific business needs",
    iconPosition: "right" as const,
  },
  {
    key: "industry",
    title: "Industry-Specific Excellence",
    description:
      "Specialized AI solutions for healthcare, finance, and manufacturing",
    iconPosition: "left" as const,
  },
  {
    key: "lab",
    title: "Innovation & Research Lab",
    description:
      "Cutting-edge AI research and development for next-gen solutions",
    iconPosition: "right" as const,
  },
] as const;

const DESKTOP_ITEMS = [
  {
    key: "agentic",
    title: (
      <>
        End-to-End Agentic <span className="text-white-opacity-70">AI</span>{" "}
        Integration
      </>
    ),
    description: "Complete AI agent integration from strategy to deployment",
    iconPosition: "right" as const,
    positionClassName:
      "left-[calc(50%_-_450px)] top-[calc(50%_-_280px)] -translate-x-1/2 -translate-y-1/2",
  },
  {
    key: "strategy",
    title: "Enterprise Automation Strategy",
    description:
      "Strategic consulting to identify and implement automation opportunities",
    iconPosition: "right" as const,
    positionClassName:
      "left-[calc(50%_-_500px)] top-1/2 -translate-x-1/2 -translate-y-1/2",
  },
  {
    key: "faas",
    title: "Framework-as-a-Service",
    description: "Managed AI framework platform with cloud infrastructure",
    iconPosition: "right" as const,
    positionClassName:
      "left-[calc(50%_-_450px)] top-[calc(50%_+_280px)] -translate-x-1/2 -translate-y-1/2",
  },
  {
    key: "tailored",
    title: "Tailored AI Solutions",
    description: "Custom AI solutions designed for your specific business needs",
    iconPosition: "left" as const,
    positionClassName:
      "left-[calc(50%_+_450px)] top-[calc(50%_-_280px)] -translate-x-1/2 -translate-y-1/2",
  },
  {
    key: "industry",
    title: "Industry-Specific Excellence",
    description:
      "Specialized AI solutions for healthcare, finance, and manufacturing",
    iconPosition: "left" as const,
    positionClassName:
      "left-[calc(50%_+_500px)] top-1/2 -translate-x-1/2 -translate-y-1/2",
  },
  {
    key: "lab",
    title: "Innovation & Research Lab",
    description:
      "Cutting-edge AI research and development for next-gen solutions",
    iconPosition: "left" as const,
    positionClassName:
      "left-[calc(50%_+_450px)] top-[calc(50%_+_280px)] -translate-x-1/2 -translate-y-1/2",
  },
] as const;

export function Service() {
  const ellipseRef = useRef<HTMLDivElement>(null);
  const ellipseContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rotationAnimationRef = useRef<gsap.core.Tween | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const anim = useGSAPAnimations(sectionRef as React.RefObject<HTMLElement>);

  // Intersection observer to trigger animations when in view
  const { setRef: setIntersectionRef, isInView: isSectionInView } =
    useIntersectionAnimation({
      threshold: 0.1,
      rootMargin: "100px",
    });

  // Keep existing useInView for ellipse rotation
  const isInView = useInView(sectionRef, { amount: 0.1, margin: "100px" });

  // Continuous circular rotation animation for the ellipse ring
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!ellipseRef.current) return;
      // Wait for image to load before setting transform origin
      if (!imageLoaded) return;

      // Ensure element is properly centered before setting transform origin
      const rect = ellipseRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        // Element not ready yet, will retry when imageLoaded changes
        return;
      }

      // Set transform origin only after element is properly sized and positioned
      gsap.set(ellipseRef.current, {
        transformOrigin: "50% 50%",
        x: 0,
        y: 0,
      });

      const rotationTween = gsap.to(ellipseRef.current, {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
        paused: !isInView,
      });

      rotationAnimationRef.current = rotationTween;

      return () => {
        rotationAnimationRef.current?.kill();
        rotationAnimationRef.current = null;
      };
    },
    { scope: ellipseRef, dependencies: [isInView, imageLoaded] }
  );

  // Ensure ellipse is properly centered after image loads and container is ready
  useEffect(() => {
    if (!ellipseRef.current || !ellipseContainerRef.current) return;

    let timeoutId: NodeJS.Timeout;
    let rafId: number;
    const img = ellipseContainerRef.current.querySelector('img') as HTMLImageElement | null;

    const checkAndCenter = () => {
      if (!ellipseRef.current) return;

      const container = ellipseRef.current.parentElement;
      if (!container) return;

      // Ensure container has dimensions
      const containerRect = container.getBoundingClientRect();
      if (containerRect.width === 0 || containerRect.height === 0) {
        // Container not ready yet, try again
        rafId = requestAnimationFrame(checkAndCenter);
        return;
      }

      // Check if image is loaded and has dimensions
      const isImageReady = img && img.complete && img.naturalWidth > 0;
      const ellipseRect = ellipseRef.current.getBoundingClientRect();

      if (isImageReady && ellipseRect.width > 0 && ellipseRect.height > 0) {
        setImageLoaded(true);
        // Ensure proper centering - the CSS classes should handle this, but reset any GSAP transforms
        if (ellipseRef.current) {
          // Clear any transforms that might interfere with CSS centering
          gsap.set(ellipseRef.current, {
            x: 0,
            y: 0,
            clearProps: "x,y,transform",
          });

          // Set transform origin for rotation after a frame to ensure layout is stable
          requestAnimationFrame(() => {
            if (ellipseRef.current) {
              gsap.set(ellipseRef.current, {
                transformOrigin: "50% 50%",
              });
            }
          });
        }
      } else if (!isImageReady && img) {
        // Image not ready, check again
        rafId = requestAnimationFrame(checkAndCenter);
      }
    };

    // Initial check after DOM is ready
    rafId = requestAnimationFrame(() => {
      checkAndCenter();

      // Listen for image load
      if (img) {
        if (img.complete && img.naturalWidth > 0) {
          // Image already loaded
          checkAndCenter();
        } else {
          // Wait for image to load
          const handleLoad = () => {
            checkAndCenter();
          };
          img.addEventListener('load', handleLoad, { once: true });
          img.addEventListener('error', handleLoad, { once: true });
        }
      }

      // Fallback: check after a delay to handle edge cases
      timeoutId = setTimeout(() => {
        if (!imageLoaded) {
          checkAndCenter();
        }
      }, 500);
    });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Header animation
  useGSAP(
    () => {
      if (!isSectionInView || prefersReducedMotion() || !sectionRef.current)
        return;

      const tl = anim.createTimeline();
      const titleElement = sectionRef.current.querySelector("h2");
      const subtitleElement = sectionRef.current.querySelector("p");

      if (titleElement) {
        gsap.set(titleElement, { opacity: 0, y: -20 });
      }
      if (subtitleElement) {
        gsap.set(subtitleElement, { opacity: 0, y: 10 });
      }

      if (titleElement) {
        tl.to(titleElement, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (subtitleElement) {
        tl.to(
          subtitleElement,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }
    },
    { scope: sectionRef, dependencies: [isSectionInView] }
  );

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
    <section
      ref={(node) => {
        sectionRef.current = node;
        setIntersectionRef(node);
      }}
      className="relative w-full pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10 px-4 overflow-hidden bg-dark render-optimized"
    >
      <div className="relative container mx-auto max-w-7xl z-10">
        <SectionHeader
          title="AI Services & Solutions"
          subtitle="From strategic consulting to complete integration, we offer end-to-end AI services that transform your business operations and drive innovation."
        />

        {/* MOBILE & TABLET LAYOUT (< 1024px) */}
        <div className="lg:hidden flex flex-col items-center gap-4 sm:gap-6 md:gap-8 py-6 sm:py-8">
          <div className="w-full max-w-2xl space-y-3 sm:space-y-4 md:space-y-6">
            {MOBILE_ITEMS.map((item) => (
              <ServiceItem
                key={item.key}
                title={item.title}
                description={item.description}
                iconPosition={item.iconPosition}
                layout="stacked"
                href={`/service/${SERVICE_SLUG_MAP[item.key]}`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP LAYOUT (≥ 1024px) - Circular */}
        <div className="hidden lg:block">
          <div className="relative w-full min-h-[700px] xl:min-h-[800px] 2xl:min-h-[900px] flex items-center justify-center py-12 lg:py-16 xl:py-20 -mt-12 lg:-mt-16 overflow-visible">
            {/* Ellipse around the brain - Rotating */}
            <div
              ref={ellipseRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none w-[600px] h-[600px] xl:w-[650px] xl:h-[650px] will-change-transform"
            >
              <div ref={ellipseContainerRef} className="w-full h-full">
                <Image
                  src="/landing/service/ellipse.svg"
                  alt="Ellipse glow"
                  width={600}
                  height={600}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>

            {/* Central Brain */}
            <div className="relative z-20 animate-float overflow-visible">
              <Brain className="w-full h-full max-w-[300px] lg:max-w-[350px] xl:max-w-[400px] 2xl:max-w-[450px] object-contain" />
            </div>

            {/* Service Modules - Circular Arrangement */}
            <div className="absolute inset-0 z-10 overflow-visible">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-visible">
                {DESKTOP_ITEMS.map((item) => (
                  <ServiceItem
                    key={item.key}
                    title={item.title}
                    description={item.description}
                    iconPosition={item.iconPosition}
                    layout="absolute"
                    positionClassName={item.positionClassName}
                    href={`/service/${SERVICE_SLUG_MAP[item.key]}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floor Grid Pattern - Only on desktop for performance */}
      <div className="hidden lg:block relative w-full z-0 pointer-events-none h-[360px] mt-auto overflow-hidden">
        <div className="absolute inset-0 w-full h-full left-0 right-0">
          <div className="absolute inset-0 w-full h-full left-0 right-0 relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full left-0 right-0 pointer-events-auto">
              <div className="absolute inset-0 w-full h-full">
                <LazyThreeWrapper>
                  <Canvas
                    camera={{ position: [0, 5, 8], fov: 45 }}
                    gl={{ alpha: true }}
                  >
                    <ambientLight intensity={0.1} />
                    <ShaderFloorGrid />
                  </Canvas>
                </LazyThreeWrapper>
              </div>
            </div>

            {/* Center radial fade */}
            <div className="absolute inset-0 pointer-events-none [background-image:radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,rgba(0,3,0,0.2)_50%,rgba(0,3,0,0.4)_70%,rgba(0,3,0,0.6)_100%)]" />
            {/* Seamless edge fades */}
            <div className="absolute top-0 left-0 right-0 h-[12%] pointer-events-none [background-image:linear-gradient(to_bottom,rgba(0,3,0,0.8)_0%,rgba(0,3,0,0.3)_60%,transparent_100%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-[15%] pointer-events-none [background-image:linear-gradient(to_top,rgba(0,3,0,0.9)_0%,rgba(0,3,0,0.4)_60%,transparent_100%)]" />
            <div className="absolute top-0 bottom-0 left-0 w-[2%] pointer-events-none [background-image:linear-gradient(to_right,rgba(0,3,0,0.5)_0%,transparent_100%)]" />
            <div className="absolute top-0 bottom-0 right-0 w-[2%] pointer-events-none [background-image:linear-gradient(to_left,rgba(0,3,0,0.5)_0%,transparent_100%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}



