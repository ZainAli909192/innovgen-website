"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Cloud,
  Database,
  MonitorCog,
  Network,
  ShieldCheck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useMobileLayout } from "@/hooks/use-mobile-layout";
import {
  partnerEcosystem,
  type PartnerEcosystemItem,
  type PartnerIconKey,
} from "@/config/partner-ecosystem";

const iconByKey: Record<Exclude<PartnerIconKey, "microsoft">, LucideIcon> = {
  cloud: Cloud,
  network: Network,
  data: Database,
  security: ShieldCheck,
  workplace: MonitorCog,
};

function PartnerIcon({ icon }: { icon: PartnerIconKey }) {
  if (icon === "microsoft") {
    return (
      <span aria-label="Microsoft" className="grid size-8 grid-cols-2 gap-1">
        <span className="bg-[#f25022]" />
        <span className="bg-[#7fba00]" />
        <span className="bg-[#00a4ef]" />
        <span className="bg-[#ffb900]" />
      </span>
    );
  }

  const Icon = iconByKey[icon];
  return <Icon aria-hidden="true" className="size-8" strokeWidth={1.65} />;
}

function PartnerDetails({ partner }: { partner: PartnerEcosystemItem }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.aside
        key={partner.name}
        initial={{ opacity: 0, x: 24, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -16, scale: 0.98 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[1.75rem] border border-blue-300/30 bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-navy-800)_92%,transparent),var(--color-navy-950))] p-6 shadow-[inset_0_1px_0_rgb(255_255_255_/_12%),0_22px_50px_rgb(0_0_0_/_28%)] xl:p-7"
      >
        <div className="flex items-center gap-4 text-foreground">
          <span className="grid size-14 place-items-center rounded-2xl border border-blue-300/35 bg-navy-950 text-blue-300">
            <PartnerIcon icon={partner.icon} />
          </span>
          <h2 className="text-3xl font-semibold tracking-tight">{partner.name}</h2>
        </div>
        <div className="mt-7 h-px w-12 bg-accent" />
        <h3 className="mt-6 text-xl font-semibold leading-snug text-accent">{partner.focus}</h3>
        <p className="mt-5 text-base leading-7 text-muted">{partner.description}</p>
        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.17em] text-accent">Capability areas</p>
          <ul className="mt-4 space-y-3" aria-label={`${partner.name} capability areas`}>
            {partner.areas.map((area) => (
              <li key={area} className="flex items-center gap-3 text-sm font-medium text-blue-100">
                <span aria-hidden="true" className="grid size-7 place-items-center rounded-full border border-blue-300/30 bg-blue-500/10 text-blue-300">
                  <Boxes className="size-3.5" />
                </span>
                {area}
              </li>
            ))}
          </ul>
        </div>
        <Button href="/consultation" className="mt-8 w-full bg-blue-600 text-white hover:bg-blue-500">
          Discuss solutions
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Button>
      </motion.aside>
    </AnimatePresence>
  );
}

const mobileGridPositions = [
  "col-start-1 row-start-1",
  "col-start-2 row-start-1",
  "col-start-3 row-start-1",
  "col-start-1 row-start-2",
  "col-start-3 row-start-2",
  "col-start-1 row-start-3",
  "col-start-2 row-start-3",
  "col-start-3 row-start-3",
] as const;

