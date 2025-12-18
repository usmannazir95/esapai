import Link from "next/link";
import Image from "next/image";
import { getCaseStudies } from "@/lib/case-studies";
import Frame from "@/components/sections/shared/frame";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { LazySection } from "@/components/ui/lazy-section";

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <main className="relative">
      {/* Hero Section - Loads immediately (above the fold) */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-dark">
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
        <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-gradient-primary">
            Case Studies
          </h1>
          <p className="text-lg md:text-xl text-light-gray-90 max-w-2xl mx-auto">
            Where Innovation Meets Productivity Driven by agents Powered by automation Built for what&apos;s next
          </p>
        </div>
      </section>

      {/* Case Studies Grid - Lazy loaded (below the fold) */}
      <LazySection minHeight="800px">
        <Section>
          <SectionHeader
            title="Explore Our Case Studies"
            subtitle="Discover how ESAP AI transforms businesses through innovative AI solutions and real-world implementations."
            subtitleClassName="text-base md:text-lg lg:text-xl text-light-gray-90 max-w-5xl mx-auto px-4 mb-16"
          />

          {caseStudies.length > 0 ? (
            <div className="max-w-6xl mx-auto px-4">
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
                        ? ""
                        : "mt-14 pt-14 border-t border-white/10"
                    }
                  >
                    {caseStudy.featured && (
                      <div className="mb-3">
                        <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-xs uppercase tracking-wide text-primary">
                          Featured
                        </span>
                      </div>
                    )}

                    <h2 className="text-3xl md:text-4xl font-bold text-gradient-radial-white mb-6">
                      {caseStudy.title}
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                      {/* Left: image + tags */}
                      <div>
                        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
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
                          <div className="flex flex-wrap gap-2 mt-4">
                            {displayTags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 rounded-full bg-white-opacity-10 border border-white-opacity-20 text-sm text-light-gray-90"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: excerpt + button */}
                      <div className="max-w-xl">
                        <p className="text-light-gray-90 text-base md:text-lg leading-relaxed mb-6">
                          {excerpt}
                        </p>

                        <Button
                          variant="surface"
                          size="lg"
                          className="case-study-view-btn relative z-10 rounded-[40px] px-10 py-6 text-base md:text-lg font-semibold"
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
          <div className="mt-16 text-center">
            <p className="text-lg md:text-xl text-light-gray-90 mb-6">
              Interested in learning more about our solutions?
            </p>
            <Button
              variant="primary"
              size="lg"
              className="rounded-[40px] px-8 py-6 text-lg font-semibold"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </Section>
      </LazySection>
    </main>
  );
}
