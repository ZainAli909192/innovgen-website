"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";

const loaderDuration = 3_000;
const handoffDuration = 700;
const loaderEase = [0.22, 1, 0.36, 1] as const;
const loaderWords = ["MODERN", "ICONIC", "AI", "TECHNOLOGY", "PREMIUM" , "INNOVATIVE", "FUTURE", "SUSTAINABLE", "EXPERIENCE", "INNOVGEN"];
 
export function AppPreloader() {
  const pathname = usePathname();

  return <AppPreloaderScreen key={pathname} />;
}

function AppPreloaderScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousBackground = document.body.style.backgroundColor;
    const videos = Array.from(
      document.querySelectorAll<HTMLVideoElement>("video:not([data-preloader-video])"),
    );

    document.body.classList.add("preloader-active");
    document.body.style.overflow = "hidden";
    document.body.style.backgroundColor = "#eaf4ff";
    videos.forEach((video) => video.pause());

    const finishId = window.setTimeout(() => {
      setIsCompleting(true);
    }, loaderDuration - handoffDuration);

    const dismissId = window.setTimeout(() => {
      document.body.classList.remove("preloader-active");
      document.body.style.overflow = previousOverflow;
      document.body.style.backgroundColor = previousBackground;
      videos.forEach((video) => {
        if (video.autoplay) {
          void video.play().catch(() => undefined);
        }
      });
      setIsVisible(false);
    }, loaderDuration);

    return () => {
      window.clearTimeout(finishId);
      window.clearTimeout(dismissId);
      document.body.classList.remove("preloader-active");
      document.body.style.overflow = previousOverflow;
      document.body.style.backgroundColor = previousBackground;
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveWordIndex((index) => (index + 1) % loaderWords.length);
    }, 400);

    return () => window.clearInterval(intervalId);
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          aria-label="Loading InnovGen"
          aria-live="polite"
          role="status"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1, y: isCompleting && !reducedMotion ? "-100%" : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : handoffDuration / 1000, ease: loaderEase }}
          className="fixed inset-0 z-[200] grid place-items-center bg-[var(--color-blue-600)] p-6 will-change-transform"
        >
          <div className="relative flex w-full max-w-sm flex-col items-center text-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgb(111_201_255_/_20%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgb(31_111_235_/_30%)]"
            />
   
            <motion.div
              animate={isCompleting ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: reducedMotion ? 0 : handoffDuration / 1000, ease: loaderEase }}
            >
              <div className="flex h-28 items-center justify-center overflow-hidden px-4">
                <AnimatePresence initial={!reducedMotion} mode="wait">
                  <motion.p
                    key={loaderWords[activeWordIndex]}
                    initial={reducedMotion ? false : { opacity: 0, y: 14, filter: "blur(7px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: -14, filter: "blur(6px)" }}
                    transition={{ duration: reducedMotion ? 0 : 0.22, ease: loaderEase }}
                    className="max-w-full whitespace-nowrap font-[family-name:var(--font-outfit)] text-[clamp(1.75rem,7vw,5rem)] font-extrabold leading-[1.15] tracking-[0.16em] text-white"
                  > 
                    {loaderWords[activeWordIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

            </motion.div>

          </div>
          <span className="sr-only">Loading InnovGen</span>

        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
