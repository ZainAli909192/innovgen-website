import type { Metadata } from "next";
import { ArrowRight, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { IconButton } from "@/components/ui/icon-button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Design System",
  description: "InnovGen frontend foundation component reference.",
  robots: { index: false, follow: false },
};

const swatches = [
  ["Navy 950", "bg-[var(--color-navy-950)]"],
  ["Navy 900", "bg-[var(--color-navy-900)]"],
  ["Navy 800", "bg-[var(--color-navy-800)]"],
  ["Blue 500", "bg-[var(--color-blue-500)]"],
  ["Gold 300", "bg-[var(--color-gold-300)]"],
] as const;

export default function DesignSystemPage() {
  return (
    <>
      <Section spacing="spacious">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Frontend foundation"
            title="InnovGen design system"
            description="A development reference for the shared tokens, typography, layout primitives, controls, cards, and status labels."
          />
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="Foundations"
            title="Brand color"
            description="Dark navy surfaces, electric blue interactions, and controlled gold accents."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {swatches.map(([name, color]) => (
              <div key={name}>
                <div className={`h-24 rounded-lg border border-border ${color}`} />
                <p className="mt-2 text-sm text-muted">{name}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Typography" title="A clear enterprise hierarchy" />
          <div className="mt-10 grid gap-8">
            <p className="font-display text-[length:var(--text-h1)] leading-none">
              Display heading
            </p>
            <p className="font-display text-[length:var(--text-h2)] leading-tight">
              Section heading
            </p>
            <p className="max-w-[65ch] text-lg text-muted">
              Geist keeps longer interface and body content calm and readable,
              while Outfit gives key headlines a distinctive, modern voice.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow="Actions" title="Buttons and icon controls" />
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button>
              Primary action <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
            <Button variant="secondary">Secondary action</Button>
            <Button variant="ghost">Ghost action</Button>
            <Button loading loadingLabel="Processing">
              Submit
            </Button>
            <Button disabled>Disabled</Button>
            <IconButton label="View notifications">
              <Bell aria-hidden="true" className="size-5" />
            </IconButton>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Content" title="Cards and badges" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {(["blue", "gold", "neutral"] as const).map((variant, index) => (
              <Card key={variant} interactive>
                <Badge variant={variant}>
                  {index === 0 ? "Service" : index === 1 ? "Featured" : "Update"}
                </Badge>
                <h3 className="mt-5 text-[length:var(--text-h3)]">
                  Reusable content card
                </h3>
                <p className="mt-3 text-muted">
                  Composable content with token-based surface, border, spacing,
                  and interaction treatment.
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container size="wide">
          <SectionHeading
            align="center"
            eyebrow="Layout"
            title="Responsive containers and sections"
            description="This full-width section demonstrates the wide container. Standard content remains constrained to a readable measure at every breakpoint."
          />
        </Container>
      </Section>
    </>
  );
}
