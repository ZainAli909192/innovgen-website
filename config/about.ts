import {
  Blocks,
  Gauge,
  Handshake,
  SearchCheck,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type AboutProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type AboutProof = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const founderContent = {
  eyebrow: "Meet the founder",
  name: "A.S. Pillai",
  role: "Founder & Chief Executive Officer",
  introduction:
    "Leading InnovGen with a clear belief: technology should simplify decisions, strengthen operations, and create progress that lasts.",
  image: "/heads/AS_Pillai_Founder_CEO.png",
  imageAlt: "A.S. Pillai, InnovGen Founder and Chief Executive Officer.",
} as const;

export const companyStory = {
  eyebrow: "Who we are",
  title: "We make complex technology feel clear, useful, and ready to grow.",
  paragraphs: [
    "InnovGen Technology Solutions LLC is a UAE-based IT company specializing in disruptive AI-powered solutions. We help B2B businesses automate processes, enhance decision-making, and drive growth with AI-ready IT infrastructure.",
    "Partnering with leading technology providers, we deliver cloud and on-premise platforms tailored to the UAE and GCC markets. Our scalable, seamless, and personalized solutions empower businesses to excel in the digital age.",
  ],
} as const;

export const workingPrinciple = {
  eyebrow: "Our delivery principle",
  title: "We keep everything simple.",
  description:
    "Clear priorities, visible decisions, and focused delivery keep every engagement moving toward a measurable outcome.",
} as const;

export const processSteps = [
  {
    number: "01",
    title: "Analyze the business",
    description:
      "Understand the challenge, users, constraints, risks, and the outcome that matters.",
    icon: SearchCheck,
  },
  {
    number: "02",
    title: "Build clean and scalable",
    description:
      "Design and engineer a secure foundation that remains maintainable as needs evolve.",
    icon: Blocks,
  },
  {
    number: "03",
    title: "Launch with confidence",
    description:
      "Release responsibly, transfer knowledge, and create a practical path for improvement.",
    icon: Gauge,
  },
] as const satisfies readonly AboutProcessStep[];

export const aboutProofs = [
  {
    title: "Experienced team",
    description:
      "Cross-functional specialists connect business context with disciplined technical delivery.",
    icon: Blocks,
  },
  {
    title: "Fast, accountable delivery",
    description:
      "Short feedback loops and visible ownership keep progress focused without compromising quality.",
    icon: Gauge,
  },
  {
    title: "Enterprise-level security",
    description:
      "Governance, resilience, and risk are considered from the first architecture decision.",
    icon: ShieldCheck,
  },
  {
    title: "Long-term technology partner",
    description:
      "Delivery includes knowledge transfer, support, and a clear route for future evolution.",
    icon: Handshake,
  },
] as const satisfies readonly AboutProof[];
