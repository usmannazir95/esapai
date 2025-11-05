export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceContent {
  hero?: {
    subtitle?: string[];
  };
  features?: {
    title?: string;
    subtitle?: string;
    items?: ServiceFeature[];
  };
  youtubeVideo?: {
    videoId?: string;
    title?: string;
  };
}

export interface Service {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon?: string;
  content?: ServiceContent;
}

export const services: Service[] = [
  {
    id: "end-to-end-integration",
    name: "End-to-End Agentic AI Integration",
    description: "Complete AI agent integration solutions",
    slug: "end-to-end-integration",
    content: {
      hero: {
        subtitle: [
          "Complete AI agent integration solutions for your enterprise",
          "From strategy to deployment, we handle every aspect of your AI transformation",
        ],
      },
      features: {
        title: "Comprehensive Integration Services",
        subtitle:
          "We provide end-to-end AI agent integration that transforms your business operations with intelligent automation and seamless connectivity.",
        items: [
          {
            title: "Strategic Planning & Assessment",
            description:
              "Comprehensive analysis of your current systems and workflows to design optimal AI agent integration strategies.",
          },
          {
            title: "Custom Agent Development",
            description:
              "Build tailored AI agents specifically designed for your business processes, industry, and operational requirements.",
          },
          {
            title: "System Integration",
            description:
              "Seamlessly integrate AI agents with your existing infrastructure, databases, APIs, and third-party services.",
          },
          {
            title: "Training & Optimization",
            description:
              "Fine-tune agents with your data and workflows, ensuring optimal performance and continuous improvement.",
          },
          {
            title: "Ongoing Support & Maintenance",
            description:
              "24/7 monitoring, updates, and support to ensure your AI agents operate at peak performance.",
          },
        ],
      },
      youtubeVideo: {
        videoId: "ED2H_y6dmC8",
        title: "End-to-End AI Integration Overview",
      },
    },
  },
  {
    id: "enterprise-automation",
    name: "Enterprise Automation Strategy Consulting",
    description: "Strategic automation consulting services",
    slug: "enterprise-automation",
    content: {
      hero: {
        subtitle: [
          "Strategic automation consulting to transform your enterprise",
          "Expert guidance to identify, prioritize, and implement automation opportunities",
        ],
      },
      features: {
        title: "Strategic Automation Expertise",
        subtitle:
          "Work with our automation experts to develop comprehensive strategies that maximize ROI and operational efficiency.",
        items: [
          {
            title: "Automation Opportunity Assessment",
            description:
              "Identify high-impact automation opportunities across your organization through comprehensive process analysis.",
          },
          {
            title: "ROI Analysis & Planning",
            description:
              "Quantify potential benefits, estimate costs, and create detailed implementation roadmaps with clear milestones.",
          },
          {
            title: "Change Management Strategy",
            description:
              "Develop comprehensive change management plans to ensure smooth adoption and minimize disruption.",
          },
          {
            title: "Technology Selection",
            description:
              "Recommend the best automation tools and platforms based on your specific needs, budget, and technical requirements.",
          },
          {
            title: "Implementation Roadmap",
            description:
              "Create detailed execution plans with phased rollouts, risk mitigation strategies, and success metrics.",
          },
        ],
      },
      youtubeVideo: {
        videoId: "ED2H_y6dmC8",
        title: "Enterprise Automation Strategy",
      },
    },
  },
  {
    id: "faas",
    name: "AI Agents Framework-as-a-Service (FaaS)",
    description: "Managed AI framework platform",
    slug: "faas",
    content: {
      hero: {
        subtitle: [
          "Managed AI framework platform for rapid deployment",
          "Focus on innovation while we handle infrastructure, scaling, and maintenance",
        ],
      },
      features: {
        title: "Fully Managed AI Framework Service",
        subtitle:
          "Deploy and scale AI agents without infrastructure management. Our platform handles everything from deployment to monitoring.",
        items: [
          {
            title: "Cloud-Native Infrastructure",
            description:
              "Scalable, secure cloud infrastructure with automatic scaling, load balancing, and high availability.",
          },
          {
            title: "Rapid Deployment",
            description:
              "Deploy AI agents in minutes with our streamlined deployment pipeline and automated configuration management.",
          },
          {
            title: "Monitoring & Observability",
            description:
              "Comprehensive monitoring, logging, and analytics to track performance, usage, and costs in real-time.",
          },
          {
            title: "Security & Compliance",
            description:
              "Enterprise-grade security with encryption, access controls, and compliance certifications built-in.",
          },
          {
            title: "24/7 Support & Maintenance",
            description:
              "Dedicated support team handles updates, patches, and troubleshooting so you can focus on your business.",
          },
        ],
      },
      youtubeVideo: {
        videoId: "ED2H_y6dmC8",
        title: "FaaS Platform Demo",
      },
    },
  },
  {
    id: "tailored-solutions",
    name: "AI Solutions Tailored to Your Needs",
    description: "Custom AI solutions for your business",
    slug: "tailored-solutions",
    content: {
      hero: {
        subtitle: [
          "Custom AI solutions designed specifically for your business",
          "Every solution is built from the ground up to address your unique challenges",
        ],
      },
      features: {
        title: "Bespoke AI Solutions",
        subtitle:
          "We don't offer one-size-fits-all solutions. Every AI system we build is custom-designed for your specific business needs and goals.",
        items: [
          {
            title: "Deep Requirements Analysis",
            description:
              "Collaborative workshops to understand your business, workflows, pain points, and objectives in detail.",
          },
          {
            title: "Custom Architecture Design",
            description:
              "Design AI solutions with architectures tailored to your technical environment, scale, and future growth plans.",
          },
          {
            title: "Agile Development Process",
            description:
              "Iterative development with continuous feedback loops, ensuring the solution evolves with your needs.",
          },
          {
            title: "Integration & Testing",
            description:
              "Comprehensive integration with your systems and rigorous testing to ensure reliability and performance.",
          },
          {
            title: "Training & Documentation",
            description:
              "Complete training programs and documentation to ensure your team can effectively use and maintain the solution.",
          },
        ],
      },
      youtubeVideo: {
        videoId: "ED2H_y6dmC8",
        title: "Tailored AI Solutions",
      },
    },
  },
  {
    id: "industry-excellence",
    name: "Industry-Specific AI Excellence",
    description: "Specialized for your industry",
    slug: "industry-excellence",
    content: {
      hero: {
        subtitle: [
          "AI solutions specialized for your industry",
          "Domain expertise combined with cutting-edge AI technology",
        ],
      },
      features: {
        title: "Industry-Specific AI Expertise",
        subtitle:
          "Our solutions are built with deep understanding of industry-specific challenges, regulations, and best practices.",
        items: [
          {
            title: "Healthcare AI Solutions",
            description:
              "HIPAA-compliant AI for patient care, medical records, diagnostic assistance, and healthcare operations.",
          },
          {
            title: "Financial Services AI",
            description:
              "Regulatory-compliant AI for fraud detection, risk assessment, trading, and customer service in finance.",
          },
          {
            title: "Manufacturing & Supply Chain",
            description:
              "AI-powered optimization for production, quality control, predictive maintenance, and supply chain management.",
          },
          {
            title: "Retail & E-Commerce",
            description:
              "Personalized recommendations, inventory optimization, demand forecasting, and customer experience enhancement.",
          },
          {
            title: "Industry Compliance & Standards",
            description:
              "Deep knowledge of industry regulations, standards, and requirements to ensure compliant AI implementations.",
          },
        ],
      },
      youtubeVideo: {
        videoId: "ED2H_y6dmC8",
        title: "Industry-Specific AI Excellence",
      },
    },
  },
  {
    id: "innovation-lab",
    name: "ESAP AI Innovation & Research Lab",
    description: "Cutting-edge AI research and development",
    slug: "innovation-lab",
    content: {
      hero: {
        subtitle: [
          "Cutting-edge AI research and development",
          "Pushing the boundaries of what's possible with artificial intelligence",
        ],
      },
      features: {
        title: "Advanced AI Research & Development",
        subtitle:
          "Our innovation lab explores the frontiers of AI technology, developing next-generation solutions and capabilities.",
        items: [
          {
            title: "Research & Development",
            description:
              "Continuous research into new AI techniques, architectures, and applications to stay at the forefront of innovation.",
          },
          {
            title: "Prototype Development",
            description:
              "Rapid prototyping of experimental AI solutions to validate concepts and explore new possibilities.",
          },
          {
            title: "Technology Partnerships",
            description:
              "Collaborate with leading universities, research institutions, and technology companies on cutting-edge projects.",
          },
          {
            title: "Early Access Programs",
            description:
              "Get early access to breakthrough AI technologies and features before they're available to the general market.",
          },
          {
            title: "Custom Research Projects",
            description:
              "Commissioned research projects tailored to your specific challenges, exploring novel AI approaches.",
          },
        ],
      },
      youtubeVideo: {
        videoId: "ED2H_y6dmC8",
        title: "ESAP AI Innovation Lab",
      },
    },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

