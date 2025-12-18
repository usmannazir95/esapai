"use client";

import { useEffect, useMemo, useState } from "react";
import type { CaseStudyWithUrls } from "@/lib/case-studies";

interface UseCaseStudyContentOptions {
  enabled?: boolean;
  initialCaseStudy?: CaseStudyWithUrls | null;
  revalidateOnMount?: boolean;
}

interface UseCaseStudyContentResult {
  caseStudy: CaseStudyWithUrls | null;
  loading: boolean;
  isFetching: boolean;
  error: string | null;
}

export function useCaseStudyContent(
  slug: string,
  {
    enabled = true,
    initialCaseStudy = null,
    revalidateOnMount = false,
  }: UseCaseStudyContentOptions = {}
): UseCaseStudyContentResult {
  const [caseStudy, setCaseStudy] = useState<CaseStudyWithUrls | null>(
    initialCaseStudy
  );
  const [isFetching, setIsFetching] = useState<boolean>(
    !initialCaseStudy || revalidateOnMount
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !slug) {
      return;
    }

    let cancelled = false;
    const hasInitialMatch =
      initialCaseStudy &&
      initialCaseStudy.slug.toLowerCase() === slug.toLowerCase();

    if (hasInitialMatch && !revalidateOnMount) {
      setCaseStudy(initialCaseStudy);
      setIsFetching(false);
      setError(null);
      return;
    }

    async function loadCaseStudy() {
      setIsFetching(true);

      try {
        const response = await fetch(`/api/case-studies/${slug}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load case study");
        }

        const data = (await response.json()) as {
          caseStudy: CaseStudyWithUrls | null;
        };

        if (!cancelled) {
          setCaseStudy(data.caseStudy);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setIsFetching(false);
        }
      }
    }

    loadCaseStudy();

    return () => {
      cancelled = true;
    };
  }, [slug, enabled, initialCaseStudy, revalidateOnMount]);

  return useMemo(
    () => ({
      caseStudy,
      loading: !caseStudy && isFetching,
      isFetching,
      error,
    }),
    [caseStudy, isFetching, error]
  );
}
