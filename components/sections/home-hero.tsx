"use client";

import { useEffect, useState } from "react";
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

const mobileClients = [
  "/clients%20logos/McDonalds_Logo.png",
  "/clients%20logos/cms.png",
  "/clients%20logos/rolls_royals.png",
  "/clients%20logos/fantco-logo.png",
] as const;

function useMobileViewport() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function MobileClientCarousel({ reducedMotion }: { reducedMotion: boolean }) {
  const cards = [...mobileClients, ...mobileClients];

  return (
    <div aria-hidden="true" className="relative mt-8 h-[8.5rem] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] lg:hidden">
      <motion.div
        className="absolute left-0 top-1/2 flex w-max -translate-y-1/2 gap-3 pr-3 will-change-transform"
        animate={reducedMotion ? { x: 0 } : { x: ["-50%", "0%"] }}
        transition={reducedMotion ? { duration: 0 } : { duration: 20, ease: "linear", repeat: Infinity }}
      >
        {cards.map((image, index) => (
          <div key={`${image}-${index}`} className="grid h-[7rem] w-[9.5rem] shrink-0 place-items-center rounded-2xl border border-blue-200/30 bg-[#0a1c30]/80 p-4 shadow-[0_12px_28px_rgb(2_13_35_/_30%)]">
            <div className="h-full w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url('${image}')` }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function HomeHero({ description, eyebrow }: HomeHeroProps) {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMobileViewport();

  return (
    <SceneSection
      sceneId="home-hero"
      className="relative isolate min-h-[calc(100dvh-5rem)] overflow-hidden bg-[#071423] text-white"
    >

      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-45"
        style={{ backgroundImage: "url('/home_hero_bg.jpg')" }}
        animate={isMobile && !reducedMotion ? { scale: [1, 1.035, 1] } : { scale: 1 }}
        transition={isMobile && !reducedMotion ? { duration: 7, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[#071423]/42" />
      <div aria-hidden="true" className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgb(87_154_239_/_8%)_1px,transparent_1px),linear-gradient(90deg,rgb(87_154_239_/_8%)_1px,transparent_1px)] [background-size:54px_54px]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_78%_43%,rgb(25_107_210_/_22%),transparent_29rem),radial-gradient(circle_at_14%_90%,rgb(9_66_137_/_18%),transparent_33rem)]" />
      <div aria-hidden="true" className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_16%_24%,rgb(113_197_255_/_9%)_0_1px,transparent_1.5px),radial-gradient(circle_at_74%_72%,rgb(113_197_255_/_10%)_0_1px,transparent_1.5px)] [background-size:88px_88px,116px_116px]" />

      <Container size="wide" className="relative z-10 grid min-h-[calc(100dvh-5rem)] items-center gap-8 py-12 pb-16 lg:grid-cols-[minmax(0,45%)_minmax(0,55%)] lg:py-16">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, x: -32, y: isMobile ? 0 : 30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
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
          <MobileClientCarousel reducedMotion={reducedMotion} />
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
