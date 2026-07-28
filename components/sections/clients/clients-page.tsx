"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Background3DShapes } from "@/components/motion/background-3d-shapes";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { TrustedClientsDirectory } from "./trusted-clients-directory";

export function ClientsPage() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <>
      <Section spacing="spacious" className="relative isolate overflow-hidden border-b border-border bg-[linear-gradient(145deg,var(--color-navy-950),var(--color-navy-800))]">
        <Background3DShapes variant="network" intensity="medium" />
        <Container size="wide" className="relative z-10">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0, y: 52, rotateX: 14 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl [perspective:1200px]"
          >
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              <Sparkles aria-hidden="true" className="size-4" />
              Client sectors
            </p>
            <h1 className="mt-5 text-[length:var(--text-display)]">
              Technology that earns trust in complex environments.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted md:text-xl">
              InnovGen supports organizations where resilience, clarity and practical delivery matter most.
            </p>
            <Button href="/consultation" size="lg" className="mt-9">
              Start a conversation
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Button>
          </motion.div>
        </Container>
      </Section>

      <TrustedClientsDirectory variant="page" />

      <Section tone="surface">
        <Container>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0, y: 40, rotateX: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: reducedMotion ? 0 : 0.64, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-[2rem] border border-blue-300/20 bg-[linear-gradient(135deg,var(--color-navy-800),var(--color-navy-900))] p-8 shadow-[0_30px_100px_rgb(23_105_224_/_12%)] md:flex md:items-end md:justify-between md:gap-10 md:p-12"
          >
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Your organization</p>
              <h2 className="mt-4 text-[length:var(--text-h2)]">Let’s shape the next reliable step.</h2>
              <p className="mt-5 text-lg text-muted">Tell us about the technology challenge in front of your team.</p>
            </div>
            <Button href="/consultation" size="lg" className="mt-8 shrink-0 md:mt-0">
              Let&apos;s discuss
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Button>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
