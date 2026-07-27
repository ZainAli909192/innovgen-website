"use client";

import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Background3DShapes } from "@/components/motion/background-3d-shapes";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { clientMarks } from "@/config/clients";

const cardDirections = [
  { x: -72, rotateY: 14 },
  { y: 64, rotateX: -12 },
  { x: 72, rotateY: -14 },
  { x: -72, rotateY: 14 },
  { y: 64, rotateX: -12 },
  { x: 72, rotateY: -14 },
] as const;

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

      <Section spacing="spacious" className="relative isolate overflow-hidden">
        <Background3DShapes variant="orbits" intensity="subtle" />
        <Container size="wide" className="relative z-10">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Where we contribute</p>
            <h2 className="mt-4 text-[length:var(--text-h2)]">Built around the way your organization operates.</h2>
            <p className="mt-5 text-lg text-muted">
              Explore the environments where our teams bring strategy, platforms, security and delivery together.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 [perspective:1400px] sm:grid-cols-2 xl:grid-cols-3">
            {clientMarks.map((client, index) => {
              const direction = cardDirections[index];

              return (
                <motion.article
                  key={client.id}
                  initial={reducedMotion ? false : { opacity: 0, scale: 0, ...direction }}
                  whileInView={{ opacity: 1, scale: 1, x: 0, y: 0, rotateX: 0, rotateY: 0 }}
                  whileHover={reducedMotion ? undefined : { y: -8, scale: 1.018, rotateX: 2, rotateY: index % 2 ? -2 : 2 }}
                  viewport={{ once: false, amount: 0.22 }}
                  transition={{ duration: reducedMotion ? 0 : 0.62, delay: reducedMotion ? 0 : Math.min(index * 0.06, 0.24), ease: [0.22, 1, 0.36, 1] }}
                  className="group relative min-h-[23rem] overflow-hidden rounded-[1.75rem] border border-blue-300/25 bg-surface shadow-[0_26px_70px_rgb(0_0_0_/_32%),inset_0_1px_0_rgb(255_255_255_/_8%)] [transform-style:preserve-3d]"
                >
                  <Image
                    src={client.imageUrl}
                    alt={client.imageAlt}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-110 motion-reduce:transform-none"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(5_11_24_/_4%)_8%,rgb(5_11_24_/_18%)_38%,rgb(5_11_24_/_94%)_100%)]" />
                  <div className="relative flex min-h-[23rem] flex-col justify-end p-7">
                    <span className="mb-auto inline-flex w-fit rounded-full border border-blue-300/35 bg-[rgb(5_20_40_/_58%)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-300 backdrop-blur-sm">
                      Client sector
                    </span>
                    <span className="h-0.5 w-12 bg-accent shadow-[0_0_16px_rgb(228_196_119_/_55%)]" />
                    <h3 className="mt-4 text-[length:var(--text-h3)] text-foreground">{client.name}</h3>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-blue-100/85">{client.alt}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </Section>

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
