"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { PerformanceMetric as PerformanceMetricType } from "@/lib/products";
import { Section } from "@/components/ui/section";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

interface PerformanceMetricProps {
  value: string;
  label: string;
  valueRef: (el: HTMLSpanElement | null) => void;
}

function PerformanceMetric({ value, label, valueRef }: PerformanceMetricProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 relative">
        <span ref={valueRef} className="relative z-10 text-gradient-radial-white">
          {value}
        </span>
      </div>
      <p className="text-lg md:text-xl text-gradient-radial-white">{label}</p>
    </div>
  );
}

interface PerformanceSectionProps {
  metrics?: PerformanceMetricType[];
}

const defaultMetrics: PerformanceMetricType[] = [
  { value: "85%", label: "Adoption Rate" },
  { value: "85%", label: "Adoption Rate" },
  { value: "85%", label: "Adoption Rate" },
];

export function PerformanceSection({
  metrics = defaultMetrics,
}: PerformanceSectionProps = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Intersection observer to trigger animations when in view
  const { ref: intersectionRef, isInView } = useIntersectionAnimation({
    threshold: 0.1,
    rootMargin: "100px",
  });

  // Helper function to extract numeric value from string (e.g., "85%" -> 85)
  const extractNumber = (value: string): number => {
    const match = value.match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  // Helper function to format number back to string with original format
  const formatValue = (value: string, num: number): string => {
    if (value.includes("%")) {
      return `${Math.round(num)}%`;
    }
    if (value.includes("x")) {
      return `${num.toFixed(1)}x`;
    }
    return Math.round(num).toString();
  };

  // Animate number counting with elastic appearance
  useGSAP(() => {
    if (!isInView || !sectionRef.current) return;

    valueRefs.current.forEach((valueRef, index) => {
      if (!valueRef) return;

      const originalValue = metrics[index]?.value || "0%";
      const targetNumber = extractNumber(originalValue);

      // Skip animation if reduced motion is preferred
      if (prefersReducedMotion()) {
        valueRef.textContent = originalValue;
        return;
      }

      // Set initial state for elastic appearance
      gsap.set(valueRef, { 
        opacity: 0,
        scale: 0.5 
      });

      // Elastic appearance animation
      gsap.to(valueRef, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        onComplete: () => {
          // Start number counting after appearance
          const startNumber = 0;
          const animatedValue = { value: startNumber };
          
          gsap.to(animatedValue, {
            value: targetNumber,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: function () {
              if (valueRef) {
                valueRef.textContent = formatValue(originalValue, animatedValue.value);
              }
            },
          });
        },
      });
    });
  }, { scope: sectionRef, dependencies: [isInView, metrics] });

  return (
    <Section containerClassName="max-w-6xl mx-auto">
      <div 
        ref={(node) => {
          if (node) {
            sectionRef.current = node;
            (intersectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
          }
        }}
        className="relative w-full rounded-lg p-8 md:p-12 bg-dark performance-border"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {metrics.map((metric, index) => (
            <PerformanceMetric
              key={index}
              value={metric.value}
              label={metric.label}
              valueRef={(el) => {
                valueRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

