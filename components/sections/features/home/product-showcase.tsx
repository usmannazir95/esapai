"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

interface CardContentRefs {
  icon: HTMLElement | null;
  title: HTMLElement | null;
  description: HTMLElement | null;
  cta: HTMLElement | null;
}

export function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const cardContentRefs = useRef<CardContentRefs[]>([]);

  const anim = useGSAPAnimations(sectionRef as React.RefObject<HTMLElement>);
  
  // Intersection observer to trigger animations when in view
  const { ref: intersectionRef, isInView } = useIntersectionAnimation({
    threshold: 0.1,
    rootMargin: "100px",
  });

  // Creative entrance animation
  useGSAP(() => {
    if (!isInView || prefersReducedMotion() || !sectionRef.current) return;

    const tl = anim.createTimeline();

    // Find the actual rendered title and subtitle elements
    const titleElement = sectionRef.current.querySelector('h2');
    const subtitleElement = sectionRef.current.querySelector('p');

    // Set initial states for header
    if (titleElement) {
      gsap.set(titleElement, { opacity: 0, y: -20 });
    }
    if (subtitleElement) {
      gsap.set(subtitleElement, { opacity: 0, y: 10 });
    }

    // Step 1: Title appears with scale
    if (titleElement) {
      tl.to(
        titleElement,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.2)",
        }
      );
    }

    // Step 2: Subtitle appears
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

    // Step 3: Creative card entrance - multi-directional with 3D rotation
    if (cardRefs.current.length > 0) {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        // Determine entrance direction based on position
        // Alternating pattern: left, right, center, left, right, center...
        const direction = index % 3;
        let startX = 0;
        let startY = 100;
        let startRotationY = 0;
        let startRotationX = 0;
        let startScale = 0.8;
        let startOpacity = 0;

        // Set entrance direction
        if (direction === 0) {
          // Left entrance
          startX = -150;
          startRotationY = -25; // Reduced from -45 for smoother effect
        } else if (direction === 1) {
          // Right entrance
          startX = 150;
          startRotationY = 25; // Reduced from 45 for smoother effect
        } else {
          // Center entrance (from bottom with slight rotation)
          startX = 0;
          startRotationY = 0;
          startRotationX = 10; // Reduced from 15 for smoother effect
        }

        // Set initial state with 3D transforms
        gsap.set(card, {
          opacity: startOpacity,
          x: startX,
          y: startY,
          scale: startScale,
          rotationY: startRotationY,
          rotationX: startRotationX,
          force3D: true, // GPU acceleration without creating perspective container
        });

        // Hide all card content initially
        const contentRefs = cardContentRefs.current[index];
        if (contentRefs) {
          if (contentRefs.icon) {
            gsap.set(contentRefs.icon, { opacity: 0, scale: 0.5, y: 20 });
          }
          if (contentRefs.title) {
            gsap.set(contentRefs.title, { opacity: 0, y: 15 });
          }
          if (contentRefs.description) {
            gsap.set(contentRefs.description, { opacity: 0, y: 10 });
          }
          if (contentRefs.cta) {
            gsap.set(contentRefs.cta, { opacity: 0, scale: 0.9 });
          }
        }

        // Card container entrance with bounce and 3D rotation
        const cardDelay = 0.3 + index * 0.15;
        tl.to(
          card,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "back.out(1.4)",
            force3D: true, // GPU acceleration
          },
          cardDelay
        );

        // Sequential content reveal within each card
        const contentDelay = cardDelay + 0.3;

        // Icon appears first with scale bounce
        if (contentRefs?.icon) {
          tl.to(
            contentRefs.icon,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.5,
              ease: "back.out(1.5)",
            },
            contentDelay
          );
        }

        // Title appears
        if (contentRefs?.title) {
          tl.to(
            contentRefs.title,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            contentDelay + 0.1
          );
        }

        // Description appears
        if (contentRefs?.description) {
          tl.to(
            contentRefs.description,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            contentDelay + 0.2
          );
        }

        // CTA appears last with subtle scale
        if (contentRefs?.cta) {
          tl.to(
            contentRefs.cta,
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            },
            contentDelay + 0.3
          );
        }

        // Add a subtle glow pulse effect as card appears
        const glowTimeline = gsap.timeline({ delay: cardDelay });
        glowTimeline.to(
          card,
          {
            boxShadow: "0 0 30px rgba(19, 245, 132, 0.4)",
            duration: 0.3,
            ease: "power2.out",
          }
        ).to(
          card,
          {
            boxShadow: "0 0 0px rgba(19, 245, 132, 0)",
            duration: 0.5,
            ease: "power2.in",
          }
        );
      });
    }
  }, { scope: sectionRef, dependencies: [isInView] });

  // Show all products in the suite
  return (
    <Section 
      background="dark" 
      padding="md" 
      className="pt-6 sm:pt-8 md:pt-10"
    >
      <div
        ref={(node) => {
          if (node) {
            sectionRef.current = node;
            (intersectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
          }
        }}
      >
        <SectionHeader
          title="Our Product Suite"
          subtitle="Discover our comprehensive range of AI-powered solutions designed to transform your business operations and drive innovation."
        />

      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto px-4"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
        {products.map((product, index) => {
          const iconSrc = product.icon ?? product.content?.hero?.centerIcon;
          const iconAlt =
            product.content?.hero?.centerIconAlt ?? `${product.name} icon`;

          // Initialize content refs array if needed
          if (!cardContentRefs.current[index]) {
            cardContentRefs.current[index] = {
              icon: null,
              title: null,
              description: null,
              cta: null,
            };
          }

          return (
            <Link 
              key={product.id} 
              href={`/product/${product.slug}`} 
              className="block h-full"
              style={{ willChange: "transform, opacity" }}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
            >
              <SpotlightCard className="h-full">
                <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col">
                  {/* Product Icon - Responsive sizing */}
                  {iconSrc && (
                    <div 
                      className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-4 sm:mb-5 md:mb-6 flex items-center justify-center"
                      ref={(el) => {
                        if (cardContentRefs.current[index]) {
                          cardContentRefs.current[index].icon = el;
                        }
                      }}
                    >
                      <Image
                        src={iconSrc}
                        alt={iconAlt}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain filter-glow-primary"
                      />
                    </div>
                  )}

                  {/* Product Name - Responsive typography */}
                  <h3 
                    className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-gradient-radial-white"
                    ref={(el) => {
                      if (cardContentRefs.current[index]) {
                        cardContentRefs.current[index].title = el;
                      }
                    }}
                  >
                    {product.name}
                  </h3>

                  {/* Product Description - Responsive text */}
                  <p 
                    className="text-sm sm:text-base md:text-lg text-light-gray-90 leading-relaxed mb-4 sm:mb-5 md:mb-6 flex-1"
                    ref={(el) => {
                      if (cardContentRefs.current[index]) {
                        cardContentRefs.current[index].description = el;
                      }
                    }}
                  >
                    {product.description}
                  </p>

                  {/* CTA */}
                  <div
                    className={cn(
                      "btn-surface text-sm sm:text-base font-semibold mt-auto w-fit transition-all"
                    )}
                    ref={(el) => {
                      if (cardContentRefs.current[index]) {
                        cardContentRefs.current[index].cta = el;
                      }
                    }}
                  >
                    <span>Learn More</span>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          );
        })}
      </div>
      </div>
    </Section>
  );
}

