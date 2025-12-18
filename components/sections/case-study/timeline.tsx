"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import type { CaseStudyWithUrls } from "@/lib/case-studies";

interface TimelineProps {
  timeline: CaseStudyWithUrls["timeline"];
}

interface TimelineEntryProps {
  entry: CaseStudyWithUrls["timeline"][0];
  entryRef: (el: HTMLDivElement | null) => void;
}

function TimelineEntry({ entry, entryRef }: TimelineEntryProps) {
  const dateRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div ref={entryRef} className="relative flex gap-8 md:gap-12 mb-12 last:mb-0">
      {/* Date on Left */}
      <div className="flex-shrink-0 w-32 md:w-40">
        <div ref={dateRef} className="text-sm md:text-base text-light-gray-90 font-medium">
          {formatDate(entry.date)}
        </div>
      </div>

      {/* Timeline Node */}
      <div className="flex-shrink-0 relative w-10 flex items-start justify-center">
        <div
          data-timeline-node-container
          className="h-10 w-10 rounded-full flex items-center justify-center border bg-[#F8F8F81A] border-[#13F58440] shadow-[inset_0_0_21.06px_0_#F8F8F840] backdrop-blur-[31.5896px]"
        >
          <div
            data-timeline-node
            className="h-5 w-5 rounded-full border bg-[#13F5844D] border-[#13F584BF]"
          />
        </div>
      </div>

      {/* Content on Right */}
      <div ref={contentRef} className="flex-1 pb-8">
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-gradient-radial-white">
          {entry.title}
        </h3>
        <p className="text-base md:text-lg text-light-gray-90 mb-6 leading-relaxed">
          {entry.description}
        </p>

        {/* Images Grid */}
        {entry.images.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {entry.images.map((image, imgIndex) => (
              <div
                key={imgIndex}
                className="relative aspect-video rounded-lg overflow-hidden"
              >
                <Image
                  src={image.url}
                  alt={image.alt || `${entry.title} - Image ${imgIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Timeline({ timeline }: TimelineProps) {
  // Mirror components/ui/timeline.tsx progress behavior
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [timeline]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  if (!timeline || timeline.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="relative max-w-5xl mx-auto px-4"
    >
      <div ref={ref} className="relative space-y-0 pb-8">
        {timeline.map((entry, index) => (
          <TimelineEntry
            key={index}
            entry={entry}
            entryRef={(el) => {
              entryRefs.current[index] = el;
            }}
          />
        ))}

        {/* Vertical track + animated progress (desktop) — mirrors components/ui/timeline.tsx */}
        {timeline.length > 1 && (
          <div
            style={{ height: `${height}px` }}
            className="absolute md:left-[228px] left-[180px] top-0 overflow-hidden w-[2px] hidden md:block bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-primary/20 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[var(--color-primary)] via-emerald-200 to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
