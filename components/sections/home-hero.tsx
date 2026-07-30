"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";
import { InfrastructureScrollObject } from "@/components/motion/infrastructure-scroll-object";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { SceneSection } from "@/components/three/scene-section";
import { Container } from "@/components/ui/container";

type HomeHeroProps = {
  description: string;
  eyebrow: string;
  title: string;
};

const heroEase = [0.16, 1, 0.3, 1] as const;

export function HomeHero({ description, eyebrow }: HomeHeroProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <SceneSection
      sceneId="home-hero"
      className="relative isolate min-h-[calc(100dvh-5rem)] overflow-hidden bg-[#071423] text-white"
    >

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-45"
        style={{ backgroundImage: "url('/home_hero_bg.jpg')" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[#071423]/42" />
      <div aria-hidden="true" className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgb(87_154_239_/_8%)_1px,transparent_1px),linear-gradient(90deg,rgb(87_154_239_/_8%)_1px,transparent_1px)] [background-size:54px_54px]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_78%_43%,rgb(25_107_210_/_22%),transparent_29rem),radial-gradient(circle_at_14%_90%,rgb(9_66_137_/_18%),transparent_33rem)]" />
      <div aria-hidden="true" className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_16%_24%,rgb(113_197_255_/_9%)_0_1px,transparent_1.5px),radial-gradient(circle_at_74%_72%,rgb(113_197_255_/_10%)_0_1px,transparent_1.5px)] [background-size:88px_88px,116px_116px]" />

      <Container size="wide" className="relative z-10 grid min-h-[calc(100dvh-5rem)] items-center gap-8 py-12 pb-16 lg:grid-cols-[minmax(0,45%)_minmax(0,55%)] lg:py-16">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.7, ease: heroEase }}
          className="max-w-xl"
        >
          <p className="hidden text-xs font-semibold uppercase tracking-[0.22em] text-blue-300 lg:block">
            {eyebrow}
          </p>
          <h1 className="max-w-[11ch] text-balance font-[family-name:var(--font-outfit)] text-[clamp(2.35rem,5.2vw,4.9rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-white lg:mt-5">
            <span className="block">Enterprise IT</span>
            <span className="block">infrastructure</span>
            <span className="mt-[0.08em] block text-blue-400">built for modern business.</span>
          </h1>
          <p className="mt-6 hidden max-w-[36rem] text-base leading-7 text-blue-100/78 lg:block lg:text-lg">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/consultation" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[var(--color-blue-600)] px-5 text-sm font-semibold text-white shadow-[0_14px_32px_rgb(31_111_235_/_28%)] transition hover:-translate-y-0.5 hover:bg-[var(--color-blue-500)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300">
              Get Free Consultation <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/services" className="inline-flex min-h-12 items-center gap-3 rounded-full border border-blue-200/30 bg-white/[0.045] px-5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-blue-200/55 hover:bg-white/[0.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300">
              Our Services <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-6 hidden items-center gap-2 text-sm text-blue-100/72 lg:flex"><Check className="size-4 text-blue-300" aria-hidden="true" /> Trusted by enterprises across UAE</p>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.9, delay: 0.12, ease: heroEase }}
          className="pointer-events-none relative hidden min-w-0 lg:absolute lg:inset-y-0 lg:right-0 lg:flex lg:w-[55%] lg:items-center lg:justify-center"
        >
          <InfrastructureScrollObject className="w-full max-w-[44rem]" />
        </motion.div>
      </Container>
    </SceneSection>
  );
}
