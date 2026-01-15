"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sparkles, Shield, Zap, Brain, TrendingUp, Globe } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

// Color schemes for different rows
const COLOR_SCHEMES = {
  primary: {
    gradient: 'rgba(19, 245, 132, 0.4), rgba(19, 245, 132, 0.15), rgba(10, 20, 15, 0.9)',
    border: 'rgba(19, 245, 132, 0.3)',
    shadow: 'rgba(19, 245, 132, 0.35)',
    accent: 'rgb(19, 245, 132)',
  },
  teal: {
    gradient: 'rgba(20, 184, 166, 0.4), rgba(20, 184, 166, 0.15), rgba(10, 20, 18, 0.9)',
    border: 'rgba(20, 184, 166, 0.3)',
    shadow: 'rgba(20, 184, 166, 0.35)',
    accent: 'rgb(20, 184, 166)',
  },
  emerald: {
    gradient: 'rgba(52, 211, 153, 0.4), rgba(52, 211, 153, 0.15), rgba(10, 22, 16, 0.9)',
    border: 'rgba(52, 211, 153, 0.3)',
    shadow: 'rgba(52, 211, 153, 0.35)',
    accent: 'rgb(52, 211, 153)',
  },
};

interface StatCard {
  id: string;
  title: string;
  value: string;
  suffix: string;
  change: string;
  icon: LucideIcon;
  colorScheme: keyof typeof COLOR_SCHEMES;
}

const STAT_CARDS: StatCard[] = [
  { id: '1', title: 'Innovation', value: '99', suffix: '%', change: '+12%', icon: Sparkles, colorScheme: 'primary' },
  { id: '2', title: 'Security', value: '100', suffix: '%', change: '+8%', icon: Shield, colorScheme: 'primary' },
  { id: '3', title: 'Speed', value: '10', suffix: 'x', change: '+25%', icon: Zap, colorScheme: 'teal' },
  { id: '4', title: 'Intelligence', value: '500', suffix: 'M+', change: '+40%', icon: Brain, colorScheme: 'teal' },
  { id: '5', title: 'Growth', value: '340', suffix: '%', change: '+18%', icon: TrendingUp, colorScheme: 'emerald' },
  { id: '6', title: 'Global Reach', value: '50', suffix: '+', change: '+15%', icon: Globe, colorScheme: 'emerald' },
];

const CARD_LAYOUT = [
  { x: '18%', y: '28%', rotateX: 12, rotateY: 18, scale: 1 },
  { x: '82%', y: '25%', rotateX: 12, rotateY: -18, scale: 1 },
  { x: '25%', y: '52%', rotateX: 10, rotateY: 12, scale: 0.95 },
  { x: '75%', y: '50%', rotateX: 10, rotateY: -12, scale: 0.95 },
  { x: '28%', y: '76%', rotateX: 8, rotateY: 10, scale: 0.9 },
  { x: '72%', y: '74%', rotateX: 8, rotateY: -10, scale: 0.9 },
];

function StatCardComponent({
  stat,
  layout,
  index
}: {
  stat: StatCard;
  layout: typeof CARD_LAYOUT[0];
  index: number;
}) {
  const Icon = stat.icon;
  const colors = COLOR_SCHEMES[stat.colorScheme];
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!innerRef.current || prefersReducedMotion()) return;

    // Floating animation on inner card
    gsap.to(innerRef.current, {
      y: '+=15',
      duration: 2 + index * 0.3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Subtle rotation
    gsap.to(innerRef.current, {
      rotateZ: index % 2 === 0 ? 2 : -2,
      duration: 3 + index * 0.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }, { scope: innerRef });

  return (
    <div
      className="absolute"
      style={{
        left: layout.x,
        top: layout.y,
        transform: 'translate(-50%, -50%)',
        zIndex: 10 + index,
      }}
    >
      <div ref={innerRef}>
      <div
        className="w-[180px] md:w-[220px] p-5 md:p-6 rounded-3xl border backdrop-blur-md cursor-default select-none relative overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${colors.gradient})`,
          borderColor: colors.border,
          boxShadow: `0 25px 60px -15px ${colors.shadow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
          transform: `perspective(800px) rotateX(${layout.rotateX}deg) rotateY(${layout.rotateY}deg) scale(${layout.scale})`,
        }}
      >
        {/* Glass highlight */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none rounded-2xl" />
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: `linear-gradient(to right, transparent, ${colors.accent}80, transparent)` }}
        />

        {/* Header */}
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${colors.accent}66, ${colors.accent}1a)`,
              border: `1px solid ${colors.border}`,
            }}
          >
            <Icon size={20} className="md:w-6 md:h-6" style={{ color: colors.accent }} />
          </div>
          <div
            className="px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ background: `${colors.accent}33`, color: colors.accent }}
          >
            {stat.change}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
            {stat.title}
          </h3>
          <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
            {stat.value}
            <span className="text-xl md:text-2xl" style={{ color: `${colors.accent}cc` }}>{stat.suffix}</span>
          </div>
        </div>

        {/* Animated bar */}
        <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden relative z-10">
          <div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(to right, ${colors.accent}80, ${colors.accent})`,
              width: `${70 + index * 8}%`
            }}
          />
        </div>

        {/* Card number */}
        <div className="absolute -bottom-3 -right-3 opacity-[0.05] pointer-events-none select-none font-black text-[4rem] text-white">
          0{index + 1}
        </div>
      </div>
      </div>
    </div>
  );
}

export function VisionStatCards({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute inset-0 w-full h-full pointer-events-none overflow-hidden", className)}
      aria-hidden="true"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/15 rounded-full blur-[100px]" />

      {/* Cards */}
      {STAT_CARDS.map((stat, i) => (
        <StatCardComponent
          key={stat.id}
          stat={stat}
          layout={CARD_LAYOUT[i]}
          index={i}
        />
      ))}
    </div>
  );
}
