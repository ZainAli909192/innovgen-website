"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Plus } from "lucide-react";
import { Background3DShapes } from "@/components/motion/background-3d-shapes";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { clientFaqItems } from "@/config/clients-page";

export function PageReveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({
  items = clientFaqItems,
  idPrefix = "client-faq",
}: {
  items?: readonly FaqItem[];
  idPrefix?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className="mt-10 space-y-4">
      {items.map((item, index) => {
        const open = openIndex === index;
        const answerId = `${idPrefix}-answer-${index}`;

        return (
          <div key={item.question} className="relative max-w-3xl">
            <h3>
              <button
                type="button"
                aria-controls={answerId}
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? -1 : index)}
                className={`group relative z-10 flex min-h-[4.75rem] w-full items-center justify-between gap-4 rounded-[1.5rem] border px-5 py-4 text-left text-base font-semibold text-white shadow-[0_12px_28px_rgb(0_0_0_/_16%)] transition-[background-color,border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-blue-300/50 hover:bg-[var(--color-navy-800)] hover:shadow-[0_16px_34px_rgb(0_0_0_/_24%)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-6 sm:text-lg ${open ? "border-blue-300/45 bg-[var(--color-navy-800)] shadow-[0_16px_34px_rgb(0_0_0_/_24%)]" : "border-blue-300/25 bg-[linear-gradient(135deg,var(--color-navy-800),var(--color-navy-900))]"}`}
              >
                <span>{item.question}</span>
                <span className={`grid size-11 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color,transform] duration-300 ${open ? "border-blue-300/65 bg-[var(--color-blue-500)] text-white" : "border-blue-300/35 bg-blue-500/10 text-blue-100 group-hover:border-blue-300/60 group-hover:bg-blue-500/20"}`}>
                  <Plus aria-hidden="true" className={`size-5 transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  id={answerId}
                  initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={reducedMotion ? false : { y: -12, scale: 0.985 }}
                    animate={{ y: 0, scale: 1 }}
                    exit={reducedMotion ? undefined : { y: -8, scale: 0.99 }}
                    transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-3 -mt-2 rounded-b-[1.5rem] border border-t-0 border-blue-200/35 bg-[linear-gradient(140deg,rgb(255_255_255_/_98%),rgb(232_242_255_/_96%))] px-5 pb-6 pt-8 shadow-[0_18px_32px_rgb(0_0_0_/_15%)] sm:mx-5 sm:px-6"
                  >
                    <p className="max-w-2xl text-sm leading-7 text-[var(--color-navy-800)] sm:text-base">
                      {item.answer}
                    </p>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function ClientsFaqSection() {
  return (
    <Section spacing="spacious" className="relative isolate overflow-hidden border-t border-border bg-[linear-gradient(180deg,var(--color-navy-950),var(--color-navy-900))]">
      <Background3DShapes variant="geometry" intensity="subtle" />
      <Container size="wide" className="relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(22rem,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-24 xl:gap-32">
          <PageReveal className="lg:sticky lg:top-28">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Frequently asked questions</p>
            <h2 className="mt-4 max-w-[10ch] text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-white">Clear answers for complex environments.</h2>
            <p className="mt-8 max-w-sm text-base leading-7 text-blue-100/70">Common questions from UAE enterprise organizations.</p>
          </PageReveal>
          <PageReveal delay={0.1}>
            <FaqAccordion />
            <div className="mt-8 flex items-start gap-3 text-sm leading-6 text-blue-100/65">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
              <p>Have a specific infrastructure or managed operations question? Our team can help frame the next practical step.</p>
            </div>
          </PageReveal>
        </div>
      </Container>
    </Section>
  );
}
