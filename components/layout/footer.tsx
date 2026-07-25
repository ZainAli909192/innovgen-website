"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  companyNavigation,
  consultationNavigation,
  legalNavigation,
} from "@/config/navigation";
import { footerProductLinks, footerServiceLinks } from "@/config/footer";
import {
  contactItems,
  siteConfig,
  socialItems,
  trustItems,
} from "@/config/site";
import { formatCopyrightYear } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";

function FooterLinkList({
  items,
}: {
  items: readonly {
    label: string;
    href: string;
  }[];
}) {
  return (
    <ul className="mt-4 space-y-1">
      {items.map((item) => (
        <li key={`${item.label}-${item.href}`}>
          <Link
            href={item.href}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function SocialIcon({ network }: { network: "whatsapp" | "instagram" | "facebook" }) {
  const paths = {
    whatsapp:
      "M16.75 13.96c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.59.13-.17.26-.67.85-.82 1.02-.15.17-.3.2-.56.07-.26-.13-1.09-.4-2.07-1.28-.77-.68-1.29-1.52-1.44-1.78-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.59-1.41-.8-1.93-.21-.51-.43-.44-.59-.45h-.5c-.17 0-.46.07-.7.33-.24.26-.91.89-.91 2.17s.93 2.52 1.06 2.69c.13.17 1.83 2.8 4.44 3.92.62.27 1.1.43 1.48.55.62.2 1.19.17 1.63.1.5-.07 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.06-.11-.24-.17-.5-.3M12.04 21a8.93 8.93 0 0 1-4.55-1.25L2.45 21l1.35-4.91A8.93 8.93 0 1 1 12.04 21m0-16.2a7.25 7.25 0 0 0-6.16 11.08l.2.31-.8 2.92 3-.79.29.17a7.26 7.26 0 1 0 3.47-13.69",
    instagram:
      "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7m10.5 1.5A1.25 1.25 0 1 1 16.25 6.75 1.25 1.25 0 0 1 17.5 5.5M12 7a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0 2a3 3 0 1 0 3 3 3 3 0 0 0-3-3",
    facebook:
      "M14 8.5V6.8c0-.83.55-1.03.94-1.03H17V2.14L14.16 2C10.72 2 10 4.58 10 6.23V8.5H7v4h3V22h4v-9.5h2.7l.45-4H14",
  } as const;

  return <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="currentColor"><path d={paths[network]} /></svg>;
}

export function Footer() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.footer
      initial={reducedMotion ? false : { opacity: 0, y: 42, rotateX: 7, scale: 0 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: reducedMotion ? 0 : 0.72,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformPerspective: 1200, transformOrigin: "50% 60%" }}
      className="footer-neomorph border-t border-border bg-[var(--color-navy-900)] pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0"
    >
      <Container size="wide" className="py-6 md:py-16">
        <div className="hidden gap-10 sm:grid-cols-2 md:grid lg:grid-cols-3 xl:grid-cols-[1.25fr_1fr_1fr_1fr_1.15fr]">
          <section aria-labelledby="footer-brand-heading" className="sm:col-span-2 lg:col-span-1">
            <h2 id="footer-brand-heading" className="sr-only">InnovGen</h2>
            <Logo size={88} imageClassName="h-[88px] w-[88px]" />
            <p className="mt-5 max-w-sm text-muted">{siteConfig.description}</p>
            <Button href={consultationNavigation.href} size="sm" className="mt-6">
              {consultationNavigation.label}
            </Button>
            <div className="mt-6">
              <p className="text-sm font-semibold">Social media</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {socialItems.map((item) => (
                  <li key={item.network}>
                    <a href={item.href} target="_blank" rel="noreferrer" aria-label={`${item.label} (opens in a new tab)`} className="inline-flex size-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-blue-300/40 hover:text-foreground">
                      <SocialIcon network={item.network} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <nav aria-labelledby="footer-company-heading">
            <h2 id="footer-company-heading" className="text-base font-semibold">Company</h2>
            <FooterLinkList items={companyNavigation} />
          </nav>

          <nav aria-labelledby="footer-services-heading">
            <h2 id="footer-services-heading" className="text-base font-semibold">Services</h2>
            <FooterLinkList items={footerServiceLinks} />
          </nav>

          <nav aria-labelledby="footer-products-heading">
            <h2 id="footer-products-heading" className="text-base font-semibold">Products / Solutions</h2>
            <FooterLinkList items={footerProductLinks} />
          </nav>

          <section aria-labelledby="footer-contact-heading">
            <h2 id="footer-contact-heading" className="text-base font-semibold">Contact</h2>
            <dl className="mt-4 space-y-4">
              {contactItems.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-accent">{item.label}</dt>
                  <dd className="mt-1 text-sm text-muted">
                    {item.href ? <a className="hover:text-foreground" href={item.href}>{item.value}</a> : item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        {trustItems.length > 0 ? (
          <section aria-labelledby="footer-trust-heading" className="mt-10 hidden border-t border-border pt-8 md:block">
            <h2 id="footer-trust-heading" className="text-base font-semibold">Trust and ecosystem</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {trustItems.map((item) => (
                <li key={item.label} className="rounded-full border border-border px-4 py-2 text-sm text-muted">
                  {item.label}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="flex flex-col gap-4 text-center text-sm text-muted md:mt-12 md:flex-row md:items-center md:justify-between md:border-t md:border-border md:pt-6 md:text-left">
          <p>© {formatCopyrightYear()} {siteConfig.name}. All rights reserved.</p>
          <nav aria-label="Legal navigation" className="hidden md:block">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalNavigation.map((item) => (
                <li key={item.key}>
                  <Link className="inline-flex min-h-11 items-center hover:text-foreground" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </motion.footer>
  );
}
