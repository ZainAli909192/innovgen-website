export type EnterpriseCapabilityIcon = "people" | "process" | "technology";

export type EnterpriseCapability = {
  title: string;
  description: string;
  icon: EnterpriseCapabilityIcon;
};

export const enterpriseCapabilities = [
  {
    title: "People",
    description:
      "Our people are our most valuable asset. We nurture a culture of collaboration, creativity, and continuous learning to empower individuals in a dynamic, client-centric environment with strong leadership and development.",
    icon: "people",
  },
  {
    title: "Process",
    description:
      "Efficient processes form the backbone of our operations, ensuring consistency, scalability, and quality through streamlined workflows, agility, adaptability, and continuous improvement.",
    icon: "process",
  },
  {
    title: "Technology",
    description:
      "Technology is at the core of InnovGen's mission to deliver cutting-edge solutions. We integrate advanced platforms to enable businesses to harness the full potential of the digital age with innovative, scalable, and secure systems.",
    icon: "technology",
  },
] satisfies readonly EnterpriseCapability[];
