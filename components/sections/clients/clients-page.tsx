"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  CheckCircle2,
  Cloud,
  Factory,
  GraduationCap,
  HeartPulse,
  Hotel,
  Landmark,
  Network,
  Server,
  ShieldCheck,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { Background3DShapes } from "@/components/motion/background-3d-shapes";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  clientCapabilities,
  industryHighlights,
  type ClientIconKey,
  uaeSupportPoints,
} from "@/config/clients-page";
import { TrustedClientsDirectory } from "./trusted-clients-directory";
import { FaqAccordion, PageReveal } from "./clients-faq";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<ClientIconKey, LucideIcon> = {
  server: Server,
  cloud: Cloud,
  shield: ShieldCheck,
  network: Network,
  government: Landmark,
  healthcare: HeartPulse,
  education: GraduationCap,
  hospitality: Hotel,
  retail: ShoppingBag,
  manufacturing: Factory,
};

const heroSignals = [
  { value: "UAE", label: "delivery context" },
  { value: "Secure", label: "by design" },
  { value: "Managed", label: "operations" },
  { value: "Long-term", label: "relationships" },
];

function SectionIntro({ eyebrow, title, description, light = false }: { eyebrow: string; title: string; description: string; light?: boolean }) {
  return (
    <div className="max-w-3xl">
      <p
        className={
          light
            ? "text-sm font-semibold uppercase tracking-[0.18em] text-blue-600"
            : "text-sm font-semibold uppercase tracking-[0.18em] text-accent"
        }
      >
        {eyebrow}
      </p>
      <h2
        className={
          light
            ? "mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--color-navy-950)]"
            : "mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white"
        }
      >
        {title}
      </h2>
      <p
        className={
          light
            ? "mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg"
            : "mt-5 max-w-2xl text-base leading-7 text-blue-100/75 sm:text-lg"
        }
      >
        {description}
      </p>
    </div>
  );
}

