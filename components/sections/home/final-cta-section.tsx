"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const ease = [0.22, 1, 0.36, 1] as const;

export function FinalCtaSection() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-navy-950),var(--color-navy-900))] py-16 md:py-24"
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 top-10 size-36 rounded-[42%] border border-accent/30 bg-accent/[0.06] shadow-[inset_10px_10px_28px_rgb(255_255_255_/_10%),inset_-12px_-12px_32px_rgb(83_50_4_/_26%),0_0_44px_rgb(201_154_50_/_15%)]"
        animate={reducedMotion ? undefined : { x: [0, 20, 0], y: [0, 16, 0], rotate: [0, 13, 0] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 size-48 rounded-full border border-accent/25 bg-[radial-gradient(circle_at_32%_28%,rgb(255_239_184_/_18%),rgb(201_154_50_/_5%)_48%,transparent_70%)]"
        animate={reducedMotion ? undefined : { x: [0, -18, 0], y: [0, -22, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 1200 280"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 text-accent/30"
      >
        <motion.path
          d="M0 208C174 208 210 74 428 120s264 144 430 45 236-61 342-75"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: reducedMotion ? 0 : 1.1, ease }}
        />
      </motion.svg>

      <Container size="wide" className="relative">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 38, rotateX: 4, scale: 0.975 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: reducedMotion ? 0 : 0.65, ease }}
          className="relative overflow-hidden rounded-[2rem] border border-accent/25 bg-[linear-gradient(135deg,rgb(18_49_83_/_96%),rgb(7_20_38_/_98%)_55%,rgb(20_38_55_/_96%))] px-6 py-10 shadow-[inset_0_1px_0_rgb(255_255_255_/_12%),inset_-16px_-18px_42px_rgb(0_0_0_/_20%),0_34px_90px_rgb(0_0_0_/_28%),0_0_60px_rgb(201_154_50_/_8%)] sm:px-10 md:px-14 md:py-14"
          style={{ transformPerspective: 1200 }}
        >
          <div aria-hidden="true" className="absolute right-[18%] top-0 h-px w-24 bg-[linear-gradient(90deg,transparent,var(--color-gold-300),transparent)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Ready to go digital?
              </p>
              <h2 id="final-cta-heading" className="mt-4 max-w-2xl text-[clamp(2.4rem,5vw,4.75rem)]">
                Let&apos;s discuss.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-blue-200 sm:text-lg">
                Share your next challenge with InnovGen and we&apos;ll help shape a secure, scalable way forward.
              </p>
            </div>
            <Button
              href="/consultation"
              size="lg"
              className="group w-fit border border-accent/35 bg-[var(--color-gold-500)] text-[var(--color-navy-950)] shadow-[0_14px_34px_rgb(201_154_50_/_22%),inset_0_1px_0_rgb(255_255_255_/_32%)] hover:bg-[var(--color-gold-300)]"
            >
              Request a quote
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
