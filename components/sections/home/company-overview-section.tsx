import { ArrowRight } from "lucide-react";
import { CompanyEvidence } from "@/components/home/company-evidence";
import {
  SpatialConnector,
  SpatialItem,
  SpatialSection,
} from "@/components/motion/spatial-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function CompanyOverviewSection() {
  return (
    <SpatialSection
      aria-labelledby="company-overview-heading"
      spacing="spacious"
      className="relative isolate overflow-hidden bg-surface"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-20 lg:block [background-image:linear-gradient(rgb(131_185_255_/_12%)_1px,transparent_1px),linear-gradient(90deg,rgb(131_185_255_/_12%)_1px,transparent_1px)] [background-size:5rem_5rem] [mask-image:linear-gradient(90deg,transparent,black)]"
      />
      <SpatialConnector className="pointer-events-none absolute inset-x-0 bottom-10 h-36 rotate-180 text-blue-300/20" />
      <Container
        size="wide"
        className="relative grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20"
      >
        <SpatialItem className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="company-overview-heading"
            eyebrow="Who we are"
            title="Strategy, design, and engineering working as one."
            description="InnovGen helps organizations plan, design, build, and evolve secure digital platforms. Our teams combine business strategy, product thinking, software engineering, cloud, data, and cybersecurity into one delivery model."
            className="max-w-[38rem]"
          />
          <Button
            href="/about"
            variant="ghost"
            className="group mt-7 -ml-5 text-blue-300 hover:text-foreground"
          >
            Learn more about InnovGen
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1 motion-reduce:transform-none"
            />
          </Button>
        </SpatialItem>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -left-6 top-0 hidden h-full w-px bg-[linear-gradient(transparent,var(--color-blue-500),transparent)] opacity-35 lg:block"
          />
          <CompanyEvidence />
        </div>
      </Container>
    </SpatialSection>
  );
}
