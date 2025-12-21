import type { Metadata } from "next";
import { getCaseStudies } from "@/lib/case-studies";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";
import {
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
} from "@/lib/seo/structured-data";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import { CaseStudyListAnimated } from "@/components/features/case-studies/pages/case-study-list-animated";

export const metadata: Metadata = generatePageMetadata({
  title: "Case Study",
  description:
    "Explore real-world implementations of ESAP AI solutions. Discover how we transform businesses through innovative AI solutions and intelligent automation.",
  path: "/case-study",
});

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  const structuredData = [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Case Study", url: "/case-study" },
    ]),
    generateCollectionPageSchema({
      name: "Case Studies",
      description:
        "Real-world implementations of ESAP AI solutions. Discover how we transform businesses through innovative AI solutions and intelligent automation.",
      url: "/case-study",
      items: caseStudies.map((cs) => ({
        headline: cs.title,
        url: `/case-study/${cs.slug}`,
        image: cs.thumbnail?.url || cs.heroImages?.[0]?.url,
      })),
    }),
  ];

  return (
    <>
      <StructuredDataComponent data={structuredData} />
      <CaseStudyListAnimated caseStudies={caseStudies} />
    </>
  );
}
