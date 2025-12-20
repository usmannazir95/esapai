"use client";

import { useCookieConsent } from "./cookie-consent-context";
import Script from "next/script";
import type { GoogleAnalyticsProviderProps } from "@/types/provider";

/**
 * Google Analytics Provider
 * 
 * Initializes Google Analytics only after user consent.
 * Uses Next.js Script component for optimal loading.
 */
export function GoogleAnalyticsProvider({
  gaId,
}: GoogleAnalyticsProviderProps) {
  const { hasConsented } = useCookieConsent();

  // Don't load GA script if user hasn't consented or no GA ID provided
  if (!hasConsented || !gaId) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      command: string,
      targetId: string | Date,
      config?: {
        page_path?: string;
        [key: string]: unknown;
      }
    ) => void;
  }
}

