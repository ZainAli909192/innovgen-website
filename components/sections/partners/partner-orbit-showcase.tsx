"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Boxes, Check, GitBranch } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  partnerEcosystem,
  type PartnerEcosystemItem,
} from "@/config/partner-ecosystem";

function PartnerLogo({
  partner,
  className,
  decorative = true,
  transparent = false,
  cover = false,
}: {
  partner: PartnerEcosystemItem;
  className: string;
  decorative?: boolean;
  transparent?: boolean;
  cover?: boolean;
}) {
  return (
    <span
      className={`relative block overflow-hidden rounded-xl p-2 ${transparent ? "bg-transparent" : partner.logoTheme === "dark" ? "bg-navy-950" : "bg-white"} ${className}`}
    >
      <Image
        src={partner.logoPath}
        alt={decorative ? "" : `${partner.name} logo`}
        fill
        sizes="(max-width: 639px) 7rem, (max-width: 1023px) 9rem, 11rem"
        className={`object-contain ${cover ? "p-5" : "p-2"} ${transparent && (partner.id === "apple" || partner.id === "logitech") ? "brightness-0 invert" : ""}`}
      />
    </span>
  );
}

function PartnerDetails({ partner }: { partner: PartnerEcosystemItem }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.article
        key={partner.id}
        initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.985 }}
        transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full overflow-hidden rounded-[1.9rem] border border-blue-300/30 bg-[linear-gradient(145deg,rgb(19_57_97_/_96%),rgb(5_16_33_/_98%))] p-6 shadow-[inset_0_1px_0_rgb(255_255_255_/_12%),0_24px_60px_rgb(0_0_0_/_24%)] sm:p-8"
      >
        <span aria-hidden="true" className="absolute -right-20 -top-24 size-60 rounded-full border border-blue-300/20 bg-blue-500/[0.06]" />
        <span aria-hidden="true" className="absolute -bottom-16 -left-14 size-40 rounded-full border border-accent/20 bg-accent/[0.05]" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Featured technology partner
          </p>
          <PartnerLogo partner={partner} decorative={false} className="mt-6 h-16 w-44 sm:h-20 sm:w-52" />
          <h2 className="mt-7 text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">
            {partner.name}
          </h2>
          <p className="mt-3 text-lg font-semibold leading-snug text-blue-200">
            {partner.focus}
          </p>
          <p className="mt-5 max-w-[48ch] text-base leading-7 text-muted">
            {partner.description}
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2" aria-label={`${partner.name} capability areas`}>
            {partner.areas.map((area) => (
              <li key={area} className="flex items-center gap-3 text-sm font-medium text-blue-100">
                <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full border border-blue-300/25 bg-blue-500/10 text-blue-300">
                  <Boxes className="size-3.5" />
                </span>
                {area}
              </li>
            ))}
          </ul>
          <Button href="/consultation" className="mt-8 w-full bg-blue-600 text-white hover:bg-blue-500 sm:w-auto">
            Discuss solutions
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </motion.article>
    </AnimatePresence>
  );
}

const treePositions = [
  "lg:col-start-1 lg:row-start-1",
  "lg:col-start-1 lg:row-start-2",
  "lg:col-start-1 lg:row-start-3",
  "lg:col-start-1 lg:row-start-4",
  "lg:col-start-1 lg:row-start-5",
  "lg:col-start-5 lg:row-start-1",
  "lg:col-start-5 lg:row-start-2",
  "lg:col-start-5 lg:row-start-3",
  "lg:col-start-5 lg:row-start-4",
  "lg:col-start-5 lg:row-start-5",
  "lg:col-start-2 lg:row-start-1",
  "lg:col-start-4 lg:row-start-1",
  "lg:col-start-4 lg:row-start-5",
] as const;

