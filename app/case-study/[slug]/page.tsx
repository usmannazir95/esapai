import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getCaseStudies } from "@/lib/case-studies";
import { CaseStudyPage } from "@/components/pages/case-study/case-study-page";
import { generateCaseStudyMetadata } from "@/lib/seo/metadata";
import { generateArticleSchema } from "@/lib/seo/structured-data";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import type { CaseStudySlugPageProps } from "@/types/page";

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudySlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
    };
  }

  const thumbnailUrl =
    caseStudy.thumbnail?.url || caseStudy.heroImages?.[0]?.url;

  return generateCaseStudyMetadata(
    caseStudy.title,
    caseStudy.subtitle,
    slug,
    caseStudy.publishedAt,
    undefined, // modifiedTime
    thumbnailUrl
  );
}

export default async function CaseStudySlugPage({ params }: CaseStudySlugPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  // Generate structured data
  const thumbnailUrl =
    caseStudy.thumbnail?.url || caseStudy.heroImages?.[0]?.url;
  const images = caseStudy.heroImages?.map((img) => img.url) || [];

  const structuredData = [
    generateArticleSchema({
      headline: caseStudy.title,
      description: caseStudy.subtitle,
      image: thumbnailUrl ? [thumbnailUrl, ...images] : images,
      datePublished: caseStudy.publishedAt,
      url: `/case-study/${slug}`,
      publisher: {
        name: "ESAP AI",
        logo: "https://www.esap.ai/logo/esaplogo.svg",
      },
    }),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Case Study", url: "/case-study" },
      { name: caseStudy.title, url: `/case-study/${slug}` },
    ]),
  ];

  return (
    <>
      <StructuredDataComponent data={structuredData} />
      <main className="relative">
        <CaseStudyPage slug={slug} initialCaseStudy={caseStudy} />
      </main>
    </>
  );
}
