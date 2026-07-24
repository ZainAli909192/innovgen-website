import { Badge } from "@/components/ui/badge";
import { ClientLogoGrid } from "@/components/home/client-logo-grid";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  SpatialConnector,
  SpatialItem,
  SpatialSection,
} from "@/components/motion/spatial-section";

export function TrustedBySection() {
  return (
    <SpatialSection
      aria-labelledby="trusted-by-heading"
      spacing="compact"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-navy-950),var(--color-navy-900))]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-28 h-56 bg-[radial-gradient(ellipse_at_center,rgb(47_130_245_/_12%),transparent_68%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden [perspective:1000px]"
      >
        <div className="absolute -right-20 top-14 size-48 rounded-full border border-blue-300/15 bg-blue-500/[0.035] shadow-[inset_0_0_48px_rgb(47_130_245_/_9%)] [animation:industry-float_9s_ease-in-out_infinite] motion-reduce:animate-none md:size-72" />
        <div className="absolute -left-16 bottom-10 h-36 w-36 rounded-[42%] border border-accent/15 bg-accent/[0.025] [animation:industry-drift_12s_ease-in-out_infinite] motion-reduce:animate-none md:h-52 md:w-52" />
        <div className="absolute left-[58%] top-[42%] h-24 w-24 rotate-45 border border-blue-300/10 [animation:industry-spin_18s_linear_infinite] motion-reduce:animate-none" />
      </div>
      <SpatialConnector className="pointer-events-none absolute inset-x-0 top-[44%] h-32 text-blue-300/25" />
      <Container size="wide" className="relative">
        <SpatialItem>
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <SectionHeading
              id="trusted-by-heading"
              eyebrow="Trusted by ambitious organizations"
              title="Technology partnerships built on trust."
              description="InnovGen works with organizations that need secure, scalable, and future-ready digital systems."
              className="max-w-3xl"
            />
            <Badge variant="gold" className="shrink-0">
              These are official partners of InnovGen.
            </Badge>
          </div>
        </SpatialItem>
        <SpatialItem index={1} className="mt-10 md:mt-12">
          <ClientLogoGrid />
        </SpatialItem>
      </Container>
    </SpatialSection>
  );
}
