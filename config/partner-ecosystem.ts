export type PartnerEcosystemItem = {
  id: string;
  name: string;
  shortName: string;
  logoPath: string;
  logoTheme?: "light" | "dark";
  focus: string;
  description: string;
  areas: readonly string[];
};

export const partnerEcosystem: readonly PartnerEcosystemItem[] = [
  {
    id: "link Plus",
    name: "Link Plus",
    shortName: "Link Plus",
    logoPath: "/partners/linkplus.svg",
    focus: "Digital transformation and enterprise technology enablement",
    description:
      "Connected technology solutions and delivery support that help organizations modernize operations with confidence.",
    areas: ["Digital services", "Enterprise connectivity", "Transformation", "Innovation"],
  },
  {
    id: "microsoft",
    name: "Microsoft",
    shortName: "Microsoft",
    logoPath: "/microsoft.png",
    focus: "Cloud, data and modern workplace technology",
    description:
      "Practical Microsoft platform guidance and implementation support for organizations modernizing the way they operate.",
    areas: ["Microsoft Azure", "Modern Workplace", "Data & AI", "Security"],
  },
  {
    id: "cisco",
    name: "Cisco",
    shortName: "Cisco",
    logoPath: "/partners/cisco.svg",
    focus: "Secure, connected operations",
    description:
      "Network and collaboration capabilities that keep distributed teams, locations, and services reliably connected.",
    areas: ["Network design", "Secure access", "Collaboration", "Observability"],
  },
  {
    id: "dell",
    name: "Dell Technologies",
    shortName: "Dell",
    logoPath: "/partners/dell.svg",
    focus: "Business-critical infrastructure",
    description:
      "Infrastructure solutions that support dependable performance, continuity, and scalable operations.",
    areas: ["Compute", "Storage", "Datacentre", "Continuity"],
  },
  {
    id: "vmware",
    name: "VMware",
    shortName: "VMware",
    logoPath: "/partners/vmware.svg",
    focus: "Flexible hybrid cloud foundations",
    description:
      "Virtualization and cloud-management expertise for more resilient, adaptable technology estates.",
    areas: ["Virtualization", "Hybrid cloud", "Automation", "Resilience"],
  },
  {
    id: "fortinet",
    name: "Fortinet",
    shortName: "Fortinet",
    logoPath: "/partners/Fortinet.png",
    focus: "Integrated cyber security",
    description:
      "Security capabilities designed to protect networks, users, applications, and cloud environments together.",
    areas: ["Network security", "Secure access", "Cloud security", "Threat response"],
  },
  {
    id: "crowdstrike",
    name: "CrowdStrike",
    shortName: "CrowdStrike",
    logoPath: "/partners/crowd strike.png",
    focus: "Endpoint protection and threat intelligence",
    description:
      "Modern endpoint and workload protection that helps organizations detect, investigate, and respond with confidence.",
    areas: ["Endpoint security", "Threat intelligence", "Incident response", "Cloud protection"],
  },
  {
    id: "trend-micro",
    name: "Trend Micro",
    shortName: "Trend Micro",
    logoPath: "/partners/trend.png",
    focus: "Resilient cloud and enterprise security",
    description:
      "Layered security expertise for protecting enterprise systems and critical cloud workloads.",
    areas: ["Cloud security", "Workload protection", "Risk visibility", "Compliance"],
  },
  {
    id: "veeam",
    name: "Veeam",
    shortName: "Veeam",
    logoPath: "/partners/veeam.png",
    logoTheme: "dark",
    focus: "Data protection and recovery",
    description:
      "Backup and recovery solutions that help organizations keep business-critical information available.",
    areas: ["Backup", "Disaster recovery", "Data resilience", "Monitoring"],
  },
  {
    id: "zoho",
    name: "Zoho",
    shortName: "Zoho",
    logoPath: "/partners/zoho.png",
    focus: "Connected business applications",
    description:
      "Business applications that help teams coordinate work, improve service delivery, and automate everyday operations.",
    areas: ["Business systems", "Automation", "Customer operations", "Collaboration"],
  },
  {
    id: "odoo",
    name: "Odoo",
    shortName: "Odoo",
    logoPath: "/partners/odoo.png",
    focus: "Adaptable business operations",
    description:
      "Integrated business applications that bring finance, operations, sales, and inventory into one adaptable platform.",
    areas: ["ERP", "Operations", "Sales", "Integration"],
  },
  {
    id: "samsung",
    name: "Samsung",
    shortName: "Samsung",
    logoPath: "/partners/samsung.png",
    focus: "Enterprise mobility and display solutions",
    description:
      "Connected device and display experiences that support modern, productive workplaces.",
    areas: ["Mobility", "Displays", "Device management", "Workplace"],
  },
  {
    id: "logitech",
    name: "Logitech",
    shortName: "Logitech",
    logoPath: "/partners/logitech.png",
    focus: "Better collaboration experiences",
    description:
      "Collaboration technology that helps teams communicate and work together more naturally from anywhere.",
    areas: ["Video collaboration", "Meeting rooms", "Hybrid work", "Productivity"],
  },
  {
    id: "apple",
    name: "Apple",
    shortName: "Apple",
    logoPath: "/partners/iphone.png",
    focus: "Secure, intuitive employee technology",
    description:
      "Premium employee devices and endpoint experiences that support secure, productive work.",
    areas: ["End-user computing", "Mobility", "Endpoint management", "Employee experience"],
  },
] as const;
