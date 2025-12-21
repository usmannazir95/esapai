"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import type { CaseStudyWithUrls } from "@/types/case-study";
import type { TimelineProps, TimelineEntryProps } from "@/types/props";

function TimelineEntry({ entry, entryRef, index }: TimelineEntryProps & { index: number }) {
  const dateRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Animate entry when it comes into view
  useGSAP(
    () => {
      if (prefersReducedMotion() || !entryRef.current) return;

      // Set initial states
      if (dateRef.current) gsap.set(dateRef.current, { opacity: 0, x: -20 });
      if (nodeRef.current) gsap.set(nodeRef.current, { opacity: 0, scale: 0 });
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 0, y: 20 });
      if (descriptionRef.current) gsap.set(descriptionRef.current, { opacity: 0, y: 15 });
      if (imagesRef.current) {
        const images = imagesRef.current.querySelectorAll<HTMLElement>(".timeline-image");
        gsap.set(images, { opacity: 0, scale: 0.9, y: 20 });
      }

      // Use intersection observer to trigger animation
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const tl = gsap.timeline();

              // Date fade in from left
              if (dateRef.current) {
                tl.to(dateRef.current, {
                  opacity: 1,
                  x: 0,
                  duration: 0.6,
                  ease: "power2.out",
                });
              }

              // Node scale in with glow
              if (nodeRef.current) {
                tl.to(
                  nodeRef.current,
                  {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: "back.out(1.7)",
                  },
                  "-=0.3"
                );
              }

              // Title fade in
              if (titleRef.current) {
                tl.to(
                  titleRef.current,
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power2.out",
                  },
                  "-=0.2"
                );
              }

              // Description fade in
              if (descriptionRef.current) {
                tl.to(
                  descriptionRef.current,
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                  },
                  "-=0.4"
                );
              }

              // Images stagger reveal
              if (imagesRef.current) {
                const images = imagesRef.current.querySelectorAll<HTMLElement>(".timeline-image");
                if (images.length > 0) {
                  tl.to(
                    images,
                    {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      duration: 0.6,
                      stagger: 0.1,
                      ease: "power2.out",
                    },
                    "-=0.3"
                  );
                }
              }

              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
      );

      if (entryRef.current) {
        observer.observe(entryRef.current);
      }

      return () => {
        if (entryRef.current) {
          observer.unobserve(entryRef.current);
        }
      };
    },
    { scope: entryRef, dependencies: [entry] }
  );

  return (
    <div ref={entryRef} className="relative flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-8 sm:mb-10 md:mb-12 last:mb-0">
      {/* Date on Left */}
      <div className="flex-shrink-0 w-24 sm:w-28 md:w-32 lg:w-40">
        <div ref={dateRef} className="text-xs sm:text-sm md:text-base text-light-gray-90 font-medium">
          {formatDate(entry.date)}
        </div>
      </div>

      {/* Timeline Node */}
      <div className="flex-shrink-0 relative w-8 sm:w-9 md:w-10 flex items-start justify-center">
        <div
          ref={nodeRef}
          data-timeline-node-container
          className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full flex items-center justify-center border bg-[#F8F8F81A] border-[#13F58440] shadow-[inset_0_0_21.06px_0_#F8F8F840] backdrop-blur-[31.5896px]"
        >
          <div
            data-timeline-node
            className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 rounded-full border bg-[#13F5844D] border-[#13F584BF]"
          />
        </div>
      </div>

      {/* Content on Right */}
      <div ref={contentRef} className="flex-1 pb-6 sm:pb-7 md:pb-8">
        <h3 ref={titleRef} className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-gradient-radial-white">
          {entry.title}
        </h3>
        <p ref={descriptionRef} className="text-sm sm:text-base md:text-lg text-light-gray-90 mb-4 sm:mb-5 md:mb-6 leading-relaxed">
          {entry.description}
        </p>

        {/* Images Grid */}
        {entry.images.length > 0 && (
          <div ref={imagesRef} className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {entry.images.map((image, imgIndex) => (
              <div
                key={imgIndex}
                className="timeline-image relative aspect-video rounded-lg overflow-hidden"
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
      className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-8"
    >
      <div ref={ref} className="relative space-y-0 pb-6 sm:pb-7 md:pb-8">
        {timeline.map((entry, index) => (
          <TimelineEntry
            key={index}
            entry={entry}
            index={index}
            entryRef={(el) => {
              entryRefs.current[index] = el;
            }}
          />
        ))}

        {/* Vertical track + animated progress (desktop) — mirrors components/ui/timeline.tsx */}
        {timeline.length > 1 && (
          <div
            style={{ height: `${height}px` }}
            className="absolute left-[100px] sm:left-[120px] md:left-[180px] lg:left-[228px] top-0 overflow-hidden w-[2px] hidden md:block bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-primary/20 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
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
