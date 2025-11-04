import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/lib/services";
import { ServiceHero } from "@/components/sections/hero/service-hero";
import { ServiceFeatures } from "@/components/sections/features/service-features";
import { RepetitiveWork } from "@/components/sections/features/repetitive-work";
import { YouTubeVideo } from "@/components/sections/shared/youtube-video";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Default features for the service
  const defaultFeatures = [
    {
      title: "Developer-Friendly Architecture",
      description:
        "Seamlessly integrate AI capabilities into existing tools and platforms.",
    },
    {
      title: "Human-in-the-Loop Workflows",
      description:
        "Integrates human expertise with AI for refined and reliable automation processes.",
    },
    {
      title: "Real-Time Data Processing",
      description:
        "Advanced AI-powered automation for immediate insights and actions.",
    },
    {
      title: "Dual Interfaces for Flexibility",
      description:
        "Optimized interfaces for both developers and end-users to maximize efficiency and adoption.",
    },
    {
      title: "Enterprise-Grade Security",
      description:
        "Scalable architecture with enterprise-level security and compliance standards.",
    },
  ];

  return (
    <main className="relative">
      <ServiceHero
        title={service.name}
        subtitle={[
          service.description,
          "Where Innovation Meets Productivity Driven by agents Powered by automation",
          "Built for what's next",
        ]}
      />

      <ServiceFeatures features={defaultFeatures} />

      <RepetitiveWork />

      <YouTubeVideo videoId="dQw4w9WgXcQ" />
    </main>
  );
}
