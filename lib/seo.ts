import type { Metadata } from "next";
import type { DetailContent, SeoContent } from "@/content/types";
import { aboutFaqs } from "@/config/about-seo";
import { partnerFaqs } from "@/config/partner-seo";
import { partnerEcosystem } from "@/config/partner-ecosystem";
import { contactItems, siteConfig, socialItems } from "@/config/site";
import { pages, careers } from "@/content/site-content";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL;

export const siteUrl = configuredSiteUrl
  ? configuredSiteUrl.startsWith("http")
    ? configuredSiteUrl
    : `https://${configuredSiteUrl}`
  : "https://innovgen-website.vercel.app";

const primaryContact = {
  phone: contactItems.find((item) => item.label === "Phone")?.value ?? "",
  email: contactItems.find((item) => item.label === "Email")?.value ?? "",
  office: contactItems.find((item) => item.label === "Office")?.value ?? "",
};

const uaeCoverage = [
  { "@type": "Country", name: "United Arab Emirates" },
  { "@type": "City", name: "Dubai" },
  { "@type": "City", name: "Abu Dhabi" },
];

export function homePageMetadata(): Metadata {
  const canonical = new URL("/", siteUrl).toString();
  const title = "Enterprise IT Infrastructure Company UAE | InnovGen";
  const description =
    "InnovGen delivers managed IT services, cloud solutions, cybersecurity, enterprise networking and data center modernization for organizations across the UAE.";
  const image = new URL("/home_hero_bg.jpg", siteUrl).toString();

  return {
    title: { absolute: title },
    description,
    keywords: [
      "enterprise IT infrastructure company UAE",
      "managed IT services UAE",
      "cloud solutions Dubai",
      "cybersecurity services UAE",
      "enterprise networking Dubai",
      "data center solutions UAE",
      "IT infrastructure company Dubai",
      "digital transformation UAE",
    ],
    authors: [{ name: siteConfig.legalName, url: siteUrl }],
    creator: siteConfig.legalName,
    publisher: siteConfig.legalName,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      type: "website",
      locale: "en_AE",
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: image, width: 1920, height: 1080, alt: "InnovGen enterprise technology infrastructure" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    category: "Enterprise technology",
    other: { "content-language": "en-AE" },
  };
}

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

export function homePageSchema() {
  const organizationId = `${siteUrl}/#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        url: siteUrl,
        logo: new URL("/logo.gif", siteUrl).toString(),
        description:
          "Enterprise IT infrastructure, managed IT, cloud, cybersecurity, networking, data center and digital transformation services for organizations in the UAE.",
        email: primaryContact.email,
        telephone: primaryContact.phone,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: primaryContact.phone,
          contactType: "sales",
          email: primaryContact.email,
          areaServed: "AE",
          availableLanguage: ["en"],
        },
        sameAs: socialItems.map((item) => item.href),
      },
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${siteUrl}/#professional-service`,
        name: siteConfig.legalName,
        url: siteUrl,
        parentOrganization: { "@id": organizationId },
        image: new URL("/home_hero_bg.jpg", siteUrl).toString(),
        telephone: primaryContact.phone,
        email: primaryContact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "R364-AL Wasl Building, Al Karama",
          addressLocality: "Dubai",
          postalCode: "87566",
          addressCountry: "AE",
        },
        areaServed: uaeCoverage,
        serviceType: [
          "Enterprise IT infrastructure",
          "Managed IT services",
          "Cloud solutions",
          "Cybersecurity services",
          "Enterprise networking",
          "Data center modernization",
          "Digital transformation",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteConfig.name,
        url: siteUrl,
        inLanguage: "en-AE",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
        ],
      },
    ],
  };
}

