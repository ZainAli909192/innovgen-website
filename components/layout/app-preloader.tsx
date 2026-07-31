"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";

const loaderDuration = 5_000;
const handoffDuration = 550;
const loaderEase = [0.22, 1, 0.36, 1] as const;
const loaderWords = ["We", "Handle", " IT.", "You Build" , " What’s Next"];
 
export function AppPreloader() {
  return <AppPreloaderScreen />;
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
    document.body.style.backgroundColor = "#0d72de";
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
          exit={{ opacity: 0, transition: { duration: 0 } }}
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
              className="flex flex-col items-center"
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

              <motion.video
                aria-hidden="true"
                autoPlay
                className="mt-3 h-auto w-[10.5rem] max-w-full object-contain sm:mt-4 sm:w-48"
                data-preloader-video
                loop
                muted
                playsInline
                preload="metadata"
                animate={
                  reducedMotion || isCompleting
                    ? { opacity: isCompleting ? 0 : 1, scale: isCompleting ? 0.96 : 1 }
                    : { opacity: 1, y: [0, -4, 0], scale: 1 }
                }
                initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
                transition={
                  isCompleting || reducedMotion
                    ? { duration: reducedMotion ? 0 : handoffDuration / 1000, ease: loaderEase }
                    : { opacity: { duration: 0.35, ease: loaderEase }, y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }
                }
              >
                <source src="/logo_video.mp4" type="video/mp4" />
              </motion.video>
            </motion.div>

          </div>
  
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
