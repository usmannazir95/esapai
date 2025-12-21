import { imageUrlSchema } from "@/lib/validation/schemas";

/**
 * Allowed image domains
 */
const ALLOWED_DOMAINS = [
  "cdn.sanity.io",
  "images.unsplash.com",
  "assets.aceternity.com",
];

/**
 * Validate image URL
 * Returns validation result with sanitized URL if valid
 */
export function validateImageUrl(
  url: string | undefined | null
): { isValid: true; url: string } | { isValid: false; error: string } {
  if (!url) {
    return { isValid: false, error: "URL is required" };
  }

  try {
    // Validate with Zod schema
    const validated = imageUrlSchema.parse(url);

    // Additional checks
    const urlObj = new URL(validated);
    
    // Ensure protocol is HTTPS
    if (urlObj.protocol !== "https:") {
      return { isValid: false, error: "URL must use HTTPS" };
    }

    // Check domain whitelist
    const isAllowed = ALLOWED_DOMAINS.some(
      (domain) =>
        urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
    );

    if (!isAllowed) {
      return { isValid: false, error: "URL domain not allowed" };
    }

    return { isValid: true, url: validated };
  } catch (error) {
    if (error instanceof Error) {
      return { isValid: false, error: error.message };
    }
    return { isValid: false, error: "Invalid URL format" };
  }
}