export function aboutPageMetadata(): Metadata {
  const canonical = new URL("/about", siteUrl).toString();
  const title = "About InnovGen | Enterprise IT Company UAE";
  const description =
    "Learn about InnovGen Technology Solutions LLC, an enterprise IT company in the UAE delivering managed IT, cloud, cybersecurity, networking, data center and digital transformation services.";
  const image = new URL("/home_hero_bg.jpg", siteUrl).toString();

  return {
    title: { absolute: title },
    description,
    keywords: [
      "About InnovGen",
      "InnovGen Technology Solutions",
      "IT infrastructure company UAE",
      "enterprise IT company Dubai",
      "managed IT services UAE",
      "cloud solutions UAE",
      "cybersecurity company UAE",
      "AI infrastructure UAE",
      "digital transformation company UAE",
    ],
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_AE",
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: image, width: 1920, height: 1080, alt: "About InnovGen Technology Solutions LLC" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function aboutPageSchema() {
  const organizationId = `${siteUrl}/#organization`;
  const aboutUrl = new URL("/about", siteUrl).toString();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        url: siteUrl,
        logo: new URL("/logo.gif", siteUrl).toString(),
        email: primaryContact.email,
        telephone: primaryContact.phone,
        sameAs: socialItems.map((item) => item.href),
      },
      {
        "@type": "AboutPage",
        "@id": `${aboutUrl}#webpage`,
        url: aboutUrl,
        name: "About InnovGen",
        description:
          "About InnovGen Technology Solutions LLC, an enterprise IT company serving the UAE, Middle East, and GCC.",
        about: { "@id": organizationId },
        isPartOf: { "@id": `${siteUrl}/#website` },
        inLanguage: "en-AE",
      },
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${siteUrl}/#professional-service`,
        name: siteConfig.legalName,
        url: siteUrl,
        parentOrganization: { "@id": organizationId },
        telephone: primaryContact.phone,
        email: primaryContact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "R364-AL Wasl Building, Al Karama",
          addressLocality: "Dubai",
          postalCode: "87566",
          addressCountry: "AE",
        },
        areaServed: uaeCoverage,
        serviceType: [
          "Enterprise IT infrastructure",
          "Managed IT services",
          "Cloud computing",
          "Cybersecurity",
          "AI infrastructure",
          "Networking",
          "Data center solutions",
          "Digital transformation",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteConfig.name,
        url: siteUrl,
        publisher: { "@id": organizationId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${aboutUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "About", item: aboutUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${aboutUrl}#faq`,
        mainEntity: aboutFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export function partnersPageMetadata(): Metadata {
  const canonical = new URL("/partners", siteUrl).toString();
  const title = "Technology Partners UAE | Enterprise IT Ecosystem | InnovGen";
  const description =
    "Explore InnovGen's technology partner ecosystem for enterprise IT infrastructure, cloud, networking, cybersecurity, data protection, collaboration and business applications in the UAE.";
  const image = new URL("/home_hero_bg.jpg", siteUrl).toString();

  return {
    title: { absolute: title },
    description,
    keywords: [
      "technology partners UAE",
      "enterprise IT partners Dubai",
      "cloud technology partners UAE",
      "cybersecurity technology partners UAE",
      "networking partners Dubai",
      "enterprise infrastructure ecosystem UAE",
      "multi-vendor IT solutions UAE",
    ],
    alternates: { canonical },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    openGraph: {
      type: "website",
      locale: "en_AE",
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: image, width: 1920, height: 1080, alt: "InnovGen technology partner ecosystem" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    category: "Enterprise technology partnerships",
  };
}

export function partnersPageSchema() {
  const organizationId = `${siteUrl}/#organization`;
  const partnersUrl = new URL("/partners", siteUrl).toString();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        url: siteUrl,
        logo: new URL("/logo.gif", siteUrl).toString(),
        email: primaryContact.email,
        telephone: primaryContact.phone,
        sameAs: socialItems.map((item) => item.href),
      },
      {
        "@type": ["CollectionPage", "WebPage"],
        "@id": `${partnersUrl}#webpage`,
        url: partnersUrl,
        name: "Technology Partners UAE | InnovGen",
        description:
          "InnovGen's enterprise technology ecosystem for cloud, infrastructure, networking, cybersecurity, data protection, collaboration and business applications in the UAE.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": organizationId },
        inLanguage: "en-AE",
      },
      {
        "@type": "ItemList",
        "@id": `${partnersUrl}#partner-list`,
        name: "InnovGen technology partners",
        numberOfItems: partnerEcosystem.length,
        itemListElement: partnerEcosystem.map((partner, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Organization",
            name: partner.name,
            logo: new URL(partner.logoPath, siteUrl).toString(),
          },
        })),
      },
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${partnersUrl}#professional-service`,
        name: siteConfig.legalName,
        url: partnersUrl,
        parentOrganization: { "@id": organizationId },
        telephone: primaryContact.phone,
        email: primaryContact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "R364-AL Wasl Building, Al Karama",
          addressLocality: "Dubai",
          postalCode: "87566",
          addressCountry: "AE",
        },
        areaServed: uaeCoverage,
        serviceType: [
          "Enterprise IT infrastructure",
          "Cloud solutions",
          "Cybersecurity services",
          "Enterprise networking",
          "Data protection",
          "Business applications",
          "Managed IT services",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteConfig.name,
        url: siteUrl,
        publisher: { "@id": organizationId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${partnersUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Partners", item: partnersUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${partnersUrl}#faq`,
        mainEntity: partnerFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      ...partnerEcosystem.map((partner) => ({
        "@type": "ImageObject",
        "@id": `${partnersUrl}#${partner.id}-logo`,
        name: `${partner.name} logo`,
        contentUrl: new URL(partner.logoPath, siteUrl).toString(),
        description: `${partner.name} technology partner logo displayed on InnovGen's technology partners page.`,
      })),
    ],
  };
}

export function servicesPageSchema() {
  const organizationId = `${siteUrl}/#organization`;
  const servicesUrl = new URL("/services", siteUrl).toString();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        url: siteUrl,
        logo: new URL("/logo.gif", siteUrl).toString(),
        description:
          "Enterprise technology partner delivering secure, scalable digital systems.",
        email: primaryContact.email,
        telephone: primaryContact.phone,
        sameAs: socialItems.map((item) => item.href),
      },
      {
        "@type": "WebPage",
        "@id": `${servicesUrl}#webpage`,
        url: servicesUrl,
        name: "Enterprise IT Services UAE",
        description:
          "Enterprise IT infrastructure, managed IT services, cloud computing, cybersecurity and AI infrastructure for UAE organizations in Dubai, Abu Dhabi and the GCC.",
        inLanguage: "en-AE",
      },
      {
        "@type": "Service",
        "@id": `${servicesUrl}#service`,
        name: "Enterprise IT Services",
        description:
          "Enterprise IT infrastructure, managed IT services, cloud computing, cybersecurity and AI infrastructure for UAE organizations.",
        provider: { "@id": organizationId },
        areaServed: uaeCoverage,
        serviceType: [
          "Enterprise IT infrastructure",
          "Managed IT services",
          "Cloud computing",
          "Cybersecurity",
          "Networking",
          "AI infrastructure",
          "Digital transformation",
          "IT consulting",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${servicesUrl}#professional-service`,
        name: siteConfig.legalName,
        provider: { "@id": organizationId },
        areaServed: uaeCoverage,
        serviceType: [
          "IT consulting",
          "Managed IT services",
          "Digital transformation",
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${servicesUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Services", item: servicesUrl },
        ],
      },
    ],
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

export function careersPageSchema() {
  const careersUrl = new URL("/careers", siteUrl).toString();
  const organizationId = `${siteUrl}/#organization`;

  const faqItems = [
    {
      question: "How do I apply for a job at InnovGen?",
      answer:
        "Apply through the form on this page or submit your CV for consideration. We review all applications and contact shortlisted candidates.",
    },
    {
      question: "What technologies does InnovGen work with?",
      answer:
        "InnovGen works across cloud platforms (Azure, AWS), networking (Cisco, VMware), cybersecurity and enterprise infrastructure to deliver secure, scalable systems.",
    },
    { question: "Does InnovGen offer hybrid work?", answer: "Work models vary by role; some positions offer hybrid or flexible arrangements depending on client and project needs." },
    { question: "What certifications are preferred?", answer: "Relevant certifications such as Azure, AWS, Cisco, VMware and security qualifications are valued but experience and problem solving are most important." },
    { question: "What is the recruitment process?", answer: "A transparent process including an introductory conversation, technical discussion and team interview, followed by an offer stage." },
    { question: "Does InnovGen hire fresh graduates?", answer: "We consider early-career candidates for roles that match their skills and potential; internships and graduate paths are evaluated as openings arise." },
    { question: "Where are InnovGen offices located?", answer: "InnovGen operates in the UAE with offices in Dubai and serving clients across Abu Dhabi and the region." },
    { question: "What employee benefits does InnovGen provide?", answer: "Benefits include professional development support, flexible working arrangements and wellbeing programs; specific benefits are listed per role." },
  ];

  const jobPostings = careers.map((job) => {
    const datePosted = new Date().toISOString().split("T")[0];
    const validThrough = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    return {
      "@type": "JobPosting",
      title: job.title,
      description: job.description || job.intro || "",
      datePosted,
      validThrough,
      employmentType: job.type ?? "FULL_TIME",
      hiringOrganization: { "@type": "Organization", name: siteConfig.legalName, sameAs: siteUrl },
      jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "AE", addressLocality: job.location ?? "UAE" } },
      identifier: { "@type": "PropertyValue", name: "InnovGen", value: job.slug },
      url: new URL(job.href ?? `/careers/${job.slug}`, siteUrl).toString(),
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        url: siteUrl,
        logo: new URL("/logo.gif", siteUrl).toString(),
        email: contactItems.find((i) => i.label === "Email")?.value ?? "",
        telephone: contactItems.find((i) => i.label === "Phone")?.value ?? "",
        sameAs: socialItems.map((item) => item.href),
      },
      {
        "@type": "WebPage",
        "@id": `${careersUrl}#webpage`,
        url: careersUrl,
        name: "Careers | InnovGen",
        description: pages.careers.description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": organizationId },
        inLanguage: "en-AE",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${careersUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Careers", item: careersUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${careersUrl}#faq`,
        mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
      },
      ...jobPostings,
    ],
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
