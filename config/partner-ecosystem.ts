export type PartnerIconKey =
  | "microsoft"
  | "cloud"
  | "network"
  | "data"
  | "security"
  | "workplace";

export type PartnerEcosystemItem = {
  name: string;
  shortName: string;
  icon: PartnerIconKey;
  focus: string;
  description: string;
  areas: readonly string[];
};

export const partnerEcosystem: readonly PartnerEcosystemItem[] = [
  {
    name: "Microsoft",
    shortName: "Microsoft",
    icon: "microsoft",
    focus: "Cloud, data and modern workplace technology",
    description:
      "Practical Microsoft platform guidance and implementation support for organizations modernizing the way they operate.",
    areas: ["Microsoft Azure", "Modern Workplace", "Data & AI", "Security"],
  },
  {
    name: "Cloud platforms",
    shortName: "Cloud",
    icon: "cloud",
    focus: "Scalable cloud foundations",
    description:
      "Cloud strategy, migration planning and governance aligned to your operating model.",
    areas: ["Cloud strategy", "Migration planning", "Governance", "Optimization"],
  },
  {
    name: "Network systems",
    shortName: "Network",
    icon: "network",
    focus: "Reliable connected operations",
    description:
      "Resilient network design and operational visibility for distributed organizations.",
    areas: ["Network design", "Observability", "Secure access", "Operations"],
  },
  {
    name: "Data & AI",
    shortName: "Data & AI",
    icon: "data",
    focus: "Intelligence that supports decisions",
    description:
      "Data foundations and AI-ready workflows that turn information into meaningful action.",
    areas: ["Data platforms", "Analytics", "Automation", "AI readiness"],
  },
  {
    name: "Security ecosystem",
    shortName: "Security",
    icon: "security",
    focus: "Secure-by-design technology",
    description:
      "Layered security capabilities designed around governance, resilience and trust.",
    areas: ["Security posture", "Identity", "Compliance", "Resilience"],
  },
  {
    name: "Workplace technology",
    shortName: "Workplace",
    icon: "workplace",
    focus: "Better digital employee experiences",
    description:
      "End-user technology that helps people stay productive, protected and connected.",
    areas: ["End-user computing", "Collaboration", "Device management", "Support"],
  },
] as const;
