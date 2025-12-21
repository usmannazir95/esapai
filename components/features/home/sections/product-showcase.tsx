"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { products } from "@/lib/products";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import type { CardContentRefs } from "@/types/props";

export function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const cardContentRefs = useRef<CardContentRefs[]>([]);

  const anim = useGSAPAnimations(sectionRef as React.RefObject<HTMLElement>);

  const { setRef: setIntersectionRef, isInView } = useIntersectionAnimation({
    threshold: 0.1,
    rootMargin: "100px",
  });

  useGSAP(
    () => {
      if (!isInView || prefersReducedMotion() || !sectionRef.current) return;

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
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.2)",
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

      if (cardRefs.current.length > 0) {
        cardRefs.current.forEach((card, index) => {
          if (!card) return;

          const direction = index % 3;
          const startY = 100;
          const startScale = 0.8;
          const startOpacity = 0;

          let startX = 0;
          let startRotationY = 0;
          let startRotationX = 0;

          if (direction === 0) {
            startX = -150;
            startRotationY = -25;
          } else if (direction === 1) {
            startX = 150;
            startRotationY = 25;
          } else {
            startRotationX = 10;
          }

          gsap.set(card, {
            opacity: startOpacity,
            x: startX,
            y: startY,
            scale: startScale,
            rotationY: startRotationY,
            rotationX: startRotationX,
            force3D: true,
          });

          const contentRefs = cardContentRefs.current[index];
          if (contentRefs) {
            contentRefs.icon && gsap.set(contentRefs.icon, { opacity: 0, scale: 0.5, y: 20 });
            contentRefs.title && gsap.set(contentRefs.title, { opacity: 0, y: 15 });
            contentRefs.description && gsap.set(contentRefs.description, { opacity: 0, y: 10 });
            contentRefs.cta && gsap.set(contentRefs.cta, { opacity: 0, scale: 0.9 });
          }

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
              force3D: true,
            },
            cardDelay
          );

          const contentDelay = cardDelay + 0.3;
          if (contentRefs?.icon) {
            tl.to(
              contentRefs.icon,
              { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" },
              contentDelay
            );
          }
          if (contentRefs?.title) {
            tl.to(
              contentRefs.title,
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
              contentDelay + 0.1
            );
          }
          if (contentRefs?.description) {
            tl.to(
              contentRefs.description,
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
              contentDelay + 0.2
            );
          }
          if (contentRefs?.cta) {
            tl.to(
              contentRefs.cta,
              { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
              contentDelay + 0.3
            );
          }

          const glowTimeline = gsap.timeline({ delay: cardDelay });
          glowTimeline
            .to(card, {
              boxShadow: "0 0 30px rgba(19, 245, 132, 0.4)",
              duration: 0.3,
              ease: "power2.out",
            })
            .to(card, {
              boxShadow: "0 0 0px rgba(19, 245, 132, 0)",
              duration: 0.5,
              ease: "power2.in",
            });
        });
      }
    },
    { scope: sectionRef, dependencies: [isInView] }
  );

  return (
    <Section background="dark" padding="md" className="pt-6 sm:pt-8 md:pt-10">
      <div
        ref={(node) => {
          sectionRef.current = node;
          setIntersectionRef(node);
        }}
      >
        <SectionHeader
          title="Our Product Suite"
          subtitle="Discover our comprehensive range of AI-powered solutions designed to transform your business operations and drive innovation."
          hasGreenGlow={true}
        />

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-7xl mx-auto px-4 sm:px-6 [perspective:1000px] [transform-style:preserve-3d]"
        >
          {products.map((product, index) => {
            const iconSrc = product.icon ?? product.content?.hero?.centerIcon;
            const iconAlt =
              product.content?.hero?.centerIconAlt ?? `${product.name} icon`;

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
                className="block h-full [will-change:transform]"
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
              >
                <SpotlightCard className="h-full">
                  <div className="p-4 sm:p-5 md:p-6 lg:p-8 h-full flex flex-col">
                    {iconSrc && (
                      <div
                        className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mb-3 sm:mb-4 md:mb-5 lg:mb-6 flex items-center justify-center"
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

                    <h3
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 text-gradient-radial-white"
                      ref={(el) => {
                        if (cardContentRefs.current[index]) {
                          cardContentRefs.current[index].title = el;
                        }
                      }}
                    >
                      {product.name}
                    </h3>

                    <p
                      className="text-xs sm:text-sm md:text-base lg:text-lg text-light-gray-90 leading-relaxed mb-3 sm:mb-4 md:mb-5 lg:mb-6 flex-1"
                      ref={(el) => {
                        if (cardContentRefs.current[index]) {
                          cardContentRefs.current[index].description = el;
                        }
                      }}
                    >
                      {product.description}
                    </p>

                    <div
                      className={cn("btn-surface text-xs sm:text-sm md:text-base font-semibold mt-auto w-fit transition-all min-h-[36px] sm:min-h-[40px]")}
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



