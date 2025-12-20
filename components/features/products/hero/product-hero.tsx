"use client";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import Frame from "@/components/sections/shared/frame";
import { InteractiveProductIconHalo } from "@/components/ui/interactive-product-icon-halo";
import { ProductHaloFlow } from "@/components/sections/hero/product-halo-flow";
import { LazyThreeWrapper } from "@/components/three/lazy-three-wrapper";
import GridFloorWrapper from "@/components/sections/shared/grid-floor-wrapper";

interface ProductHeroProps {
  title: string;
  subtitle: string[];
  centerIcon?: string;
  centerIconAlt?: string;
  productSlug?: string;
}

/**
 * Maps product slugs to their corresponding icon files in the product_icons directory
 */
const getProductIconPath = (slug?: string, centerIcon?: string): string | null => {
  // If centerIcon is provided, use it
  if (centerIcon) {
    return centerIcon;
  }

  // Map product slugs to icon filenames
  const iconMap: Record<string, string> = {
    "erp": "/product_icons/Voice.svg",
    "ai-framework": "/product_icons/AI automation.svg",
    "zakra": "/product_icons/Zakra.svg",
    "jawib": "/product_icons/Jawib.svg",
    "fasih": "/product_icons/Fasih LLM.svg",
    "domain-expansion": "/product_icons/Industry Automation.svg",
  };

  if (slug && iconMap[slug]) {
    return iconMap[slug];
  }

  return null;
};

export function ProductHero({ title, subtitle, centerIcon, centerIconAlt, productSlug }: ProductHeroProps) {
  const iconPath = getProductIconPath(productSlug, centerIcon);
  const iconAlt = centerIconAlt || `${title} Icon`;

  return (
    <section className="relative w-full overflow-hidden bg-dark pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-32">
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden w-full">
        <div className="absolute inset-0 w-full h-full left-0 right-0">
          <div className="absolute inset-0 w-full h-full left-0 right-0 relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full left-0 right-0 pointer-events-auto">
              <div className="absolute inset-0 w-full h-full">
                <LazyThreeWrapper
                  fallback={
                    <div className="absolute inset-0 w-full h-full opacity-60 min-h-[400px] bg-transparent" />
                  }
                >
                  <GridFloorWrapper className="opacity-60" perspective="dramatic" />
                </LazyThreeWrapper>
              </div>
            </div>

            <div className="absolute inset-0 pointer-events-none [background-image:radial-gradient(ellipse_at_center,transparent_0%,transparent_30%,rgba(0,3,0,0.2)_50%,rgba(0,3,0,0.4)_70%,rgba(0,3,0,0.6)_100%)]" />
            <div className="absolute top-0 left-0 right-0 h-[12%] pointer-events-none [background-image:linear-gradient(to_bottom,rgba(0,3,0,0.8)_0%,rgba(0,3,0,0.3)_60%,transparent_100%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-[15%] pointer-events-none [background-image:linear-gradient(to_top,rgba(0,3,0,0.9)_0%,rgba(0,3,0,0.4)_60%,transparent_100%)]" />
            <div className="absolute top-0 bottom-0 left-0 w-[2%] pointer-events-none [background-image:linear-gradient(to_right,rgba(0,3,0,0.5)_0%,transparent_100%)]" />
            <div className="absolute top-0 bottom-0 right-0 w-[2%] pointer-events-none [background-image:linear-gradient(to_left,rgba(0,3,0,0.5)_0%,transparent_100%)]" />
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <Frame className="w-full h-full max-w-[1200px] max-h-[1600px] object-contain" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 h-full flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight text-gradient-primary">
              {title}
            </h1>

            <div className="mb-5 sm:mb-6 md:mb-8 space-y-1.5 sm:space-y-2">
              {subtitle.map((line, index) => (
                <p
                  key={index}
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-light-gray-90"
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5">
              <Button
                variant="primary"
                size="lg"
                className="rounded-[32px] sm:rounded-[40px] px-5 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg font-semibold min-w-[140px] sm:min-w-[160px] min-h-[44px] sm:min-h-[48px]"
                asChild
              >
                <Link href="#explore">Explore Solution</Link>
              </Button>

            </div>
          </div>

          <div className="relative z-20 flex items-center justify-center">
            <div className="w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] relative">
              <ProductHaloFlow
                haloScale={1.0}
                centerNode={{
                  title: title,
                  icon: (
                    <InteractiveProductIconHalo scale={1.0} intensity="high">
                      {iconPath ? (
                        <Image
                          src={iconPath}
                          alt={iconAlt}
                          width={96}
                          height={96}
                          priority
                          sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                        />
                      ) : (
                        <svg
                          width="96"
                          height="96"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                        >
                          <path
                            d="M12 2L2 7L12 12L22 7L12 2Z"
                            stroke="#13F584"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 17L12 22L22 17"
                            stroke="#13F584"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 12L12 17L22 12"
                            stroke="#13F584"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </InteractiveProductIconHalo>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



