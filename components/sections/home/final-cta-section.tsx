"use client";

import {
  ArrowRight,
  Boxes,
  Cloud,
  Database,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const ease = [0.22, 1, 0.36, 1] as const;

type Capability = {
  label: string;
  Icon: LucideIcon;
  className: string;
  drift: { x: number[]; y: number[]; rotate: number[] };
};

const capabilities: Capability[] = [
  {
    label: "Cloud Solutions",
    Icon: Cloud,
    className: "left-[2%] top-[19%] h-32 w-32 sm:left-[7%] sm:h-40 sm:w-40",
    drift: { x: [0, 10, 0], y: [0, -12, 0], rotate: [-8, -2, -8] },
  },
  {
    label: "Cyber Security",
    Icon: ShieldCheck,
    className: "right-[6%] top-[6%] h-36 w-36 sm:right-[9%] sm:h-44 sm:w-44",
    drift: { x: [0, -10, 0], y: [0, 12, 0], rotate: [8, 14, 8] },
  },
  {
    label: "ERP Systems",
    Icon: Boxes,
    className: "bottom-[6%] left-[13%] h-32 w-32 sm:bottom-[9%] sm:left-[20%] sm:h-44 sm:w-44",
    drift: { x: [0, 12, 0], y: [0, 10, 0], rotate: [-12, -5, -12] },
  },
  {
    label: "Data Management",
    Icon: Database,
    className: "bottom-[11%] right-[28%] h-32 w-32 sm:bottom-[17%] sm:right-[31%] sm:h-40 sm:w-40",
    drift: { x: [0, -8, 0], y: [0, -14, 0], rotate: [6, 12, 6] },
  },
  {
    label: "IT Automation",
    Icon: Workflow,
    className: "left-[39%] top-[8%] h-28 w-28 sm:left-[43%] sm:top-[4%] sm:h-36 sm:w-36",
    drift: { x: [0, 7, 0], y: [0, -9, 0], rotate: [-4, 4, -4] },
  },
];

function CapabilityCube({ capability, index, reducedMotion }: { capability: Capability; index: number; reducedMotion: boolean }) {
  const { Icon } = capability;

  return (
    <motion.div
      className={`absolute hidden rounded-[1.7rem] border border-blue-300/55 bg-[linear-gradient(145deg,rgb(255_255_255_/_84%),rgb(212_232_255_/_34%))] p-4 shadow-[0_22px_46px_rgb(23_105_224_/_15%),inset_1px_1px_0_rgb(255_255_255_/_92%),inset_-10px_-12px_26px_rgb(23_105_224_/_9%)] backdrop-blur-md sm:block ${capability.className}`}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.78, rotateX: 18, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      animate={reducedMotion ? undefined : capability.drift}
      transition={{
        opacity: { duration: 0.55, delay: index * 0.08, ease },
        scale: { duration: 0.55, delay: index * 0.08, ease },
        rotateX: { duration: 0.55, delay: index * 0.08, ease },
        y: { duration: 0.55, delay: index * 0.08, ease },
        x: { duration: 6.5 + index * 0.65, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 6.5 + index * 0.65, repeat: Infinity, ease: "easeInOut" },
      }}
      style={{ transformPerspective: 900, transformStyle: "preserve-3d" }}
    >
      <span aria-hidden="true" className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/80 to-transparent" />
      <span aria-hidden="true" className="absolute -right-3 -top-3 size-10 rounded-xl border border-blue-300/40 bg-white/35 blur-[0.2px]" />
      <Icon aria-hidden="true" className="size-7 text-[var(--color-blue-600)]" strokeWidth={1.6} />
      <span className="mt-3 block text-xs font-semibold leading-tight text-[var(--color-navy-900)]">{capability.label}</span>
    </motion.div>
  );
}

export function FinalCtaSection({
  lightOnMobile = false,
}: {
  lightOnMobile?: boolean;
}) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      aria-labelledby="final-cta-heading"
      className={`relative isolate overflow-hidden bg-white py-16 text-[var(--color-navy-900)] sm:py-20 lg:py-28 ${lightOnMobile ? "about-mobile-light-surface" : ""}`}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_8%_24%,rgb(131_185_255_/_28%),transparent_27%),radial-gradient(circle_at_86%_58%,rgb(47_130_245_/_16%),transparent_33%),linear-gradient(135deg,#fff_22%,rgb(239_247_255)_56%,#fff)]" />
      <div aria-hidden="true" className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgb(23_105_224_/_7%)_1px,transparent_1px),linear-gradient(90deg,rgb(23_105_224_/_7%)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />

      <svg aria-hidden="true" viewBox="0 0 1200 560" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full text-blue-500/25">
        <path d="M600 48 800 180 992 96M600 48 414 188 182 126M600 48v236m0 0 222 128 183-76m-405-53L362 430l-174-80" fill="none" stroke="currentColor" strokeWidth="1" />
        {["600,48", "800,180", "414,188", "600,284", "822,412", "362,430"].map((point) => {
          const [cx, cy] = point.split(",");
          return <circle key={point} cx={cx} cy={cy} r="4" fill="currentColor" />;
        })}
      </svg>

      <div aria-hidden="true" className="pointer-events-none absolute right-[9%] top-[15%] size-3 rounded-full bg-blue-500/70 shadow-[0_0_26px_rgb(47_130_245_/_75%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-[20%] right-[46%] size-2 rounded-full bg-blue-300 shadow-[0_0_22px_rgb(131_185_255_/_90%)]" />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(30rem,1.14fr)] lg:gap-8">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reducedMotion ? 0 : 0.62, ease }}
            className="relative z-10 max-w-xl"
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-blue-600)]">Ready to go digital?</p>
            <h2 id="final-cta-heading" className="mt-4 font-[family-name:var(--font-outfit)] text-5xl font-semibold tracking-[-0.05em] text-[var(--color-navy-900)] sm:text-6xl lg:text-7xl">
              Let&apos;s discuss.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-[color-mix(in_srgb,var(--color-navy-900)_72%,white)] sm:text-lg">
              Share your next technology challenge with InnovGen. Together, we&apos;ll turn it into a secure, scalable way forward.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
             
              <Button href="/consultation" variant="secondary" size="lg" className=" border-blue-300/70 bg-white/65 text-[var(--color-navy-900)] shadow-[inset_0_1px_0_rgb(255_255_255_/_92%),0_10px_24px_rgb(23_105_224_/_8%)] backdrop-blur-md   hover:text-white hover:shadow-[inset_0_1px_0_rgb(255_255_255_/_92%),0_10px_24px_rgb(23_105_224_/_12%)] focus-visible:outline-blue-500/70 focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white/70 dark:border-blue-300/50 dark:bg-white/20 dark:text-white dark:shadow-[inset_0_1px_0_rgb(255_255_255_/_32%),0_10px_24px_rgb(23_105_224_/_8%)]  dark:hover:text-white  ">
               Let Go digital
                                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />

              </Button> 
            </div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.94, rotateX: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reducedMotion ? 0 : 0.75, delay: 0.08, ease }}
            className="relative mx-auto h-[23rem] w-full max-w-[42rem] [perspective:1000px] sm:h-[29rem]"
          >
            <div aria-hidden="true" className="absolute inset-[19%_14%_17%] rounded-full bg-[radial-gradient(circle,rgb(47_130_245_/_20%),transparent_67%)] blur-2xl" />
            {capabilities.map((capability, index) => (
              <CapabilityCube key={capability.label} capability={capability} index={index} reducedMotion={reducedMotion} />
            ))}
            <div className="absolute inset-0 grid place-items-center sm:hidden">
              <div className="grid w-full grid-cols-2 gap-3 px-3">
                {capabilities.map(({ label, Icon }, index) => (
                  <motion.div
                    key={label}
                    initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: reducedMotion ? 0 : 0.4, delay: index * 0.06, ease }}
                    className="rounded-2xl border border-blue-300/55 bg-white/70 p-4 shadow-[0_12px_28px_rgb(23_105_224_/_10%),inset_1px_1px_0_rgb(255_255_255_/_92%)] backdrop-blur"
                  >
                    <Icon aria-hidden="true" className="size-6 text-[var(--color-blue-600)]" strokeWidth={1.6} />
                    <p className="mt-3 text-sm font-semibold text-[var(--color-navy-900)]">{label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            {["left-[11%] top-[12%]", "right-[5%] bottom-[9%]", "left-[46%] bottom-[4%]"].map((position, index) => (
              <motion.span
                key={position}
                aria-hidden="true"
                className={`absolute hidden size-6 rounded-lg border border-blue-300/50 bg-white/35 shadow-[inset_1px_1px_0_rgb(255_255_255_/_90%),0_10px_22px_rgb(23_105_224_/_14%)] backdrop-blur sm:block ${position}`}
                animate={reducedMotion ? undefined : { y: [0, -10 - index * 3, 0], rotate: [0, 16, 0] }}
                transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
