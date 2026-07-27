"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";

type AudioWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};

function playSuccessChime() {
  try {
    const audioWindow = window as AudioWindow;
    const AudioContextConstructor = window.AudioContext ?? audioWindow.webkitAudioContext;
    if (!AudioContextConstructor) return;

    const context = new AudioContextConstructor();
    const gain = context.createGain();
    gain.connect(context.destination);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.055, context.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.38);

    [523.25, 659.25].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, context.currentTime + index * 0.1);
      oscillator.connect(gain);
      oscillator.start(context.currentTime + index * 0.1);
      oscillator.stop(context.currentTime + 0.28 + index * 0.1);
    });

    window.setTimeout(() => void context.close(), 500);
  } catch {
    // Sound feedback is optional; the visual confirmation remains available.
  }
}

export function SuccessPopup({
  open,
  title,
  description,
  onClose,
}: {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const announced = useRef(false);

  useEffect(() => {
    if (!open) {
      announced.current = false;
      return;
    }
    if (!announced.current) {
      announced.current = true;
      playSuccessChime();
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-popup-title"
          aria-describedby="success-popup-description"
          className="fixed inset-0 z-[130] grid place-items-center bg-[rgb(2_8_20_/_68%)] p-5 backdrop-blur-sm"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
        >
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.82, y: 28, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: reducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-blue-300/30 bg-[linear-gradient(145deg,var(--color-navy-800),var(--color-navy-900))] p-8 text-center shadow-[0_30px_100px_rgb(0_0_0_/_48%),0_0_42px_rgb(47_130_245_/_16%)] [perspective:1000px]"
          >
            <button type="button" onClick={onClose} className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full text-muted transition hover:bg-white/10 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300" aria-label="Close success message">
              <X aria-hidden="true" className="size-5" />
            </button>
            <span className="mx-auto grid size-16 place-items-center rounded-full border border-blue-300/40 bg-blue-500/15 text-blue-300 shadow-[0_0_30px_rgb(47_130_245_/_24%)]">
              <CheckCircle2 aria-hidden="true" className="size-8" />
            </span>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-accent">Success</p>
            <h2 id="success-popup-title" className="mt-3 text-2xl">{title}</h2>
            <p id="success-popup-description" className="mt-4 text-muted">{description}</p>
            <button type="button" onClick={onClose} autoFocus className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-blue-500 px-6 text-sm font-semibold text-white shadow-[0_12px_24px_rgb(47_130_245_/_26%)] transition hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300">
              Done
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
