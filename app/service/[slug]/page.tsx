import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/lib/services";
import { ServicePage } from "@/components/pages/service/service-page";

interface ServiceSlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceSlugPage({ params }: ServiceSlugPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Extract content configurations with fallbacks
  return (
    <main className="relative">
      <ServicePage slug={slug} initialService={service} />
    </main>
  );
}
