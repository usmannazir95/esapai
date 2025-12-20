/**
 * UI component type definitions
 */

import type { ElementType, ReactNode } from "react";

export interface VideoTextProps {
  /**
   * The video source URL
   */
  src: string;
  /**
   * Additional className for the container
   */
  className?: string;
  /**
   * Whether to autoplay the video
   */
  autoPlay?: boolean;
  /**
   * Whether to mute the video
   */
  muted?: boolean;
  /**
   * Whether to loop the video
   */
  loop?: boolean;
  /**
   * Whether to preload the video
   */
  preload?: "auto" | "metadata" | "none";
  /**
   * The content to display (will have the video "inside" it)
   */
  children: ReactNode;
  /**
   * Font size for the text mask (in viewport width units)
   * @default 10
   */
  fontSize?: string | number;
  /**
   * Font weight for the text mask
   * @default "bold"
   */
  fontWeight?: string | number;
  /**
   * Text anchor for the text mask
   * @default "middle"
   */
  textAnchor?: string;
  /**
   * Dominant baseline for the text mask
   * @default "middle"
   */
  dominantBaseline?: string;
  /**
   * Font family for the text mask
   * @default "sans-serif"
   */
  fontFamily?: string;
  /**
   * The element type to render for the text
   * @default "div"
   */
  as?: ElementType;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

export type SectionProps = Omit<
  React.ComponentPropsWithoutRef<"section">,
  "className" | "children"
> & {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  containerMaxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full";
  background?: "dark" | "transparent" | string;
  padding?: "none" | "sm" | "md" | "lg";
  overflow?: "hidden" | "visible";
};

export interface ProductFeatureItem {
  title: string;
  description: string;
  className?: string;
}
