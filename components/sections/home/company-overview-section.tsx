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
import { GoldenDepthShapes } from "@/components/motion/cylindrical-stage";

export function CompanyOverviewSection() {
  return (
    <SpatialSection
      aria-labelledby="company-overview-heading"
      spacing="spacious"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-navy-900),rgb(12_31_54),var(--color-navy-900))]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-20 lg:block [background-image:linear-gradient(rgb(131_185_255_/_12%)_1px,transparent_1px),linear-gradient(90deg,rgb(131_185_255_/_12%)_1px,transparent_1px)] [background-size:5rem_5rem] [mask-image:linear-gradient(90deg,transparent,black)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_34%,rgb(228_196_119_/_7%),transparent_28rem),radial-gradient(circle_at_80%_62%,rgb(47_130_245_/_8%),transparent_32rem)]"
      />
      <GoldenDepthShapes className="opacity-30 md:opacity-55" />
      <SpatialConnector className="pointer-events-none absolute inset-x-0 bottom-10 h-36 rotate-180 text-blue-300/20" />
      <Container
        size="wide"
        className="relative grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20"
      >
        <SpatialItem className="lg:sticky lg:top-32 lg:self-start">
          <div className="relative rounded-[1.75rem] border border-accent/15 bg-[linear-gradient(145deg,rgb(18_45_76_/_72%),rgb(8_20_38_/_86%))] p-7 shadow-[inset_8px_8px_24px_rgb(255_255_255_/_3%),inset_-11px_-11px_28px_rgb(0_0_0_/_22%),0_30px_80px_rgb(0_0_0_/_20%),0_0_44px_rgb(201_154_50_/_5%)] max-md:rounded-[2rem] max-md:border-blue-300/35 max-md:bg-[linear-gradient(145deg,rgb(30_79_129_/_96%),rgb(7_27_50_/_98%))] max-md:p-7 max-md:shadow-[inset_0_1px_0_rgb(255_255_255_/_13%),0_20px_48px_rgb(0_0_0_/_22%)] md:p-9 [transform-style:preserve-3d]">
            <span
              aria-hidden="true"
              className="absolute -right-5 -top-5 size-16 rounded-2xl border border-accent/30 bg-[linear-gradient(145deg,rgb(228_196_119_/_16%),rgb(201_154_50_/_3%))] shadow-[inset_7px_7px_16px_rgb(255_255_255_/_6%),inset_-8px_-8px_18px_rgb(73_44_2_/_25%),0_18px_44px_rgb(201_154_50_/_10%)] max-md:right-5 max-md:top-5 max-md:size-11"
            />
            <SectionHeading
              id="company-overview-heading"
              eyebrow="Who we are"
              title="Strategy, design, and engineering working as one."
              description="InnovGen Technology Solutions LLC is a UAE-based IT company specializing in disruptive AI-powered solutions. We help B2B businesses automate processes, enhance decision-making, and drive growth with AI-ready IT infrastructure, while partnering with leading technology providers to deliver cloud and on-premise platforms tailored to the UAE and GCC markets."
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
          </div>
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
