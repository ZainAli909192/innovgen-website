import type { PageContent } from "@/content/types";
import { CtaSection } from "@/components/sections/cta-section";
import { ContentGridSection } from "@/components/sections/content-grid-section";
import { PageHero } from "@/components/sections/page-hero";

export function MarketingPage({ page }: { page: PageContent }) {
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        secondaryAction={{ label: "View projects", href: "/projects" }}
      />
      {page.sections.map((section, index) => (
        <ContentGridSection
          key={section.title}
          {...section}
          tone={index % 2 === 0 ? "surface" : "default"}
        />
      ))}
      <CtaSection {...page.cta} />
    </>
  );
}
