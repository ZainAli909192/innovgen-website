import { ConsultationForm } from "@/components/forms/consultation-form";
import { PageHero } from "@/components/sections/page-hero";
import { ContentGridSection } from "@/components/sections/content-grid-section";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  {
    title: "Free Consultation",
    description: "Start a structured conversation with InnovGen.",
  },
  "/consultation",
);

export default function ConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="Consultation"
        title="Start with the outcome—not a sales pitch."
        description="Tell us what you are trying to improve. This static prototype shows the planned low-friction consultation experience."
        approvalRequired
        primaryAction={{ label: "Go to enquiry form", href: "#consultation-form" }}
      />
      <Section tone="surface">
        <Container>
          <div id="consultation-form" className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Your context</p>
              <h2 className="mt-4 text-[length:var(--text-h2)]">A few details help us prepare</h2>
              <p className="mt-5 text-muted">
                Fields are designed to establish need, scope and timing without
                asking for unnecessary information.
              </p>
            </div>
            <Card><ConsultationForm /></Card>
          </div>
        </Container>
      </Section>
      <ContentGridSection
        eyebrow="What happens next"
        title="A clear, low-risk first step"
        items={[
          { title: "1. Review", description: "We review the outcome, context and constraints you share." },
          { title: "2. Clarify", description: "A short conversation helps identify assumptions and priority questions." },
          { title: "3. Recommend", description: "You receive a practical suggested next step, without obligation." },
        ]}
      />
      <ContentGridSection
        eyebrow="Contact alternatives"
        title="Direct contact details pending approval"
        tone="surface"
        items={[
          { title: "Email", description: "Official enquiry email pending client approval.", status: "placeholder" },
          { title: "Phone", description: "Official business number pending client approval.", status: "placeholder" },
          { title: "Office", description: "Office location and visiting details pending client approval.", status: "placeholder" },
        ]}
      />
    </>
  );
}
