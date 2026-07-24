"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { pageTransitionVariants } from "@/config/motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      key={pathname}
      data-page-transition={reduceMotion ? "reduced" : "active"}
      variants={pageTransitionVariants}
      initial={reduceMotion ? false : "initial"}
      animate={reduceMotion ? undefined : "animate"}
    >
      {children}
    </motion.div>
  );
}
