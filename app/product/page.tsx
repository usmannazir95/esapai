import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { LazySection } from "@/components/ui/lazy-section";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import { StructuredDataComponent } from "@/components/seo/structured-data";

export const metadata: Metadata = generatePageMetadata({
  title: "Our Products",
  description:
    "Discover our comprehensive suite of AI-powered solutions designed to transform your business operations. From voice-activated ERP systems to intelligent automation frameworks.",
  path: "/product",
});

export default function ProductsPage() {
  const structuredData = [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Products", url: "/product" },
    ]),
  ];

  return (
    <>
      <StructuredDataComponent data={structuredData} />
      <main className="relative">
      {/* Hero Section - Loads immediately (above the fold) */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-dark">
        {/* Background gradient effect */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary opacity-10 blur-[120px] rounded-full" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-[20%] left-[10%] z-0 pointer-events-none opacity-20">
          <Image
            src="/landing/circle.svg"
            alt="Circle decoration"
            width={200}
            height={200}
            priority
            sizes="200px"
            className="w-auto h-auto"
          />
        </div>
        <div className="absolute bottom-[20%] right-[10%] z-0 pointer-events-none opacity-20">
          <Image
            src="/landing/box.svg"
            alt="Box decoration"
            width={150}
            height={150}
            priority
            sizes="150px"
            className="w-auto h-auto"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-14 md:py-16 flex flex-col items-center text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight text-gradient-primary">
            Our Products
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-light-gray-90 max-w-2xl mx-auto px-2 sm:px-4">
            Discover our comprehensive suite of AI-powered solutions designed to transform your business operations
          </p>
        </div>
      </section>

      {/* Section Header - Lazy loaded (below the fold) */}
      <LazySection minHeight="300px">
        <Section>
          <SectionHeader
            title="Explore Our AI Solutions"
            subtitle="Each product is built with cutting-edge technology to solve real-world business challenges and drive innovation."
            subtitleClassName="text-base md:text-lg lg:text-xl text-light-gray-90 max-w-5xl mx-auto px-4 mb-16"
          />
        </Section>
      </LazySection>

      {/* Products Grid - Lazy loaded (below the fold) */}
      <LazySection minHeight="800px">
        <Section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto px-4 sm:px-6">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.slug}`} className="block h-full">
                <SpotlightCard className="h-full">
                  <div className="p-4 sm:p-5 md:p-6 h-full flex flex-col">
                    {/* Product Icon */}
                    {product.content?.hero?.centerIcon && (
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-3 sm:mb-4 md:mb-5 flex items-center justify-center">
                        <Image
                          src={product.content.hero.centerIcon}
                          alt={`${product.name} icon`}
                          width={64}
                          height={64}
                          loading="lazy"
                          sizes="(max-width: 768px) 40px, (max-width: 1200px) 48px, 64px"
                          className="w-full h-full object-contain filter-glow-primary"
                        />
                      </div>
                    )}

                    {/* Product Name */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-gradient-radial-white">
                      {product.name}
                    </h3>

                    {/* Product Description */}
                    <p className="text-xs sm:text-sm md:text-base text-light-gray-90 leading-relaxed mb-4 sm:mb-5 flex-1">
                      {product.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                      <span>Learn More</span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            ))}
          </div>
        </Section>
      </LazySection>

      {/* CTA Section - Lazy loaded (below the fold) */}
      <LazySection minHeight="300px">
        <Section>
          <div className="text-center">
            <p className="text-base sm:text-lg md:text-xl text-light-gray-90 mb-5 sm:mb-6 px-4">
              Need help choosing the right solution for your business?
            </p>
            <Button
              variant="primary"
              size="lg"
              className="rounded-[32px] sm:rounded-[40px] px-8 sm:px-10 md:px-12 lg:px-14 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg font-semibold min-h-[44px] sm:min-h-[48px]"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </Section>
      </LazySection>
    </main>
    </>
  );
}

