"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    document.documentElement.dataset.pageLoading = "true";
    const timer = window.setTimeout(() => {
      setVisible(false);
      document.documentElement.dataset.pageLoading = "false";
    }, 2000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="status"
          aria-label="Loading InnovGen"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.28 }}
          className="fixed inset-0 z-[120] grid place-items-center overflow-hidden bg-[var(--color-navy-950)]"
        >
          <div aria-hidden="true" className="absolute inset-0 opacity-70">
            <div className="absolute inset-x-5 top-8 h-14 rounded-2xl border border-blue-300/10 bg-[rgb(13_32_58_/_64%)]" />
            <div className="absolute left-5 right-[42%] top-32 h-8 rounded-full bg-[rgb(131_185_255_/_10%)]" />
            <div className="absolute left-5 right-16 top-44 h-20 rounded-3xl bg-[rgb(13_32_58_/_66%)]" />
            <div className="absolute left-5 right-5 top-72 h-56 rounded-[2rem] border border-blue-300/10 bg-[rgb(13_32_58_/_58%)]" />
            <div className="absolute bottom-24 left-5 right-5 h-20 rounded-3xl bg-[rgb(13_32_58_/_52%)]" />
          </div>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid size-32 place-items-center rounded-[2rem] border border-accent/45 bg-[rgb(8_20_38_/_92%)] shadow-[0_20px_70px_rgb(0_0_0_/_48%),0_0_42px_rgb(201_154_50_/_22%),inset_0_1px_0_rgb(228_196_119_/_20%)]"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              className="loader-logo-video size-28 object-contain"
              src="/logo_video.mp4"
            />
          </motion.div>
          <span className="sr-only">Loading InnovGen</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
