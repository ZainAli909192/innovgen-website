"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import  { ServicesPreviewSection } from "./home/services-preview-section";
import {
  AnimatePresence,
  motion,
  useSpring,
  useTransform,
} from "motion/react";
import {
  aboutProofs,
  companyStory,
  founderContent,
  processSteps,
  workingPrinciple,
} from "@/config/about";
import { motionEase } from "@/config/motion";
import { useSectionProgress } from "@/hooks/use-section-progress";
import { useMobileLayout } from "@/hooks/use-mobile-layout";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SplitText } from "@/components/motion/split-text";
import { Background3DShapes } from "@/components/motion/background-3d-shapes";
import {
  SpatialItem,
  SpatialSection,
} from "@/components/motion/spatial-section";
import { FinalCtaSection } from "./home/final-cta-section";

function DirectionalReveal({
  children,
  className,
  direction,
}: {
  children: ReactNode;
  className?: string;
  direction: "left" | "right";
}) {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();
  const mobile = useMobileLayout();
  const smoothProgress = useSpring(progress, {
    stiffness: 105,
    damping: 30,
    mass: 0.6,
  });
  const distance = direction === "left" ? -72 : 72;
  const x = useTransform(
    smoothProgress,
    [0, 0.28, 0.78, 1],
    [distance, 0, 0, -distance * 0.35],
  );
  const opacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.82, 1],
    [0.35, 1, 1, 0.58],
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reducedMotion || mobile ? undefined : { x, opacity }}
    >
      {children}
    </motion.div>
  );
}

function FounderHero() {
  const { ref, progress } = useSectionProgress<HTMLElement>();
  const reducedMotion = usePrefersReducedMotion();
  const mobile = useMobileLayout();
  const staticPresentation = reducedMotion || mobile;
  const smoothProgress = useSpring(progress, {
    stiffness: 90,
    damping: 28,
    mass: 0.65,
  });
  const imageX = useTransform(
    smoothProgress,
    [0, 0.25, 0.78, 1],
    [-64, 0, 0, -30],
  );
  const imageZ = useTransform(
    smoothProgress,
    [0, 0.25, 0.78, 1],
    [-160, 0, 0, -80],
  );
  const imageRotateY = useTransform(
    smoothProgress,
    [0, 0.25, 0.78, 1],
    [12, 0, 0, -5],
  );
  const copyX = useTransform(
    smoothProgress,
    [0, 0.25, 0.78, 1],
    [64, 0, 0, 30],
  );
  const copyOpacity = useTransform(
    smoothProgress,
    [0.04, 0.2, 0.84, 1],
    [0, 1, 1, 0.25],
  );

  return (
    <section
      ref={ref}
      aria-labelledby="about-founder-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-navy-950),rgb(9_27_50),var(--color-navy-900))] py-14 md:py-20 lg:min-h-[calc(100svh-var(--header-height))] lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_36%,rgb(47_130_245_/_13%),transparent_28rem),radial-gradient(circle_at_78%_40%,rgb(228_196_119_/_9%),transparent_30rem)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[48%] top-10 hidden h-[80%] w-px bg-[linear-gradient(transparent,var(--color-gold-300),transparent)] opacity-25 lg:block"
      />

      <Container
        size="wide"
        className="relative grid items-center gap-12 [perspective:1500px] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20"
      >
        <motion.div
          className="relative mx-auto w-full max-w-[34rem] [transform-style:preserve-3d]"
          style={
            staticPresentation
              ? undefined
              : { x: imageX, z: imageZ, rotateY: imageRotateY }
          }
        >
          <span
            aria-hidden="true"
            className="absolute -left-5 -top-5 size-20 rounded-[1.4rem] border border-accent/35 bg-accent/10 shadow-[0_20px_55px_rgb(201_154_50_/_12%)] md:-left-8 md:-top-8 md:size-28"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-5 -right-5 size-16 rounded-full border border-blue-300/30 bg-blue-500/10 md:-bottom-8 md:-right-8 md:size-24"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-accent/25 bg-surface-elevated p-2 shadow-[0_38px_110px_rgb(0_0_0_/_38%),0_0_46px_rgb(201_154_50_/_8%)]">
            <div className="relative h-full overflow-hidden rounded-[1.5rem]">
              <Image
                src={founderContent.image}
                alt={founderContent.imageAlt}
                fill
                priority
                sizes="(max-width: 1023px) 92vw, 42vw"
                className="object-cover object-center"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgb(5_11_24_/_65%))]"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative [transform-style:preserve-3d]"
          style={
            staticPresentation ? undefined : { x: copyX, opacity: copyOpacity }
          }
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            {founderContent.eyebrow}
          </p>
          <SplitText
            as="h1"
            text="Leadership with clarity at its core."
            className="mt-5 max-w-3xl text-[clamp(2.65rem,6vw,5.5rem)]"
          />
          <div className="mt-7 h-px w-32 bg-[linear-gradient(90deg,var(--color-gold-300),transparent)]" />
          <p
            id="about-founder-heading"
            className="mt-7 text-2xl font-semibold text-foreground md:text-3xl"
          >
            {founderContent.name}
          </p>
          <p className="mt-2 text-lg font-medium text-blue-300">
            {founderContent.role}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            {founderContent.introduction}
          </p>
          <Badge variant="gold" className="mt-6">
             Stev , Founder & CEO
          </Badge>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#who-we-are">
              Discover InnovGen
              <ArrowDown aria-hidden="true" className="size-4" />
            </Button>
            <Button href="/consultation" variant="secondary">
              Start a conversation
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function CompanyStory() {
  return (
    <SpatialSection
      id="who-we-are"
      aria-label="Who we are"
      spacing="spacious"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-navy-900),rgb(11_31_55),var(--color-navy-900))]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgb(47_130_245_/_9%),transparent_32rem)]"
      />   
      <Background3DShapes
        variant="services-blue"
        intensity="strong"
        className="opacity-55"
      />
      <Container size="standard" className="relative">
        <DirectionalReveal direction="left">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            {companyStory.eyebrow}
          </p>
          <SplitText
            as="h2"
            text={companyStory.title}
            className="mx-auto mt-5 max-w-5xl text-center text-[var(--text-h1)]"
          />
        </DirectionalReveal>
        <DirectionalReveal
          direction="right"
          className="mx-auto mt-10 grid max-w-5xl gap-6 border-t border-border pt-10 md:grid-cols-2 md:gap-12"
        >
          {companyStory.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </DirectionalReveal>
      </Container>
    </SpatialSection>
  );
}

