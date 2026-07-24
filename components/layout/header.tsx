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
import { Logo } from "@/components/brand/logo";

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
          ? "rgba(5, 11, 24, 0.98)"
          : "rgba(5, 11, 24, 0.78)",
        borderColor: isScrolled
          ? "rgba(151, 179, 214, 0.24)"
          : "rgba(151, 179, 214, 0.12)",
      }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
    >
      <Container
        size="wide"
        className="flex min-h-[var(--header-height)] items-center justify-between gap-4"
      >
        <Logo size={60} priority imageClassName="h-[60px] w-[60px]" />
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
                      "bg-white/8 text-foreground shadow-[inset_0_0_0_1px_rgb(131_185_255_/_16%)]",
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
      </Container>
    </motion.header>
  );
}
