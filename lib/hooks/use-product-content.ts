"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";

interface UseProductContentOptions {
  enabled?: boolean;
  initialProduct?: Product | null;
  revalidateOnMount?: boolean;
}

interface UseProductContentResult {
  product: Product | null;
  loading: boolean;
  isFetching: boolean;
  error: string | null;
}

export function useProductContent(
  slug: string,
  {
    enabled = true,
    initialProduct = null,
    revalidateOnMount = false,
  }: UseProductContentOptions = {},
): UseProductContentResult {
  const [product, setProduct] = useState<Product | null>(initialProduct);
  const [isFetching, setIsFetching] = useState<boolean>(
    !initialProduct || revalidateOnMount,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !slug) {
      return;
    }

    let cancelled = false;
    const hasInitialMatch =
      initialProduct && initialProduct.slug.toLowerCase() === slug.toLowerCase();

    if (hasInitialMatch && !revalidateOnMount) {
      setProduct(initialProduct);
      setIsFetching(false);
      setError(null);
      return;
    }

    async function loadProduct() {
      setIsFetching(true);

      try {
        const response = await fetch(`/api/products/${slug}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load product");
        }

        const data = (await response.json()) as { product: Product | null };

        if (!cancelled) {
          setProduct(data.product);
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

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [slug, enabled, initialProduct, revalidateOnMount]);

  return useMemo(
    () => ({
      product,
      loading: !product && isFetching,
      isFetching,
      error,
    }),
    [product, isFetching, error],
  );
}


