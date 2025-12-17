"use client";

import dynamic from "next/dynamic";
import type { Service } from "@/lib/services";
import { useServiceContent } from "@/lib/hooks/use-service-content";
import { CardSkeleton } from "@/components/ui/skeletons";
import { LazySection } from "@/components/ui/lazy-section";

const ServiceHeroSection = dynamic(() =>
  import("@/components/sections/hero/service-hero").then((mod) => ({
    default: mod.ServiceHero,
  })),
);

const ServiceFeaturesSection = dynamic(() =>
  import("@/components/sections/features/service/service-features").then(
    (mod) => ({
      default: mod.ServiceFeatures,
    }),
  ),
);

const RepetitiveWorkSection = dynamic(() =>
  import("@/components/sections/features/service/repetitive-work").then(
    (mod) => ({
      default: mod.RepetitiveWork,
    }),
  ),
);

const YouTubeVideoSection = dynamic(() =>
  import("@/components/sections/shared/youtube-video").then((mod) => ({
    default: mod.YouTubeVideo,
  })),
);

interface ServicePageClientProps {
  slug: string;
  initialService: Service;
}

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
  const { service, loading, isFetching, error } = useServiceContent(slug, {
    initialService,
  });

  if (loading && !service) {
    return (
      <div className="grid gap-4 p-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <CardSkeleton key={index} lines={3} />
        ))}
      </div>
    );
  }

  if (error && !service) {
    return <ErrorState message={error} />;
  }

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
    <div className="relative" aria-busy={isFetching}>
      {isFetching && (
        <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center">
          <span className="mt-4 rounded-full bg-dark px-4 py-1 text-xs uppercase tracking-wide text-light-gray-90 animate-pulse-slow">
            Updating content…
          </span>
        </div>
      )}

      {/* Hero loads immediately - critical for LCP */}
      <ServiceHeroSection title={hydratedService.name} subtitle={heroSubtitle} />

      {/* Below-the-fold sections load progressively */}
      <LazySection minHeight="800px">
        <ServiceFeaturesSection
          title={featuresContent?.title}
          subtitle={featuresContent?.subtitle}
          features={features}
        />
      </LazySection>

      <LazySection minHeight="600px">
        <RepetitiveWorkSection />
      </LazySection>

      <LazySection minHeight="600px">
        <YouTubeVideoSection
          videoId={youtubeVideoContent?.videoId ?? "dQw4w9WgXcQ"}
          title={youtubeVideoContent?.title}
        />
      </LazySection>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-white/60">
        Unable to load service
      </p>
      <p className="text-lg text-white/70">{message}</p>
    </section>
  );
}


