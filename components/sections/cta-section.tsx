import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";

export function CtaSection({
  title,
  description,
  label,
  href,
}: {
  title: string;
  description: string;
  label: string;
  href: string;
}) {
  return (
    <Section>
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-blue-300/20 bg-[linear-gradient(135deg,var(--color-navy-800),var(--color-navy-900))] p-8 shadow-[0_30px_100px_rgb(23_105_224_/_12%)] md:p-12 lg:flex lg:items-end lg:justify-between lg:gap-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                Next step
              </p>
              <h2 className="mt-4 max-w-2xl text-[length:var(--text-h2)]">
                {title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-muted">{description}</p>
            </div>
            <Button href={href} size="lg" className="mt-8 shrink-0 lg:mt-0">
              {label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
