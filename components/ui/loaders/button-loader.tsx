"use client";

import { Spinner } from "./spinner";
import { cn } from "@/lib/utils";

export interface ButtonLoaderProps {
  /**
   * Size of the loader
   */
  size?: "sm" | "md" | "lg";
  /**
   * Optional text to display next to spinner
   */
  text?: string;
  /**
   * Color variant
   */
  variant?: "primary" | "white" | "gray";
  /**
   * Additional className
   */
  className?: string;
}

const textSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

/**
 * Button loading indicator component.
 * Shows a spinner with optional text for button loading states.
 */
export function ButtonLoader({
  size = "md",
  text,
  variant = "white",
  className,
}: ButtonLoaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2",
        className
      )}
      role="status"
      aria-label={text || "Loading..."}
    >
      <Spinner size={size} variant={variant} />
      {text && (
        <span className={cn(textSizeClasses[size], "font-medium")}>
          {text}
        </span>
      )}
    </div>
  );
}

