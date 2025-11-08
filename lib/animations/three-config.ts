import * as THREE from "three";

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
 */
export const getPerformanceTier = (): "high" | "medium" | "low" => {
  if (typeof window === "undefined") return "medium";
  
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const deviceMemory = (navigator as any).deviceMemory || 4;
  const pixelRatio = window.devicePixelRatio || 1;
  
  if (hardwareConcurrency >= 8 && deviceMemory >= 8 && pixelRatio <= 2) {
    return "high";
  } else if (hardwareConcurrency >= 4 && deviceMemory >= 4) {
    return "medium";
  } else {
    return "low";
  }
};

/**
 * Create optimized renderer based on device capabilities
 */
export const createOptimizedRenderer = (container: HTMLElement): THREE.WebGLRenderer => {
  const tier = getPerformanceTier();
  const pixelRatio = tier === "high" ? Math.min(window.devicePixelRatio, 2) : 1;
  
  const renderer = new THREE.WebGLRenderer({
    antialias: tier !== "low",
    alpha: true,
    powerPreference: "high-performance",
  });
  
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);
  
  return renderer;
};

