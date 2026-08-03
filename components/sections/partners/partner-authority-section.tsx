import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { partnerCategories, partnerFaqs } from "@/config/partner-seo";
import { Container } from "@/components/ui/container";

const deliveryPrinciples = [
  "Technology choices aligned to operational goals.",
  "Practical design for connected, multi-vendor environments.",
  "A clear path from architecture through delivery and support.",
] as const;

export function PartnerAuthoritySection() {
  return (
    <section className="bg-navy-950 py-16 text-foreground sm:py-20 lg:py-24" aria-labelledby="partner-authority-heading">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Technology partners UAE</p>
            <h2 id="partner-authority-heading" className="mt-5 max-w-xl text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Partner ecosystems built for enterprise outcomes.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
              InnovGen brings established technology platforms together around the real needs of UAE organizations: dependable infrastructure, secure operations, connected teams and scalable digital services.
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted">
              The focus is not a catalogue of vendors. It is a practical, business-led technology environment that can evolve with your organization.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/services" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent">
                Explore IT services <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
              <Link href="/consultation" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-blue-300/35 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-blue-300/70 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent">
                Talk to an expert <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {partnerCategories.map((category) => (
              <article key={category.title} className="rounded-[1.5rem] border border-blue-300/20 bg-navy-900/60 p-6 shadow-[inset_0_1px_0_rgb(255_255_255_/_7%)]">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground">{category.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{category.description}</p>
                <ul className="mt-5 space-y-2" aria-label={`${category.title} technology partners`}>
                  {category.partners.map((partner) => (
                    <li key={partner} className="flex items-center gap-2 text-sm font-medium text-blue-100">
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                      {partner}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-blue-300/15 pt-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">How we deliver</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Technology decisions with business context.</h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            {deliveryPrinciples.map((principle, index) => (
              <li key={principle} className="border-l border-blue-300/25 pl-4 text-sm leading-6 text-muted">
                <span className="mb-3 flex size-8 items-center justify-center rounded-full border border-blue-300/25 bg-blue-500/10 text-xs font-semibold text-blue-200">0{index + 1}</span>
                {principle}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 border-t border-blue-300/15 pt-12">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Partner FAQ</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Frequently asked questions</h2>
            </div>
            <nav aria-label="Related InnovGen pages" className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-blue-200">
              <Link href="/about" className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent">About InnovGen</Link>
              <Link href="/projects" className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent">Client work</Link>
              <Link href="/blogs" className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent">Insights</Link>
            </nav>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {partnerFaqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-blue-300/20 bg-navy-900/50 p-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold text-foreground marker:hidden">
                  {faq.question}
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent transition-transform group-open:rotate-90" />
                </summary>
                <p className="pt-4 text-sm leading-6 text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
