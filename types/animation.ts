/**
 * Animation-related type definitions
 */

import type gsap from "gsap";

export interface FadeInOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
}

export interface ContinuousAnimationOptions {
  duration?: number;
  ease?: string;
  repeat?: number;
  yoyo?: boolean;
  delay?: number;
}

export interface StaggerOptions {
  stagger?: number;
}
