"use client";

import Image from "next/image";
import type { CaseStudyWithUrls } from "@/lib/case-studies";

interface CaseStudyHeroProps {
  caseStudy: CaseStudyWithUrls;
}

export function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
  return (
    <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden bg-dark pt-24 pb-16 md:pt-32 md:pb-20">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-primary opacity-10 blur-[140px] rounded-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-transparent to-dark/80" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-6xl mx-auto w-full">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-gradient-primary">
            {caseStudy.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-light-gray-90 mb-8 max-w-4xl">
            {caseStudy.subtitle}
          </p>

          {/* Tags */}
          {caseStudy.tags && caseStudy.tags.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-12">
              {caseStudy.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-white-opacity-10 border border-white-opacity-20 text-sm text-light-gray-90"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Hero Images */}
          {caseStudy.heroImages && caseStudy.heroImages.length >= 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.heroImages.slice(0, 2).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-lg overflow-hidden"
                >
                  <Image
                    src={image.url}
                    alt={image.alt || `${caseStudy.title} - Hero ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

