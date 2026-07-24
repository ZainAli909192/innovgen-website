"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import {
  consultationNavigation,
  mainNavigation,
} from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function isActiveRoute(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    function updateHeader() {
      setIsScrolled(window.scrollY > 16);
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: isScrolled
          ? "rgba(25, 27, 23, 0.98)"
          : "rgba(5, 11, 24, 0.78)",
        borderColor: isScrolled
          ? "rgba(228, 196, 119, 0.28)"
          : "rgba(151, 179, 214, 0.12)",
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.32,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="header-surface sticky top-2 z-50 mx-3 overflow-hidden rounded-2xl border-b border-transparent backdrop-blur-xl lg:top-0 lg:mx-0 lg:rounded-none"
    >
      <Container
        size="wide"
        className="relative z-10 flex min-h-[var(--header-height)] items-center justify-between gap-3"
      >
        <Link
          href="/"
          aria-label="InnovGen IT Software Solutions"
          className="inline-flex h-[68px] w-[194px] shrink-0 items-center justify-center overflow-hidden   p-4 shadow-[0_7px_14px_rgb(2_12_28_/_28%),inset_0_1px_0_rgb(255_255_255_/_12%)] sm:w-[132px] lg:mr-5 lg:h-20 lg:w-[220px] lg:p-5"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            className="h-44 w-[max-width] max-w-none object-cover lg:h-52 lg:w-52"
            src="/original_logo.mp4"
          />
        </Link>
        <nav aria-label="Primary navigation" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={
                    isActiveRoute(pathname, item.href) ? "page" : undefined
                  }
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-foreground",
                    isActiveRoute(pathname, item.href) &&
                      "bg-[rgb(228_196_119_/_12%)] text-accent shadow-[inset_0_0_0_1px_rgb(228_196_119_/_28%)]",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <Button
            href={consultationNavigation.href}
            size="sm"
            className="max-sm:px-3 max-sm:text-xs max-sm:shadow-[0_6px_14px_rgb(3_18_43_/_26%),inset_0_1px_0_rgb(255_255_255_/_24%)]"
          >
            {consultationNavigation.label}
          </Button>
        </div>
      </Container>
    </motion.header>
  );
}
