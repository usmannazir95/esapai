"use client";

import Image from "next/image";
import type { MissionCard as MissionCardType } from "@/lib/products";

interface MissionProps {
  title?: string;
  subtitle?: string;
  cards?: MissionCardType[];
}

const defaultTitle = "Protect your organization from any threat";
const defaultSubtitle =
  "Security AI Platform to Protect the Entire Enterprise. Break Down Security. Gain Enterprise-Wide Visibility. Action Your Data In Real-Time.";
const defaultCards: MissionCardType[] = [
  {
    title: "Developer-Friendly Architecture",
    description:
      "Seamlessly integrate AI capabilities into existing tools and platforms.",
  },
  {
    title: "Dual Interfaces for Flexibility",
    description:
      "Seamlessly integrate AI capabilities into existing tools and platforms.",
  },
  {
    title: "Human-in-the-Loop Workflows",
    description:
      "Seamlessly integrate AI capabilities into existing tools and platforms.",
  },
];

export function Mission({
  title = defaultTitle,
  subtitle = defaultSubtitle,
  cards = defaultCards,
}: MissionProps = {}) {
  return (
    <section
      className="relative w-full py-20 px-4"
      style={{ backgroundColor: "var(--color-dark)" }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Main Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center text-gradient-radial-white leading-tight">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-center text-white-opacity-70 max-w-4xl mx-auto mb-16">
          {subtitle}
        </p>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <MissionCard
              key={index}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface MissionCardProps {
  title: string;
  description: string;
}

function MissionCard({ title, description }: MissionCardProps) {
  return (
    <div className="mission-card relative overflow-hidden">
      {/* Content */}
      <div className="relative p-8 h-full flex flex-col">
        {/* Card Title */}
        <h3 className="text-2xl font-bold mb-4 text-gradient-radial-white">
          {title}
        </h3>

        {/* Card Description */}
        <p className="text-base text-white-opacity-70 mb-6 grow">
          {description}
        </p>

        {/* Mission Graphic */}
        <div className="relative w-full h-48 flex items-center justify-center">
          <Image
            src="/landing/mission/mission.svg"
            alt="Mission illustration"
            width={200}
            height={200}
            className="w-full h-full max-w-[180px] max-h-[180px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