function ProcessSection() {
  return (
    <SpatialSection
      aria-labelledby="how-we-work-heading"
      spacing="spacious"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-navy-900),var(--color-navy-950))]"
    >
      <Container size="wide" className="relative">
        <DirectionalReveal direction="left">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            How we work
          </p>
          <h2
            id="how-we-work-heading"
            className="mt-4 text-[var(--text-h1)]"
          >
            From business need to confident launch.
          </h2>
        </DirectionalReveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(16rem,0.75fr)_minmax(0,2.25fr)] lg:gap-20">
          <DirectionalReveal
            direction="left"
            className="border-l-2 border-accent/55 pl-6 md:pl-9 lg:sticky lg:top-32 lg:self-start"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {workingPrinciple.eyebrow}
            </p>
            <h3 className="mt-5 max-w-sm text-4xl md:text-5xl">
              {workingPrinciple.title}
            </h3>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">
              {workingPrinciple.description}
            </p>
            <div aria-hidden="true" className="mt-10 flex items-center gap-3">
              <span className="size-2 rounded-full bg-accent" />
              <span className="h-px flex-1 bg-[linear-gradient(90deg,var(--color-gold-300),transparent)]" />
            </div>
          </DirectionalReveal>

          <ol className="relative border-y border-border">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.number}
                  className="group relative border-b border-border last:border-b-0"
                >
                  <DirectionalReveal
                    direction={index % 2 === 0 ? "right" : "left"}
                    className="grid gap-5 py-8 md:grid-cols-[4.5rem_1fr_auto] md:items-center md:gap-8 md:py-10"
                  >
                    <span className="font-mono text-sm font-semibold text-accent">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-2xl transition-colors duration-[var(--duration-standard)] group-hover:text-blue-300 md:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                        {step.description}
                      </p>
                    </div>
                    <span className="grid size-12 place-items-center rounded-full border border-blue-300/25 text-blue-300 transition-[transform,border-color,background-color] duration-[var(--duration-standard)] group-hover:rotate-6 group-hover:scale-110 group-hover:border-accent/50 group-hover:bg-accent/10 motion-reduce:transform-none">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                  </DirectionalReveal>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </SpatialSection>
  );
}

