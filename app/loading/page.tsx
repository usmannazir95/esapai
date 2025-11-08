"use client";

import { useState } from "react";
import {
  // Base Components
  Skeleton,
  SkeletonText,
  SkeletonImage,
  // Hero Skeletons
  HeroSkeleton,
  ProductHeroSkeleton,
  ServiceHeroSkeleton,
  AboutHeroSkeleton,
  // Card Skeletons
  ProductCardSkeleton,
  ServiceCardSkeleton,
  FeatureCardSkeleton,
  MissionCardSkeleton,
  TeamCardSkeleton,
  // Section Skeletons
  SectionSkeleton,
  AutomationHubSkeleton,
  PerformanceMetricsSkeleton,
  ServiceFeaturesSkeleton,
  RepetitiveWorkSkeleton,
  // Content Skeletons
  YouTubeVideoSkeleton,
  ContactSectionSkeleton,
  // Utility Skeletons
  GridSkeleton,
} from "@/components/ui/skeletons";
import { Spinner, ButtonLoader } from "@/components/ui/loaders";

export default function SkeletonsDemoPage() {
  const [activeSection, setActiveSection] = useState<string>("base");

  const sections = [
    { id: "base", label: "Base Components" },
    { id: "heroes", label: "Hero Skeletons" },
    { id: "cards", label: "Card Skeletons" },
    { id: "sections", label: "Section Skeletons" },
    { id: "content", label: "Content Skeletons" },
    { id: "loaders", label: "Loaders" },
  ];

  return (
    <main className="relative min-h-screen bg-dark pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient-primary">
            Skeleton Components Demo
          </h1>
          <p className="text-lg md:text-xl text-light-gray-90 max-w-3xl mx-auto">
            Showcase of all loading states and skeleton components for the ESAP AI application
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-6 py-3 rounded-[40px] font-semibold transition-all ${
                activeSection === section.id
                  ? "bg-primary text-primary-dark"
                  : "bg-white-opacity-10 text-light-gray hover:bg-white-opacity-20"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Base Components Section */}
        {activeSection === "base" && (
          <div className="space-y-12">
            <section className="product-card p-8 rounded-[32px]">
              <h2 className="text-3xl font-bold mb-6 text-gradient-radial-white">
                Base Components
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">Skeleton (Base)</h3>
                  <div className="flex flex-wrap gap-4">
                    <Skeleton width="200px" height="20px" />
                    <Skeleton width="150px" height="40px" rounded />
                    <Skeleton width="100px" height="100px" rounded="rounded-full" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">SkeletonText</h3>
                  <div className="space-y-4">
                    <SkeletonText lines={1} />
                    <SkeletonText lines={3} />
                    <SkeletonText lines={2} width={["80%", "60%"]} />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">SkeletonImage</h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    <SkeletonImage width={80} height={80} />
                    <SkeletonImage width={100} height={100} rounded="rounded-full" />
                    <SkeletonImage aspectRatio="16/9" className="w-64" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Hero Skeletons Section */}
        {activeSection === "heroes" && (
          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gradient-radial-white text-center">
                Hero Skeletons
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">HeroSkeleton</h3>
                  <div className="border border-white-opacity-20 rounded-[32px] overflow-hidden">
                    <HeroSkeleton className="min-h-[400px]" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">ProductHeroSkeleton</h3>
                  <div className="border border-white-opacity-20 rounded-[32px] overflow-hidden">
                    <ProductHeroSkeleton className="min-h-[600px]" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">ServiceHeroSkeleton</h3>
                  <div className="border border-white-opacity-20 rounded-[32px] overflow-hidden">
                    <ServiceHeroSkeleton className="min-h-[500px]" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">AboutHeroSkeleton</h3>
                  <div className="border border-white-opacity-20 rounded-[32px] overflow-hidden">
                    <AboutHeroSkeleton />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Card Skeletons Section */}
        {activeSection === "cards" && (
          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gradient-radial-white text-center">
                Card Skeletons
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">ProductCardSkeleton</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <ProductCardSkeleton key={i} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">ServiceCardSkeleton</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <ServiceCardSkeleton key={i} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">FeatureCardSkeleton</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <FeatureCardSkeleton key={i} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">MissionCardSkeleton</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <MissionCardSkeleton key={i} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">TeamCardSkeleton</h3>
                  <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <TeamCardSkeleton isLarge />
                    <TeamCardSkeleton />
                    <TeamCardSkeleton />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Section Skeletons */}
        {activeSection === "sections" && (
          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gradient-radial-white text-center">
                Section Skeletons
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">SectionSkeleton</h3>
                  <SectionSkeleton showHeader={true} contentItems={3} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">AutomationHubSkeleton</h3>
                  <AutomationHubSkeleton />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">PerformanceMetricsSkeleton</h3>
                  <PerformanceMetricsSkeleton count={3} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">ServiceFeaturesSkeleton</h3>
                  <ServiceFeaturesSkeleton count={5} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">RepetitiveWorkSkeleton</h3>
                  <RepetitiveWorkSkeleton />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Content Skeletons */}
        {activeSection === "content" && (
          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gradient-radial-white text-center">
                Content Skeletons
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">YouTubeVideoSkeleton</h3>
                  <YouTubeVideoSkeleton />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">ContactSectionSkeleton</h3>
                  <ContactSectionSkeleton className="min-h-[600px]" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">GridSkeleton</h3>
                  <div className="product-card p-8 rounded-[32px]">
                    <h4 className="text-lg font-semibold mb-4 text-primary">Default Grid</h4>
                    <GridSkeleton items={6} />
                  </div>
                  <div className="product-card p-8 rounded-[32px] mt-6">
                    <h4 className="text-lg font-semibold mb-4 text-primary">Custom Grid with ProductCardSkeleton</h4>
                    <GridSkeleton
                      columns={{ mobile: 1, tablet: 2, desktop: 3 }}
                      items={6}
                      itemComponent={ProductCardSkeleton}
                      gap="1.5rem"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Loaders Section */}
        {activeSection === "loaders" && (
          <div className="space-y-12">
            <section className="product-card p-8 rounded-[32px]">
              <h2 className="text-3xl font-bold mb-6 text-gradient-radial-white">
                Loader Components
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">Spinner</h3>
                  <div className="flex flex-wrap items-center gap-8">
                    <div className="text-center">
                      <p className="mb-2 text-light-gray-90">Small</p>
                      <Spinner size="sm" />
                    </div>
                    <div className="text-center">
                      <p className="mb-2 text-light-gray-90">Medium</p>
                      <Spinner size="md" />
                    </div>
                    <div className="text-center">
                      <p className="mb-2 text-light-gray-90">Large</p>
                      <Spinner size="lg" />
                    </div>
                    <div className="text-center">
                      <p className="mb-2 text-light-gray-90">Primary</p>
                      <Spinner variant="primary" />
                    </div>
                    <div className="text-center">
                      <p className="mb-2 text-light-gray-90">White</p>
                      <Spinner variant="white" />
                    </div>
                    <div className="text-center">
                      <p className="mb-2 text-light-gray-90">Gray</p>
                      <Spinner variant="gray" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">ButtonLoader</h3>
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="product-card p-4 rounded-lg inline-block">
                      <ButtonLoader size="sm" text="Loading..." />
                    </div>
                    <div className="product-card p-4 rounded-lg inline-block">
                      <ButtonLoader size="md" text="Saving..." />
                    </div>
                    <div className="product-card p-4 rounded-lg inline-block">
                      <ButtonLoader size="lg" text="Processing..." />
                    </div>
                    <div className="product-card p-4 rounded-lg inline-block">
                      <ButtonLoader variant="primary" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">Button Examples</h3>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-3 bg-primary text-primary-dark rounded-[40px] font-semibold flex items-center gap-2">
                      <Spinner size="sm" variant="white" />
                      <span>Loading...</span>
                    </button>
                    <button className="px-6 py-3 bg-white-opacity-10 text-light-gray rounded-[40px] font-semibold flex items-center gap-2">
                      <Spinner size="sm" />
                      <span>Processing</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="product-card p-8 rounded-[32px] max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gradient-radial-white">
              Component Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <div className="text-light-gray-90">Base Components</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <div className="text-light-gray-90">Hero Skeletons</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">5</div>
                <div className="text-light-gray-90">Card Skeletons</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">5</div>
                <div className="text-light-gray-90">Section Skeletons</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <div className="text-light-gray-90">Content Skeletons</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">1</div>
                <div className="text-light-gray-90">Utility Skeletons</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <div className="text-light-gray-90">Loader Components</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <div className="text-light-gray-90">Page Loaders</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white-opacity-20">
              <p className="text-light-gray-90">
                <span className="text-primary font-bold">Total: 25 Components</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

