import { ConsultationForm } from "@/components/forms/consultation-form";
import { ContentGridSection } from "@/components/sections/content-grid-section";
import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/seo";
import { Mail, MapPin, Phone } from "lucide-react";

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
   
      <Section tone="surface">
        <Container>
          <div id="consultation-form" className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <Reveal preset="up" once={false} amount={0.3}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Your context</p>
              <h2 className="mt-4 text-[length:var(--text-h2)]">A few details help us prepare</h2>
              <p className="mt-5 text-muted">
                Fields are designed to establish need, scope and timing without
                asking for unnecessary information.
              </p>
            </Reveal>
            <Reveal preset="spatial" once={false} amount={0.24} className="[perspective:1200px]">
              <Card className="[transform-style:preserve-3d]"><ConsultationForm /></Card>
            </Reveal>
          </div>
        </Container>
      </Section>
    
      <ContentGridSection
        eyebrow="Contact alternatives"
        title="Direct contact details "
        tone="surface"
        cardRevealPreset="spatial"
        cardRevealOnce={false}
        items={[
          { title: "Email", description: "nayef@innovgen.com", icon: Mail },
          { title: "Phone", description: "+971 56 333 7727", icon: Phone },
          { title: "Office", description: "R364-AL Wasl Building, Al Karama, Dubai, PO Box 87566.", icon: MapPin },
        ]}
      />
        <ContentGridSection
        eyebrow="What happens next"
        title="A clear, low-risk first step"
        items={[
          { title: "1. Review", description: "We review the outcome, context and constraints you share." },
          { title: "2. Clarify", description: "A short conversation helps identify assumptions and priority questions." },
          { title: "3. Recommend", description: "You receive a practical suggested next step, without obligation." },
        ]}
      />
    </>
  );
}
