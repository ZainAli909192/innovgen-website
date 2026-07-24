"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  consultationNavigation,
  mainNavigation,
} from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconButton } from "@/components/ui/icon-button";
import { Logo } from "./logo";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    first?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
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

  function isCurrent(href: string) {
    return href === "/" ? pathname === href : pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[rgb(5_11_24_/_88%)] backdrop-blur-xl">
      <Container
        size="wide"
        className="flex min-h-[var(--header-height)] items-center justify-between gap-4"
      >
        <Logo />
        <nav aria-label="Primary navigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-foreground",
                    isCurrent(item.href) && "bg-white/7 text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden lg:block">
          <Button href={consultationNavigation.href} size="sm">
            {consultationNavigation.label}
          </Button>
        </div>
        <IconButton
          ref={menuButtonRef}
          label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((value) => !value)}
          className="lg:hidden"
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </IconButton>
      </Container>

      {isOpen ? (
        <div
          id="mobile-navigation"
          ref={panelRef}
          className="fixed inset-x-0 top-[var(--header-height)] h-[calc(100dvh-var(--header-height))] overflow-y-auto border-t border-border bg-background p-[var(--page-gutter)] lg:hidden"
        >
          <nav aria-label="Mobile navigation">
            <ul className="grid gap-2">
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    className={cn(
                      "flex min-h-12 items-center rounded-lg px-4 text-lg font-semibold text-muted hover:bg-white/5 hover:text-foreground",
                      isCurrent(item.href) && "bg-surface-elevated text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button
              href={consultationNavigation.href}
              onClick={() => setIsOpen(false)}
              size="lg"
              className="mt-6 w-full"
            >
              {consultationNavigation.label}
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
