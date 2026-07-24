import Link from "next/link";
import {
  consultationNavigation,
  legalNavigation,
  mainNavigation,
} from "@/config/navigation";
import { formatCopyrightYear } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container size="wide" className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-muted">
              Secure, scalable digital systems for ambitious organizations.
            </p>
            <Button href={consultationNavigation.href} size="sm" className="mt-6">
              {consultationNavigation.label}
            </Button>
          </div>
          <nav aria-label="Footer navigation">
            <h2 className="text-base font-semibold">Explore</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    className="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-foreground"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {formatCopyrightYear()} InnovGen. All rights reserved.</p>
          <nav aria-label="Legal navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalNavigation.map((item) => (
                <li key={item.href}>
                  <Link className="hover:text-foreground" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
