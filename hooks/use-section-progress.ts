"use client";

import { useRef } from "react";
import { useScroll, type UseScrollOptions } from "motion/react";

type SectionProgressOptions = Pick<UseScrollOptions, "offset">;

export function useSectionProgress<T extends HTMLElement = HTMLElement>(
  options: SectionProgressOptions = {},
) {
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options.offset ?? ["start end", "end start"],
  });

  return { ref, progress: scrollYProgress };
}
