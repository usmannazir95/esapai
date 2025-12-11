"use client";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ProductHaloFlow } from "@/components/sections/hero/product-halo-flow";
import { InteractiveProductIconHalo } from "@/components/ui/interactive-product-icon-halo";
import { 
  Database, 
  Shield, 
  Zap, 
  Cpu, 
  Globe, 
  Activity, 
  Lock, 
  Layers,
  Brain,
  Code,
  Cloud,
  Settings
} from 'lucide-react';

export function ProductHaloFlowDemo() {
  // Custom icon props
  const iconProps = { size: 14, className: "text-[#13F584]" };

  // Custom left nodes
  const leftNodes = [
    { 
      id: 'l1', 
      title: 'Data Ingestion', 
      description: 'Real-time stream processing', 
      icon: <Database {...iconProps} /> 
    },
    { 
      id: 'l2', 
      title: 'Security', 
      description: 'Enterprise-grade encryption', 
      icon: <Shield {...iconProps} /> 
    },
    { 
      id: 'l3', 
      title: 'Compute', 
      description: 'Distributed processing', 
      icon: <Cpu {...iconProps} /> 
    },
    { 
      id: 'l4', 
      title: 'Network', 
      description: 'Global low-latency edge', 
      icon: <Globe {...iconProps} /> 
    },
  ];

  // Custom right nodes
  const rightNodes = [
    { 
      id: 'r1', 
      title: 'Analytics', 
      description: 'Predictive insights', 
      icon: <Activity {...iconProps} /> 
    },
    { 
      id: 'r2', 
      title: 'Protection', 
      description: 'Threat mitigation', 
      icon: <Lock {...iconProps} /> 
    },
    { 
      id: 'r3', 
      title: 'Integration', 
      description: 'API gateway connection', 
      icon: <Layers {...iconProps} /> 
    },
    { 
      id: 'r4', 
      title: 'Delivery', 
      description: 'Content optimization', 
      icon: <Zap {...iconProps} /> 
    },
  ];

  // Custom center node with InteractiveProductIconHalo
  const centerNode = {
    id: 'center',
    title: 'AI Core Engine',
    icon: (
      <InteractiveProductIconHalo scale={0.6} intensity="high">
        <div className="w-16 h-16 bg-black/50 backdrop-blur-md rounded-xl border border-emerald-500/30 p-3 flex items-center justify-center shadow-2xl">
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#13F584" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="#13F584" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="#13F584" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </InteractiveProductIconHalo>
    ),
  };

  return (
    <Section background="dark" padding="lg" className="py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Product Halo Flow Demo"
          subtitle="Interactive network visualization showcasing the interconnected architecture of our AI-powered platform. Hover over nodes to see connections come alive."
          subtitleClassName="text-sm sm:text-base md:text-lg text-light-gray-90 max-w-4xl mx-auto mb-12 md:mb-16"
        />

        {/* Demo Container */}
        <div className="relative w-full h-[800px] md:h-[900px] rounded-2xl overflow-hidden bg-gradient-to-b from-black/40 to-black/60 border border-white/10 backdrop-blur-sm">
          <ProductHaloFlow
            leftNodes={leftNodes}
            rightNodes={rightNodes}
            centerNode={centerNode}
          />
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 md:mt-16">
          <FeatureCard
            icon={<Brain className="w-6 h-6 text-[#13F584]" />}
            title="Straight Connections"
            description="Clean, direct lines connecting nodes for clarity"
          />
          <FeatureCard
            icon={<Code className="w-6 h-6 text-[#13F584]" />}
            title="Animated Glow"
            description="Pulsing energy bars travel along connections"
          />
          <FeatureCard
            icon={<Cloud className="w-6 h-6 text-[#13F584]" />}
            title="Interactive Nodes"
            description="Hover effects reveal connection points"
          />
          <FeatureCard
            icon={<Settings className="w-6 h-6 text-[#13F584]" />}
            title="Customizable"
            description="Easily configure nodes and connections"
          />
        </div>
      </div>
    </Section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#13F584]/50 transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(19,245,132,0.3)]">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <p className="text-sm text-light-gray-90">{description}</p>
    </div>
  );
}

