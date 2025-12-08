"use client";

import type { ReactNode } from "react";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden bg-dark pt-24 pb-16 md:pt-32 md:pb-20">
        {/* Subtle gradient overlay */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[800px] bg-gradient-to-b from-primary via-primary/10 to-transparent opacity-20 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight text-gradient-primary">
              {title}
            </h1>
            <div className="flex items-center justify-center gap-2 text-light-gray-90 text-sm md:text-base">
              <span>Last updated:</span>
              <span className="text-primary font-medium">{lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative bg-dark pb-20 md:pb-32">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1200px] bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-30 blur-3xl" />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-12 md:pt-16">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-10 md:space-y-14 text-light-gray-90 leading-relaxed">
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

interface LegalSectionProps {
  title: string;
  children: ReactNode;
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <div className="space-y-5 md:space-y-6 relative">
      {/* Section divider line */}
      <div className="absolute -top-5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="space-y-5">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary mb-5 md:mb-6 leading-tight">
          {title}
        </h2>
        <div className="space-y-4 text-base md:text-lg leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

interface LegalParagraphProps {
  children: ReactNode;
}

export function LegalParagraph({ children }: LegalParagraphProps) {
  return (
    <p className="text-light-gray-90 leading-relaxed">
      {children}
    </p>
  );
}

interface LegalListProps {
  items: string[];
  ordered?: boolean;
}

export function LegalList({ items, ordered = false }: LegalListProps) {
  const ListTag = ordered ? "ol" : "ul";
  return (
    <ListTag className={`${ordered ? "list-decimal" : "list-disc"} ml-6 md:ml-8 space-y-3 text-light-gray-90 leading-relaxed`}>
      {items.map((item, index) => (
        <li key={index} className="pl-2 md:pl-3 relative">
          <span className="relative z-10">{item}</span>
        </li>
      ))}
    </ListTag>
  );
}

