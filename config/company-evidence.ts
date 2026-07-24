export type CompanyEvidenceItem = {
  number: string;
  title: string;
  description: string;
};

export const companyEvidence = [
  {
    number: "01",
    title: "Strategy-led delivery",
    description:
      "Technology decisions begin with business priorities and measurable outcomes.",
  },
  {
    number: "02",
    title: "Secure by design",
    description:
      "Risk, governance, and resilience are considered from the first decision.",
  },
  {
    number: "03",
    title: "Scalable architecture",
    description:
      "Modular systems are designed to grow without unnecessary complexity.",
  },
  {
    number: "04",
    title: "Long-term partnership",
    description:
      "Delivery includes knowledge transfer, support, and a practical path forward.",
  },
] as const satisfies readonly CompanyEvidenceItem[];
