/**
 * SEO Configuration
 * Central configuration for SEO-related constants and settings
 */

export const SEO_CONFIG = {
  /**
   * Base URL of the website
   * Can be overridden with NEXT_PUBLIC_SITE_URL environment variable
   */
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.esap.ai/",

  /**
   * Site name
   */
  siteName: "ESAP AI",

  /**
   * Default site description
   */
  defaultDescription:
    "Empowering businesses with cutting-edge AI solutions, intelligent automation, and agentic AI integration. ESAP AI provides comprehensive AI products and services to transform your business operations.",

  /**
   * Default site title template
   */
  titleTemplate: "%s | ESAP AI",

  /**
   * Default site title
   */
  defaultTitle: "ESAP AI - Empowering Businesses with AI Solutions",

  /**
   * Organization information for structured data
   */
  organization: {
    name: "ESAP AI",
    url: "https://www.esap.ai/",
    logo: "https://www.esap.ai/logo/esaplogo.svg",
    description:
      "ESAP AI leads the way in embedding AI into daily workflows, creating intelligent infrastructure for tomorrow.",
    sameAs: [
      // Add social media profiles here when available
      // "https://www.linkedin.com/company/esap-ai",
      // "https://twitter.com/esapai",
    ],
  },

  /**
   * Default Open Graph image
   */
  defaultOgImage: "https://www.esap.ai/og-image.jpg", // Update with actual OG image path

  /**
   * Twitter handle (without @)
   */
  twitterHandle: "", // Update when available

  /**
   * Default language
   */
  defaultLanguage: "en",

  /**
   * Default locale
   */
  defaultLocale: "en_US",
} as const;

/**
 * Get the full URL for a given path
 */
export function getFullUrl(path: string): string {
  const baseUrl = SEO_CONFIG.baseUrl.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Get canonical URL for a given path
 */
export function getCanonicalUrl(path: string): string {
  return getFullUrl(path);
}
