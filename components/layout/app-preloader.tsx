"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";

const loaderDuration = 2_000;

export function AppPreloader() {
  const [isVisible, setIsVisible] = useState(true);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const videos = Array.from(
      document.querySelectorAll<HTMLVideoElement>("video:not([data-preloader-video])"),
    );

    document.body.classList.add("preloader-active");
    document.body.style.overflow = "hidden";
    videos.forEach((video) => video.pause());

    const timeoutId = window.setTimeout(() => {
      document.body.classList.remove("preloader-active");
      document.body.style.overflow = previousOverflow;
      videos.forEach((video) => {
        if (video.autoplay) {
          void video.play().catch(() => undefined);
        }
      });
      setIsVisible(false);
    }, loaderDuration);

    return () => {
      window.clearTimeout(timeoutId);
      document.body.classList.remove("preloader-active");
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          aria-live="polite"
          aria-label="Loading InnovGen"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] grid place-items-center bg-[rgb(5_11_24_/_55%)] p-6 backdrop-blur-xl"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="grid size-40 place-items-center overflow-hidden rounded-[2rem] border border-[var(--color-gold-300)]/55 bg-[var(--color-navy-950)] shadow-[0_20px_55px_rgb(0_0_0_/_30%)] sm:size-48">
              <video
                aria-hidden="true"
                autoPlay
                data-preloader-video
                loop
                muted
                playsInline
                preload="auto"
                src="/logo_video.mp4"
                className="h-full w-full scale-125 object-cover"
              />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/85">
              Loading InnovGen
            </span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
