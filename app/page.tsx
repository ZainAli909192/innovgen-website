import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function Home() {
  return (
    <Section>
      <Container className="py-16 md:py-24">
        <p className="mb-4 font-semibold uppercase tracking-[0.18em] text-accent">
          InnovGen
        </p>
        <h1 className="max-w-4xl text-[length:var(--text-h1)]">
          Enterprise technology, built for what comes next.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          The shared frontend foundation is ready. Page-specific experiences
          will be built in the next phase.
        </p>
        <Button href="/design-system" variant="secondary" className="mt-8">
          View design system
        </Button>
      </Container>
    </Section>
  );
}
