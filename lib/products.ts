export interface MissionCard {
  title: string;
  description: string;
}

export interface AutomationFeature {
  title: string;
  description: string;
}

export interface PerformanceMetric {
  value: string;
  label: string;
}

export interface ProductContent {
  hero?: {
    subtitle?: string[];
  };
  mission?: {
    title?: string;
    subtitle?: string;
    cards?: MissionCard[];
  };
  automationHub?: {
    title?: string;
    subtitle?: string;
    features?: AutomationFeature[];
  };
  youtubeVideo?: {
    videoId?: string;
    title?: string;
  };
  performance?: {
    metrics?: PerformanceMetric[];
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon?: string;
  content?: ProductContent;
}

export const products: Product[] = [
  {
    id: "erp",
    name: "ERP",
    description: "Voice Activated AI ERP for SMEs",
    slug: "erp",
    content: {
      hero: {
        subtitle: [
          "Where Innovation Meets Productivity Driven by agents Powered by automation",
          "Built for what's next",
        ],
      },
      mission: {
        title: "Protect your organization from any threat",
        subtitle:
          "Security AI Platform to Protect the Entire Enterprise. Break Down Security. Gain Enterprise-Wide Visibility. Action Your Data In Real-Time.",
        cards: [
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
        ],
      },
      automationHub: {
        title: "Intelligent Automation Hub",
        subtitle:
          "Security AI Platform to Protect the Entire Enterprise. Break Down Security. Gain Enterprise-Wide Visibility. Action Your Data In Real-Time.",
        features: [
          {
            title: "Adaptive Legacy Bridge",
            description:
              "Seamlessly wraps around existing systems to enable smart AI enhancements without disruption",
          },
          {
            title: "Voice Command Suite",
            description:
              "Optimized interfaces for both developers and end-users to maximize efficiency and adoption.",
          },
          {
            title: "Dual User Access",
            description:
              "Full voice control for effortless operation across all platform functions and workflows.",
          },
          {
            title: "Collaborative Workflow",
            description:
              "Integrates human expertise with AI for refined and reliable automation processes.",
          },
        ],
      },
      youtubeVideo: {
        videoId: "ED2H_y6dmC8",
        title: "Products That Work for You",
      },
      performance: {
        metrics: [
          { value: "85%", label: "Adoption Rate" },
          { value: "85%", label: "Adoption Rate" },
          { value: "85%", label: "Adoption Rate" },
        ],
      },
    },
  },
  {
    id: "ai-framework",
    name: "AI Framework",
    description: "AI Agent & Automation Framework",
    slug: "ai-framework",
    content: {
      hero: {
        subtitle: [
          "Build powerful AI agents and automation workflows",
          "Scalable framework for enterprise AI solutions",
        ],
      },
      mission: {
        title: "Empower Your Development Team",
        subtitle:
          "A comprehensive framework that enables rapid development and deployment of AI-powered applications and automation systems.",
        cards: [
          {
            title: "Modular Architecture",
            description:
              "Flexible, composable components that adapt to your specific needs and use cases.",
          },
          {
            title: "Easy Integration",
            description:
              "Seamlessly connect with existing systems and third-party services.",
          },
          {
            title: "Scalable Design",
            description:
              "Built to handle enterprise-scale workloads with high performance and reliability.",
          },
        ],
      },
      automationHub: {
        title: "Powerful Automation Capabilities",
        subtitle:
          "Create sophisticated automation workflows with our intuitive framework and extensive tooling.",
        features: [
          {
            title: "Agent Orchestration",
            description:
              "Coordinate multiple AI agents to work together on complex tasks.",
          },
          {
            title: "Workflow Builder",
            description:
              "Visual tools to design and deploy automation workflows without coding.",
          },
          {
            title: "Event-Driven Architecture",
            description:
              "React to system events and trigger automated responses in real-time.",
          },
          {
            title: "Monitoring & Analytics",
            description:
              "Track performance, debug issues, and optimize your automation workflows.",
          },
        ],
      },
      youtubeVideo: {
        videoId: "dQw4w9WgXcQ",
        title: "AI Framework in Action",
      },
      performance: {
        metrics: [
          { value: "90%", label: "Developer Satisfaction" },
          { value: "10x", label: "Faster Development" },
          { value: "99.9%", label: "Uptime" },
        ],
      },
    },
  },
  {
    id: "zakra",
    name: "Zakra",
    description: "Smart Knowledge Agent",
    slug: "zakra",
  },
  {
    id: "jawib",
    name: "Jawib",
    description: "Customer Service Agent",
    slug: "jawib",
  },
  {
    id: "fasih",
    name: "Fasih",
    description: "The native Arabic LLM",
    slug: "fasih",
  },
  {
    id: "domain-expansion",
    name: "Domain Expansion",
    description: "Seamlessly connect legacy",
    slug: "domain-expansion",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

