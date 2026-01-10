import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ServiceItemProps } from "@/types/props";

export function ServiceItem({
  title,
  description,
  iconPosition,
  layout,
  positionClassName,
  positionStyle,
  descriptionClassName = "",
  iconSrc = "/landing/service/serviceicon.svg",
  iconAlt = "Service icon",
  href,
}: ServiceItemProps) {
  const textAlignment = iconPosition === "left" ? "text-left" : "text-right";
  const iconOrder = iconPosition === "left";

  const resolvedLayout =
    layout ?? (positionStyle?.transform === "none" ? "stacked" : "absolute");
  const isStacked = resolvedLayout === "stacked";

  const content = (
    <div className={`relative ${isStacked ? 'p-4 sm:p-6 w-full' : 'p-4 md:p-6 lg:p-8 min-w-[320px] sm:min-w-[360px] md:min-w-[400px] max-w-[420px]'} ${isStacked ? 'min-h-0' : 'h-[240px]'} flex flex-col justify-center glass-cyber rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(19,245,132,0.2)] ${href ? 'cursor-pointer hover:opacity-100' : ''}`}>
      <div className="flex flex-row items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
        {iconOrder ? (
          <>
            {/* Glowing Green Cylindrical Icon on Left */}
            <div className="shrink-0">
              <div className="relative">
                <Image
                  src={iconSrc}
                  alt={iconAlt}
                  width={60}
                  height={60}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain filter-glow-primary-strong"
                />
              </div>
            </div>
            {/* Text Content */}
            <div className="flex flex-col gap-2 md:gap-3 flex-1 min-w-0">
              <h3
                className={`text-base sm:text-lg md:text-xl font-semibold text-premium-gradient leading-relaxed ${textAlignment}`}
              >
                {title}
              </h3>
              {description && (
                <p
                  className={`text-sm md:text-base text-premium-body leading-relaxed ${textAlignment} ${descriptionClassName}`}
                >
                  {description}
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Text Content */}
            <div className="flex flex-col gap-2 md:gap-3 flex-1 min-w-0">
              <h3
                className={`text-base sm:text-lg md:text-xl font-semibold text-premium-gradient leading-relaxed ${textAlignment}`}
              >
                {title}
              </h3>
              {description && (
                <p
                  className={`text-sm md:text-base text-premium-body leading-relaxed ${textAlignment} ${descriptionClassName}`}
                >
                  {description}
                </p>
              )}
            </div>
            {/* Glowing Green Cylindrical Icon on Right */}
            <div className="shrink-0">
              <div className="relative">
                <Image
                  src={iconSrc}
                  alt={iconAlt}
                  width={60}
                  height={60}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain filter-glow-primary-strong"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const containerClassName = cn(
    isStacked ? "relative w-full" : "absolute",
    positionClassName
  );

  if (href) {
    return (
      <Link
        href={href}
        className={containerClassName}
        style={positionStyle}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={containerClassName}
      style={positionStyle}
    >
      {content}
    </div>
  );
}

