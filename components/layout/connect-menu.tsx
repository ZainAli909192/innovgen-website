"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Phone,
  Share2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { connectItems, type ConnectItem } from "@/config/site";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";

function ConnectIcon({ kind }: { kind: ConnectItem["kind"] }) {
  if (kind === "call") {
    return <Phone aria-hidden="true" className="size-5" strokeWidth={1.8} />;
  }
  if (kind === "email") {
    return <Mail aria-hidden="true" className="size-5" strokeWidth={1.8} />;
  }

  const paths = {
    whatsapp:
      "M16.75 13.96c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.59.13-.17.26-.67.85-.82 1.02-.15.17-.3.2-.56.07-.26-.13-1.09-.4-2.07-1.28-.77-.68-1.29-1.52-1.44-1.78-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.59-1.41-.8-1.93-.21-.51-.43-.44-.59-.45h-.5c-.17 0-.46.07-.7.33-.24.26-.91.89-.91 2.17s.93 2.52 1.06 2.69c.13.17 1.83 2.8 4.44 3.92.62.27 1.1.43 1.48.55.62.2 1.19.17 1.63.1.5-.07 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.06-.11-.24-.17-.5-.3M12.04 21a8.93 8.93 0 0 1-4.55-1.25L2.45 21l1.35-4.91A8.93 8.93 0 1 1 12.04 21m0-16.2a7.25 7.25 0 0 0-6.16 11.08l.2.31-.8 2.92 3-.79.29.17a7.26 7.26 0 1 0 3.47-13.69",
    instagram:
      "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7m10.5 1.5A1.25 1.25 0 1 1 16.25 6.75 1.25 1.25 0 0 1 17.5 5.5M12 7a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0 2a3 3 0 1 0 3 3 3 3 0 0 0-3-3",
    facebook:
      "M14 8.5V6.8c0-.83.55-1.03.94-1.03H17V2.14L14.16 2C10.72 2 10 4.58 10 6.23V8.5H7v4h3V22h4v-9.5h2.7l.45-4H14",
  } as const;

  return (
    <svg
      aria-hidden="true"
      className="size-5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d={paths[kind]} />
    </svg>
  );
}

export function ConnectMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!open) return;

    function closeOnOutsidePointer(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    }

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-[calc(6.1rem+env(safe-area-inset-bottom))] right-4 z-[75] flex flex-col items-end gap-3 lg:bottom-6 lg:right-6"
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            id="connect-actions"
            role="group"
            aria-label="Connect with InnovGen"
            initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="flex flex-col gap-2 rounded-[1.35rem] border border-white/15 bg-[rgb(8_24_44_/_96%)] p-2 shadow-[0_20px_60px_rgb(0_0_0_/_45%)] backdrop-blur-xl"
          >
            {connectItems.map((item, index) => {
              return (
                <motion.a
                  key={item.kind}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  aria-label={
                    item.external
                      ? `${item.label} (opens in a new tab)`
                      : item.label
                  }
                  title={
                    item.approval === "client-approval-required"
                      ? `${item.label} profile pending client confirmation`
                      : item.label
                  }
                  onClick={() => setOpen(false)}
                  initial={reducedMotion ? false : { opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: reducedMotion ? 0 : index * 0.035,
                    duration: reducedMotion ? 0 : 0.18,
                  }}
                  className="flex min-h-12 min-w-40 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/10 focus-visible:bg-white/10"
                >
                  <span className="grid size-9 place-items-center rounded-full border border-accent/35 bg-accent/10 text-accent">
                    <ConnectIcon kind={item.kind} />
                  </span>
                  {item.label}
                </motion.a>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="connect-actions"
        onClick={() => setOpen((current) => !current)}
        whileTap={reducedMotion ? undefined : { scale: 0.97 }}
        className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-accent/50 bg-[var(--color-gold-500)] px-5 font-semibold text-[var(--color-navy-950)] shadow-[0_14px_36px_rgb(0_0_0_/_35%),0_0_26px_rgb(201_154_50_/_18%)] transition-colors hover:bg-[var(--color-gold-300)]"
      >
        {open ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Share2 aria-hidden="true" className="size-5" />
        )}
        {open ? "Close" : "Connect"}
      </motion.button>
    </div>
  );
}
