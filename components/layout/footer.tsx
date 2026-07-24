import Link from "next/link";
import { Share2 } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { NewsletterForm } from "@/components/forms/newsletter-form";
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

function FooterLinkList({
  items,
}: {
  items: readonly {
    label: string;
    href: string;
    approval?: "approved" | "client-approval-required";
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
            {item.approval === "client-approval-required" ? (
              <span className="sr-only">Client approval required</span>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-[var(--color-navy-900)] pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0">
      <Container size="wide" className="py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.25fr_1fr_1fr_1fr_1.15fr]">
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
                {socialItems.map((item) => {
                  return (
                    <li key={item.network}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${item.label} (opens in a new tab)`}
                          className="inline-flex size-11 items-center justify-center rounded-full border border-border text-muted hover:border-blue-300/40 hover:text-foreground"
                        >
                          <Share2 aria-hidden="true" className="size-5" />
                        </a>
                      ) : (
                        <span
                          aria-label={`${item.label} URL pending client approval`}
                          title={`${item.label} URL pending client approval`}
                          className="inline-flex size-11 items-center justify-center rounded-full border border-border text-muted/60"
                        >
                          <Share2 aria-hidden="true" className="size-5" />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-2 text-xs text-muted">
                Social URLs pending client approval.
              </p>
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

        <section
          aria-labelledby="newsletter-heading"
          className="mt-12 grid gap-8 rounded-xl border border-border bg-surface-elevated p-6 md:grid-cols-[.8fr_1.2fr] md:items-center md:p-8"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Stay informed</p>
            <h2 id="newsletter-heading" className="mt-3 text-2xl">Practical technology insights</h2>
            <p className="mt-3 max-w-lg text-sm text-muted">
              Occasional perspectives on responsible AI, digital products,
              cloud and secure transformation.
            </p>
          </div>
          <NewsletterForm />
        </section>

        {trustItems.length > 0 ? (
          <section aria-labelledby="footer-trust-heading" className="mt-10 border-t border-border pt-8">
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

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {formatCopyrightYear()} {siteConfig.name}. All rights reserved.</p>
          <nav aria-label="Legal navigation">
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
    </footer>
  );
}
