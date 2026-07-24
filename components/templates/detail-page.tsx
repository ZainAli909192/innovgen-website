import type { DetailContent } from "@/content/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";

export function DetailPage({
  item,
  parent,
  parentHref,
  actionLabel,
}: {
  item: DetailContent;
  parent: string;
  parentHref: string;
  actionLabel: string;
}) {
  return (
    <>
      <PageHero
        eyebrow={item.meta ?? parent}
        title={item.title}
        description={item.intro}
        approvalRequired={item.status === "placeholder"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: parent, href: parentHref },
          { label: item.title },
        ]}
        primaryAction={{ label: actionLabel, href: "/consultation" }}
        secondaryAction={{ label: `All ${parent.toLowerCase()}`, href: parentHref }}
      />
      {item.author || item.location || item.type ? (
        <Section spacing="compact" tone="surface">
          <Container>
            <dl className="grid gap-5 sm:grid-cols-3">
              {item.author ? (
                <div><dt className="text-sm text-muted">Author</dt><dd className="mt-1 font-semibold">{item.author}</dd></div>
              ) : null}
              {item.published ? (
                <div><dt className="text-sm text-muted">Published</dt><dd className="mt-1 font-semibold"><time dateTime={item.published}>{item.published}</time></dd></div>
              ) : null}
              {item.location ? (
                <div><dt className="text-sm text-muted">Location</dt><dd className="mt-1 font-semibold">{item.location}</dd></div>
              ) : null}
              {item.type ? (
                <div><dt className="text-sm text-muted">Type</dt><dd className="mt-1 font-semibold">{item.type}</dd></div>
              ) : null}
            </dl>
          </Container>
        </Section>
      ) : null}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_18rem]">
            <article className="space-y-12">
              {item.sections.map((section) => (
                <Reveal key={section.title}>
                  <section aria-labelledby={`section-${section.title.toLowerCase().replaceAll(" ", "-")}`}>
                    <h2
                      id={`section-${section.title.toLowerCase().replaceAll(" ", "-")}`}
                      className="text-[length:var(--text-h2)]"
                    >
                      {section.title}
                    </h2>
                    <div className="mt-6 space-y-4">
                      {section.content.map((paragraph) => (
                        <p key={paragraph} className="max-w-[70ch] text-lg text-muted">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                </Reveal>
              ))}
            </article>
            <aside aria-label="Related topics">
              <Card className="sticky top-28">
                <h2 className="text-lg">Related topics</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
                </div>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>
      <CtaSection
        title="Discuss a similar outcome"
        description="Share the context, constraints and result you need. We will help define a practical next step."
        label={actionLabel}
        href="/consultation"
      />
    </>
  );
}
