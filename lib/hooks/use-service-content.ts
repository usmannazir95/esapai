"use client";

import { useEffect, useMemo, useState } from "react";
import type { Service } from "@/lib/services";

interface UseServiceContentOptions {
  enabled?: boolean;
  initialService?: Service | null;
  revalidateOnMount?: boolean;
}

interface UseServiceContentResult {
  service: Service | null;
  loading: boolean;
  isFetching: boolean;
  error: string | null;
}

export function useServiceContent(
  slug: string,
  {
    enabled = true,
    initialService = null,
    revalidateOnMount = false,
  }: UseServiceContentOptions = {},
): UseServiceContentResult {
  const [service, setService] = useState<Service | null>(initialService);
  const [isFetching, setIsFetching] = useState<boolean>(
    !initialService || revalidateOnMount,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !slug) {
      return;
    }

    let cancelled = false;

    const hasInitialMatch =
      initialService && initialService.slug.toLowerCase() === slug.toLowerCase();

    if (hasInitialMatch && !revalidateOnMount) {
      setService(initialService);
      setIsFetching(false);
      setError(null);
      return;
    }

    async function loadService() {
      setIsFetching(true);

      try {
        const response = await fetch(`/api/services/${slug}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load service");
        }

        const data = (await response.json()) as { service: Service | null };

        if (!cancelled) {
          setService(data.service);
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

    loadService();

    return () => {
      cancelled = true;
    };
  }, [slug, enabled, initialService, revalidateOnMount]);

  return useMemo(
    () => ({
      service,
      loading: !service && isFetching,
      isFetching,
      error,
    }),
    [service, isFetching, error],
  );
}


