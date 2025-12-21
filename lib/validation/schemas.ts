import { z } from "zod";

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .max(255, "Email must be less than 255 characters")
    .email("Invalid email format")
    .trim()
    .toLowerCase(),
  message: z
    .string()
    .min(1, "Message is required")
    .max(5000, "Message must be less than 5000 characters")
    .trim(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

/**
 * URL validation schema for image URLs
 */
export const imageUrlSchema = z
  .string()
  .url("Invalid URL format")
  .refine(
    (url) => {
      try {
        const urlObj = new URL(url);
        return urlObj.protocol === "https:";
      } catch {
        return false;
      }
    },
    { message: "URL must use HTTPS protocol" }
  )
  .refine(
    (url) => {
      try {
        const urlObj = new URL(url);
        const allowedDomains = [
          "cdn.sanity.io",
          "images.unsplash.com",
          "assets.aceternity.com",
        ];
        return allowedDomains.some((domain) => urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`));
      } catch {
        return false;
      }
    },
    { message: "URL must be from an allowed domain" }
  );
