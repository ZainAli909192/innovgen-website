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
import { leadershipProfiles } from "@/config/leadership";
import { motionEase } from "@/config/motion";
import { useSectionProgress } from "@/hooks/use-section-progress";
import { useMobileLayout } from "@/hooks/use-mobile-layout";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SplitText } from "@/components/motion/split-text";
import { Background3DShapes } from "@/components/motion/background-3d-shapes";
import { SpatialSection } from "@/components/motion/spatial-section";
import { FinalCtaSection } from "./home/final-cta-section";

function DirectionalReveal({
  children,
  className,
  direction,
  mobileOnly = false,
}: {
  children: ReactNode;
  className?: string;
  direction: "left" | "right";
  mobileOnly?: boolean;
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
      className={`${className ?? ""} [transform-style:preserve-3d]`}
      style={reducedMotion || mobile || mobileOnly ? undefined : { x, opacity }}
      initial={
        reducedMotion || !mobile
          ? false
          : {
              opacity: 0,
              x: distance,
              scale: 0.86,
              rotateY: direction === "left" ? 12 : -12,
              rotateX: 8,
            }
      }
      whileInView={
        reducedMotion || !mobile
          ? undefined
          : { opacity: 1, x: 0, scale: 1, rotateY: 0, rotateX: 0 }
      }
      viewport={{ once: false, amount: 0.22 }}
      transition={{ duration: reducedMotion ? 0 : 0.58, ease: motionEase }}
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
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-navy-950),rgb(9_27_50),var(--color-navy-900))] py-8 md:py-20 lg:min-h-[calc(100svh-var(--header-height))] lg:py-24"
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
        className="relative grid items-center gap-8 [perspective:1500px] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20"
      >
        <motion.div
          className="relative mx-auto w-full max-w-[21rem] [transform-style:preserve-3d] sm:max-w-[34rem]"
          style={
            staticPresentation
              ? undefined
              : { x: imageX, z: imageZ, rotateY: imageRotateY }
          }
          initial={reducedMotion || !mobile ? false : { opacity: 0, scale: 0.74, x: -72, y: 32, rotateX: -12, rotateY: 10 }}
          whileInView={reducedMotion || !mobile ? undefined : { opacity: 1, scale: 1, x: 0, y: 0, rotateX: 0, rotateY: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: reducedMotion ? 0 : 0.68, ease: motionEase }}
        >
          <span
            aria-hidden="true"
            className="absolute -left-5 -top-5 size-20 rounded-[1.4rem] border border-accent/35 bg-accent/10 shadow-[0_20px_55px_rgb(201_154_50_/_12%)] md:-left-8 md:-top-8 md:size-28"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-5 -right-5 size-16 rounded-full border border-blue-300/30 bg-blue-500/10 md:-bottom-8 md:-right-8 md:size-24"
          />
          <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] border border-accent/25 bg-surface-elevated p-2 shadow-[0_28px_72px_rgb(0_0_0_/_38%),0_0_38px_rgb(201_154_50_/_8%)] sm:aspect-[4/5] sm:rounded-[2rem] sm:shadow-[0_38px_110px_rgb(0_0_0_/_38%),0_0_46px_rgb(201_154_50_/_8%)]">
            <div className="relative h-full overflow-hidden rounded-[1rem] sm:rounded-[1.5rem]">
              <Image
                src={founderContent.image}
                alt={founderContent.imageAlt}
                fill
                priority
                sizes="(max-width: 1023px) 92vw, 42vw"
                className="object-cover object-center max-sm:object-[center_28%]"
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
          initial={reducedMotion || !mobile ? false : { opacity: 0, scale: 0.88, x: 72, y: 28, rotateX: 10 }}
          whileInView={reducedMotion || !mobile ? undefined : { opacity: 1, scale: 1, x: 0, y: 0, rotateX: 0 }}
          viewport={{ once: false, amount: 0.28 }}
          transition={{ duration: reducedMotion ? 0 : 0.62, delay: reducedMotion ? 0 : 0.08, ease: motionEase }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            {founderContent.eyebrow}
          </p>
          <SplitText
            as="h1"
            text="Leadership with clarity at its core."
            className="mt-4 max-w-3xl text-[clamp(2.5rem,12vw,3.4rem)] sm:mt-5 sm:text-[clamp(2.65rem,6vw,5.5rem)]"
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
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <Button href="#who-we-are" className="w-full sm:w-auto">
              Discover InnovGen
              <ArrowDown aria-hidden="true" className="size-4" />
            </Button>
            <Button href="/consultation" variant="secondary" className="w-full sm:w-auto">
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
          className="mx-auto mt-8 grid max-w-5xl gap-4 border-t border-border pt-8 md:mt-10 md:grid-cols-2 md:gap-12 md:pt-10"
        >
          {companyStory.paragraphs.map((paragraph) => (
            <p key={paragraph} className="rounded-2xl border border-blue-300/15 bg-[rgb(5_15_32_/_32%)] p-5 text-base leading-relaxed text-muted shadow-[0_16px_38px_rgb(0_0_0_/_14%)] md:rounded-none md:border-0 md:bg-transparent md:p-0 md:text-lg md:shadow-none">
              {paragraph}
            </p>
          ))}
        </DirectionalReveal>
      </Container>
    </SpatialSection>
  );
}

