/**
 * Production-safe logging utility
 * Only logs in development mode to avoid console pollution in production
 */

const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Log error messages (only in development)
 */
export function logError(message: string, error?: unknown): void {
  if (isDevelopment) {
    if (error) {
      console.error(message, error);
    } else {
      console.error(message);
    }
  }
  // In production, you could send to error tracking service here
  // e.g., Sentry.captureException(error)
}

/**
 * Log warning messages (only in development)
 */
export function logWarning(message: string, ...args: unknown[]): void {
  if (isDevelopment) {
    console.warn(message, ...args);
  }
}

/**
 * Log info messages (only in development)
 */
export function logInfo(message: string, ...args: unknown[]): void {
  if (isDevelopment) {
    console.log(message, ...args);
  }
}

/**
 * Log debug messages (only in development)
 */
export function logDebug(message: string, ...args: unknown[]): void {
  if (isDevelopment) {
    console.debug(message, ...args);
  }
}
