import React from "react";
import { cn } from "@/lib/utils";

interface FeatureTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function FeatureTitle({ children, className }: FeatureTitleProps) {
  return (
    <h3
      className={cn(
        "text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-gradient-radial-white",
        className
      )}
    >
      {children}
    </h3>
  );
}
