import arcjet, { detectBot, shield, tokenBucket, validateEmail } from "@arcjet/next";

/**
 * Arcjet configuration for security protection
 * Provides rate limiting, bot protection, WAF, and email validation
 * Following official Arcjet Next.js documentation pattern
 */
const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({
      mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
    }),
    // Create a bot detection rule
    detectBot({
      mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        // "CATEGORY:MONITOR", // Uptime monitoring services
        // "CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
    // Create a token bucket rate limit for contact form: 5 requests per 15 minutes
    // Other algorithms like fixedWindow are also supported
    tokenBucket({
      mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
      // Tracked by IP address by default, but this can be customized
      // See https://docs.arcjet.com/fingerprints
      // characteristics: ["ip.src"],
      refillRate: 1, // Refill 1 token per interval
      interval: 180, // Refill every 180 seconds (3 minutes)
      capacity: 5, // Bucket capacity of 5 tokens (allows 5 requests initially, then 1 per 3 minutes)
    }),
    // Email validation - validates email format and blocks disposable emails
    validateEmail({
      mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
      block: ["INVALID", "DISPOSABLE", "NO_MX_RECORDS"],
    }),
  ],
});

/**
 * Get Arcjet instance for protecting requests
 */
export function getArcjetInstance() {
  return aj;
}
