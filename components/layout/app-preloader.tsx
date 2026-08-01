"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";

const loaderDuration = 5_000;
const handoffDuration = 1500;
const loaderEase = [0.22, 1, 0.36, 1] as const;
const loaderWords = ["We", "Handle IT.", "You build", "What’s next !"];
 
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

    if (activeWordIndex >= loaderWords.length - 1) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActiveWordIndex((index) => index + 1);
    }, 700);

    return () => window.clearTimeout(timeoutId);
  }, [activeWordIndex, reducedMotion]);

  const displayedWordIndex = reducedMotion
    ? loaderWords.length - 1
    : activeWordIndex;

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
          <div className="relative flex w-full max-w-3xl flex-col items-center text-center">
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
              className="flex w-full flex-col items-center"
            >
              <div className="relative h-80 w-full overflow-visible px-4 sm:h-96">
                {loaderWords.slice(0, displayedWordIndex + 1).map((word, index) => {
                  const distance = displayedWordIndex - index;

                  return (
                    <motion.p
                      key={word}
                      initial={reducedMotion ? false : { opacity: 0, y: 20, filter: "blur(7px)" }}
                      animate={{
                        opacity: Math.max(0.7, 1 - distance * 0.12),
                        y: -distance * 78,
                        filter: "blur(0px)",
                      }}
                      transition={{ duration: reducedMotion ? 0 : 0.5, ease: loaderEase }}
                      className="absolute inset-x-0 bottom-7 max-w-full whitespace-nowrap text-center font-[family-name:var(--font-outfit)] text-[clamp(1.7rem,5vw,4.25rem)] font-extrabold leading-none tracking-[0.06em] text-white sm:bottom-9 sm:tracking-[0.1em]"
                    >
                      {word}
                    </motion.p>
                  );
                })}
              </div>

              {/* <motion.video
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
              </motion.video> */}
            </motion.div>

          </div>
  
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
