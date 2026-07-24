"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import {
  reducedRevealVariants,
  revealVariants,
  type RevealPreset,
} from "@/config/motion";
import { cn } from "@/lib/utils";

export type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  preset?: RevealPreset;
  once?: boolean;
  amount?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  preset = "up",
  once = true,
  amount = 0.15,
}: RevealProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      variants={
        reduceMotion ? reducedRevealVariants : revealVariants[preset]
      }
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