function PartnerLeaf({
  partner,
  active,
  onSelect,
  placement,
  index,
}: {
  partner: PartnerEcosystemItem;
  active: boolean;
  onSelect: () => void;
  placement: string;
  index: number;
}) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.button
      type="button"
      aria-pressed={active}
      aria-label={`Show ${partner.name} details`}
      onClick={onSelect}
      whileHover={reducedMotion ? undefined : { y: -4, scale: 1.025 }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      animate={reducedMotion ? undefined : { y: [0, -3, 0] }}
      transition={{
        y: { duration: 4.2 + (index % 4) * 0.45, delay: index * 0.08, ease: "easeInOut", repeat: Infinity },
        default: { duration: reducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] },
      }}
      className={`group relative z-10 flex min-h-[8rem] cursor-pointer flex-col items-center justify-center overflow-hidden [clip-path:polygon(50%_0%,70%_7%,87%_24%,98%_45%,94%_65%,82%_84%,65%_96%,50%_100%,35%_96%,18%_84%,6%_65%,2%_45%,13%_24%,30%_7%)] border bg-transparent px-3 py-4 text-center shadow-[0_12px_26px_rgb(0_0_0_/_16%)] transition-[border-color,background-color,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent sm:min-h-36 sm:px-4 ${placement} ${active ? "border-2 border-accent bg-[radial-gradient(circle_at_50%_0%,rgb(40_105_170),rgb(8_28_53)_72%)] shadow-[0_16px_36px_rgb(0_0_0_/_26%),0_0_28px_rgb(228_196_119_/_22%)]" : "border-blue-300/35 bg-[radial-gradient(circle_at_50%_0%,rgb(17_62_108),rgb(5_19_39)_72%)] hover:border-blue-300/80 hover:bg-[radial-gradient(circle_at_50%_0%,rgb(25_81_138),rgb(7_26_51)_72%)]"}`}
    >
      <PartnerLogo partner={partner} cover className="!absolute !inset-0 !block !p-0" />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(to_top,rgb(3_15_31_/_95%),rgb(3_15_31_/_62%),transparent)]" />
      <span className="relative mt-auto inline-flex items-center justify-center gap-1.5 px-3 pb-1 text-xs font-semibold text-foreground [text-shadow:0_1px_5px_rgb(0_0_0_/_70%)] sm:text-sm">
        <span>{partner.shortName}</span>
        {active ? <Check aria-hidden="true" className="size-3.5 text-accent" /> : null}
      </span>
    </motion.button>
  );
}

function PartnerTree({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.16 }}
      transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[2rem] border border-blue-300/20 bg-[radial-gradient(circle_at_50%_85%,rgb(31_120_242_/_15%),transparent_25rem),linear-gradient(150deg,rgb(8_31_59_/_96%),rgb(3_14_30_/_98%))] p-4 shadow-[inset_0_1px_0_rgb(255_255_255_/_08%),0_25px_70px_rgb(0_0_0_/_20%)] sm:p-6"
      aria-label="Technology partner tree"
    >
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden size-full opacity-90 lg:block">
        <defs>
          <linearGradient id="treeLine" x1="0" x2="1" y1="1" y2="0">
            <stop stopColor="#1d74db" stopOpacity="0.2" />
            <stop offset="0.55" stopColor="#47a1ff" stopOpacity="0.85" />
            <stop offset="1" stopColor="#9dd2ff" stopOpacity="0.18" />
          </linearGradient>
        </defs>
        <path d="M50 93V11 M50 18C42 14 31 11 10 11 M50 18C44 14 37 11 30 11 M50 18C56 14 63 11 70 11 M50 18C58 14 69 11 90 11 M50 32C41 29 29 29 10 30 M50 32C59 29 71 29 90 30 M50 48C41 45 29 45 10 50 M50 48C59 45 71 45 90 50 M50 64C41 61 29 62 10 70 M50 64C59 61 71 62 90 70 M50 80C41 78 29 80 10 90 M50 80C57 82 64 87 70 90 M50 80C59 78 71 80 90 90" fill="none" stroke="url(#treeLine)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <g fill="#8ec7ff" fillOpacity="0.8">
          <circle cx="50" cy="18" r="0.85" /><circle cx="50" cy="32" r="0.85" /><circle cx="50" cy="48" r="0.85" /><circle cx="50" cy="64" r="0.85" /><circle cx="50" cy="80" r="0.85" />
        </g>
        <path d="M50 94C45 88 43 84 45 80C47 76 53 76 55 80C57 84 55 88 50 94Z" fill="#1f7bef" fillOpacity="0.3" stroke="#6ab3ff" strokeOpacity="0.7" strokeWidth="0.3" />
      </svg>

      <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-h-[49rem] lg:grid-cols-5 lg:grid-rows-5 lg:gap-x-4 lg:gap-y-2">
        {partnerEcosystem.map((partner, index) => (
          <PartnerLeaf
            key={partner.id}
            partner={partner}
            active={index === activeIndex}
            placement={treePositions[index]}
            index={index}
            onSelect={() => onSelect(index)}
          />
        ))}
        <div aria-hidden="true" className="relative z-10 col-span-2 row-start-7 mx-auto size-28 rounded-[50%_50%_38%_38%] border border-blue-300/45 bg-[radial-gradient(circle_at_50%_25%,rgb(39_128_245),rgb(5_23_47)_72%)] shadow-[0_0_34px_rgb(48_139_255_/_28%)] sm:size-32 lg:col-span-1 lg:col-start-3 lg:row-start-5 lg:self-end" />
      </div>
      <p className="relative mt-5 flex items-center justify-center gap-2 text-center text-xs font-medium text-blue-200 lg:hidden">
        <GitBranch aria-hidden="true" className="size-4 text-blue-300" />
        Select a partner to explore its capabilities.
      </p>
    </motion.div>
  );
}

