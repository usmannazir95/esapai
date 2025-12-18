import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getCaseStudies } from "@/lib/case-studies";
import { CaseStudyPage } from "@/components/pages/case-study/case-study-page";

interface CaseStudySlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export default async function CaseStudySlugPage({ params }: CaseStudySlugPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main className="relative">
      <CaseStudyPage slug={slug} initialCaseStudy={caseStudy} />
    </main>
  );
}
