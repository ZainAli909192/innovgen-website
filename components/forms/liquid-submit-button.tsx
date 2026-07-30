"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { cn } from "@/lib/utils";

type LiquidSubmitButtonProps = {
  state: "idle" | "loading" | "complete";
  className?: string;
};

const smoothEase = [0.22, 1, 0.36, 1] as const;

export function LiquidSubmitButton({
  state,
  className,
}: LiquidSubmitButtonProps) {
  const reducedMotion = usePrefersReducedMotion();
  const isLoading = state === "loading";
  const isComplete = state === "complete";

  return (
    <motion.button
      type="submit"
      disabled={state !== "idle"}
      aria-busy={isLoading || undefined}
      className={cn(
        "group relative isolate mt-7 flex min-h-14 w-full min-w-48 items-center justify-center overflow-hidden rounded-full px-9 font-sans text-base font-semibold text-white outline-none sm:w-auto",
        "bg-[linear-gradient(145deg,var(--color-blue-500),var(--color-blue-600))]",
        "shadow-[inset_0_1px_1px_rgb(255_255_255_/_32%),inset_0_-3px_7px_rgb(5_11_24_/_20%),0_14px_32px_rgb(23_105_224_/_28%),0_3px_8px_rgb(5_11_24_/_18%)]",
        "focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-4 focus-visible:ring-offset-navy-900",
        "disabled:cursor-wait",
        className,
      )}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
      animate={
        reducedMotion
          ? { opacity: 1, scale: 1 }
          : {
              opacity: 1,
              scaleX: isLoading ? [1, 0.92, 0.965] : [0.98, 1],
              scaleY: isLoading ? [1, 0.88, 0.94, 0.92] : [0.96, 1],
            }
      }
      whileHover={state === "idle" && !reducedMotion ? { scale: 1.025 } : undefined}
      whileTap={state === "idle" && !reducedMotion ? { scaleX: 0.94, scaleY: 0.9 } : undefined}
      transition={
        reducedMotion
          ? { duration: 0 }
          : isLoading
            ? {
                duration: 1.6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }
            : { duration: 0.6, ease: smoothEase }
      }
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
      />
      <motion.span
        aria-hidden="true"
        className="absolute -left-12 top-0 h-full w-12 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/30 to-transparent blur-[2px]"
        animate={
          isLoading && !reducedMotion
            ? { x: ["0%", "650%"], opacity: [0, 0.9, 0] }
            : { opacity: 0 }
        }
        transition={{ duration: 1.45, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.25 }}
      />

      {isLoading ? (
        <>
          <motion.span
            aria-hidden="true"
            className="absolute left-0 size-14 rounded-full bg-blue-500"
            animate={reducedMotion ? undefined : { x: [0, 9, 5], scaleX: [1, 1.2, 1.08] }}
            transition={{ duration: 1.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute right-0 size-14 rounded-full bg-blue-600"
            animate={reducedMotion ? undefined : { x: [0, -9, -5], scaleX: [1, 1.2, 1.08] }}
            transition={{ duration: 1.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
        </>
      ) : null}

      <span className="sr-only" aria-live="polite">
        {isLoading ? "Sending enquiry" : isComplete ? "Success" : "Submit enquiry"}
      </span>

      <AnimatePresence mode="wait" initial={false}>
        {state === "idle" ? (
          <motion.span
            key="submit"
            aria-hidden="true"
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.84, filter: "blur(3px)" }}
            transition={{ duration: reducedMotion ? 0 : 0.22, ease: smoothEase }}
            className="relative z-10"
          >
            Submit
          </motion.span>
        ) : state === "loading" ? (
          <motion.svg
            key="loader"
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="relative z-10 size-7 drop-shadow-[0_1px_2px_rgb(5_11_24_/_18%)]"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, rotate: reducedMotion ? 0 : 360 }}
            exit={{ opacity: 0, scale: 0.72 }}
            transition={{
              opacity: { duration: reducedMotion ? 0 : 0.22 },
              scale: { duration: reducedMotion ? 0 : 0.45, ease: smoothEase },
              rotate: { duration: 0.85, repeat: Infinity, ease: "linear" },
            }}
          >
            <circle cx="16" cy="16" r="11" fill="none" stroke="rgb(255 255 255 / 28%)" strokeWidth="3" />
            <circle cx="16" cy="16" r="11" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeDasharray="45 70" />
          </motion.svg>
        ) : (
          <motion.span
            key="complete"
            aria-hidden="true"
            className="relative z-10 flex items-center gap-2"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.5, ease: smoothEase }}
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none">
              <motion.path
                d="m5 12.5 4.25 4.25L19 7"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.42, ease: smoothEase }}
              />
            </svg>
            Success
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
