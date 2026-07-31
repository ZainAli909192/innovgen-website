import { ConsultationForm } from "@/components/forms/consultation-form";
import { ConsultationVisual } from "@/components/sections/consultation/consultation-visual";
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
   
      <Section
        tone="surface"
        spacing="spacious"
        className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_10%_35%,rgb(47_130_245_/_10%),transparent_27rem),radial-gradient(circle_at_92%_0%,rgb(104_40_96_/_18%),transparent_32rem),linear-gradient(180deg,var(--color-navy-950),var(--color-navy-900))]"
      >
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/45 to-transparent" />
        <Container size="wide">
          <div id="consultation-form" className="grid items-stretch gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 xl:grid-cols-[0.96fr_1.04fr]">
            <Reveal preset="up" once={false} amount={0.3} className="min-w-0">
              <div className="hidden md:block lg:block flex h-full flex-col justify-between gap-8">
                <div className="max-w-xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Your context</p>
                  <h2 className="mt-4 max-w-[14ch] text-[length:var(--text-h2)]">A few details help us prepare</h2>
                  <p className="mt-5 max-w-[45ch] text-muted">
                    Fields are designed to establish need, scope and timing without
                    asking for unnecessary information.
                  </p>
                </div>
                <ConsultationVisual className="w-full" />
              </div>
            </Reveal>
            <Reveal preset="spatial" once={false} amount={0.24} className="min-w-0 [perspective:1200px]">
              <Card className="relative h-full overflow-hidden border-blue-200/20 bg-[linear-gradient(145deg,rgb(15_43_78_/_97%),rgb(4_13_29_/_99%))] p-4 shadow-[inset_0_1px_0_rgb(255_255_255_/_12%),0_30px_80px_rgb(0_0_0_/_32%)] [transform-style:preserve-3d] sm:p-7 lg:p-9">
                <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full border border-blue-300/20 bg-blue-500/[0.08]" />
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 size-56 rounded-full border border-violet-300/20 bg-violet-500/[0.06]" />
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/55 to-transparent" />
                <div className="relative"><ConsultationForm /></div>
              </Card>
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
