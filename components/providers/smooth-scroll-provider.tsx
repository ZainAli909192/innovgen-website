"use client";

import { useEffect, type ReactNode } from "react";
import { cancelFrame, frame, type FrameData } from "motion/react";
import { smoothScrollConfig } from "@/config/scroll";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";

type SmoothScrollState = "enhanced" | "native" | "paused";

function setScrollState(state: SmoothScrollState) {
  document.documentElement.dataset.smoothScroll = state;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!smoothScrollConfig.enabled || prefersReducedMotion) {
      setScrollState("native");
      return;
    }

    let disposed = false;
    let removeVisibilityListener: VoidFunction | undefined;
    let destroyLenis: VoidFunction | undefined;

    void import("lenis").then(({ default: Lenis }) => {
      if (disposed) {
        return;
      }

      const lenis = new Lenis({
        autoRaf: false,
        duration: smoothScrollConfig.duration,
        smoothWheel: true,
        stopInertiaOnNavigate: true,
        syncTouch: false,
      });

      let frameScheduled = false;
      const updateLenis = ({ timestamp }: FrameData) => {
        lenis.raf(timestamp);
      };

      const start = () => {
        if (!frameScheduled) {
          frame.update(updateLenis, true);
          frameScheduled = true;
        }

        lenis.start();
        setScrollState("enhanced");
      };

      const stop = () => {
        if (frameScheduled) {
          cancelFrame(updateLenis);
          frameScheduled = false;
        }

        lenis.stop();
      };

      const handleVisibilityChange = () => {
        if (document.hidden) {
          stop();
          setScrollState("paused");
          return;
        }

        start();
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      removeVisibilityListener = () =>
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange,
        );

      if (document.hidden) {
        setScrollState("paused");
      } else {
        start();
      }

      destroyLenis = () => {
        stop();
        lenis.destroy();
      };
    });

    return () => {
      disposed = true;
      removeVisibilityListener?.();
      destroyLenis?.();
      setScrollState("native");
    };
  }, [prefersReducedMotion]);

  return children;
}
