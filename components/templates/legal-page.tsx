import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export function LegalPage({
  title,
  description,
  sections,
}: {
  title: string;
  description: string;
  sections: { title: string; paragraphs: string[] }[];
}) {
  return (
    <Section spacing="spacious">
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
        <Badge variant="gold">Client and legal approval required</Badge>
        <h1 className="mt-5 text-[length:var(--text-h1)]">{title}</h1>
        <p className="mt-5 max-w-[70ch] text-lg text-muted">{description}</p>
        <div className="mt-12 max-w-3xl space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl">{section.title}</h2>
              <div className="mt-4 space-y-4 text-muted">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </Section>
  );
}
