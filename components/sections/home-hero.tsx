"use client";

import Link from "next/link";
import { ArrowRight, Check, Cloud, Database, Network, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { SceneSection } from "@/components/three/scene-section";
import { Container } from "@/components/ui/container";

type HomeHeroProps = {
  description: string;
  eyebrow: string;
  title: string;
};

type Industry = {
  name: string;
  description: string;
  image: string;
};

const industries: readonly Industry[] = [
  {
    name: "Healthcare",
    description: "Resilient systems for always-on care.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=82",
  },
  {
    name: "Education",
    description: "Connected campuses built to scale.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=82",
  },
  {
    name: "Government",
    description: "Secure infrastructure for public services.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=82",
  },
  {
    name: "Hospitality",
    description: "Connected experiences across every property.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=82",
  },
  {
    name: "Finance",
    description: "Governed platforms for critical operations.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=82",
  },
  {
    name: "Manufacturing",
    description: "Operational visibility from edge to cloud.",
    image: "https://images.unsplash.com/photo-1563770660941-10a63607692e?auto=format&fit=crop&w=1200&q=82",
  },
  {
    name: "Logistics",
    description: "Reliable technology for moving operations.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=82",
  },
  {
    name: "Real Estate",
    description: "Smart foundations for modern spaces.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=82",
  },
] as const;

const capabilities = [
  { label: "Cloud", icon: Cloud, className: "left-[4%] top-[18%]" },
  { label: "Security", icon: ShieldCheck, className: "right-[4%] top-[14%]" },
  { label: "Networking", icon: Network, className: "right-[5%] bottom-[14%]" },
  { label: "Data centers", icon: Database, className: "left-[4%] bottom-[15%]" },
] as const;

const heroEase = [0.16, 1, 0.3, 1] as const;

function InfrastructureFlow({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="relative mx-auto h-[30rem] w-full max-w-[46rem] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_86%,transparent)] sm:h-[34rem] lg:h-[38rem]">
      <div aria-hidden="true" className="absolute left-[44%] top-0 h-full w-px bg-[linear-gradient(transparent,rgb(94_174_255_/_30%),transparent)]" />
      {industries.slice(0, 5).map((industry, index) => (
        <motion.article
          key={industry.name}
          initial={reducedMotion ? false : { opacity: 0, y: -260, x: -32, rotate: -3, scale: 0.82 }}
          animate={
            reducedMotion
              ? { opacity: 1, y: 58 + index * 16, x: index * 28, rotate: index % 2 ? 2 : -2, scale: 1 }
              : {
                  opacity: [0, 0, 1, 1, 0],
                  y: [-280, -150, 112, 405, 560],
                  x: [-58, -38 + index * 18, index * 14, 66 + index * 34, 230 + index * 42],
                  rotate: [-5, -3, index % 2 ? 2 : -2, 4, 8],
                  scale: [0.78, 0.9, 1, 0.94, 0.82],
                }
          }
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  duration: 15,
                  delay: index * -2.85,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.15, 0.48, 0.8, 1],
                }
          }
          className="absolute left-[18%] top-0 h-[13.5rem] w-[19rem] overflow-hidden rounded-[1.5rem] border border-blue-200/25 bg-[#0a1c30] shadow-[0_24px_55px_rgb(0_0_0_/_40%)] will-change-transform sm:left-[20%] sm:h-[15.5rem] sm:w-[24rem] lg:left-[16%] lg:h-[17.5rem] lg:w-[28rem]"
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${industry.image}')` }} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(4_15_29_/_6%),rgb(4_15_29_/_15%)_40%,rgb(4_15_29_/_92%))]" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-blue-200">Enterprise IT</p>
            <h2 className="mt-1.5 text-xl font-semibold tracking-[-0.04em] text-white sm:text-2xl">{industry.name}</h2>
            <p className="mt-1 text-sm text-blue-100/80">{industry.description}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

export function HomeHero({ description, eyebrow }: HomeHeroProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <SceneSection
      sceneId="home-hero"
      className="relative isolate min-h-[calc(100dvh-5rem)] overflow-hidden bg-[#071423] text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/home_hero_bg.jpg')" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[#071423]/55" />
      <div aria-hidden="true" className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgb(87_154_239_/_8%)_1px,transparent_1px),linear-gradient(90deg,rgb(87_154_239_/_8%)_1px,transparent_1px)] [background-size:54px_54px]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_78%_43%,rgb(25_107_210_/_28%),transparent_29rem),radial-gradient(circle_at_14%_90%,rgb(9_66_137_/_24%),transparent_33rem),linear-gradient(120deg,#071423_0%,#071a2c_57%,#071423_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_16%_24%,rgb(113_197_255_/_9%)_0_1px,transparent_1.5px),radial-gradient(circle_at_74%_72%,rgb(113_197_255_/_10%)_0_1px,transparent_1.5px)] [background-size:88px_88px,116px_116px]" />

      <Container size="wide" className="relative z-10 grid min-h-[calc(100dvh-5rem)] items-center gap-8 py-12 pb-16 lg:grid-cols-[minmax(0,45%)_minmax(0,55%)] lg:py-16">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.7, ease: heroEase }}
          className="max-w-xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">{eyebrow}</p>
          <h1 className="mt-5 text-balance text-[clamp(2.7rem,6vw,5.7rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-white">
            Enterprise IT infrastructure <span className="text-blue-400">built for modern business.</span>
          </h1>
          <p className="mt-6 max-w-[36rem] text-base leading-7 text-blue-100/78 sm:text-lg">
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
          <p className="mt-6 flex items-center gap-2 text-sm text-blue-100/72"><Check className="size-4 text-blue-300" aria-hidden="true" /> Trusted by enterprises across UAE</p>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.9, delay: 0.12, ease: heroEase }}
          className="relative min-w-0"
        >
          {capabilities.map(({ label, icon: Icon, className }, index) => (
            <motion.div
              key={label}
              animate={reducedMotion ? undefined : { y: [0, index % 2 === 0 ? -7 : 7, 0] }}
              transition={{ duration: 4.8 + index * 0.35, delay: index * 0.3, repeat: Infinity, ease: "easeInOut" }}
              className={`pointer-events-none absolute z-20 hidden items-center gap-2 rounded-2xl border border-blue-200/20 bg-[#0c213a]/75 px-3 py-2 text-xs font-medium text-blue-100 shadow-[0_12px_28px_rgb(0_0_0_/_22%)] backdrop-blur-md xl:flex ${className}`}
            >
              <Icon className="size-4 text-blue-300" aria-hidden="true" /> {label}
            </motion.div>
          ))}
          <InfrastructureFlow reducedMotion={reducedMotion} />
          <p className="mt-1 text-center text-xs text-blue-100/56">Enterprise solutions in motion</p>
        </motion.div>
      </Container>
    </SceneSection>
  );
}
