"use client";

import { cn } from "@/lib/utils";

export interface SpinnerProps {
  /**
   * Size of the spinner
   */
  size?: "sm" | "md" | "lg";
  /**
   * Color variant
   */
  variant?: "primary" | "white" | "gray";
  /**
   * Additional className
   */
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const variantClasses = {
  primary: "text-primary",
  white: "text-white",
  gray: "text-light-gray-90",
};

/**
 * Reusable spinner component with rotation animation.
 * Used for loading states throughout the application.
 */
export function Spinner({
  size = "md",
  variant = "primary",
  className,
}: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      role="status"
      aria-label="Loading..."
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

