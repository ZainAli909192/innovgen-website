"use client";

import {
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions,
} from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";

const parallaxSpring: SpringOptions = {
  stiffness: 110,
  damping: 24,
  mass: 0.6,
};

export function useParallax(
  progress: MotionValue<number>,
  distance = 40,
): MotionValue<number> {
  const prefersReducedMotion = usePrefersReducedMotion();
  const transformed = useTransform(
    progress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-distance, distance],
  );
  const smoothed = useSpring(transformed, parallaxSpring);

  return prefersReducedMotion ? transformed : smoothed;
}
