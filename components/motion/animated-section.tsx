"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import {
  reducedRevealVariants,
  revealVariants,
  type RevealPreset,
} from "@/config/motion";
import { cn } from "@/lib/utils";

type AnimatedSectionProps = HTMLMotionProps<"section"> & {
  spacing?: "compact" | "default" | "spacious";
  tone?: "default" | "surface";
  preset?: RevealPreset;
  once?: boolean;
  amount?: number;
};

export function AnimatedSection({
  className,
  spacing = "default",
  tone = "default",
  preset = "up",
  once = true,
  amount = 0.12,
  children,
  ...props
}: AnimatedSectionProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.section
      className={cn(
        spacing === "compact" && "py-12 md:py-16",
        spacing === "default" && "py-16 md:py-24",
        spacing === "spacious" && "py-24 md:py-32",
        tone === "surface" && "border-y border-border bg-surface",
        className,
      )}
      variants={
        reduceMotion ? reducedRevealVariants : revealVariants[preset]
      }
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      {...props}
    >
      {children}
    </motion.section>
  );
}
