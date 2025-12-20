import { services } from "@/lib/services";
import { LazySection } from "@/components/ui/lazy-section";
import { ServicesHero } from "@/components/features/services/hero";
import {
  ServicesHeaderSection,
  ServicesGridSection,
  ServicesCTASection,
} from "@/components/features/services/sections";

export default function ServicesPage() {
  return (
    <main className="relative">
      {/* Hero Section - Loads immediately (above the fold) */}
      <ServicesHero />

      {/* Section Header - Lazy loaded (below the fold) */}
      <LazySection minHeight="300px">
        <ServicesHeaderSection
          title="Comprehensive AI Services"
          subtitle="From strategy to implementation, we provide end-to-end AI solutions tailored to your business needs."
          subtitleClassName="text-base md:text-lg lg:text-xl text-light-gray-90 max-w-5xl mx-auto px-4 mb-16"
        />
      </LazySection>

      {/* Services Grid - Lazy loaded (below the fold) */}
      <LazySection minHeight="800px">
        <ServicesGridSection services={services} />
      </LazySection>

      {/* CTA Section - Lazy loaded (below the fold) */}
      <LazySection minHeight="300px">
        <ServicesCTASection
          text="Ready to transform your business with AI?"
          buttonText="Get Started"
          buttonHref="/contact"
        />
      </LazySection>
    </main>
  );
}

