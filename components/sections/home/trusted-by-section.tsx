"use client";

import { useRef } from "react";
import { ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { ClientLogoGrid } from "@/components/home/client-logo-grid";
import { SpatialConnector, SpatialItem, SpatialSection } from "@/components/motion/spatial-section";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const partnersNetworkVideo = "/background_video.mp4";

export function TrustedBySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], [-42, 44]);
  const shapeY = useTransform(scrollYProgress, [0, 1], [-18, 22]);

  return (
    <div ref={sectionRef} className="relative">
      <SpatialSection
        aria-labelledby="trusted-by-heading"
        spacing="spacious"
        className="relative isolate overflow-hidden bg-[var(--color-navy-950)]"
      >
        <motion.video
          aria-hidden="true"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/services-ecosystem-poster.svg"
          src={partnersNetworkVideo}
          style={
            reducedMotion
              ? { scale: 1.06 }
              : { y: videoY, scale: 1.12 }
          }
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-80 saturate-[1.12]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(5_11_24_/_65%),rgb(5_11_24_/_76%)_48%,rgb(5_11_24_/_88%))]"
        />
        <motion.div
          aria-hidden="true"
          style={reducedMotion ? undefined : { y: shapeY }}
          className="pointer-events-none absolute -right-12 top-[14%] size-64 rounded-full border border-blue-300/20 bg-blue-500/[0.08] shadow-[inset_18px_18px_50px_rgb(131_185_255_/_12%),0_0_80px_rgb(47_130_245_/_14%)] md:-right-6 md:size-[25rem]"
        />
        <SpatialConnector className="pointer-events-none absolute inset-x-0 top-[47%] h-32 text-blue-300/25" />

        <Container size="wide" className="relative">
          <SpatialItem>
            <div className="mx-auto flex max-w-[72rem] flex-col items-start justify-between gap-7 rounded-[1.8rem] border border-blue-300/30 bg-[linear-gradient(135deg,rgb(13_40_73_/_88%),rgb(5_16_33_/_86%))] px-6 py-8 shadow-[0_24px_72px_rgb(0_0_0_/_28%),inset_0_1px_0_rgb(255_255_255_/_13%)] backdrop-blur-md md:flex-row md:items-end md:px-14 md:py-12">
              <SectionHeading
                id="trusted-by-heading"
                eyebrow="Trusted by ambitious organizations"
                title="Technology partnerships built on trust."
                description="InnovGen works with organizations that need secure, scalable, and future-ready digital systems."
                className="max-w-3xl [&_h2]:text-[clamp(2.2rem,3.1vw,3.2rem)] [&_h2]:text-foreground [&_p:not(:first-child)]:text-blue-100 md:max-w-none md:[&_h2]:whitespace-nowrap"
              />
              <Badge
                variant="gold"
                className="shrink-0 border-blue-400/55 bg-blue-500/10 px-4 py-1.5 text-[0.625rem] text-blue-200 shadow-[0_8px_22px_rgb(0_0_0_/_12%)]"
              >
                <ShieldCheck aria-hidden="true" className="mr-1 size-3.5" />
                These are official partners of InnovGen.
              </Badge>
            </div>
          </SpatialItem>
          <SpatialItem index={1} className="mx-auto mt-10 max-w-[78rem] md:mt-14">
            <ClientLogoGrid />
          </SpatialItem>
        </Container>
      </SpatialSection>
    </div>
  );
}
