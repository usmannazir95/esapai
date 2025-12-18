"use client";

import dynamic from "next/dynamic";
import type { CaseStudyWithUrls } from "@/lib/case-studies";
import { useCaseStudyContent } from "@/lib/hooks/use-case-study-content";
import { Section } from "@/components/ui/section";
import { Timeline } from "@/components/sections/case-study/timeline";
import { CardSkeleton } from "@/components/ui/skeletons";
import { CaseStudyHero } from "@/components/sections/hero/case-study-hero";

const LazySection = dynamic(() =>
  import("@/components/ui/lazy-section").then((mod) => ({
    default: mod.LazySection,
  }))
);

interface CaseStudyPageClientProps {
  slug: string;
  initialCaseStudy: CaseStudyWithUrls;
}

export function CaseStudyPage({
  slug,
  initialCaseStudy,
}: CaseStudyPageClientProps) {
  const { caseStudy, loading, isFetching, error } = useCaseStudyContent(slug, {
    initialCaseStudy,
  });

  if (loading && !caseStudy) {
    return (
      <div className="grid gap-4 p-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <CardSkeleton key={index} lines={3} />
        ))}
      </div>
    );
  }

  if (error && !caseStudy) {
    return <ErrorState message={error} />;
  }

  const hydratedCaseStudy = caseStudy ?? initialCaseStudy;

  return (
    <div className="relative" aria-busy={isFetching}>
      {isFetching && (
        <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center">
          <span className="mt-4 rounded-full bg-dark px-4 py-1 text-xs uppercase tracking-wide text-light-gray-90 animate-pulse-slow">
            Updating content…
          </span>
        </div>
      )}

      {/* Hero Section */}
      <CaseStudyHero caseStudy={hydratedCaseStudy} />

      {/* Timeline Section */}
      <LazySection minHeight="800px">
        <Section>
          <div className="max-w-6xl mx-auto px-4">
            <Timeline timeline={hydratedCaseStudy.timeline} />
          </div>
        </Section>
      </LazySection>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-white/60">
        Unable to load case study
      </p>
      <p className="text-lg text-white/70">{message}</p>
    </section>
  );
}
