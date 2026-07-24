export type HomeServiceIcon =
  | "brain"
  | "building"
  | "cloud"
  | "code"
  | "compass"
  | "layers"
  | "shield";

export type HomeService = {
  id: string;
  title: string;
  shortDescription: string;
  icon: HomeServiceIcon;
  href: string;
  accent: "blue" | "gold";
  featured?: boolean;
};

export const homeServices: readonly HomeService[] = [
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    shortDescription:
      "Align strategy, operating models, platforms, and delivery around measurable change.",
    icon: "compass",
    href: "/services#digital-transformation",
    accent: "gold",
    featured: true,
  },
  {
    id: "software",
    title: "Custom Software Development",
    shortDescription:
      "Secure, scalable applications engineered around complex business operations.",
    icon: "code",
    href: "/services/software-development",
    accent: "blue",
  },
  {
    id: "ai",
    title: "Data and Artificial Intelligence",
    shortDescription:
      "Governed data products and practical AI workflows that improve decisions.",
    icon: "brain",
    href: "/services/ai-automation",
    accent: "blue",
  },
  {
    id: "cloud",
    title: "Cloud and DevOps",
    shortDescription:
      "Resilient cloud foundations, automation, and delivery pipelines built to evolve.",
    icon: "cloud",
    href: "/services/cloud-cybersecurity",
    accent: "blue",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    shortDescription:
      "Security architecture and controls integrated throughout the technology lifecycle.",
    icon: "shield",
    href: "/services/cloud-cybersecurity",
    accent: "gold",
  },
  {
    id: "infrastructure",
    title: "IT Infrastructure",
    shortDescription:
      "Modern infrastructure designed for reliability, visibility, and operational control.",
    icon: "layers",
    href: "/services#infrastructure",
    accent: "blue",
  },
  {
    id: "consulting",
    title: "Technology Consulting",
    shortDescription:
      "Clear technical direction, architecture decisions, and delivery planning.",
    icon: "building",
    href: "/services#consulting",
    accent: "gold",
  },
];
