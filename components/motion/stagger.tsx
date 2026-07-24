"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import {
  reducedRevealVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from "@/config/motion";
import { cn } from "@/lib/utils";

export function StaggerGroup({
  children,
  className,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
}) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      variants={reduceMotion ? reducedRevealVariants : staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      variants={reduceMotion ? reducedRevealVariants : staggerItemVariants}
    >
      {children}
    </motion.div>
  );
}
