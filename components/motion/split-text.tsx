"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import {
  reducedRevealVariants,
  wordContainerVariants,
  wordVariants,
} from "@/config/motion";
import { cn } from "@/lib/utils";

const motionTextElements = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
} as const;

export function SplitText({
  text,
  as = "h2",
  className,
  once = true,
}: {
  text: string;
  as?: keyof typeof motionTextElements;
  className?: string;
  once?: boolean;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const Component = motionTextElements[as];
  const words = text.trim().split(/\s+/);

  return (
    <Component
      aria-label={text}
      className={cn(className)}
      variants={
        reduceMotion ? reducedRevealVariants : wordContainerVariants
      }
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.5 }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-block"
          variants={reduceMotion ? reducedRevealVariants : wordVariants}
        >
          {word}
          {index < words.length - 1 ? "\u00a0" : ""}
        </motion.span>
      ))}
    </Component>
  );
}
