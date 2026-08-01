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
} from "lucide-react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LegacyMobileServices } from "./legacy-mobile-services";
import {
  serviceCategories,
  serviceImageByIcon,
  type ServiceCategory,
  type ServiceIconKey,
} from "@/config/service-categories";

const ease = [0.22, 1, 0.36, 1] as const;

const icons: Record<ServiceIconKey, LucideIcon> = {
  analytics: Activity,
  cloud: CloudCog,
  datacentre: Database,
  devices: Laptop,
  education: GraduationCap,
  healthcare: Hospital,
  hospitality: Building2,
  industry: Factory,
  microsoft: Building2,
  network: Network,
  security: ShieldCheck,
  solutions: Building2,
};

const collagePlacement = [
  "col-span-7 row-span-2 min-h-[15.5rem] sm:col-span-6 sm:min-h-[21rem]",
  "col-span-5 min-h-[7.5rem] sm:col-span-3 sm:min-h-0",
  "col-span-5 min-h-[7.5rem] sm:col-span-3 sm:min-h-0",
] as const;

const collageEntrance = [
  { x: -48, y: 34, rotate: -4 },
  { x: 44, y: -26, rotate: 4 },
  { x: 54, y: 28, rotate: 3 },
] as const;

function ServiceIcon({ icon }: { icon: ServiceIconKey }) {
  if (icon === "microsoft") {
    return (
      <span aria-hidden="true" className="grid size-5 grid-cols-2 gap-[2px]">
        <span className="bg-[#f25022]" />
        <span className="bg-[#7fba00]" />
        <span className="bg-[#00a4ef]" />
        <span className="bg-[#ffb900]" />
      </span>
    );
  }

  const Icon = icons[icon];
  return <Icon aria-hidden="true" className="size-5" strokeWidth={1.7} />;
}

function EditorialCollage({ category }: { category: ServiceCategory }) {
  const reducedMotion = usePrefersReducedMotion();
  const visualServices = category.services.slice(0, 3);

  return (
    <div className="grid grid-cols-12 gap-3 sm:gap-4" aria-label={`${category.label} imagery`}>
      {visualServices.map((service, index) => {
        const entrance = collageEntrance[index];

        return (
          <motion.figure
            key={service.title}
            initial={reducedMotion ? false : { opacity: 0, x: entrance.x, y: entrance.y, scale: 0.88, rotate: entrance.rotate, rotateY: index === 0 ? -6 : 6 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, rotateY: 0 }}
            whileHover={reducedMotion ? undefined : { y: -7, scale: 1.015, rotateY: index === 0 ? -2 : 2 }}
            viewport={{ once: false, amount: 0.22 }}
            transition={{ duration: reducedMotion ? 0 : 0.62, delay: reducedMotion ? 0 : index * 0.08, ease }}
            style={{ transformPerspective: 1100, transformStyle: "preserve-3d" }}
            className={`group relative m-0 overflow-hidden rounded-[1.5rem] border border-blue-300/35 bg-[var(--color-navy-800)] shadow-[0_20px_42px_rgb(0_10_26_/_34%)] will-change-transform ${collagePlacement[index]}`}
          >
            <Image
              src={serviceImageByIcon[service.icon]}
              alt=""
              fill
              sizes={index === 0 ? "(max-width: 639px) 58vw, (max-width: 1023px) 48vw, 38vw" : "(max-width: 639px) 40vw, (max-width: 1023px) 26vw, 18vw"}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(4_18_40_/_7%),rgb(4_18_40_/_18%)_46%,rgb(4_18_40_/_76%))]" />
            <figcaption className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white sm:inset-x-5 sm:bottom-5">
              <span className="max-w-[16ch] text-sm font-semibold leading-tight sm:text-base">{service.title}</span>
              <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-blue-200/50 bg-[rgb(4_18_40_/_48%)] text-blue-200 backdrop-blur-sm">
                <ServiceIcon icon={service.icon} />
              </span>
            </figcaption>
          </motion.figure>
        );
      })}
    </div>
  );
}

