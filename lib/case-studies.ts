import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";

export interface TimelineEntry {
  date: string;
  title: string;
  description: string;
  images: Array<{
    _key?: string;
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  }>;
}

export interface CaseStudy {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  subtitle: string;
  tags: string[];
  thumbnail?: {
    _key?: string;
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  } | null;
  heroImages: Array<{
    _key?: string;
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  }>;
  timeline: TimelineEntry[];
  publishedAt: string;
  featured: boolean;
}

export interface CaseStudyWithUrls extends Omit<CaseStudy, "heroImages" | "timeline" | "slug"> {
  slug: string;
  thumbnail?: {
    url: string;
    alt?: string;
  } | null;
  heroImages: Array<{
    url: string;
    alt?: string;
  }>;
  timeline: Array<{
    date: string;
    title: string;
    description: string;
    images: Array<{
      url: string;
      alt?: string;
    }>;
  }>;
}

const CASE_STUDY_QUERY = `*[_type == "caseStudy"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  subtitle,
  tags,
  thumbnail,
  heroImages,
  timeline,
  publishedAt,
  featured
}`;

const CASE_STUDY_BY_SLUG_QUERY = `*[_type == "caseStudy" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  subtitle,
  tags,
  thumbnail,
  heroImages,
  timeline,
  publishedAt,
  featured
}`;

type SanityImage = {
  _key?: string;
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
};

/**
 * Transform Sanity image references to URLs
 */
function transformImages(
  images: SanityImage[] | undefined | null
): Array<{ url: string; alt?: string }> {
  if (!images || !Array.isArray(images)) {
    return [];
  }
  return images
    .filter((image) => image && image.asset)
    .map((image) => ({
      url: urlFor(image).width(1200).height(800).url(),
      alt: image.alt || "",
    }));
}

/**
 * Transform a single Sanity image reference to a URL
 */
function transformImage(
  image: SanityImage | undefined | null
): { url: string; alt?: string } | null {
  if (!image || !image.asset) {
    return null;
  }

  // 16:9 crop for listing thumbnails
  const url = urlFor(image).width(1200).height(675).fit("crop").url();
  return { url, alt: image.alt || "" };
}

/**
 * Transform timeline entries with image URLs
 */
function transformTimeline(
  timeline: TimelineEntry[] | undefined | null
): CaseStudyWithUrls["timeline"] {
  if (!timeline || !Array.isArray(timeline)) {
    return [];
  }
  return timeline.map((entry) => ({
    date: entry.date || "",
    title: entry.title || "",
    description: entry.description || "",
    images: transformImages(entry.images),
  }));
}

/**
 * Transform case study data with image URLs
 */
function transformCaseStudy(caseStudy: CaseStudy): CaseStudyWithUrls {
  return {
    ...caseStudy,
    slug: caseStudy.slug?.current || "",
    thumbnail: transformImage(caseStudy.thumbnail ?? null),
    heroImages: transformImages(caseStudy.heroImages),
    timeline: transformTimeline(caseStudy.timeline),
    tags: caseStudy.tags || [],
  };
}

/**
 * Fetch all case studies from Sanity
 */
export async function getCaseStudies(): Promise<CaseStudyWithUrls[]> {
  try {
    const caseStudies = await client.fetch<CaseStudy[]>(CASE_STUDY_QUERY);
    return caseStudies.map(transformCaseStudy);
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return [];
  }
}

/**
 * Fetch a single case study by slug
 */
export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudyWithUrls | null> {
  try {
    const caseStudy = await client.fetch<CaseStudy | null>(CASE_STUDY_BY_SLUG_QUERY, {
      slug,
    });

    if (!caseStudy) {
      return null;
    }

    return transformCaseStudy(caseStudy);
  } catch (error) {
    console.error("Error fetching case study:", error);
    return null;
  }
}
