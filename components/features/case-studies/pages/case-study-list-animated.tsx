"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useGSAPAnimations } from "@/lib/hooks/use-gsap-animations";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";
import Frame from "@/components/shared/frame";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { LazySection } from "@/components/ui/lazy-section";
import type { CaseStudyWithUrls } from "@/types/case-study";

interface CaseStudyListAnimatedProps {
  caseStudies: CaseStudyWithUrls[];
}

export function CaseStudyListAnimated({ caseStudies }: CaseStudyListAnimatedProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const anim = useGSAPAnimations(sectionRef);
  const { setRef: setIntersectionRef, isInView } = useIntersectionAnimation({
    threshold: 0.1,
    rootMargin: "100px",
  });

  // Hero section animations
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = anim.createTimeline();

      // Hero title animation
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 30 });
        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      // Hero subtitle animation
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
        tl.to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }
    },
    { scope: heroRef }
  );

  // Case study cards animations
  useGSAP(
    () => {
      if (prefersReducedMotion() || !isInView) return;
      if (!cardsContainerRef.current) return;

      const cards = cardsContainerRef.current.querySelectorAll<HTMLElement>("article");

      cards.forEach((card) => {
        const image = card.querySelector<HTMLElement>(".case-study-image");
        const title = card.querySelector<HTMLElement>("h2");
        const excerpt = card.querySelector<HTMLElement>("p");
        const tags = card.querySelectorAll<HTMLElement>(".case-study-tag");
        const button = card.querySelector<HTMLElement>(".case-study-button");

        // Set initial states
        const elementsToAnimate = [image, title, excerpt, button].filter(Boolean) as HTMLElement[];
        if (elementsToAnimate.length > 0) {
          gsap.set(elementsToAnimate, { opacity: 0 });
        }
        if (image) {
          gsap.set(image, { scale: 1.1, y: 20 });
        }
        if (title) {
          gsap.set(title, { y: 20 });
        }
        if (excerpt) {
          gsap.set(excerpt, { y: 15 });
        }
        if (button) {
          gsap.set(button, { y: 10, scale: 0.95 });
        }
        if (tags.length > 0) {
          gsap.set(tags, { opacity: 0, scale: 0.8 });
        }

        // Use intersection observer to trigger animation
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const tl = gsap.timeline();

                // Image reveal with scale
                if (image) {
                  tl.to(image, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                  });
                }

                // Title fade in
                if (title) {
                  tl.to(
                    title,
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.7,
                      ease: "power2.out",
                    },
                    "-=0.5"
                  );
                }

                // Tags stagger
                if (tags.length > 0) {
                  tl.to(
                    tags,
                    {
                      opacity: 1,
                      scale: 1,
                      duration: 0.5,
                      stagger: 0.1,
                      ease: "back.out(1.2)",
                    },
                    "-=0.4"
                  );
                }

                // Excerpt fade in
                if (excerpt) {
                  tl.to(
                    excerpt,
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.6,
                      ease: "power2.out",
                    },
                    "-=0.3"
                  );
                }

                // Button scale in
                if (button) {
                  tl.to(
                    button,
                    {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      duration: 0.5,
                      ease: "back.out(1.4)",
                    },
                    "-=0.2"
                  );
                }

                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
        );

        observer.observe(card);
      });
    },
    { scope: cardsContainerRef, dependencies: [isInView, caseStudies] }
  );

  return (
    <main className="relative" ref={sectionRef}>
      {/* Hero Section */}
      <section
        ref={(el) => {
          heroRef.current = el;
          setIntersectionRef(el as HTMLElement);
        }}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-dark"
      >
        {/* Animated Frame Background */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <Frame className="w-full h-full max-w-[1200px] max-h-[1600px] object-contain" />
          </div>

          {/* Background gradient glow */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary opacity-10 blur-[120px] rounded-full" />
          </div>

          {/* Contrast overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-transparent to-dark/80" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-14 md:py-16 flex flex-col items-center text-center max-w-4xl">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight text-gradient-primary"
          >
            Case Study
          </h1>
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl text-light-gray-90 max-w-2xl mx-auto px-2 sm:px-4"
          >
            Where Innovation Meets Productivity Driven by agents Powered by automation Built for what&apos;s next
          </p>
        </div>
      </section>

      {/* Case Studies Grid - Lazy loaded (below the fold) */}
      <LazySection minHeight="800px">
        <Section className="case-studies-glow">
          <SectionHeader
            title="Explore Our Case Study"
            subtitle="Discover how ESAP AI transforms businesses through innovative AI solutions and real-world implementations."
            subtitleClassName="text-base md:text-lg lg:text-xl text-light-gray-90 max-w-5xl mx-auto px-4 mb-16"
          />

          {caseStudies.length > 0 ? (
            <div ref={cardsContainerRef} className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
              {caseStudies.map((caseStudy, index) => {
                const thumbnail = caseStudy.thumbnail ?? caseStudy.heroImages?.[0];
                const displayTags = (caseStudy.tags ?? []).slice(0, 3);
                const excerpt =
                  caseStudy.subtitle.length > 140
                    ? `${caseStudy.subtitle.slice(0, 140)}…`
                    : caseStudy.subtitle;

                return (
                  <article
                    key={caseStudy._id}
                    className={
                      index === 0
                        ? "relative isolate"
                        : "relative isolate mt-10 sm:mt-12 md:mt-14 pt-10 sm:pt-12 md:pt-14 border-t border-white/10"
                    }
                  >
                    {/* Glow background to highlight each case study (visual only) */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -left-28 top-10 -z-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl opacity-70"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-24 bottom-10 -z-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl opacity-60"
                    />

                    {caseStudy.featured && (
                      <div className="mb-2 sm:mb-3">
                        <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/30 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs uppercase tracking-wide text-primary">
                          Featured
                        </span>
                      </div>
                    )}

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-radial-white mb-4 sm:mb-5 md:mb-6">
                      {caseStudy.title}
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-14 items-center">
                      {/* Left: image + tags */}
                      <div>
                        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden case-study-image">
                          {thumbnail ? (
                            <Image
                              src={thumbnail.url}
                              alt={thumbnail.alt || caseStudy.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              priority={index === 0}
                            />
                          ) : (
                            <div className="absolute inset-0 bg-white/5" />
                          )}
                        </div>

                        {displayTags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
                            {displayTags.map((tag) => (
                              <span
                                key={tag}
                                className="case-study-tag px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white-opacity-10 border border-white-opacity-20 text-xs sm:text-sm text-light-gray-90"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: excerpt + button */}
                      <div className="max-w-xl">
                        <p className="text-light-gray-90 text-sm sm:text-base md:text-lg leading-relaxed mb-5 sm:mb-6">
                          {excerpt}
                        </p>

                        <Button
                          variant="surface"
                          size="lg"
                          className="case-study-button case-study-view-btn relative z-10 rounded-[32px] sm:rounded-[40px] px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg font-semibold min-h-[44px] sm:min-h-[48px]"
                          asChild
                        >
                          <Link href={`/case-study/${caseStudy.slug}`}>
                            View
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-light-gray-90 mb-6">
                No case studies available yet.
              </p>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-12 sm:mt-14 md:mt-16 text-center">
            <p className="text-base sm:text-lg md:text-xl text-light-gray-90 mb-5 sm:mb-6 px-4">
              Interested in learning more about our solutions?
            </p>
            <Button
              variant="primary"
              size="lg"
              className="rounded-[32px] sm:rounded-[40px] px-10 sm:px-12 md:px-16 lg:px-20 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg font-semibold min-h-[44px] sm:min-h-[48px]"
              asChild
            >
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </Section>
      </LazySection>
    </main>
  );
}