function ServiceList({ category }: { category: ServiceCategory }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-4" aria-label={`${category.label} services`}>
      {category.services.map((service, index) => (
        <motion.li
          key={service.title}
          initial={reducedMotion ? false : { opacity: 0, x: 48, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          whileHover={reducedMotion ? undefined : { scale: 1.05 }}
          viewport={{ once: false, amount: 0.16 }}
          transition={{ duration: reducedMotion ? 0 : 0.42, delay: reducedMotion ? 0 : Math.min(index * 0.035, 0.24), ease }}
          className="will-change-transform"
        >
          <article className="relative flex min-h-40 flex-col rounded-[1.35rem] border border-blue-300/25 bg-[linear-gradient(145deg,rgb(13_32_58_/_94%),rgb(8_20_38_/_98%))] p-5 shadow-[0_14px_26px_rgb(0_8_22_/_20%),inset_0_1px_0_rgb(131_185_255_/_11%)]">
            <span className="grid size-10 place-items-center rounded-xl border border-blue-300/35 bg-blue-500/10 text-blue-300">
              <ServiceIcon icon={service.icon} />
            </span>
            <h3 className="mt-5 text-lg font-semibold leading-tight text-white sm:text-xl">{service.title}</h3>
            <p className="mt-2 text-sm leading-6 text-blue-100/75">{service.description}</p>
            <span aria-hidden="true" className="absolute right-5 top-5 text-blue-300/65">
              <ArrowUpRight className="size-4" />
            </span>
          </article>
        </motion.li>
      ))}
    </ul>
  );
}

function EditorialCategory({ category, index }: { category: ServiceCategory; index: number }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-heading`}
      className="relative border-t border-blue-300/20 py-12 first:border-t-0 first:pt-4 sm:py-20 sm:first:pt-8 lg:py-28"
    >
      <motion.div
        aria-hidden="true"
        animate={reducedMotion ? undefined : { x: [0, index % 2 === 0 ? 16 : -16, 0], y: [0, -10, 0], rotate: [0, index % 2 === 0 ? 9 : -9, 0] }}
        transition={{ duration: 9 + index, repeat: Infinity, ease: "easeInOut" }}
        className={`pointer-events-none absolute ${index % 2 === 0 ? "-right-20 top-12" : "-left-20 bottom-10"} size-56 rounded-[40%] border border-blue-400/20 bg-blue-500/[0.045]`}
      />

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(27rem,1.08fr)] lg:items-end lg:gap-12">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, x: -42, y: 24, rotateY: -7, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, y: 0, rotateY: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.26 }}
          transition={{ duration: reducedMotion ? 0 : 0.58, ease }}
          style={{ transformPerspective: 1000, transformOrigin: "0% 50%" }}
          className="order-2 max-w-xl lg:order-1"
        >
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl border border-blue-300/35 bg-blue-500/10 text-blue-300">
              <ServiceIcon icon={category.icon} />
            </span>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">{category.label}</p>
          </div>
          <h2 id={`${category.id}-heading`} className="mt-6 text-[clamp(2.2rem,4.7vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white">
            {category.title}
          </h2>
          <p className="mt-5 max-w-[58ch] text-base leading-7 text-blue-100/80 sm:text-lg sm:leading-8">{category.description}</p>
          <Button href="/consultation" variant="secondary" size="lg" className="group mt-7 border-blue-300/45 bg-blue-600 text-white shadow-[0_12px_26px_rgb(23_105_224_/_24%)] hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-500">
            Let&apos;s discuss
            <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </motion.div>

        <div className="order-1 lg:order-2">
          <EditorialCollage category={category} />
        </div>
      </div>
      <ServiceList category={category} />
    </section>
  );
}

export function ServicesShowcase() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section aria-labelledby="services-heading" className="relative isolate overflow-hidden md:bg-[linear-gradient(180deg,var(--color-navy-950),var(--color-navy-900))] md:py-16">
      <h1 id="services-heading" className="sr-only">InnovGen services</h1>
      <div className="md:hidden">
        <LegacyMobileServices />
      </div>
      <div className="relative hidden md:block">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_8%,rgb(47_130_245_/_18%),transparent_28rem),radial-gradient(circle_at_12%_36%,rgb(228_196_119_/_7%),transparent_26rem)]" />
        <Container size="wide" className="relative">
        <motion.header
          initial={reducedMotion ? false : { opacity: 0, y: 32, scale: 0.97, rotateX: 7 }}
          whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reducedMotion ? 0 : 0.64, ease }}
          style={{ transformPerspective: 1000 }}
          className="mx-auto max-w-4xl pb-12 text-center sm:pb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">InnovGen services</p>
          <p className="mt-4 text-[clamp(2.75rem,6vw,5.75rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-white">
            Technology, brought together with intent.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-blue-100/75 sm:text-lg">
            Explore the specialist capabilities that help organizations make confident progress.
          </p>
        </motion.header>

        {serviceCategories.map((category, index) => (
          <EditorialCategory key={category.id} category={category} index={index} />
        ))}
        </Container>
      </div>
    </section>
  );
}
