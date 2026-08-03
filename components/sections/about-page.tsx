"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { TrustedClientsDirectory } from "./clients/trusted-clients-directory";
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
import { aboutExpertise, aboutFaqs, aboutFoundations } from "@/config/about-seo";
import { leadershipProfiles } from "@/config/leadership";
import { motionEase } from "@/config/motion";
import { useSectionProgress } from "@/hooks/use-section-progress";
import { useMobileLayout } from "@/hooks/use-mobile-layout";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { Container } from "@/components/ui/container";
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
        className="relative grid items-center gap-9 rounded-[2rem] border-2 border-blue-400/25 bg-[linear-gradient(145deg,rgb(10_30_57_/_96%),rgb(4_13_29_/_98%))] p-5 shadow-[0_28px_80px_rgb(0_0_0_/_30%),inset_0_1px_0_rgb(255_255_255_/_9%)] [perspective:1500px] sm:p-7 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20 lg:rounded-[2.5rem] lg:p-10"
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
            className="absolute -left-3 -top-3 size-16 rounded-[1.25rem] border border-blue-300/50 bg-blue-500/20 shadow-[0_20px_55px_rgb(23_105_224_/_20%)] md:-left-8 md:-top-8 md:size-28"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-5 -right-5 size-16 rounded-full border border-blue-300/30 bg-blue-500/10 md:-bottom-8 md:-right-8 md:size-24"
          />
          <span aria-hidden="true" className="absolute -left-5 top-1/2 grid grid-cols-3 gap-2 opacity-80 sm:-left-9">
            {Array.from({ length: 12 }).map((_, index) => (
              <span key={index} className="size-1.5 rounded-full bg-blue-400" />
            ))}
          </span>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-blue-400/55 bg-surface-elevated p-2 shadow-[0_28px_72px_rgb(0_0_0_/_38%),0_0_38px_rgb(23_105_224_/_16%)] sm:aspect-[4/5] sm:rounded-[2rem] sm:shadow-[0_38px_110px_rgb(0_0_0_/_38%),0_0_46px_rgb(23_105_224_/_14%)]">
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
          <h2
            id="about-founder-heading"
            className="mt-4 max-w-3xl text-[clamp(2.45rem,11vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-foreground sm:mt-5 sm:text-[clamp(2.65rem,6vw,5.5rem)]"
          >
            Leadership with <span className="text-primary">clarity</span> at its core.
          </h2>
          <div className="mt-7 h-1 w-24 rounded-full bg-[linear-gradient(90deg,var(--color-blue-400),var(--color-blue-600))]" />
          <p className="mt-7 text-2xl font-semibold text-foreground md:text-3xl">
            {founderContent.name}
          </p>
          <p className="mt-2 text-lg font-medium text-blue-300">
            {founderContent.role}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            {founderContent.introduction}
          </p>
         
          <div className="mt-9 grid grid-cols-3 gap-2 border-y border-blue-300/20 py-6 md:hidden">
            {aboutProofs.slice(0, 3).map((proof, index) => {
              const Icon = proof.icon;
              return (
                <motion.div
                  key={proof.title}
                  initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.88 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{ duration: reducedMotion ? 0 : 0.34, delay: reducedMotion ? 0 : 0.15 + index * 0.07, ease: motionEase }}
                  className="flex min-w-0 flex-col items-center text-center"
                >
                  <span className="grid size-12 place-items-center rounded-full border border-blue-300/25 bg-blue-500/10 text-blue-300 shadow-[inset_0_1px_0_rgb(255_255_255_/_8%)]">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="mt-3 text-xs font-medium leading-4 text-blue-100">{proof.title}</span>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <Button href="#who-we-are" className="w-full px-3 text-sm sm:w-auto sm:px-5 sm:text-base">
              Discover InnovGen
              <ArrowDown aria-hidden="true" className="size-4" />
            </Button>
            <Button href="/consultation" variant="secondary" className="w-full px-3 text-sm sm:w-auto sm:px-5 sm:text-base">
              Start a conversation
              <ArrowRight aria-hidden="true" className="size-4" />
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
      className="about-mobile-light-surface relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-navy-900),rgb(11_31_55),var(--color-navy-900))]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgb(47_130_245_/_9%),transparent_32rem)]"
      />   
      <Background3DShapes
        variant="services-blue"
        intensity="strong"
        className="opacity-55 max-md:opacity-15"
      />
      <Container size="standard" className="relative">
        <DirectionalReveal direction="left">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            {companyStory.eyebrow}
          </p>
          <SplitText
            as="h2"
            text={companyStory.title}
            className="mx-auto mt-5 max-w-5xl text-center text-[var(--text-h1)] text-[var(--color-navy-900)] md:text-foreground"
          />
        </DirectionalReveal>
        <DirectionalReveal
          direction="right"
          className="mx-auto mt-8 grid max-w-5xl gap-4 border-t border-border pt-8 md:mt-10 md:grid-cols-2 md:gap-12 md:pt-10"
        >
          {companyStory.paragraphs.map((paragraph) => (
            <p key={paragraph} className="rounded-2xl border border-blue-200 bg-white p-5 text-base leading-relaxed text-[#53647d] shadow-[0_16px_38px_rgb(23_105_224_/_10%)] md:rounded-none md:border-0 md:bg-transparent md:p-0 md:text-lg md:text-muted md:shadow-none">
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
      className="about-mobile-light-surface relative isolate overflow-hidden bg-[linear-gradient(145deg,var(--color-navy-900),rgb(10_30_54),var(--color-navy-950))] py-12 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_24%,rgb(47_130_245_/_16%),transparent_24rem),radial-gradient(circle_at_88%_74%,rgb(228_196_119_/_12%),transparent_26rem)]"
      />
      <Background3DShapes
        variant="services-blue"
        intensity="strong"
        className="opacity-35 max-md:opacity-12"
      />
      <Container size="wide" className="relative">
        <DirectionalReveal direction="right" className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Leadership team</p>
          <h2 id="leadership-profiles-heading" className="mt-4 text-[var(--text-h1)] text-[var(--color-navy-900)] md:text-foreground">The people who turn vision into progress.</h2>
        </DirectionalReveal>

        <div className="mx-auto mt-9 grid max-w-6xl gap-5 md:mt-12 md:grid-cols-2 md:gap-7">
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
                className="group grid min-h-[18rem] grid-cols-[minmax(7.5rem,0.82fr)_minmax(0,1.18fr)] overflow-hidden rounded-[1.6rem] border border-blue-200 bg-[linear-gradient(135deg,#ffffff,#edf5ff)] shadow-[0_20px_52px_rgb(23_105_224_/_14%),inset_0_1px_0_rgb(255_255_255_/_90%)] sm:min-h-[22rem] sm:rounded-[2rem] md:border-blue-200 md:shadow-[0_24px_62px_rgb(0_0_0_/_22%),inset_0_1px_0_rgb(255_255_255_/_90%)]"
              >
                <div className="relative min-h-full overflow-hidden border-r border-blue-300/20">
                  <Image
                    src={profile.imageUrl}
                    alt={profile.imageAlt}
                    fill
                    sizes="(max-width: 767px) 40vw, 20vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(5_11_24_/_2%),rgb(5_11_24_/_55%))]" />
                  <span aria-hidden="true" className="absolute left-4 top-5 h-px w-10 bg-accent" />
                </div>
                <div className="relative flex flex-col justify-center p-5 sm:p-7">
                  <p className="text-[0.625rem] font-semibold uppercase tracking-[0.17em] text-accent">Leadership profile</p>
                  <h3 className="mt-3 text-xl font-semibold leading-tight text-[var(--color-navy-900)] sm:text-2xl">{profile.name}</h3>
                  <p className="mt-2 text-xs font-semibold uppercase leading-5 tracking-[0.12em] text-[var(--color-blue-600)]">{profile.title}</p>
                  <p className="mt-4 text-sm leading-6 text-[#53647d] sm:text-base sm:leading-7">{profile.description}</p>
                </div>
              </motion.article>
            </DirectionalReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CompanyFoundationsSection() {
  return (
    <SpatialSection
      aria-labelledby="company-foundations-heading"
      spacing="spacious"
      className="about-mobile-light-surface relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-navy-950),rgb(9_27_50),var(--color-navy-900))]"
    >
      <Background3DShapes variant="services-blue" intensity="strong" className="opacity-35 max-md:opacity-12" />
      <Container size="wide" className="relative">
        <DirectionalReveal direction="left" className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Company foundations</p>
          <h2 id="company-foundations-heading" className="mt-4 text-[var(--text-h1)] text-[var(--color-navy-900)] md:text-foreground">
            Technology decisions should create confidence, not complexity.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#53647d] md:text-muted">
            InnovGen Technology Solutions LLC works as a customer-first technology transformation partner, aligning enterprise infrastructure with the operating realities of each organization.
          </p>
        </DirectionalReveal>

        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
          {aboutFoundations.map((foundation, index) => (
            <DirectionalReveal key={foundation.title} direction={index % 2 === 0 ? "left" : "right"}>
              <article className="h-full rounded-2xl border border-blue-200 bg-white p-6 shadow-[0_18px_44px_rgb(23_105_224_/_10%)] md:rounded-[1.75rem] md:bg-[linear-gradient(145deg,rgb(13_40_73_/_95%),rgb(5_16_33_/_98%))] md:p-8 md:shadow-[0_22px_52px_rgb(0_0_0_/_18%)]">
                <p className="font-mono text-xs font-semibold tracking-[0.16em] text-[var(--color-blue-600)] md:text-accent">0{index + 1}</p>
                <h3 className="mt-5 text-2xl text-[var(--color-navy-900)] md:text-foreground">{foundation.title}</h3>
                <p className="mt-4 leading-relaxed text-[#53647d] md:text-blue-100">{foundation.description}</p>
              </article>
            </DirectionalReveal>
          ))}
        </div>
      </Container>
    </SpatialSection>
  );
}

function EnterpriseExpertiseSection() {
  const links = [
    { href: "/services", label: "Explore services" },
    { href: "/partners", label: "Meet our partners" },
    { href: "/projects", label: "View client work" },
    { href: "/blogs", label: "Read our insights" },
    { href: "/careers", label: "Join InnovGen" },
    { href: "/consultation", label: "Start a consultation" },
  ];

  return (
    <SpatialSection
      aria-labelledby="enterprise-expertise-heading"
      spacing="spacious"
      className="about-mobile-light-surface relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-navy-900),rgb(11_31_55),var(--color-navy-950))]"
    >
      <Container size="wide" className="relative">
        <DirectionalReveal direction="right" className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Enterprise capabilities</p>
          <h2 id="enterprise-expertise-heading" className="mt-4 text-[var(--text-h1)] text-[var(--color-navy-900)] md:text-foreground">
            Infrastructure expertise for resilient, scalable business operations.
          </h2>
        </DirectionalReveal>

        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6">
          {aboutExpertise.map((item, index) => (
            <DirectionalReveal key={item.title} direction={index % 2 === 0 ? "left" : "right"}>
              <article className="h-full rounded-2xl border border-blue-200 bg-white p-6 shadow-[0_18px_44px_rgb(23_105_224_/_10%)] md:rounded-[1.75rem] md:border-blue-300/20 md:bg-[linear-gradient(145deg,rgb(13_40_73_/_92%),rgb(5_16_33_/_98%))] md:p-8 md:shadow-[0_22px_52px_rgb(0_0_0_/_18%)]">
                <h3 className="text-2xl text-[var(--color-navy-900)] md:text-foreground">{item.title}</h3>
                <p className="mt-4 leading-relaxed text-[#53647d] md:text-blue-100">{item.description}</p>
              </article>
            </DirectionalReveal>
          ))}
        </div>

        <nav aria-label="Explore InnovGen" className="mt-10 flex flex-wrap gap-x-6 gap-y-4 border-t border-blue-300/20 pt-7 md:mt-14">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-blue-600)] transition-colors hover:text-[var(--color-navy-900)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 md:text-blue-200 md:hover:text-white">
              {link.label}
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </nav>
      </Container>
    </SpatialSection>
  );
}

function AboutFaqSection() {
  return (
    <SpatialSection aria-labelledby="about-faq-heading" spacing="spacious" className="about-mobile-light-surface relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-navy-950),rgb(9_27_50),var(--color-navy-900))]">
      <Container size="standard" className="relative">
        <DirectionalReveal direction="left" className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">About InnovGen</p>
          <h2 id="about-faq-heading" className="mt-4 text-[var(--text-h1)] text-[var(--color-navy-900)] md:text-foreground">Questions enterprise teams ask before they begin.</h2>
        </DirectionalReveal>
        <div className="mt-10 divide-y divide-blue-300/20 border-y border-blue-300/20 md:mt-14">
          {aboutFaqs.map((faq, index) => (
            <DirectionalReveal key={faq.question} direction={index % 2 === 0 ? "right" : "left"}>
              <details className="group py-5 md:py-6">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-[var(--color-navy-900)] marker:content-none md:text-foreground">
                  <h3>{faq.question}</h3>
                  <ArrowDown aria-hidden="true" className="size-5 shrink-0 text-[var(--color-blue-600)] transition-transform group-open:rotate-180 md:text-blue-300" />
                </summary>
                <p className="max-w-3xl pb-1 pt-3 leading-relaxed text-[#53647d] md:text-blue-100">{faq.answer}</p>
              </details>
            </DirectionalReveal>
          ))}
        </div>
      </Container>
    </SpatialSection>
  );
}

function ProcessSection() {
  return (
    <SpatialSection
      aria-labelledby="how-we-work-heading"
      spacing="spacious"
      className="about-mobile-light-surface relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-navy-900),var(--color-navy-950))]"
    >
      <Container size="wide" className="relative">
        <DirectionalReveal direction="left">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            How we work
          </p>
          <h2
            id="how-we-work-heading"
            className="mt-4 text-[var(--text-h1)] text-[var(--color-navy-900)] md:text-foreground"
          >
            From business need to confident launch.
          </h2>
        </DirectionalReveal>

        <div className="mt-9 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(16rem,0.75fr)_minmax(0,2.25fr)] lg:gap-20">
          <DirectionalReveal
            direction="left"
              className="border-l-2 border-accent/55 pl-6 text-[var(--color-navy-900)] md:pl-9 md:text-foreground lg:sticky lg:top-32 lg:self-start"
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
                  className="group relative border-b border-border last:border-b-0 max-md:rounded-2xl max-md:border max-md:border-blue-200 max-md:bg-[linear-gradient(135deg,#ffffff,#edf5ff)] max-md:px-5 max-md:shadow-[0_18px_44px_rgb(23_105_224_/_10%),inset_0_1px_0_rgb(255_255_255_/_90%)]"
                >
                  <DirectionalReveal
                    direction={index % 2 === 0 ? "right" : "left"}
                    className="grid gap-4 py-6 md:grid-cols-[4.5rem_1fr_auto] md:items-center md:gap-8 md:py-10"
                  >
                    <span className="font-mono text-sm font-semibold text-accent">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-2xl text-[var(--color-navy-900)] transition-colors duration-[var(--duration-standard)] group-hover:text-[var(--color-blue-600)] md:text-3xl md:text-foreground md:group-hover:text-blue-300">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-2xl leading-relaxed text-[#53647d] md:text-muted">
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
      className="about-mobile-light-surface relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-navy-950),rgb(10_29_52),var(--color-navy-900))]"
    >
      <Background3DShapes
        variant="services-blue"
        intensity="strong"
        className="opacity-50 max-md:opacity-14"
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
              className="mt-4 max-w-3xl text-[var(--text-h1)] text-[var(--color-navy-900)] md:text-foreground"
            >
              A partner built for meaningful, lasting progress.
            </h2>
          </div>
          <Button
            href="/consultation"
            className="group w-fit shrink-0 md:hidden"
          >
            Work with us
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1 motion-reduce:transform-none"
            />
          </Button>
          <Button
            href="/consultation"
            variant="secondary"
            className="group hidden w-fit shrink-0 md:inline-flex"
          >
            Work with us
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1 motion-reduce:transform-none"
            />
          </Button>
        </DirectionalReveal>

        <div className="relative mt-12 md:hidden">
          <span
            aria-hidden="true"
            className="absolute bottom-10 left-8 top-8 w-px bg-[linear-gradient(180deg,transparent,var(--color-blue-300),var(--color-blue-300),transparent)]"
          />
          <ol className="relative space-y-0">
            {aboutProofs.map((proof, index) => {
              const Icon = proof.icon;

              return (
                <li key={proof.title} className="relative pb-9 last:pb-0">
                  <DirectionalReveal direction={index % 2 === 0 ? "right" : "left"}>
                    <div className="grid grid-cols-[4rem_minmax(0,1fr)] gap-5">
                    <span className="relative z-10 grid size-16 place-items-center rounded-full border border-blue-200 bg-[radial-gradient(circle_at_30%_20%,#ffffff,#e8f1ff)] text-[var(--color-blue-600)] shadow-[0_12px_28px_rgb(23_105_224_/_16%),inset_0_1px_0_rgb(255_255_255_/_90%)]">
                      <Icon aria-hidden="true" className="size-7 stroke-[1.65]" />
                    </span>
                    <div className="border-b border-blue-200/80 pb-9 last:border-b-0">
                      <p className="font-mono text-sm font-semibold tracking-[0.08em] text-[var(--color-blue-600)]">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <span aria-hidden="true" className="mt-3 block h-px w-7 bg-[var(--color-blue-500)]" />
                      <h3 className="mt-5 text-[1.45rem] font-semibold leading-[1.15] tracking-[-0.025em] text-[var(--color-navy-900)]">
                        {proof.title}
                      </h3>
                      <p className="mt-3 max-w-[25rem] text-base leading-6 text-[#53647d]">
                        {proof.description}
                      </p>
                    </div>
                    </div>
                  </DirectionalReveal>
                </li>
              );
            })}
          </ol>
        </div>

        <DirectionalReveal direction="right" className="mt-9 hidden md:mt-14 md:block">
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
                  className="group relative flex min-h-32 cursor-pointer flex-col items-start justify-between rounded-2xl border border-blue-300/25 bg-[linear-gradient(135deg,rgb(13_40_73_/_96%),rgb(5_16_33_/_98%))] px-5 py-5 text-left shadow-[0_14px_36px_rgb(0_0_0_/_18%)] transition-colors hover:bg-[var(--color-navy-800)] focus-visible:bg-[var(--color-navy-800)] sm:min-h-36 sm:rounded-none sm:border-0 sm:border-b sm:border-blue-300/20 sm:bg-transparent sm:px-5 sm:py-6 sm:shadow-none sm:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b-0 xl:border-r xl:last:border-r-0 md:px-7"
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
                  <span className="mt-6 text-lg font-semibold text-[#f5f8fc] sm:mt-8">
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
            className="grid min-h-60 items-center gap-6 rounded-[1.5rem] border border-blue-300/25 bg-[linear-gradient(135deg,rgb(13_40_73_/_96%),rgb(5_16_33_/_98%))] p-6 shadow-[0_20px_48px_rgb(0_0_0_/_22%)] sm:rounded-none sm:border-x-0 sm:border-t-0 sm:border-b sm:border-blue-300/20 sm:bg-transparent sm:p-0 sm:py-10 sm:shadow-none md:grid-cols-[auto_1fr] md:gap-12 md:py-14"
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
                <h3 className="mt-4 text-3xl text-[#f5f8fc] md:text-5xl">
                  {activeProof.title}
                </h3>
                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-blue-100 md:text-xl">
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
    <div className="overflow-x-clip">
      <h1 className="sr-only">About InnovGen</h1>
      <FounderHero />
      <LeadershipProfiles />
      <CompanyStory />
      <CompanyFoundationsSection />
      <EnterpriseExpertiseSection />
      <ProcessSection />
      <ProofSection />
     
      <TrustedClientsDirectory variant="home" />
      <AboutFaqSection />
      <DirectionalReveal direction="right" mobileOnly>
        <FinalCtaSection />
      </DirectionalReveal>
    </div>
  );
}
