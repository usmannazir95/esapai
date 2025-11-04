export interface Service {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon?: string;
}

export const services: Service[] = [
  {
    id: "end-to-end-integration",
    name: "End-to-End Agentic AI Integration",
    description: "Complete AI agent integration solutions",
    slug: "end-to-end-integration",
  },
  {
    id: "enterprise-automation",
    name: "Enterprise Automation Strategy Consulting",
    description: "Strategic automation consulting services",
    slug: "enterprise-automation",
  },
  {
    id: "faas",
    name: "AI Agents Framework-as-a-Service (FaaS)",
    description: "Managed AI framework platform",
    slug: "faas",
  },
  {
    id: "tailored-solutions",
    name: "AI Solutions Tailored to Your Needs",
    description: "Custom AI solutions for your business",
    slug: "tailored-solutions",
  },
  {
    id: "industry-excellence",
    name: "Industry-Specific AI Excellence",
    description: "Specialized for your industry",
    slug: "industry-excellence",
  },
  {
    id: "innovation-lab",
    name: "ESAP AI Innovation & Research Lab",
    description: "Cutting-edge AI research and development",
    slug: "innovation-lab",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

