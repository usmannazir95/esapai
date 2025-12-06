/**
 * Linear interpolation between two values
 */
export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

/**
 * Calculate distance between two points
 */
export const getDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Random number between range
 */
export const randomRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Convert degrees to radians
 */
export const toRad = (deg: number): number => {
  return (deg * Math.PI) / 180;
};

