export type ClientIconKey =
  | "server"
  | "cloud"
  | "shield"
  | "network"
  | "government"
  | "healthcare"
  | "education"
  | "hospitality"
  | "retail"
  | "manufacturing";

export type ClientCapability = {
  title: string;
  description: string;
  icon: ClientIconKey;
};

export type UaeSupportPoint = {
  title: string;
  description: string;
  icon: ClientIconKey;
};

export type IndustryHighlight = {
  title: string;
  description: string;
  icon: ClientIconKey;
};

export type ClientFaqItem = {
  question: string;
  answer: string;
};

export const clientCapabilities = [
  {
    title: "Enterprise infrastructure trust",
    description:
      "Government authorities, hospitals, universities and hospitality brands rely on InnovGen for resilient servers, storage, networking and secure operations.",
    icon: "server",
  },
  {
    title: "Technology modernization partners",
    description:
      "Our clients engage InnovGen for managed IT services, cloud migration, cybersecurity and digital transformation across critical business functions.",
    icon: "cloud",
  },
  {
    title: "Sector-aware delivery",
    description:
      "InnovGen combines enterprise-grade infrastructure with industry-specific experience for education, retail, manufacturing, real estate and public sector organizations.",
    icon: "shield",
  },
] as const satisfies readonly ClientCapability[];

export const uaeSupportPoints = [
  {
    title: "Secure network foundations",
    description:
      "Delivering secure network infrastructure, cloud and cybersecurity for government and free zone clients.",
    icon: "network",
  },
  {
    title: "Resilient institutions",
    description:
      "Supporting healthcare and education institutions with resilient IT, backup and managed services.",
    icon: "healthcare",
  },
  {
    title: "Connected properties",
    description:
      "Enabling hospitality and retail brands with property-wide networking, GRMS and enterprise operations.",
    icon: "hospitality",
  },
  {
    title: "Modernized operations",
    description:
      "Providing manufacturing, real estate and technology organizations with infrastructure modernization and digital transformation support.",
    icon: "manufacturing",
  },
] as const satisfies readonly UaeSupportPoint[];

export const industryHighlights = [
  {
    title: "Government & Public Sector",
    description:
      "Secure public sector IT, free zone infrastructure and digital services for government entities, media organizations and regulatory authorities.",
    icon: "government",
  },
  {
    title: "Healthcare",
    description:
      "Resilient clinical systems, enterprise storage, backup and cybersecurity for hospitals and emergency response providers.",
    icon: "healthcare",
  },
  {
    title: "Education",
    description:
      "Modern campus networks, collaboration systems and managed IT services for universities and schools across the UAE.",
    icon: "education",
  },
  {
    title: "Hospitality",
    description:
      "Guest experience infrastructure, GRMS support, property networking and managed services for hotel and resort groups.",
    icon: "hospitality",
  },
  {
    title: "Retail & Consumer",
    description:
      "Secure retail infrastructure, POS connectivity and cloud-ready operations for supermarket, hospitality and consumer brands.",
    icon: "retail",
  },
  {
    title: "Manufacturing & Industrial",
    description:
      "Production-ready IT, secure networking and digital operations for manufacturing, logistics and industrial enterprises.",
    icon: "manufacturing",
  },
] as const satisfies readonly IndustryHighlight[];

export const clientFaqItems = [
  {
    question: "Which organizations trust InnovGen?",
    answer:
      "InnovGen is trusted by government entities, healthcare providers, universities, hospitality groups, retailers, manufacturers and technology organizations across the UAE.",
  },
  {
    question: "What industries does InnovGen support?",
    answer:
      "InnovGen serves government, public sector, healthcare, education, hospitality, retail, manufacturing, real estate and technology organizations with enterprise IT infrastructure and managed services.",
  },
  {
    question: "Does InnovGen work with government organizations?",
    answer:
      "Yes. InnovGen delivers secure IT infrastructure and managed services for UAE government and public sector organizations.",
  },
  {
    question: "Does InnovGen support hospitals?",
    answer:
      "Yes. InnovGen supports healthcare clients with resilient infrastructure, cybersecurity, backup and enterprise application delivery.",
  },
  {
    question: "Does InnovGen provide enterprise infrastructure?",
    answer:
      "InnovGen provides enterprise infrastructure services across servers, storage, networking, cloud and secure operations for UAE organizations.",
  },
] as const satisfies readonly ClientFaqItem[];
