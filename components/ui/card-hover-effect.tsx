import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

interface HoverEffectItem {
  title: string;
  description: string;
  link: string;
  icon?: string;
}

export const HoverEffect = ({
  items,
  className,
}: {
  items: HoverEffectItem[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoverBgRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const handleMouseEnter = (idx: number) => {
    if (prefersReducedMotion()) {
      setHoveredIndex(idx);
      const element = hoverBgRefs.current[idx];
      if (element) {
        gsap.set(element, { opacity: 1 });
      }
      return;
    }
    
    setHoveredIndex(idx);
    const element = hoverBgRefs.current[idx];
    if (element) {
      gsap.to(element, {
        opacity: 1,
        duration: 0.15,
        ease: "power2.out",
        force3D: true, // GPU acceleration
      });
    }
  };

  const handleMouseLeave = (idx: number) => {
    if (prefersReducedMotion()) {
      setHoveredIndex(null);
      const element = hoverBgRefs.current[idx];
      if (element) {
        gsap.set(element, { opacity: 0 });
      }
      return;
    }
    
    setHoveredIndex(null);
    const element = hoverBgRefs.current[idx];
    if (element) {
      gsap.to(element, {
        opacity: 0,
        duration: 0.15,
        delay: 0.2,
        ease: "power2.out",
        force3D: true, // GPU acceleration
      });
    }
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => handleMouseEnter(idx)}
          onMouseLeave={() => handleMouseLeave(idx)}
        >
          {hoveredIndex === idx && (
            <span
              ref={(el) => (hoverBgRefs.current[idx] = el)}
              className="absolute inset-0 h-full w-full bg-primary/10 block rounded-[32px] opacity-0"
            />
          )}
          <Card>
            {item.icon && (
              <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
                <Image
                  src={item.icon}
                  alt={`${item.title} icon`}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain filter-glow-primary"
                />
              </div>
            )}
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-[32px] h-full w-full overflow-hidden",
        "bg-gradient-to-br from-white/[0.02] to-white/[0.01]",
        "border border-white/[0.08]",
        "group-hover:border-primary/30",
        "transition-all duration-300",
        "relative z-20",
        className
      )}
    >
      <div className="relative z-50 p-6 md:p-8 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-2xl md:text-3xl font-bold tracking-wide mb-4 text-gradient-radial-white group-hover:text-primary transition-colors duration-300",
        className
      )}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "text-base md:text-lg text-light-gray-90 tracking-wide leading-relaxed flex-1",
        className
      )}
    >
      {children}
    </p>
  );
};
