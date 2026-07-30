"use client";

import { Activity, Cloud, Database, Network, Server, ShieldCheck } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";

const moduleIcons = [Server, Cloud, Network, ShieldCheck, Database, Activity] as const;

type InfrastructureScrollObjectProps = {
  className?: string;
};

/** Decorative scroll-linked enterprise infrastructure visual for hero layouts. */
export function InfrastructureScrollObject({ className }: InfrastructureScrollObjectProps) {
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.5 });

  const coreScale = useTransform(progress, [0, 0.15, 0.55, 1], [0.84, 1, 1.07, 1]);
  const coreRotate = useTransform(progress, [0, 0.35, 0.9, 1], [-10, 6, 22, 24]);
  const ecosystemY = useTransform(progress, [0, 0.3, 0.75, 1], [34, 0, -10, -4]);
  const ecosystemRotate = useTransform(progress, [0, 0.5, 1], [-4, 4, 7]);
  const outerScale = useTransform(progress, [0, 0.35, 0.75, 1], [0.78, 0.98, 1.13, 1.08]);
  const nodeOpacity = useTransform(progress, [0, 0.12, 0.35], [0.1, 0.55, 1]);
  const moduleScale = useTransform(progress, [0, 0.18, 0.55, 1], [0.66, 0.9, 1, 0.96]);
  const innerRingRotate = useTransform(progress, [0, 1], [10, -18]);

  return (
    <div aria-hidden="true" className={className}>
      <motion.div
        className="relative aspect-square w-full max-w-[44rem] will-change-transform"
        style={reducedMotion ? undefined : { y: ecosystemY, rotate: ecosystemRotate }}
      >
        <motion.div
          className="absolute inset-[5%] rounded-full border border-blue-300/25 shadow-[inset_0_0_3.5rem_rgb(20_111_220_/_12%)]"
          style={reducedMotion ? undefined : { scale: outerScale }}
        />
        <motion.div
          className="absolute inset-[15%] rounded-full border border-blue-300/20"
          style={reducedMotion ? undefined : { rotate: coreRotate }}
        />
        <motion.div
          className="absolute inset-[25%] rounded-full border border-blue-200/20"
          style={reducedMotion ? undefined : { rotate: innerRingRotate }}
        />

        <motion.svg
          className="absolute inset-0 h-full w-full overflow-visible"
          fill="none"
          style={reducedMotion ? undefined : { opacity: nodeOpacity }}
          viewBox="0 0 100 100"
        >
          <path d="M16 30C35 27 41 40 50 50C60 60 71 55 86 33" stroke="rgb(86 170 255 / .6)" strokeWidth="0.35" />
          <path d="M12 66C29 66 38 58 50 50C63 42 73 56 89 67" stroke="rgb(86 170 255 / .55)" strokeWidth="0.35" />
          <path d="M50 50V88" stroke="rgb(86 170 255 / .42)" strokeWidth="0.35" />
          {[['16', '30'], ['50', '50'], ['86', '33'], ['12', '66'], ['89', '67'], ['50', '88']].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.15" fill="rgb(109 187 255)" />
          ))}
        </motion.svg>

        <motion.div
          className="absolute left-1/2 top-1/2 grid h-[32%] w-[32%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2rem] border border-blue-200/45 bg-[radial-gradient(circle_at_42%_25%,rgb(98_181_255_/_55%),rgb(10_44_90_/_82%)_48%,rgb(4_19_42_/_96%)_100%)] shadow-[0_0_3rem_rgb(54_142_255_/_35%),inset_0_0_2.5rem_rgb(137_205_255_/_18%)] will-change-transform"
          style={reducedMotion ? undefined : { scale: coreScale, rotate: coreRotate }}
        >
          <div className="relative h-[56%] w-[54%] rounded-xl border border-blue-100/45 bg-[#061a38]/75 p-2 shadow-[inset_0_0_1.5rem_rgb(46_137_239_/_24%)]">
            {[0, 1, 2, 3].map((rack) => (
              <div key={rack} className="mb-1.5 flex h-[18%] items-center gap-1 rounded-sm border border-blue-200/20 bg-blue-100/[0.06] px-1.5">
                <span className="size-1 rounded-full bg-blue-300 shadow-[0_0_0.45rem_rgb(108_192_255)]" />
                <span className="h-px flex-1 bg-blue-100/25" />
              </div>
            ))}
          </div>
        </motion.div>

        {moduleIcons.map((Icon, index) => {
          const angles = [205, 250, 310, 28, 88, 145];
          const radius = index === 1 || index === 4 ? 41 : 45;
          const angle = (angles[index] * Math.PI) / 180;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;
          return (
            <motion.div
              key={`infrastructure-module-${index}`}
              className="absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-blue-200/35 bg-[#0d315d]/80 text-blue-100 shadow-[0_14px_28px_rgb(2_13_35_/_45%),inset_0_1px_0_rgb(189_228_255_/_18%)] backdrop-blur-sm"
              style={reducedMotion ? { left: `${x}%`, top: `${y}%` } : { left: `${x}%`, top: `${y}%`, scale: moduleScale }}
            >
              <Icon className="size-5 text-blue-300" strokeWidth={1.7} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
