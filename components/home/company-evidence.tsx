"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { companyEvidence, type CompanyEvidenceItem } from "@/config/company-evidence";
import { useMobileLayout } from "@/hooks/use-mobile-layout";
import { useSectionProgress } from "@/hooks/use-section-progress";

function EvidenceItem({
  index,
  item,
  progress,
}: {
  index: number;
  item: CompanyEvidenceItem;
  progress: MotionValue<number>;
}) {
  const reduced = usePrefersReducedMotion();
  const mobile = useMobileLayout();
  const start = 0.06 + index * 0.075;
  const settle = start + 0.17;
  const exitStart = 0.78 + index * 0.025;
  const opacity = useTransform(
    progress,
    [start, settle, exitStart, 1],
    [0, 1, 1, 0.32],
  );
  const x = useTransform(
    progress,
    [start, settle, exitStart, 1],
    [72, 0, 0, -24],
  );
  const z = useTransform(
    progress,
    [start, settle, exitStart, 1],
    [-150, 0, 0, -90],
  );
  const rotateY = useTransform(
    progress,
    [start, settle, exitStart, 1],
    [13, 0, 0, -7],
  );
  const scale = useTransform(
    progress,
    [start, settle, exitStart, 1],
    [0.84, 1, 1, 0.94],
  );
  const mobileOpacity = useTransform(
    progress,
    [start, settle, exitStart, 1],
    [0.82, 1, 1, 0.9],
  );
  const mobileX = useTransform(progress, [start, settle, exitStart, 1], [30, 0, 0, -12]);
  const mobileZ = useTransform(progress, [start, settle, exitStart, 1], [-56, 0, 0, -34]);
  const mobileRotateY = useTransform(progress, [start, settle, exitStart, 1], [5, 0, 0, -3]);
  const mobileScale = useTransform(progress, [start, settle, exitStart, 1], [0.97, 1, 1, 0.985]);

  return (
    <motion.li
      className="group/module relative grid gap-3 overflow-hidden rounded-2xl border border-border bg-[linear-gradient(145deg,rgb(19_46_77_/_72%),rgb(8_20_38_/_92%))] px-5 py-6 shadow-[inset_7px_7px_20px_rgb(255_255_255_/_3%),inset_-9px_-9px_24px_rgb(0_0_0_/_20%),0_20px_55px_rgb(0_0_0_/_16%)] focus-visible:outline-offset-4 sm:grid-cols-[3rem_1fr] md:px-6 md:py-7 [transform-style:preserve-3d]"
      tabIndex={0}
      style={
        reduced
          ? undefined
          : mobile
            ? { opacity: mobileOpacity, x: mobileX, z: mobileZ, rotateY: mobileRotateY, scale: mobileScale, transformOrigin: "100% 50%" }
            : { opacity, x, z, rotateY, scale, transformOrigin: "100% 50%" }
      }
      whileHover={reduced || mobile ? undefined : { z: 16, x: -4 }}
      whileFocus={reduced || mobile ? undefined : { z: 16, x: -4 }}
      transition={{ type: "spring", stiffness: 170, damping: 22 }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-px bg-[linear-gradient(transparent,var(--color-gold-300),transparent)] opacity-70"
      />
      <span className="font-mono text-xs font-semibold tracking-[0.18em] text-accent">
        {item.number}
      </span>
      <div>
        <h3 className="text-xl font-semibold md:text-2xl">{item.title}</h3>
        <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-muted md:text-base">
          {item.description}
        </p>
      </div>
    </motion.li>
  );
}

export function CompanyEvidence() {
  const { ref, progress } = useSectionProgress<HTMLOListElement>();

  return (
    <ol
      ref={ref}
      className="relative grid gap-4 [perspective:1300px] [transform-style:preserve-3d]"
    >
      {companyEvidence.map((item, index) => (
        <EvidenceItem
          key={item.number}
          index={index}
          item={item}
          progress={progress}
        />
      ))}
    </ol>
  );
}
