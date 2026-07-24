"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  MotionPreferenceOverride,
  usePrefersReducedMotion,
} from "@/components/providers/motion-provider";
import { useParallax } from "@/hooks/use-parallax";
import { useSectionProgress } from "@/hooks/use-section-progress";
import { AnimatedSection } from "./animated-section";
import { SplitText } from "./split-text";
import { StaggerGroup, StaggerItem } from "./stagger";
import { SvgLineDraw } from "./svg-line-draw";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const demonstrationPath = [
  { d: "M10 92 C60 20, 110 20, 160 62" },
  { d: "M160 62 C210 104, 260 104, 310 28" },
] as const;

function MotionShowcaseContent({
  onToggle,
}: {
  onToggle: () => void;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, progress } = useSectionProgress<HTMLElement>();
  const parallaxY = useParallax(progress, 28);

  return (
    <AnimatedSection
      ref={ref}
      tone="surface"
      preset="fade"
      aria-label="Motion system demonstration"
      data-motion-demo-mode={prefersReducedMotion ? "reduced" : "full"}
    >
      <Container>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          Motion system
        </p>
        <SplitText
          as="h2"
          text="Purposeful motion with a static alternative"
          className="mt-4 max-w-4xl text-[length:var(--text-h2)]"
        />
        <p className="mt-5 max-w-[65ch] text-lg text-muted">
          Entrance, stagger, word, line-drawing, section-progress and parallax
          primitives share one timing system. Reduced motion is currently{" "}
          <strong className="text-foreground">
            {prefersReducedMotion ? "active" : "not active"}
          </strong>
          .
        </p>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="mt-5"
          aria-pressed={prefersReducedMotion}
          onClick={onToggle}
        >
          {prefersReducedMotion
            ? "Show full motion demo"
            : "Test reduced-motion demo"}
        </Button>

        <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["Reveal", "Opacity and translate only."],
            ["Stagger", "Short, consistent sequencing."],
            ["Progress", "MotionValues avoid React render loops."],
          ].map(([title, description]) => (
            <StaggerItem key={title}>
              <Card className="h-full">
                <h3 className="text-xl">{title}</h3>
                <p className="mt-3 text-muted">{description}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-10 grid items-center gap-8 rounded-xl border border-border bg-background/40 p-6 md:grid-cols-2 md:p-8">
          <div>
            <h3 className="text-2xl">Scroll-linked transform</h3>
            <p className="mt-3 max-w-lg text-muted">
              The marker uses section progress to translate gently. It becomes
              static when reduced motion is requested.
            </p>
            <SvgLineDraw
              paths={demonstrationPath}
              label="A line connecting two stages"
              className="mt-6 w-full text-blue-300"
            />
          </div>
          <div className="grid min-h-52 place-items-center overflow-hidden rounded-lg border border-border bg-surface">
            <motion.div
              aria-hidden="true"
              style={{ y: parallaxY }}
              className="grid size-24 place-items-center rounded-full border border-blue-300/40 bg-blue-600/15 text-sm font-semibold text-blue-300 shadow-[0_18px_55px_rgb(23_105_224_/_18%)]"
            >
              Progress
            </motion.div>
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}

export function MotionShowcase() {
  const systemPrefersReducedMotion = usePrefersReducedMotion();
  const [forceReducedMotion, setForceReducedMotion] = useState(false);
  const reduced = systemPrefersReducedMotion || forceReducedMotion;

  return (
    <MotionPreferenceOverride key={String(reduced)} reduced={reduced}>
      <MotionShowcaseContent
        onToggle={() => setForceReducedMotion((current) => !current)}
      />
    </MotionPreferenceOverride>
  );
}