export function PartnerOrbitShowcase() {
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activePartner = partnerEcosystem[activeIndex];

  useEffect(() => {
    if (reducedMotion) return;

    const advance = () => setActiveIndex((current) => (current + 1) % partnerEcosystem.length);
    const interval = window.setInterval(() => {
      if (!document.hidden) advance();
    }, 3000);

    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_82%_16%,rgb(47_130_245_/_16%),transparent_30rem),radial-gradient(circle_at_12%_78%,rgb(228_196_119_/_7%),transparent_25rem),linear-gradient(150deg,var(--color-navy-950),var(--color-navy-900)_65%,var(--color-navy-950))] py-16 sm:py-20 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-55 [background-image:linear-gradient(rgb(131_185_255_/_6%)_1px,transparent_1px),linear-gradient(90deg,rgb(131_185_255_/_6%)_1px,transparent_1px)] [background-size:3rem_3rem] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      <Container size="wide" className="relative">
        <motion.header
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Our partners</p>
          <h1 className="mt-5 text-balance text-[clamp(2.55rem,5.8vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-foreground">
            Stronger technology partnerships, built for progress.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Explore the technology ecosystem InnovGen brings together to deliver secure, scalable digital outcomes.
          </p>
        </motion.header>

        <div className="mt-11 grid gap-6 lg:mt-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-9">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <PartnerDetails partner={activePartner} />
          </div>
          <PartnerTree activeIndex={activeIndex} onSelect={setActiveIndex} />
        </div>

        <motion.dl
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: reducedMotion ? 0 : 0.46, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid grid-cols-2 overflow-hidden rounded-[1.6rem] border border-blue-300/20 bg-navy-900/70 xl:grid-cols-4"
        >
          {[
            ["Cloud", "Modern platforms"],
            ["Data", "Decision-ready insight"],
            ["Security", "Resilient foundations"],
            ["Workplace", "Connected teams"],
          ].map(([value, label], index) => (
            <div key={value} className="border-b border-blue-300/15 p-5 even:border-l even:border-l-blue-300/15 last:border-b-0 xl:border-b-0 xl:border-l xl:first:border-l-0 xl:even:border-l xl:even:border-l-blue-300/15 xl:p-6">
              <dt className="text-xl font-semibold text-accent sm:text-2xl">
                <span className="mr-2 text-xs tracking-[0.16em] text-blue-300">{String(index + 1).padStart(2, "0")}</span>
                {value}
              </dt>
              <dd className="mt-1 text-sm text-muted">{label}</dd>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
