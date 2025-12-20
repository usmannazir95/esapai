import React from "react";
import Image from "next/image";
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
}: ServiceItemProps) {
  const textAlignment = iconPosition === "left" ? "text-left" : "text-right";
  const iconOrder = iconPosition === "left";
  
  const resolvedLayout =
    layout ?? (positionStyle?.transform === "none" ? "stacked" : "absolute");
  const isStacked = resolvedLayout === "stacked";

  return (
    <div 
      className={cn(isStacked ? "relative w-full" : "absolute", positionClassName)}
      style={positionStyle}
    >
      <div className={`relative ${isStacked ? 'p-4 sm:p-6 w-full' : 'p-4 md:p-6 lg:p-8 min-w-[320px] sm:min-w-[360px] md:min-w-[400px] max-w-[420px]'} ${isStacked ? 'min-h-0' : 'h-[240px]'} flex flex-col justify-center`}>
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
                  className={`text-base sm:text-lg md:text-xl font-semibold text-gradient-radial-white leading-relaxed ${textAlignment}`}
                >
                  {title}
                </h3>
                <p
                  className={`text-sm md:text-base text-white-opacity-70 leading-relaxed ${textAlignment} ${descriptionClassName}`}
                >
                  {description}
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Text Content */}
              <div className="flex flex-col gap-2 md:gap-3 flex-1 min-w-0">
                <h3
                  className={`text-base sm:text-lg md:text-xl font-semibold text-gradient-radial-white leading-relaxed ${textAlignment}`}
                >
                  {title}
                </h3>
                <p
                  className={`text-sm md:text-base text-white-opacity-70 leading-relaxed ${textAlignment} ${descriptionClassName}`}
                >
                  {description}
                </p>
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
    </div>
  );
}

