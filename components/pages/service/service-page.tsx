"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { Service } from "@/types/service";
import { useServiceContent } from "@/lib/hooks/use-service-content";
import { LazySection } from "@/components/ui/lazy-section";
import type { ServicePageClientProps } from "@/types/page";

// Hero loads immediately - critical for LCP
const ServiceHeroSection = dynamic(
  () =>
    import("@/components/features/services/hero/service-hero").then((mod) => ({
      default: mod.ServiceHero,
    })),
  {
    loading: () => (
      <div className="relative min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden bg-dark pt-20 sm:pt-24 md:pt-0">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-14 md:py-16 flex flex-col items-center text-center max-w-4xl">
          <div className="h-12 sm:h-16 md:h-20 w-3/4 mb-4 bg-white/10 rounded animate-pulse" />
          <div className="h-6 sm:h-8 w-1/2 bg-white/5 rounded animate-pulse" />
        </div>
      </div>
    ),
  }
);

// Below-the-fold sections - lazy loaded
const ServiceFeaturesSection = dynamic(
  () =>
    import("@/components/features/services/sections/service-features").then(
      (mod) => ({
        default: mod.ServiceFeatures,
      }),
    ),
  {
    ssr: true,
    loading: () => (
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="p-6 bg-white/5 rounded-lg animate-pulse">
            <div className="h-5 w-3/4 bg-white/10 rounded mb-4" />
            <div className="h-4 w-full bg-white/5 rounded mb-2" />
            <div className="h-4 w-full bg-white/5 rounded" />
          </div>
        ))}
      </div>
    ),
  }
);

const RepetitiveWorkSection = dynamic(
  () =>
    import("@/components/features/services/sections/repetitive-work").then(
      (mod) => ({
        default: mod.RepetitiveWork,
      }),
    ),
  {
    ssr: true,
    loading: () => (
      <div className="p-6 bg-white/5 rounded-lg animate-pulse">
        <div className="h-5 w-3/4 bg-white/10 rounded mb-4" />
        <div className="h-4 w-full bg-white/5 rounded mb-2" />
        <div className="h-4 w-full bg-white/5 rounded" />
      </div>
    ),
  }
);

const YouTubeVideoSection = dynamic(
  () =>
    import("@/components/shared/youtube-video").then((mod) => ({
      default: mod.default,
    })),
  {
    ssr: false, // YouTube embeds don't need SSR
    loading: () => (
      <div className="w-full aspect-video bg-white/5 rounded-lg animate-pulse" />
    ),
  }
);


const defaultHeroSubtitle = [
  "Where Innovation Meets Productivity Driven by agents Powered by automation",
  "Built for what's next",
];

const defaultFeatures = [
  {
    title: "Developer-Friendly Architecture",
    description: "Seamlessly integrate AI capabilities into existing tools.",
  },
  {
    title: "Human-in-the-Loop Workflows",
    description: "Blend human expertise with AI for reliable automation.",
  },
  {
    title: "Real-Time Data Processing",
    description: "Advanced AI automation for immediate insights.",
  },
  {
    title: "Dual Interfaces",
    description: "Optimized for both builders and operators.",
  },
  {
    title: "Enterprise Security",
    description: "Scalable architecture with compliance built-in.",
  },
];

export function ServicePage({ slug, initialService }: ServicePageClientProps) {
  const { service } = useServiceContent(slug, {
    initialService,
  });

  const hydratedService = service ?? initialService;
  const content = hydratedService.content ?? {};

  const heroSubtitle = content.hero?.subtitle ?? [
    hydratedService.description,
    ...defaultHeroSubtitle,
  ];
  const featuresContent = content.features;
  const features = featuresContent?.items ?? defaultFeatures;
  const youtubeVideoContent = content.youtubeVideo;

  return (
    <div className="relative">

      {/* Hero loads immediately - critical for LCP */}
      <Suspense
        fallback={
          <div className="relative min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden bg-dark pt-20 sm:pt-24 md:pt-0">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-14 md:py-16 flex flex-col items-center text-center max-w-4xl">
              <div className="h-12 sm:h-16 md:h-20 w-3/4 mb-4 bg-white/10 rounded animate-pulse" />
              <div className="h-6 sm:h-8 w-1/2 bg-white/5 rounded animate-pulse" />
            </div>
          </div>
        }
      >
        <ServiceHeroSection title={hydratedService.name} subtitle={heroSubtitle} />
      </Suspense>

      {/* Below-the-fold sections load progressively */}
      <LazySection minHeight="800px">
        <Suspense
          fallback={
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="p-6 bg-white/5 rounded-lg animate-pulse">
                  <div className="h-5 w-3/4 bg-white/10 rounded mb-4" />
                  <div className="h-4 w-full bg-white/5 rounded mb-2" />
                  <div className="h-4 w-full bg-white/5 rounded" />
                </div>
              ))}
            </div>
          }
        >
          <ServiceFeaturesSection
            title={featuresContent?.title}
            subtitle={featuresContent?.subtitle}
            features={features}
          />
        </Suspense>
      </LazySection>

      <LazySection minHeight="600px">
        <Suspense
          fallback={
            <div className="p-6 bg-white/5 rounded-lg animate-pulse">
              <div className="h-5 w-3/4 bg-white/10 rounded mb-4" />
              <div className="h-4 w-full bg-white/5 rounded mb-2" />
              <div className="h-4 w-full bg-white/5 rounded" />
            </div>
          }
        >
          <RepetitiveWorkSection />
        </Suspense>
      </LazySection>

      <LazySection minHeight="600px">
        <Suspense
          fallback={
            <div className="w-full aspect-video bg-white/5 rounded-lg animate-pulse" />
          }
        >
          <YouTubeVideoSection
            videoId={youtubeVideoContent?.videoId ?? "dQw4w9WgXcQ"}
            title={youtubeVideoContent?.title}
          />
        </Suspense>
      </LazySection>
    </div>
  );
}


