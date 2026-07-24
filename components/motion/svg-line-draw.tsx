"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { motionEase } from "@/config/motion";
import { cn } from "@/lib/utils";

type SvgLine = {
  d: string;
  strokeWidth?: number;
};

export function SvgLineDraw({
  paths,
  viewBox = "0 0 320 120",
  label,
  className,
  once = true,
}: {
  paths: readonly SvgLine[];
  viewBox?: string;
  label?: string;
  className?: string;
  once?: boolean;
}) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.svg
      viewBox={viewBox}
      fill="none"
      className={cn("overflow-visible", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
    >
      {paths.map((path, index) => (
        <motion.path
          key={`${path.d}-${index}`}
          d={path.d}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={path.strokeWidth ?? 2}
          variants={{
            hidden: { pathLength: reduceMotion ? 1 : 0, opacity: 1 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: {
                duration: reduceMotion ? 0 : 0.8,
                delay: reduceMotion ? 0 : index * 0.12,
                ease: motionEase,
              },
            },
          }}
        />
      ))}
    </motion.svg>
  );
}
