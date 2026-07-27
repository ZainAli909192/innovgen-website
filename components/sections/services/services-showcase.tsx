"use client";

import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import {
  Activity,
  ArrowUpRight,
  Building2,
  CloudCog,
  Database,
  Factory,
  GraduationCap,
  Hospital,
  Laptop,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  serviceCategories,
  serviceImageByIcon,
  type ServiceCategory,
  type ServiceIconKey,
} from "@/config/service-categories";

const icons: Record<ServiceIconKey, LucideIcon> = {
  analytics: Activity,
  cloud: CloudCog,
  datacentre: Database,
  devices: Laptop,
  education: GraduationCap,
  healthcare: Hospital,
  hospitality: Building2,
  industry: Factory,
  microsoft: Sparkles,
  network: Network,
  security: ShieldCheck,
  solutions: Building2,
};

const cardPlacement = [
  "max-md:translate-y-0 lg:col-span-2 lg:row-span-2 lg:min-h-[29rem] lg:mt-24",
  "max-md:translate-y-8 lg:col-span-1 lg:mt-0",
  "max-md:-translate-y-2 lg:col-span-1 lg:mt-12",
  "max-md:translate-y-5 lg:col-span-1 lg:mt-6",
  "max-md:translate-y-1 lg:col-span-1 lg:mt-28",
  "max-md:translate-y-9 lg:col-span-1 lg:mt-0",
  "max-md:-translate-y-3 lg:col-span-1 lg:mt-[4.5rem]",
  "max-md:translate-y-6 lg:col-span-1 lg:mt-8",
  "max-md:translate-y-1 lg:col-span-1 lg:mt-24",
  "max-md:translate-y-8 lg:col-span-1 lg:mt-2",
  "max-md:-translate-y-2 lg:col-span-1 lg:mt-16",
  "max-md:translate-y-5 lg:col-span-1 lg:mt-10",
] as const;

function ServiceIcon({ icon }: { icon: ServiceIconKey }) {
  const Icon = icons[icon];
  return <Icon aria-hidden="true" className="size-5" strokeWidth={1.7} />;
}

function ServiceCard({
  index,
  service,
}: {
  index: number;
  service: ServiceCategory["services"][number];
}) {
  const reducedMotion = usePrefersReducedMotion();
  const featured = index === 0;

  return (
    <motion.li
      initial={
        reducedMotion
          ? false
          : { opacity: 0, y: 28, rotateY: index % 2 ? 5 : -5, scale: 0.94 }
      }
      whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: reducedMotion ? 0 : 0.46,
        delay: reducedMotion ? 0 : Math.min(index * 0.035, 0.22),
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformPerspective: 1100 }}
      className={cardPlacement[index % cardPlacement.length]}
    >
      <article
        className={`group relative flex h-full min-h-[20rem] overflow-hidden rounded-[1.65rem] border border-blue-300/30 bg-surface p-5 shadow-xl transition-[transform,border-color,box-shadow] duration-[var(--duration-standard)] hover:-translate-y-1 hover:border-accent/55 hover:shadow-2xl motion-reduce:transform-none sm:min-h-[22rem] sm:p-6 ${featured ? "lg:p-8" : ""}`}
      >
        <Image
          src={serviceImageByIcon[service.icon]}
          alt=""
          fill
          sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 18vw"
          className="object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-95"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-navy-950)_10%,transparent)_0%,color-mix(in_srgb,var(--color-navy-950)_32%,transparent)_35%,color-mix(in_srgb,var(--color-navy-950)_94%,transparent)_100%)]" />
        <span className="relative grid size-11 place-items-center rounded-2xl border border-accent/40 bg-[color-mix(in_srgb,var(--color-navy-950)_76%,transparent)] text-accent shadow-lg">
          <ServiceIcon icon={service.icon} />
        </span>
        <div className="relative mt-auto pt-12">
          <h3 className={featured ? "text-2xl leading-tight sm:text-3xl" : "text-lg leading-tight sm:text-xl"}>
            {service.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-blue-100/90">
            {service.description}
          </p>
        </div>
        <Button
          href="/consultation"
          variant="secondary"
          size="sm"
          className="group/button mt-5 w-fit border-blue-300/40 bg-[color-mix(in_srgb,var(--color-navy-950)_65%,transparent)] text-blue-100 hover:border-accent/55 hover:bg-accent/15 hover:text-accent"
        >
          Let&apos;s discuss
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-[var(--duration-fast)] group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
          />
        </Button>
      </article>
    </motion.li>
  );
}

function ServiceCategoryCloud({ category }: { category: ServiceCategory }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-heading`}
      className="relative isolate overflow-hidden border-t border-blue-300/15 py-16 first:border-t-0 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-8 size-72 rounded-full border border-blue-300/15 bg-blue-500/[0.035]"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -left-12 size-44 rounded-[42%] border border-accent/20 bg-accent/[0.045]"
        animate={reducedMotion ? undefined : { x: [0, 14, 0], y: [0, -12, 0], rotate: [0, 9, 0] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: reducedMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <span className="mx-auto grid size-12 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
          <ServiceIcon icon={category.icon} />
        </span>
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {category.label}
        </p>
        <h2 id={`${category.id}-heading`} className="mt-4 text-[clamp(2rem,4.6vw,3.75rem)]">
          {category.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {category.description}
        </p>
      </motion.div>

      <ul className="relative mt-10 grid grid-cols-2 items-start gap-x-3 gap-y-10 sm:mt-14 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-6 lg:gap-x-5 lg:gap-y-8">
        {category.services.map((service, index) => (
          <ServiceCard key={service.title} index={index} service={service} />
        ))}
      </ul>
    </section>
  );
}

export function ServicesShowcase() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      aria-labelledby="services-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-navy-950),var(--color-navy-900))]  "
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_78%_14%,color-mix(in_srgb,var(--color-blue-500)_15%,transparent),transparent_31rem),radial-gradient(circle_at_20%_24%,color-mix(in_srgb,var(--accent)_7%,transparent),transparent_25rem)]"
      />
      <Container size="wide" className="relative">
 

        <div className="mt-12 sm:mt-16">
          {serviceCategories.map((category) => (
            <ServiceCategoryCloud key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
