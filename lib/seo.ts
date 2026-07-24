import type { Metadata } from "next";
import type { DetailContent, SeoContent } from "@/content/types";

export const siteUrl = "https://www.innovgen.example";

export function createMetadata(
  seo: SeoContent,
  path: string,
  options?: { noIndex?: boolean },
): Metadata {
  const canonical = new URL(path, siteUrl).toString();

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical },
    robots: options?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "InnovGen",
      title: seo.title,
      description: seo.description,
    },
    twitter: {
      card: "summary",
      title: seo.title,
      description: seo.description,
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "InnovGen",
    url: siteUrl,
    description:
      "Enterprise technology partner delivering secure, scalable digital systems.",
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteUrl).toString(),
    })),
  };
}

export function detailSchema(
  kind: "Service" | "Product" | "Article" | "JobPosting",
  item: DetailContent,
) {
  const common = {
    "@context": "https://schema.org",
    "@type": kind,
    name: item.title,
    description: item.description,
    url: new URL(item.href ?? "/", siteUrl).toString(),
  };

  if (kind === "Article") {
    return {
      ...common,
      headline: item.title,
      datePublished: item.published,
      dateModified: item.updated,
      author: { "@type": "Organization", name: "InnovGen" },
    };
  }

  if (kind === "JobPosting") {
    return {
      ...common,
      title: item.title,
      datePosted: "2026-07-01",
      employmentType: "OTHER",
      hiringOrganization: {
        "@type": "Organization",
        name: "InnovGen",
        sameAs: siteUrl,
      },
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: {
        "@type": "Country",
        name: "Location pending client approval",
      },
    };
  }

  return common;
}
