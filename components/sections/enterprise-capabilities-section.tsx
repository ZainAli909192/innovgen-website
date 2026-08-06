"use client";

import {
  Cpu,
  Repeat,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { Container } from "@/components/ui/container";
import {
  enterpriseCapabilities,
  type EnterpriseCapabilityIcon,
} from "@/config/enterprise-capabilities";
import { motionEase } from "@/config/motion";

const capabilityIcons: Record<EnterpriseCapabilityIcon, LucideIcon> = {
  people: Users,
  process: Repeat,
  technology: Cpu,
};

export function EnterpriseCapabilitiesSection() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.section
      aria-labelledby="enterprise-capabilities-heading"
      className="relative isolate overflow-hidden bg-[var(--color-navy-950)] py-20 text-foreground md:py-28 lg:py-32"
      initial={reducedMotion ? false : { opacity: 0, x: -50, scale: 0.92 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: motionEase }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(rgb(131_185_255_/_7%)_1px,transparent_1px),linear-gradient(90deg,rgb(131_185_255_/_7%)_1px,transparent_1px)] [background-size:4.5rem_4.5rem] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-12 size-[28rem] rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 size-[34rem] rounded-full bg-blue-300/10 blur-3xl"
      />

      <Container size="wide" className="relative">
        <motion.div
          className="grid gap-7 border-b border-blue-300/20 pb-10 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:items-end md:gap-12 md:pb-14"
          initial={reducedMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: motionEase }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            Enterprise capabilities
          </p>
          <h2
            id="enterprise-capabilities-heading"
            className="max-w-[24ch] text-[clamp(1.75rem,3.1vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground"
          >
            Infrastructure expertise for resilient, scalable business operations.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-7 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-10">
          {enterpriseCapabilities.map((capability, index) => {
            const Icon = capabilityIcons[capability.icon];
            const fromLeft = index % 2 === 0;

            return (
              <motion.article
                key={capability.title}
                className="group relative min-h-[22rem] overflow-visible rounded-[2rem] border border-blue-300/20 bg-[linear-gradient(145deg,var(--color-navy-800),var(--color-navy-900)_55%,var(--color-navy-950))] px-6 pb-8 pt-20 shadow-[0_28px_80px_rgb(0_0_0_/_28%)] [transform-style:preserve-3d] sm:min-h-[20rem] sm:px-8 sm:pb-9 md:col-span-1 md:min-h-[23rem] md:px-10 md:pb-10 md:pt-24"
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        x: fromLeft ? -64 : 64,
                        y: 30,
                        scale: 0.92,
                        rotateY: fromLeft ? 7 : -7,
                      }
                }
                whileInView={
                  reducedMotion
                    ? undefined
                    : { opacity: 1, x: 0, y: 0, scale: 1, rotateY: 0 }
                }
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: motionEase }}
                whileHover={reducedMotion ? undefined : { y: -8, scale: 1.015 }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-blue-500),transparent)] opacity-80"
                />
                <div className="absolute left-6 top-0 grid size-24 -translate-y-1/3 place-items-center rounded-full border border-blue-300/35 bg-primary text-white shadow-[0_18px_50px_rgb(47_130_245_/_30%)] transition-transform duration-[var(--duration-standard)] ease-[var(--ease-out)] group-hover:-translate-y-[42%] sm:left-8 md:left-10 md:size-28 motion-reduce:transform-none">
                  <Icon className="size-10 stroke-[1.5] md:size-12" />
                </div>

                <p className="font-mono text-xs font-semibold tracking-[0.2em] text-blue-300">
                  0{index + 1}
                </p>
                <h3 className="mt-5 max-w-[22ch] text-[clamp(1.65rem,2.5vw,2.35rem)] font-semibold leading-tight tracking-[-0.025em] text-foreground">
                  {capability.title}
                </h3>
                <p className="mt-6 max-w-[60ch] text-base leading-7 text-blue-100/80 md:text-lg md:leading-8">
                  {capability.description}
                </p>

                <div
                  aria-hidden="true"
                  className="absolute -bottom-16 -right-16 size-44 rounded-full border border-blue-300/15 bg-primary/5 transition-transform duration-[var(--duration-emphasis)] ease-[var(--ease-out)] group-hover:-translate-x-4 group-hover:-translate-y-4 motion-reduce:transform-none"
                />
              </motion.article>
            );
          })}
        </div>
      </Container>
      </motion.section>
  );
}
