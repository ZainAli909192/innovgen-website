"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";

export function ScrollProgressIndicator() {
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    mass: 0.35,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      data-testid="scroll-progress"
      className="fixed inset-x-0 top-0 z-[90] h-0.5 origin-left bg-[linear-gradient(90deg,var(--color-blue-500),var(--color-gold-300))]"
      style={{ scaleX }}
    />
  );
}