function HeroSignalPanel() {
  return (
    <div className="relative min-h-[23rem] overflow-hidden rounded-[2rem] border border-blue-300/25 bg-[linear-gradient(145deg,rgb(18_54_91_/_88%),rgb(4_14_30_/_96%))] p-6 shadow-[inset_0_1px_0_rgb(255_255_255_/_12%),0_28px_70px_rgb(0_0_0_/_22%)] sm:p-8 lg:min-h-[28rem]">
      <svg
        aria-hidden="true"
        viewBox="0 0 520 420"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 size-full text-blue-300/25"
      >
        <path
          d="M-10 310C80 306 84 86 190 98s84 198 174 170 70-176 180-190"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M-10 180c88 0 92 118 190 118 92 0 95-194 180-194 54 0 75 52 160 50"
          fill="none"
          stroke="currentColor"
          strokeDasharray="3 10"
          strokeWidth="1"
        />
        {[
          [72, 304],
          [178, 98],
          [268, 269],
          [365, 74],
          [450, 78],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="currentColor" />
        ))}
      </svg>
      <span aria-hidden="true" className="absolute -right-16 -top-20 size-52 rounded-full border border-accent/25 bg-accent/[0.06]" />
      <span aria-hidden="true" className="absolute -bottom-20 -left-20 size-60 rounded-full border border-blue-300/20 bg-blue-500/[0.06]" />

      <div className="relative flex h-full min-h-[20rem] flex-col justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
            Network signal
          </p>
          <p className="mt-4 max-w-[18ch] font-[family-name:var(--font-outfit)] text-3xl font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-4xl">
            Infrastructure confidence, connected.
          </p>
        </div>
        <dl className="relative grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-blue-300/20 bg-blue-300/15">
          {heroSignals.map((signal) => (
            <div key={signal.value} className="bg-[rgb(5_18_38_/_82%)] p-4 backdrop-blur-sm">
              <dt className="text-lg font-semibold text-accent">{signal.value}</dt>
              <dd className="mt-1 text-xs uppercase tracking-[0.12em] text-blue-100/65">
                {signal.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function CapabilityCard({
  title,
  description,
  icon,
  index,
}: (typeof clientCapabilities)[number] & { index: number }) {
  const Icon = iconMap[icon];

  return (
    <Card
      interactive
      className="group relative overflow-hidden border-blue-300/15 bg-[linear-gradient(145deg,rgb(13_38_69_/_94%),rgb(5_17_35_/_96%))] p-5 shadow-[0_18px_40px_rgb(0_0_0_/_18%)] sm:p-6"
    >
      <span aria-hidden="true" className="absolute inset-y-0 start-0 w-1 bg-blue-500/75 transition-colors duration-300 group-hover:bg-accent" />
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-blue-300/25 bg-blue-500/10 text-blue-200 transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent">
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.7} />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300/70">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-1 text-lg font-semibold leading-snug text-white">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-blue-100/70">{description}</p>
        </div>
      </div>
    </Card>
  );
}

function SupportPoint({
  title,
  description,
  icon,
  index,
}: (typeof uaeSupportPoints)[number] & { index: number }) {
  const Icon = iconMap[icon];

  return (
    <Card
      interactive
      className="group border-blue-300/15 bg-[rgb(7_20_42_/_72%)] p-5 shadow-none sm:p-6"
    >
      <div className="flex items-start gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-accent/35 bg-accent/10 text-accent">
          <Icon aria-hidden="true" className="size-4.5" strokeWidth={1.7} />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent/80">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-1 text-base font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-blue-100/70">{description}</p>
        </div>
      </div>
    </Card>
  );
}

function IndustryCard({
  title,
  description,
  icon,
  index,
}: (typeof industryHighlights)[number] & { index: number }) {
  const Icon = iconMap[icon];

  return (
    <Card
      interactive
      className="group relative min-h-56 overflow-hidden border-slate-200 bg-slate-50 p-6 shadow-[0_16px_34px_rgb(15_23_42_/_7%)] transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-[0_22px_42px_rgb(15_56_105_/_13%)]"
    >
      <span aria-hidden="true" className="absolute -right-4 -top-5 font-[family-name:var(--font-outfit)] text-8xl font-semibold leading-none text-blue-600/[0.07] transition-colors duration-300 group-hover:text-blue-600/[0.13]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="relative flex h-full flex-col">
        <span className="grid size-11 place-items-center rounded-2xl border border-blue-200 bg-white text-blue-600 shadow-sm">
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.7} />
        </span>
        <h3 className="mt-7 max-w-[18ch] text-xl font-semibold leading-tight text-slate-900">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </Card>
  );
}

export function ClientsPage() {
  const pageRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion || !pageRef.current) {
      return;
    }

    const context = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-client-scroll]");

      items.forEach((item, index) => {
        const direction = index % 2 === 0 ? -1 : 1;

        gsap.fromTo(
          item,
          {
            autoAlpha: 0,
            x: direction * 32,
            y: 22,
            scale: 0.975,
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.62,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              end: "bottom 12%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, pageRef);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <main ref={pageRef} className="overflow-x-clip">
      <Section
        spacing="spacious"
        className="relative isolate overflow-hidden border-b border-border bg-[linear-gradient(145deg,var(--color-navy-950),var(--color-navy-800))]"
      >
        <Background3DShapes variant="network" intensity="medium" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgb(131_185_255_/_7%)_1px,transparent_1px),linear-gradient(90deg,rgb(131_185_255_/_7%)_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_78%,transparent)]"
        />
        <Container size="wide" className="relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.06fr)_minmax(22rem,0.94fr)] lg:gap-16">
            <PageReveal className="max-w-4xl">
              <Badge variant="blue" className="border-accent/30 bg-accent/10 text-accent">
                Enterprise client network
              </Badge>
              <h1 className="mt-6 max-w-[18ch] text-balance text-[clamp(2.65rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-white">
                Trusted by organizations that depend on enterprise infrastructure and managed operations.
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-blue-100/75 sm:text-lg sm:leading-8">
                InnovGen supports long-term technology relationships across government, healthcare, education, hospitality, retail, manufacturing and enterprise services. Our client portfolio validates infrastructure delivery, secure cloud operations and professional consulting for UAE organizations.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/consultation" size="lg">
                  Speak with an enterprise IT specialist
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </Button>
                <Button href="/services" variant="secondary" size="lg">
                  Explore services
                </Button>
              </div>
            </PageReveal>
            <PageReveal delay={0.1} className="lg:justify-self-end lg:w-full lg:max-w-[34rem]">
              <HeroSignalPanel />
            </PageReveal>
          </div>
        </Container>
      </Section>

      <TrustedClientsDirectory variant="page" />

      <Section
        spacing="spacious"
        className="relative isolate overflow-hidden border-t border-border bg-[linear-gradient(180deg,var(--color-navy-950),var(--color-navy-900))]"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgb(47_130_245_/_10%),transparent_26rem),radial-gradient(circle_at_88%_80%,rgb(228_196_119_/_7%),transparent_24rem)]" />
        <Container size="wide" className="relative">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <PageReveal>
              <SectionIntro
                eyebrow="Why enterprise organizations stay connected"
                title="A partner built for infrastructure confidence."
                description="InnovGen brings resilient foundations, secure operations and sector-aware delivery together so technology can keep pace with the organization around it."
              />
              <div className="mt-9 space-y-4">
                {clientCapabilities.map((item, index) => (
                  <div key={item.title} data-client-scroll>
                    <CapabilityCard {...item} index={index} />
                  </div>
                ))}
              </div>
            </PageReveal>

            <PageReveal delay={0.1}>
              <div className="rounded-[2rem] border border-blue-300/20 bg-[linear-gradient(145deg,rgb(14_44_79_/_86%),rgb(4_15_31_/_96%))] p-5 shadow-[inset_0_1px_0_rgb(255_255_255_/_10%),0_26px_60px_rgb(0_0_0_/_18%)] sm:p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  How InnovGen supports the UAE
                </p>
                <p className="mt-4 max-w-xl text-2xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-3xl">
                  Delivery that respects the operational reality of every sector.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {uaeSupportPoints.map((item, index) => (
                    <div key={item.title} data-client-scroll>
                      <SupportPoint {...item} index={index} />
                    </div>
                  ))}
                </div>
              </div>
            </PageReveal>
          </div>
        </Container>
      </Section>

      <Section spacing="spacious" className="relative overflow-hidden bg-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgb(47_130_245_/_9%),transparent_24rem),linear-gradient(180deg,#ffffff,#f4f8fd)]" />
        <Container size="wide" className="relative">
          <PageReveal>
            <SectionIntro
              light
              eyebrow="Industries we serve"
              title="Enterprise technology delivery for the sectors that define the UAE."
              description="InnovGen partners with organizations across government, healthcare, education, hospitality, retail, manufacturing and technology to deliver secure, scalable enterprise IT systems."
            />
          </PageReveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {industryHighlights.map((item, index) => (
              <div key={item.title} data-client-scroll>
                <IndustryCard {...item} index={index} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section
        spacing="spacious"
        className="relative isolate overflow-hidden border-t border-border bg-[linear-gradient(180deg,var(--color-navy-950),var(--color-navy-900))]"
      >
        <Background3DShapes variant="geometry" intensity="subtle" />
        <Container size="wide" className="relative">
          <div className="grid gap-12 lg:grid-cols-[minmax(22rem,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-24 xl:gap-32">
            <PageReveal className="lg:sticky lg:top-28">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                Frequently asked questions
              </p>
              <h2 className="mt-4 max-w-[10ch] text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-white">
                Clear answers for complex environments.
              </h2>
              <p className="mt-8 max-w-sm text-base leading-7 text-blue-100/70">
                Common questions from UAE enterprise organizations.
              </p>
            </PageReveal>
            <PageReveal delay={0.1}>
              <FaqAccordion />
              <div className="mt-8 flex items-start gap-3 text-sm leading-6 text-blue-100/65">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
                <p>Have a specific infrastructure or managed operations question? Our team can help frame the next practical step.</p>
              </div>
            </PageReveal>
          </div>
        </Container>
      </Section>

      <Section
        spacing="spacious"
        className="relative isolate overflow-hidden bg-white text-[var(--color-navy-950)]"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgb(47_130_245_/_18%),transparent_28rem),linear-gradient(135deg,#ffffff_18%,rgb(236_245_255)_58%,#ffffff)]" />
        <Container size="wide" className="relative">
          <PageReveal className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Start with the operating context
            </p>
            <h2 className="mt-5 text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-[var(--color-navy-950)]">
              Speak with an enterprise IT specialist.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Share the systems, constraints and outcomes that matter to your organization. InnovGen will help shape a secure, scalable path forward.
            </p>
            <div className="mt-9 flex justify-center">
              <Button href="/consultation" variant="secondary" size="lg" className="border-blue-300/70 bg-[var(--color-navy-900)] !text-white shadow-[0_14px_30px_rgb(23_105_224_/_20%)] hover:!bg-[var(--color-navy-950)]">
                Start a conversation
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Button>
            </div>
          </PageReveal>
        </Container>
      </Section>
    </main>
  );
}
