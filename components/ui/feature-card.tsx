import React from "react";
import { cn } from "@/lib/utils";
import type { FeatureCardProps } from "@/types/props";

export function FeatureCard({ children, className }: FeatureCardProps) {
  return (
    <div className={cn(`p-4 sm:p-6 md:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
}

