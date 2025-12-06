"use client";

import { useReportWebVitals } from "next/web-vitals";

/**
 * Web Vitals Provider
 * 
 * Tracks Core Web Vitals metrics:
 * - LCP (Largest Contentful Paint): <2.5s
 * - FID (First Input Delay): <100ms
 * - CLS (Cumulative Layout Shift): <0.1
 * - TTFB (Time to First Byte): <800ms
 * - FCP (First Contentful Paint): <1.8s
 */
export function WebVitalsProvider({ children }: { children: React.ReactNode }) {
  useReportWebVitals((metric) => {
    // Log metrics in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Web Vitals] ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
      });
    }

    // In production, you can send to analytics
    // Example: sendToAnalytics(metric);
    
    // You can also send to Google Analytics, Vercel Analytics, etc.
    // if (window.gtag) {
    //   window.gtag('event', metric.name, {
    //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //     event_label: metric.id,
    //     non_interaction: true,
    //   });
    // }
  });

  return <>{children}</>;
}
