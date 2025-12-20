import Link from "next/link";
import Image from "next/image";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import type { CaseStudyWithUrls } from "@/types/case-study";
import type { CaseStudyCardProps } from "@/types/props";


export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const thumbnailImage = caseStudy.heroImages[0];
  const displayTags = caseStudy.tags.slice(0, 3);
  const excerpt = caseStudy.subtitle.length > 150
    ? `${caseStudy.subtitle.substring(0, 150)}...`
    : caseStudy.subtitle;

  return (
    <Link href={`/case-study/${caseStudy.slug}`} className="block h-full">
      <SpotlightCard className="h-full">
        <div className="p-4 sm:p-5 md:p-6 h-full flex flex-col">
          {/* Thumbnail Image */}
          {thumbnailImage && (
            <div className="relative w-full h-40 sm:h-44 md:h-48 lg:h-56 mb-3 sm:mb-4 md:mb-5 rounded-lg overflow-hidden">
              <Image
                src={thumbnailImage.url}
                alt={thumbnailImage.alt || caseStudy.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-gradient-radial-white">
            {caseStudy.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-base text-light-gray-90 leading-relaxed mb-4 sm:mb-5 flex-1">
            {excerpt}
          </p>

          {/* Tags */}
          {displayTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
              {displayTags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs md:text-sm rounded-full bg-dark border border-primary/30 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
            <span>View</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
}
