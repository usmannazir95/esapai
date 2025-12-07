"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

export function ProductShowcase() {
  // Show all products in the suite
  return (
    <Section background="dark" padding="md" className="pt-6 sm:pt-8 md:pt-10">
      <SectionHeader
        title="Our Product Suite"
        subtitle="Discover our comprehensive range of AI-powered solutions designed to transform your business operations and drive innovation."
        subtitleClassName="text-sm sm:text-base md:text-lg lg:text-xl text-light-gray-90 max-w-5xl mx-auto px-4 mb-12 sm:mb-14 md:mb-16"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto px-4">
        {products.map((product) => {
          const iconSrc = product.icon ?? product.content?.hero?.centerIcon;
          const iconAlt =
            product.content?.hero?.centerIconAlt ?? `${product.name} icon`;

          return (
            <Link key={product.id} href={`/product/${product.slug}`} className="block h-full">
              <SpotlightCard className="h-full">
                <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col">
                  {/* Product Icon - Responsive sizing */}
                  {iconSrc && (
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-4 sm:mb-5 md:mb-6 flex items-center justify-center">
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
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-gradient-radial-white">
                    {product.name}
                  </h3>

                  {/* Product Description - Responsive text */}
                  <p className="text-sm sm:text-base md:text-lg text-light-gray-90 leading-relaxed mb-4 sm:mb-5 md:mb-6 flex-1">
                    {product.description}
                  </p>

                  {/* CTA */}
                  <div
                    className={cn(
                      "btn-surface text-sm sm:text-base font-semibold mt-auto w-fit transition-all"
                    )}
                  >
                    <span>Learn More</span>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}

