import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/lib/services";
import { ServicePage } from "@/components/pages/service/service-page";
import { generateServiceMetadata } from "@/lib/seo/metadata";
import { generateServiceSchema } from "@/lib/seo/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import { StructuredDataComponent } from "@/components/seo/structured-data";

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

export async function generateMetadata({
  params,
}: ServiceSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  return generateServiceMetadata(service.name, service.description, slug);
}

export default async function ServiceSlugPage({ params }: ServiceSlugPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Generate structured data
  const serviceImage =
    service.content?.hero?.centerIcon || service.icon || "/services/default-service.svg";

  const structuredData = [
    generateServiceSchema({
      name: service.name,
      description: service.description,
      image: serviceImage,
      url: `/service/${slug}`,
      provider: {
        name: "ESAP AI",
        url: "https://www.esap.ai/",
      },
      serviceType: "AI Consulting and Integration",
    }),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/service" },
      { name: service.name, url: `/service/${slug}` },
    ]),
  ];

  return (
    <>
      <StructuredDataComponent data={structuredData} />
      <main className="relative">
        <ServicePage slug={slug} initialService={service} />
      </main>
    </>
  );
}
