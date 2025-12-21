/**
 * Sanitize text by removing HTML tags and limiting length
 */
export function sanitizeText(text: string, maxLength: number = 200): string {
  if (!text) return "";

  // Remove HTML tags
  let sanitized = text.replace(/<[^>]*>/g, "");

  // Remove control characters
  sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, "");

  // Trim whitespace
  sanitized = sanitized.trim();

  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
  }

  return sanitized;
}
