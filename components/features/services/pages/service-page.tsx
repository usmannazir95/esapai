"use client";

import { useServiceContent } from "@/lib/hooks/use-service-content";
import type { ServicePageClientProps } from "@/types/page";

import { ServiceHero } from "@/components/features/services/hero/service-hero";
import { ServiceFeatures as ServiceFeaturesSection } from "@/components/features/services/sections/service-features";
import { RepetitiveWork as RepetitiveWorkSection } from "@/components/features/services/sections/repetitive-work";
import YouTubeVideoSection from "@/components/shared/youtube-video";

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
      <ServiceHero title={hydratedService.name} subtitle={heroSubtitle} />

      {/* Below-the-fold sections */}
      <div className="min-h-[800px]">
        <ServiceFeaturesSection
          title={featuresContent?.title}
          subtitle={featuresContent?.subtitle}
          features={features}
        />
      </div>

      <div className="min-h-[600px]">
        <RepetitiveWorkSection />
      </div>

      <div className="min-h-[600px]">
        <YouTubeVideoSection
          videoId={youtubeVideoContent?.videoId ?? "hPkB_DBwnfU"}
          title={youtubeVideoContent?.title}
        />
      </div>
    </div>
  );
}
