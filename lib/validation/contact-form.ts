import { contactFormSchema, type ContactFormInput } from "./schemas";

/**
 * Validate and sanitize contact form input
 */
export function validateContactForm(
  input: unknown
): { success: true; data: ContactFormInput } | { success: false; error: string } {
  try {
    const validated = contactFormSchema.parse(input);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Validation failed" };
  }
}

/**
 * Sanitize contact form input
 * Removes control characters and trims whitespace
 */
export function sanitizeContactFormInput(input: ContactFormInput): ContactFormInput {
  return {
    name: input.name.replace(/[\x00-\x1F\x7F]/g, "").trim(),
    email: input.email.replace(/[\x00-\x1F\x7F]/g, "").trim().toLowerCase(),
    message: input.message.replace(/[\x00-\x1F\x7F]/g, "").trim(),
  };
}
