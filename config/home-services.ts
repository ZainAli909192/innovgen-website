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
  imageAlt: string;
  imageUrl: string;
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
    imageAlt: "Team collaborating on a digital transformation programme",
    imageUrl:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=82",
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
    imageAlt: "Software source code displayed on a workstation",
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=82",
    icon: "code",
    href: "/services/software-development",
    accent: "blue",
  },
  {
    id: "ai",
    title: "Data and Artificial Intelligence",
    shortDescription:
      "Governed data products and practical AI workflows that improve decisions.",
    imageAlt: "Artificial intelligence visualisation on a digital display",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=82",
    icon: "brain",
    href: "/services/ai-automation",
    accent: "blue",
  },
  {
    id: "cloud",
    title: "Cloud and DevOps",
    shortDescription:
      "Resilient cloud foundations, automation, and delivery pipelines built to evolve.",
    imageAlt: "Global cloud network visualisation",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=82",
    icon: "cloud",
    href: "/services/cloud-cybersecurity",
    accent: "blue",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    shortDescription:
      "Security architecture and controls integrated throughout the technology lifecycle.",
    imageAlt: "Secure digital access on a mobile device",
    imageUrl:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=82",
    icon: "shield",
    href: "/services/cloud-cybersecurity",
    accent: "gold",
  },
  {
    id: "infrastructure",
    title: "IT Infrastructure",
    shortDescription:
      "Modern infrastructure designed for reliability, visibility, and operational control.",
    imageAlt: "Modern computer hardware and technology infrastructure",
    imageUrl:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=82",
    icon: "layers",
    href: "/services#infrastructure",
    accent: "blue",
  },
  {
    id: "consulting",
    title: "Technology Consulting",
    shortDescription:
      "Clear technical direction, architecture decisions, and delivery planning.",
    imageAlt: "Consulting team discussing technology strategy",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=82",
    icon: "building",
    href: "/services#consulting",
    accent: "gold",
  },
];