function ProofSection() {
  const [activeProofIndex, setActiveProofIndex] = useState(0);
  const activeProof = aboutProofs[activeProofIndex];
  const ActiveIcon = activeProof.icon;

  return (
    <SpatialSection
      aria-labelledby="why-innovgen-heading"
      spacing="spacious"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-navy-950),rgb(10_29_52),var(--color-navy-900))]"
    >
      <Background3DShapes
        variant="services-blue"
        intensity="strong"
        className="opacity-50"
      />
      <Container size="wide" className="relative">
        <DirectionalReveal
          direction="left"
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              Why choose InnovGen
            </p>
            <h2
              id="why-innovgen-heading"
              className="mt-4 max-w-3xl text-[var(--text-h1)]"
            >
              A partner built for meaningful, lasting progress.
            </h2>
          </div>
          <Button
            href="/consultation"
            variant="secondary"
            className="group w-fit shrink-0"
          >
            Work with us
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1 motion-reduce:transform-none"
            />
          </Button>
        </DirectionalReveal>

        <DirectionalReveal direction="right" className="mt-14">
          <div
            role="tablist"
            aria-label="Reasons to choose InnovGen"
            className="grid border-y border-border sm:grid-cols-2 xl:grid-cols-4"
          >
          {aboutProofs.map((proof, index) => {
            const Icon = proof.icon;
            const active = activeProofIndex === index;
            return (
                <button
                  key={proof.title}
                  type="button"
                  role="tab"
                  id={`about-proof-tab-${index}`}
                  aria-selected={active}
                  aria-controls="about-proof-panel"
                  onClick={() => setActiveProofIndex(index)}
                  onMouseEnter={() => setActiveProofIndex(index)}
                  className="group relative flex min-h-36 cursor-pointer flex-col items-start justify-between border-b border-border px-5 py-6 text-left transition-colors hover:bg-blue-500/[0.04] focus-visible:bg-blue-500/[0.04] sm:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b-0 xl:border-r xl:last:border-r-0 md:px-7"
                >
                  <span className="flex w-full items-center justify-between">
                    <span className="font-mono text-xs text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      aria-hidden="true"
                      className={`size-5 transition-[color,transform] duration-[var(--duration-standard)] motion-reduce:transform-none ${
                        active
                          ? "scale-110 text-accent"
                          : "text-blue-300 group-hover:translate-x-1"
                      }`}
                    />
                  </span>
                  <span className="mt-8 text-lg font-semibold text-foreground">
                    {proof.title}
                  </span>
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
                    animate={{ scaleX: active ? 1 : 0 }}
                    transition={{ duration: 0.28, ease: motionEase }}
                  />
                </button>
            );
          })}
          </div>

          <div
            id="about-proof-panel"
            role="tabpanel"
            aria-labelledby={`about-proof-tab-${activeProofIndex}`}
            className="grid min-h-60 items-center gap-8 border-b border-border py-10 md:grid-cols-[auto_1fr] md:gap-12 md:py-14"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={`${activeProof.title}-icon`}
                aria-hidden="true"
                initial={{ opacity: 0, x: -24, rotate: -8 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: 18 }}
                transition={{ duration: 0.28, ease: motionEase }}
                className="grid size-20 place-items-center rounded-full border border-accent/35 text-accent md:size-28"
              >
                <ActiveIcon className="size-8 md:size-10" />
              </motion.span>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProof.title}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -22 }}
                transition={{ duration: 0.28, ease: motionEase }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  InnovGen advantage
                </p>
                <h3 className="mt-4 text-3xl md:text-5xl">
                  {activeProof.title}
                </h3>
                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">
                  {activeProof.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </DirectionalReveal>
      </Container>
    </SpatialSection>
  );
}

export function AboutPage() {
  return (
    <>
      <FounderHero />
      <CompanyStory />
      <ProcessSection />
      <ProofSection />
      <ServicesPreviewSection />
      <FinalCtaSection />
      
    </>
  );
}
