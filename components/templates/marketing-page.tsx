import type { PageContent } from "@/content/types";
import { CtaSection } from "@/components/sections/cta-section";
import { ContentGridSection } from "@/components/sections/content-grid-section";
import { PageHero } from "@/components/sections/page-hero";
import { HomePageSections } from "@/components/sections/home/home-page-sections";
import type { ThreeSceneId } from "@/types/three";

export function MarketingPage({
  heroSceneId,
  page,
}: {
  heroSceneId?: ThreeSceneId;
  page: PageContent;
}) {
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        sceneId={heroSceneId}
        primaryAction={
          heroSceneId === "home-hero"
            ? { label: "Start your transformation", href: "/consultation" }
            : undefined
        }
        secondaryAction={{
          label: heroSceneId === "home-hero" ? "Explore our work" : "View clients",
          href: "/projects",
        }}
      />
      {heroSceneId === "home-hero" ? (
        <HomePageSections />
      ) : (
        <>
          {page.sections.map((section, index) => (
            <ContentGridSection
              key={section.title}
              {...section}
              tone={index % 2 === 0 ? "surface" : "default"}
            />
          ))}
          <CtaSection {...page.cta} />
        </>
      )}
    </>
  );
}
