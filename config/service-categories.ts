export type ServiceIconKey =
  | "cloud"
  | "network"
  | "analytics"
  | "microsoft"
  | "devices"
  | "security"
  | "datacentre"
  | "solutions"
  | "healthcare"
  | "hospitality"
  | "education"
  | "industry";

export type ServiceCategory = {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: ServiceIconKey;
  services: readonly {
    title: string;
    description: string;
    icon: ServiceIconKey;
  }[];
};

export const serviceImageByIcon: Record<ServiceIconKey, string> = {
  analytics:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=82",
  cloud:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=82",
  datacentre:
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=82",
  devices:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=82",
  education:
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=82",
  healthcare:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=82",
  hospitality:
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=82",
  industry:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=82",
  microsoft:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=82",
  network:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=82",
  security:
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=82",
  solutions:
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=82",
};

export const serviceCategories = [
  {
    id: "professional-services",
    label: "Professional Services",
    title: "Technology decisions that move the business forward.",
    description:
      "Connect strategy, architecture and delivery with the specialist guidance needed to make complex technology choices clear.",
    icon: "analytics",
    services: [
      { title: "Professional Services", description: "Outcome-led technology expertise for evolving organizations.", icon: "solutions" },
      { title: "Cloud Consulting", description: "Cloud strategy, migration planning and governance.", icon: "cloud" },
      { title: "Network Consulting", description: "Resilient network design for modern operations.", icon: "network" },
      { title: "Data Analytics", description: "Data foundations that support better decisions.", icon: "analytics" },
      { title: "Microsoft Consulting", description: "Practical Microsoft platform guidance and enablement.", icon: "microsoft" },
    ],
  },
  {
    id: "managed-services",
    label: "Managed Services",
    title: "Reliable operations, actively improved.",
    description:
      "Keep essential systems dependable and secure with expert oversight, responsive support and continual service improvement.",
    icon: "devices",
    services: [
      { title: "Managed Services", description: "Ongoing technology operations aligned to your priorities.", icon: "solutions" },
      { title: "End User Computing", description: "Productive, secure experiences for every employee.", icon: "devices" },
      { title: "Network Management", description: "Monitoring and management for dependable connectivity.", icon: "network" },
      { title: "Datacentre Management", description: "Operational resilience for critical infrastructure.", icon: "datacentre" },
      { title: "Cloud Management", description: "Governed performance, cost and security in the cloud.", icon: "cloud" },
    ],
  },
  {
    id: "technology-solutions",
    label: "Products & Technology Solutions",
    title: "A connected technology foundation for what comes next.",
    description:
      "Select, integrate and evolve the platforms that enable secure operations, stronger experiences and sustainable scale.",
    icon: "security",
    services: [
      { title: "End User Computing Solutions", description: "Modern employee technology that works wherever work happens.", icon: "devices" },
      { title: "Networks & Software-Defined Networking", description: "Agile, policy-led connectivity across your organization.", icon: "network" },
      { title: "Security Solutions", description: "Protection designed into every layer of the environment.", icon: "security" },
      { title: "Datacentre Solutions", description: "Resilient infrastructure for business-critical workloads.", icon: "datacentre" },
      { title: "Cloud Solutions", description: "Flexible cloud platforms matched to your operating model.", icon: "cloud" },
      { title: "SaaS Solutions", description: "Business software selected and integrated with intent.", icon: "microsoft" },
      { title: "GRMS — Guest Room Management Solutions", description: "Connected guest experiences for hospitality environments.", icon: "hospitality" },
      { title: "Internet of Things & Data Analytics", description: "Connected intelligence from physical and digital operations.", icon: "analytics" },
    ],
  },
  {
    id: "industry-solutions",
    label: "Industry Solutions",
    title: "Technology shaped around the realities of your industry.",
    description:
      "Apply the right platforms and delivery approach to the operational, security and experience demands of your sector.",
    icon: "industry",
    services: [
      { title: "Healthcare", description: "Connected care systems designed for trust and continuity.", icon: "healthcare" },
      { title: "Hospitality", description: "Guest-first technology for responsive service environments.", icon: "hospitality" },
      { title: "Education", description: "Flexible digital foundations for learning and administration.", icon: "education" },
      { title: "Real Estate", description: "Smarter places, operations and tenant experiences.", icon: "industry" },
      { title: "Manufacturing", description: "Connected operations that support visibility and efficiency.", icon: "industry" },
      { title: "Public Sector", description: "Secure, accessible digital services for communities.", icon: "solutions" },
      { title: "Finance", description: "Governed technology for resilient financial operations.", icon: "security" },
      { title: "eCommerce", description: "Scalable experiences built for modern digital commerce.", icon: "analytics" },
      { title: "Aviation", description: "Reliable systems for complex, always-on environments.", icon: "network" },
      { title: "Supply Chain", description: "Connected visibility across people, processes and platforms.", icon: "datacentre" },
      { title: "Media", description: "Flexible technology for content and audience experiences.", icon: "cloud" },
      { title: "Telecom", description: "Robust networks and operations built to scale.", icon: "network" },
    ],
  },
] as const satisfies readonly ServiceCategory[];