function MobilePartnerGrid({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="relative mx-auto grid w-full max-w-[28rem] grid-cols-3 grid-rows-3 gap-3 rounded-[2rem] border border-blue-300/25 bg-[linear-gradient(145deg,var(--color-navy-900),var(--color-navy-950))] p-3 shadow-[inset_0_1px_0_rgb(255_255_255_/_8%),0_20px_48px_rgb(0_0_0_/_26%)] md:hidden">
      {partnerEcosystem.map((partner, index) => {
        const isActive = index === activeIndex;
        return (
          <motion.button
            key={partner.name}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Show ${partner.name} details`}
            aria-current={isActive ? "true" : undefined}
            whileHover={{ y: -5, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`grid aspect-square cursor-pointer place-items-center rounded-2xl border p-2 text-center transition-[border-color,background-color,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${mobileGridPositions[index]} ${isActive ? "border-blue-300 bg-blue-500/15 text-blue-100 shadow-[0_0_20px_rgb(47_130_245_/_30%)]" : "border-blue-300/35 bg-navy-950 text-blue-300 hover:border-blue-300/75 hover:bg-blue-500/10"}`}
          >
            <PartnerIcon icon={partner.icon} />
            <span className="mt-1 text-[0.65rem] font-semibold leading-tight text-foreground">{partner.shortName}</span>
          </motion.button>
        );
      })}
      <div className="col-start-2 row-start-2 grid aspect-square place-items-center rounded-2xl border border-accent/40 bg-[radial-gradient(circle_at_35%_30%,color-mix(in_srgb,var(--color-blue-500)_25%,transparent),var(--color-navy-950))] p-2 text-center shadow-[0_0_24px_rgb(47_130_245_/_20%),inset_0_0_18px_rgb(228_196_119_/_12%)]">
        <div>
          <p aria-live="polite" className="mt-1 text-xs font-semibold leading-tight text-foreground">{partnerEcosystem[activeIndex].name}</p>
        </div>
      </div>
    </div>
  );
}

export function PartnerOrbitShowcase() {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMobileLayout();
  const orbitRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const activePartner = partnerEcosystem[activeIndex];
  const step = 360 / partnerEcosystem.length;

  useEffect(() => {
    const element = orbitRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || !visible) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % partnerEcosystem.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [reducedMotion, visible]);

  function selectPartner(index: number) {
    setActiveIndex((index + partnerEcosystem.length) % partnerEcosystem.length);
  }

  return (
    <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_52%_34%,color-mix(in_srgb,var(--color-blue-500)_14%,transparent),transparent_31rem),linear-gradient(150deg,var(--color-navy-950),var(--color-navy-900)_65%,var(--color-navy-950))] py-12 sm:py-16 lg:min-h-[calc(100svh-5rem)] lg:py-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-55 [background-image:linear-gradient(rgb(131_185_255_/_6%)_1px,transparent_1px),linear-gradient(90deg,rgb(131_185_255_/_6%)_1px,transparent_1px)] [background-size:3rem_3rem] [mask-image:linear-gradient(to_bottom,transparent,black_28%,black_78%,transparent)]" />
      <Container size="wide" className="relative">
        <div className="grid items-center gap-10 xl:grid-cols-[minmax(0,0.82fr)_minmax(34rem,1.65fr)_minmax(19rem,0.86fr)] xl:gap-7">
          <MobilePartnerGrid activeIndex={activeIndex} onSelect={selectPartner} />

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: reducedMotion ? 0 : 0.56, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-sm"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Our partners</p>
            <h1 className="mt-5 text-[clamp(2.65rem,4.5vw,4.6rem)] leading-[0.98] tracking-[-0.04em]">Stronger together, limitless possibilities.</h1>
            <div className="mt-7 h-1 w-12 rounded-full bg-accent" />
            <p className="mt-8 text-base leading-8 text-muted">We bring together practical technology capabilities to help organizations modernize with confidence and deliver meaningful business outcomes.</p>
            <Button href="/consultation" variant="secondary" className="mt-8 border-accent/55 text-accent hover:bg-accent/10">
              Partner with us
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Button>
          </motion.div>

          <motion.div
            ref={orbitRef}
            initial={reducedMotion ? false : isMobile ? { opacity: 0, x: 100 } : { opacity: 0, y: 34, scale: 0.94, rotateX: 8 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 1200 }}
            className="relative mx-auto hidden w-full max-w-[43rem] md:block"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-blue-300/30 bg-navy-950/40 p-1 shadow-[inset_0_1px_0_rgb(255_255_255_/_8%),0_20px_48px_rgb(0_0_0_/_26%)] sm:aspect-square sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
              <div aria-hidden="true" className="absolute inset-[5%] rounded-full border border-blue-300/30 shadow-[inset_0_0_48px_rgb(47_130_245_/_15%),0_0_40px_rgb(47_130_245_/_10%)]" />
              <div aria-hidden="true" className="absolute inset-[15%] rounded-full border border-blue-500/25" />
              <div aria-hidden="true" className="absolute inset-[28%] rounded-full border border-blue-300/20" />
              <div aria-hidden="true" className="absolute inset-[40%] rounded-full border border-accent/35 shadow-[0_0_32px_rgb(228_196_119_/_20%)]" />
              <motion.div
                animate={{ rotate: reducedMotion ? 0 : -activeIndex * step }}
                transition={{ duration: reducedMotion ? 0 : 0.68, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {partnerEcosystem.map((partner, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div key={partner.name} className="absolute left-1/2 top-1/2" style={{ transform: `translate(-50%, -50%) rotate(${index * step}deg) translateY(clamp(-12rem, -19vw, -7.5rem))` }}>
                      <motion.button
                        type="button"
                        onClick={() => selectPartner(index)}
                        aria-label={`Show ${partner.name} details`}
                        aria-current={isActive ? "true" : undefined}
                        animate={{ rotate: activeIndex * step, scale: isActive ? 1.1 : 1 }}
                        transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className={`grid h-24 w-32 cursor-pointer place-items-center rounded-2xl border p-3 text-center shadow-xl backdrop-blur-sm transition-colors sm:h-28 sm:w-40 ${isActive ? "border-accent/80 bg-[color-mix(in_srgb,var(--color-navy-950)_64%,transparent)] text-accent shadow-[0_0_30px_rgb(228_196_119_/_28%)]" : "border-blue-300/40 bg-[color-mix(in_srgb,var(--color-navy-900)_78%,transparent)] text-blue-300 hover:border-blue-300/70"}`}
                      >
                        <PartnerIcon icon={partner.icon} />
                        <span className="mt-1 text-xs font-semibold leading-tight text-foreground sm:text-sm">{partner.shortName}</span>
                      </motion.button>
                    </div>
                  );
                })}
              </motion.div>
              <div className="absolute inset-[35%] z-10 grid place-items-center rounded-full border border-blue-300/35 bg-[radial-gradient(circle_at_38%_28%,color-mix(in_srgb,var(--color-blue-500)_28%,transparent),var(--color-navy-950)_74%)] text-center shadow-[0_0_36px_rgb(47_130_245_/_24%),inset_0_0_28px_rgb(228_196_119_/_18%)]">
                <div>
                  <span className="font-display text-5xl font-semibold tracking-[-0.1em] text-accent sm:text-6xl">IG</span>
                  <p className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-blue-100">InnovGen</p>
                </div>
              </div>
            </div>
            <div className="mx-auto mt-2 flex w-fit items-center gap-4 rounded-full border border-blue-300/20 bg-navy-950/80 px-3 py-2 shadow-lg">
              <button type="button" onClick={() => selectPartner(activeIndex - 1)} aria-label="Previous partner capability" className="grid size-10 cursor-pointer place-items-center rounded-full text-blue-100 transition-colors hover:bg-blue-500/15 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">
                <ArrowLeft className="size-5" aria-hidden="true" />
              </button>
              <div className="flex gap-2" aria-label={`${activeIndex + 1} of ${partnerEcosystem.length}`}>
                {partnerEcosystem.map((partner, index) => <span key={partner.name} className={`size-2.5 rounded-full ${index === activeIndex ? "bg-accent" : "bg-blue-300/35"}`} />)}
              </div>
              <button type="button" onClick={() => selectPartner(activeIndex + 1)} aria-label="Next partner capability" className="grid size-10 cursor-pointer place-items-center rounded-full text-blue-100 transition-colors hover:bg-blue-500/15 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">
                <ArrowRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>

          <PartnerDetails partner={activePartner} />
        </div>

        <motion.dl
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: reducedMotion ? 0 : 0.48, delay: reducedMotion ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid overflow-hidden rounded-[1.75rem] border border-blue-300/20 bg-navy-900/70 sm:grid-cols-2 xl:grid-cols-4"
        >
          {[
            ["Cloud", "Modern platforms"],
            ["Data", "Decision-ready insight"],
            ["Security", "Resilient foundations"],
            ["Workplace", "Connected teams"],
          ].map(([value, label]) => (
            <div key={value} className="border-b border-blue-300/15 p-6 last:border-b-0 sm:nth-[2n]:border-l sm:nth-[2n]:border-l-blue-300/15 xl:border-b-0 xl:border-l xl:first:border-l-0">
              <dt className="text-2xl font-semibold text-accent">{value}</dt>
              <dd className="mt-1 text-sm text-muted">{label}</dd>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
