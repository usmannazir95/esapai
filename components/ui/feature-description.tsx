import React from "react";
import { cn } from "@/lib/utils";

interface FeatureDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function FeatureDescription({ children, className }: FeatureDescriptionProps) {
  return (
    <p
      className={cn(
        "text-xs sm:text-sm md:text-base text-light-gray-90 leading-relaxed",
        className
      )}
    >
      {children}
    </p>
  );
}
