"use client";

import { createContext, useContext } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";
import { motionTransition } from "@/config/motion";

const ReducedMotionContext = createContext(false);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <ReducedMotionContext.Provider value={shouldReduceMotion}>
      <MotionConfig reducedMotion="user" transition={motionTransition}>
        {children}
      </MotionConfig>
    </ReducedMotionContext.Provider>
  );
}

export function usePrefersReducedMotion() {
  return useContext(ReducedMotionContext);
}
