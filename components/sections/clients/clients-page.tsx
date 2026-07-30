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
              Trusted client network
            </p>
            <h1 className="mt-5 text-[length:var(--text-display)]">
              Technology trusted by organizations that move with purpose.
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

    </>
  );
}
