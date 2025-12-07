import * as THREE from "three";
import { getPerformanceTier, getAdaptiveQuality } from "@/lib/utils/performance-utils";

/**
 * Shared Three.js configuration for consistent setup across components
 */
export const threeConfig = {
  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
  },
  renderer: {
    antialias: true,
    alpha: true,
    powerPreference: "high-performance" as WebGLPowerPreference,
  },
  controls: {
    enableDamping: true,
    dampingFactor: 0.05,
  },
};

/**
 * Check if WebGL is supported in the browser
 */
export const checkWebGLSupport = (): boolean => {
  if (typeof window === "undefined") return false;
  
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
};

/**
 * Get device performance tier for optimization
 * Re-exported from performance-utils for backward compatibility
 */
export { getPerformanceTier };

/**
 * Get optimized Canvas props based on performance tier
 */
export const getOptimizedCanvasProps = () => {
  const tier = getPerformanceTier();
  const quality = getAdaptiveQuality(tier);
  
  return {
    dpr: quality.dpr as [number, number],
    gl: {
      antialias: quality.antialias,
      alpha: true,
      powerPreference: "high-performance" as WebGLPowerPreference,
    },
    shadows: quality.shadows,
  };
};

/**
 * Create optimized renderer based on device capabilities
 */
export const createOptimizedRenderer = (container: HTMLElement): THREE.WebGLRenderer => {
  const tier = getPerformanceTier();
  const quality = getAdaptiveQuality(tier);
  const pixelRatio = quality.dpr[1];
  
  const renderer = new THREE.WebGLRenderer({
    antialias: quality.antialias,
    alpha: true,
    powerPreference: "high-performance",
  });
  
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);
  
  return renderer;
};

