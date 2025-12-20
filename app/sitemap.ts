import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/lib/seo/config";
import { products } from "@/lib/products";
import { services } from "@/lib/services";
import { getCaseStudies } from "@/lib/case-studies";

/**
 * Generate dynamic sitemap from all routes
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SEO_CONFIG.baseUrl.replace(/\/$/, "");

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/case-study`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Product routes
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Service routes
  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/service/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Case study routes
  let caseStudyRoutes: MetadataRoute.Sitemap = [];
  try {
    const caseStudies = await getCaseStudies();
    caseStudyRoutes = caseStudies.map((caseStudy) => ({
      url: `${baseUrl}/case-study/${caseStudy.slug}`,
      lastModified: caseStudy.publishedAt
        ? new Date(caseStudy.publishedAt)
        : new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (error) {
    // If case studies fail to load, continue without them
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to load case studies for sitemap:", error);
    }
  }

  // Combine all routes
  return [
    ...staticRoutes,
    ...productRoutes,
    ...serviceRoutes,
    ...caseStudyRoutes,
  ];
}