function LeadershipProfiles() {
  const profiles = leadershipProfiles.slice(1);

  return (
    <section
      aria-labelledby="leadership-profiles-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(145deg,var(--color-navy-900),rgb(10_30_54),var(--color-navy-950))] py-12 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_24%,rgb(47_130_245_/_16%),transparent_24rem),radial-gradient(circle_at_88%_74%,rgb(228_196_119_/_12%),transparent_26rem)]"
      />
      <Background3DShapes
        variant="services-blue"
        intensity="strong"
        className="opacity-35"
      />
      <Container size="wide" className="relative">
        <DirectionalReveal direction="right" className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Leadership team</p>
          <h2 id="leadership-profiles-heading" className="mt-4 text-[var(--text-h1)]">The people who turn vision into progress.</h2>
        </DirectionalReveal>

        <div className="mx-auto mt-9 grid max-w-5xl gap-5 md:mt-12 md:grid-cols-2 md:gap-10">
          {profiles.map((profile, index) => (
            <DirectionalReveal
              key={profile.id}
              direction={index === 0 ? "left" : "right"}
              className="mx-auto w-full max-w-[23rem] [perspective:1200px] md:max-w-none"
            >
              <motion.article
                whileHover={{ y: -7, rotateX: 1.5, rotateY: index === 0 ? 1.5 : -1.5 }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="group relative min-h-[28rem] overflow-hidden rounded-[1.6rem] border border-blue-300/30 bg-navy-950 shadow-[0_24px_62px_rgb(0_0_0_/_28%),inset_0_1px_0_rgb(255_255_255_/_12%)] sm:min-h-[36rem] sm:rounded-[2rem]"
              >
                <Image
                  src={profile.imageUrl}
                  alt={profile.imageAlt}
                  fill
                  sizes="(max-width: 767px) 92vw, 40vw"
                  className="object-cover object-top transition-opacity duration-500 group-hover:opacity-95"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(5_11_24_/_8%)_18%,rgb(5_11_24_/_20%)_42%,rgb(5_11_24_/_96%)_100%)]" />
                <span aria-hidden="true" className="absolute left-6 top-7 h-px w-14 bg-accent" />
                <p className="absolute left-6 top-10 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Leadership profile</p>
                <div className="relative mt-auto flex min-h-[28rem] flex-col justify-end px-6 pb-7 pt-28 sm:min-h-[36rem] sm:px-8 sm:pb-8">
                  <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">{profile.name}</h3>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-blue-300">{profile.title}</p>
                  <p className="mt-5 text-base leading-7 text-muted">{profile.description}</p>
                </div>
              </motion.article>
            </DirectionalReveal>
          ))}
        </div>
      </Container>
    </section>
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

        <div className="mt-9 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(16rem,0.75fr)_minmax(0,2.25fr)] lg:gap-20">
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

          <ol className="relative space-y-3 border-y border-border max-md:border-0">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.number}
                  className="group relative border-b border-border last:border-b-0 max-md:rounded-2xl max-md:border max-md:border-blue-300/20 max-md:bg-[linear-gradient(145deg,rgb(18_47_83_/_78%),rgb(5_15_32_/_92%))] max-md:px-5 max-md:shadow-[0_18px_44px_rgb(0_0_0_/_20%),inset_0_1px_0_rgb(255_255_255_/_7%)]"
                >
                  <DirectionalReveal
                    direction={index % 2 === 0 ? "right" : "left"}
                    className="grid gap-4 py-6 md:grid-cols-[4.5rem_1fr_auto] md:items-center md:gap-8 md:py-10"
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
                    <span className="grid size-12 place-items-center rounded-full border border-blue-300/25 bg-blue-500/[0.06] text-blue-300 transition-[transform,border-color,background-color] duration-[var(--duration-standard)] group-hover:rotate-6 group-hover:scale-110 group-hover:border-accent/50 group-hover:bg-accent/10 motion-reduce:transform-none">
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

        <DirectionalReveal direction="right" className="mt-9 md:mt-14">
          <div
            role="tablist"
            aria-label="Reasons to choose InnovGen"
            className="grid gap-3 sm:grid-cols-2 sm:gap-0 sm:border-y sm:border-border xl:grid-cols-4"
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
                  className="group relative flex min-h-32 cursor-pointer flex-col items-start justify-between rounded-2xl border border-blue-300/20 bg-[rgb(12_32_58_/_72%)] px-5 py-5 text-left shadow-[0_14px_36px_rgb(0_0_0_/_16%)] transition-colors hover:bg-blue-500/[0.08] focus-visible:bg-blue-500/[0.08] sm:min-h-36 sm:rounded-none sm:border-0 sm:border-b sm:border-border sm:bg-transparent sm:px-5 sm:py-6 sm:shadow-none sm:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b-0 xl:border-r xl:last:border-r-0 md:px-7"
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
                  <span className="mt-6 text-lg font-semibold text-foreground sm:mt-8">
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
            className="grid min-h-60 items-center gap-6 rounded-[1.5rem] border border-blue-300/15 bg-[rgb(5_15_32_/_42%)] p-6 shadow-[0_20px_48px_rgb(0_0_0_/_18%)] sm:rounded-none sm:border-x-0 sm:border-t-0 sm:border-b sm:border-border sm:bg-transparent sm:p-0 sm:py-10 sm:shadow-none md:grid-cols-[auto_1fr] md:gap-12 md:py-14"
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
      <LeadershipProfiles />
      <CompanyStory />
      <ProcessSection />
      <ProofSection />
      <DirectionalReveal direction="left" mobileOnly>
        <ServicesPreviewSection />
      </DirectionalReveal>
      <DirectionalReveal direction="right" mobileOnly>
        <FinalCtaSection />
      </DirectionalReveal>
      
    </>
  );
}
