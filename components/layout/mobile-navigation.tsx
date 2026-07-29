"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Ellipsis,
  FolderKanban,
  Home,
  Layers3,
  UserRound,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import {
  consultationNavigation,
  legalNavigation,
  mobileMoreNavigation,
  mobilePrimaryNavigation,
} from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { isActiveRoute } from "./header";

const icons = {
  home: Home,
  about: UserRound,
  services: Layers3,
  projects: FolderKanban,
} as const;

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const moreIsActive = mobileMoreNavigation.some((item) =>
    isActiveRoute(pathname, item.href),
  );

  function closeSheet({ restoreFocus = true } = {}) {
    setIsOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => moreButtonRef.current?.focus());
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    first?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSheet();
        return;
      }

      if (event.key !== "Tab" || !first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        aria-label="Primary mobile navigation"
        initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[70] overflow-hidden rounded-[1.35rem] border border-white/30 bg-[linear-gradient(135deg,var(--color-blue-600),var(--color-blue-500))] p-1 shadow-[0_16px_32px_rgb(2_20_45_/_38%),0_4px_8px_rgb(2_20_45_/_22%),inset_0_1px_0_rgb(255_255_255_/_28%),inset_0_-6px_14px_rgb(3_31_70_/_26%)] [transform:translateZ(0)] lg:hidden"
      >
        <ul className="mx-auto grid max-w-xl grid-cols-5 px-1">
          {mobilePrimaryNavigation.map((item) => {
            const Icon = icons[item.icon];
            const active = isActiveRoute(pathname, item.href);
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[0.6875rem] font-semibold text-white/78 transition-[color,background-color,box-shadow]",
                    active && "mobile-nav-active !text-[var(--color-blue-100)] bg-white/18 shadow-[inset_0_1px_0_rgb(255_255_255_/_35%),0_3px_8px_rgb(3_31_70_/_16%)]",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="mobile-active-tab"
                      aria-hidden="true"
                      transition={{
                        duration: reduceMotion ? 0 : 0.18,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute inset-x-2 top-1 h-0.5 rounded-full bg-[var(--color-blue-100)]"
                    />
                  ) : null}
                  <Icon
                    aria-hidden="true"
                    className="size-5"
                    strokeWidth={1.8}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <button
              ref={moreButtonRef}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              aria-controls="mobile-more-sheet"
              onClick={() => setIsOpen(true)}
              className={cn(
                "relative flex min-h-16 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl px-1 text-xs font-semibold text-white/78 transition-[color,background-color,box-shadow]",
                (moreIsActive || isOpen) && "mobile-nav-active !text-[var(--color-blue-100)] bg-white/18 shadow-[inset_0_1px_0_rgb(255_255_255_/_35%),0_3px_8px_rgb(3_31_70_/_16%)]",
              )}
            >
              {moreIsActive || isOpen ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-2 top-1 h-0.5 rounded-full bg-[var(--color-blue-100)]"
                />
              ) : null}
              <Ellipsis aria-hidden="true" className="size-6" strokeWidth={2} />
              <span>More</span>
            </button>
          </li>
        </ul>
      </motion.nav>

      <AnimatePresence>
        {isOpen ? (
          <div className="fixed inset-0 z-[80] lg:hidden">
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
              className="absolute inset-0 bg-black/65"
              onClick={() => closeSheet()}
            />
            <motion.div
              id="mobile-more-sheet"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-more-title"
              initial={reduceMotion ? false : { y: "100%" }}
              animate={{ y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { y: "100%" }}
              transition={{
                duration: reduceMotion ? 0 : 0.24,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-[1.75rem] border border-border bg-surface-elevated px-[var(--page-gutter)] pb-[calc(5rem+env(safe-area-inset-bottom))] pt-4 shadow-[0_-24px_80px_rgb(0_0_0_/_55%)]"
            >
              <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-white/20" />
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Logo size={48} imageClassName="h-12 w-12" />
                  <h2 id="mobile-more-title" className="text-2xl">
                    More
                  </h2>
                </div>
                <IconButton label="Close more navigation" onClick={() => closeSheet()}>
                  <X aria-hidden="true" className="size-5" />
                </IconButton>
              </div>

              <nav aria-label="More navigation" className="mt-6">
                <ul className="grid grid-cols-2 gap-2">
                  {mobileMoreNavigation.map((item) => (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        onClick={() => closeSheet({ restoreFocus: false })}
                        aria-current={
                          isActiveRoute(pathname, item.href) ? "page" : undefined
                        }
                        className={cn(
                          "flex min-h-12 items-center rounded-lg border border-border bg-background/40 px-4 font-semibold text-muted",
                          isActiveRoute(pathname, item.href) &&
                            "mobile-nav-active !border-blue-300/60 !bg-blue-500/15 !text-foreground shadow-[inset_0_1px_0_rgb(255_255_255_/_12%)]",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button
                  href={consultationNavigation.href}
                  onClick={() => closeSheet({ restoreFocus: false })}
                  size="lg"
                  className="mt-5 w-full"
                >
                  {consultationNavigation.label}
                </Button>
                <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1 border-t border-border pt-4">
                  {legalNavigation.map((item) => (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        onClick={() => closeSheet({ restoreFocus: false })}
                        className="inline-flex min-h-11 items-center text-sm text-muted hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
