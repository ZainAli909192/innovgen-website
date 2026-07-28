import { ConsultationForm } from "@/components/forms/consultation-form";
import { ContentGridSection } from "@/components/sections/content-grid-section";
import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
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
              <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-blue-300/25 bg-[var(--color-navy-950)] shadow-[0_22px_54px_rgb(0_0_0_/_22%)]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  src="/contact_video.mp4"
                  className="h-full w-full object-cover opacity-85"
                />
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgb(5_11_24_/_38%),transparent_64%)]" />
              </div>
            </Reveal>
            <Reveal preset="spatial" once={false} amount={0.24} className="[perspective:1200px]">
              <Card className="[transform-style:preserve-3d]"><ConsultationForm /></Card>
            </Reveal>
          </div>
        </Container>
      </Section>
    
      <Section tone="surface">
        <Container>
          <Reveal preset="up" once={false} amount={0.25}>
            <SectionHeading eyebrow="Contact alternatives" title="Direct contact details" />
          </Reveal>
          <div className="mt-10 divide-y divide-blue-300/20 border-y border-blue-300/20 md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
            {[
              { title: "Email", value: "nayef@innovgen.com", href: "mailto:nayef@innovgen.com", icon: Mail },
              { title: "Phone", value: "+971 56 333 7727", href: "tel:+971563337727", icon: Phone },
              { title: "Office", value: "R364-AL Wasl Building, Al Karama, Dubai, PO Box 87566.", icon: MapPin },
            ].map((contact, index) => {
              const Icon = contact.icon;

              return (
                <Reveal
                  key={contact.title}
                  preset="spatial"
                  once={false}
                  amount={0.25}
                  delay={index * 0.06}
                  className="transform-gpu will-change-transform"
                >
                  <div className="grid grid-cols-[3rem_1fr] gap-4 py-6 first:pt-0 last:pb-0 md:px-7 md:py-6 md:first:pl-0 md:first:pt-6 md:last:pr-0">
                    <span className="grid size-11 place-items-center rounded-2xl border border-blue-300/30 bg-blue-500/10 text-blue-300 shadow-[0_10px_24px_rgb(30_120_255_/_10%)]">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{contact.title}</h3>
                      {contact.href ? (
                        <a href={contact.href} className="mt-1.5 block break-words text-sm leading-6 text-muted transition-colors hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300">
                          {contact.value}
                        </a>
                      ) : (
                        <p className="mt-1.5 text-sm leading-6 text-muted">{contact.value}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
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
    </>
  );
}
