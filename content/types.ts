import type { LucideIcon } from "lucide-react";

export type ApprovalStatus = "placeholder" | "approved";

export type SeoContent = {
  title: string;
  description: string;
};

export type ContentItem = {
  title: string;
  description: string;
  icon?: LucideIcon;
  href?: string;
  meta?: string;
  status?: ApprovalStatus;
};

export type PageContent = {
  eyebrow: string;
  title: string;
  description: string;
  seo: SeoContent;
  sections: {
    title: string;
    eyebrow?: string;
    description?: string;
    items: ContentItem[];
  }[];
  cta: {
    title: string;
    description: string;
    label: string;
    href: string;
  };
};

export type DetailContent = ContentItem & {
  slug: string;
  seo: SeoContent;
  intro: string;
  sections: {
    title: string;
    content: string[];
  }[];
  tags: string[];
  published?: string;
  updated?: string;
  author?: string;
  location?: string;
  type?: string;
};
