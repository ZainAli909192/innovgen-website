"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import {
  Activity,
  ArrowUpRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  CloudCog,
  Database,
  Factory,
  GraduationCap,
  Hospital,
  Laptop,
  Network,
  ShieldCheck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useMobileLayout } from "@/hooks/use-mobile-layout";
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
  microsoft: Building2,
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
        className={`group relative flex h-full min-h-[25rem] flex-col overflow-hidden rounded-[1.25rem] border border-blue-300/30 bg-surface p-2 shadow-xl transition-[transform,border-color,box-shadow] duration-[var(--duration-standard)] hover:-translate-y-1 hover:border-accent/55 hover:shadow-2xl motion-reduce:transform-none sm:min-h-[27rem] sm:p-6 ${featured ? "lg:min-h-[32rem] lg:p-8" : ""}`}
      >
        <Image
          src={serviceImageByIcon[service.icon]}
          alt=""
          fill
          sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 18vw"
          className="object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-95"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-navy-950)_16%,transparent)_0%,color-mix(in_srgb,var(--color-navy-950)_42%,transparent)_36%,var(--color-navy-950)_100%)]" />
        <span className="relative grid size-11 place-items-center rounded-2xl border border-accent/40 bg-[color-mix(in_srgb,var(--color-navy-950)_76%,transparent)] text-accent shadow-lg">
          <ServiceIcon icon={service.icon} />
        </span>
        <div className="relative mt-auto rounded-2xl p-3 backdrop-blur-[2px]">
          <h3 className={featured ? "text-2xl font-semibold leading-[1.08] sm:text-3xl" : "text-xl font-semibold leading-[1.1] sm:text-2xl"}>
            {service.title}
          </h3>
          <p className="mt-3 text-sm font-medium leading-6 text-blue-100 sm:text-base">
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

function MobileServiceWheel({ category }: { category: ServiceCategory }) {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMobileLayout();
  const wheelRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const serviceCount = category.services.length;
  const activeService = category.services[activeIndex];
  const step = 360 / serviceCount;

  useEffect(() => {
    const element = wheelRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || !isVisible) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % serviceCount);
    }, 2000);

    return () => window.clearInterval(timer);
  }, [isVisible, reducedMotion, serviceCount]);

  function selectService(index: number) {
    setActiveIndex((index + serviceCount) % serviceCount);
  }

  return (
    <motion.div
      ref={wheelRef}
      initial={reducedMotion ? false : isMobile ? { opacity: 0, x: 100 } : { opacity: 0, y: 34, rotateX: 12, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: reducedMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1000 }}
      className="relative mx-auto mt-10 max-w-[25rem] md:hidden"
    >
      <div className="relative aspect-square">
        <div aria-hidden="true" className="absolute inset-[8%] rounded-full border border-blue-300/35 bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-blue-500)_15%,transparent)_0%,transparent_62%)] shadow-[inset_0_0_36px_rgb(47_130_245_/_12%),0_0_36px_rgb(47_130_245_/_10%)]" />
        <div aria-hidden="true" className="absolute inset-[18%] rounded-full border border-blue-500/25" />
        <div aria-hidden="true" className="absolute inset-[30%] rounded-full border border-accent/35 bg-[radial-gradient(circle_at_35%_30%,color-mix(in_srgb,var(--color-blue-500)_28%,transparent),var(--color-navy-900)_68%)] shadow-[0_0_28px_rgb(47_130_245_/_30%),inset_0_0_24px_rgb(228_196_119_/_14%)]" />

        <motion.ol
          aria-label={`${category.label} services`}
          animate={{ rotate: reducedMotion ? 0 : -activeIndex * step }}
          transition={{ duration: reducedMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 m-0 list-none p-0"
        >
          {category.services.map((service, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={service.title}
                className="absolute left-1/2 top-1/2"
                style={{ transform: `translate(-50%, -50%) rotate(${index * step}deg) translateY(-9rem)` }}
              >
                <motion.button
                  type="button"
                  aria-label={`Show ${service.title}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => selectService(index)}
                  animate={reducedMotion ? undefined : { rotate: activeIndex * step }}
                  transition={{ duration: reducedMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid size-12 cursor-pointer place-items-center rounded-2xl border shadow-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${isActive ? "border-blue-300 bg-blue-500/20 text-blue-100 shadow-[0_0_20px_rgb(47_130_245_/_34%)]" : "border-blue-300/40 bg-[color-mix(in_srgb,var(--color-navy-900)_90%,transparent)] text-blue-300"}`}
                >
                  <ServiceIcon icon={service.icon} />
                </motion.button>
              </li>
            );
          })}
        </motion.ol>

        <div className="absolute inset-[31%] z-10 grid place-items-center rounded-full px-3 text-center pointer-events-none">
          <div>
            <p aria-live="polite" className="mt-2 text-xs leading-snug text-blue-100">{activeService.title}</p>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 px-2">
        <button
          type="button"
          onClick={() => selectService(activeIndex - 1)}
          className="grid size-11 cursor-pointer place-items-center rounded-full border border-blue-300/35 bg-navy-900 text-blue-100 transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="Previous service"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <p className="text-center text-xs font-medium text-muted">
          Rotates every 2 seconds — tap an icon to explore
        </p>
        <button
          type="button"
          onClick={() => selectService(activeIndex + 1)}
          className="grid size-11 cursor-pointer place-items-center rounded-full border border-blue-300/35 bg-navy-900 text-blue-100 transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="Next service"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeService.title}
          initial={reducedMotion ? false : isMobile ? { opacity: 0, x: 100 } : { opacity: 0, y: 12, rotateX: -6, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, y: 0, rotateX: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : isMobile ? { opacity: 0, x: -40 } : { opacity: 0, y: -8, rotateX: 5, scale: 0.98 }}
          transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 800 }}
          className="mt-5 rounded-2xl border border-blue-300/25 bg-[color-mix(in_srgb,var(--color-navy-900)_82%,transparent)] p-5 shadow-[0_14px_30px_rgb(0_0_0_/_20%)]"
        >
          <h3 className="text-xl font-semibold leading-tight text-foreground">{activeService.title}</h3>
          <p className="mt-2 text-sm leading-6 text-blue-100">{activeService.description}</p>
          <Button href="/consultation" variant="secondary" size="sm" className="mt-4 border-blue-300/40 bg-blue-600 text-white hover:bg-blue-500">
            Let&apos;s discuss
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function ServiceCategoryCloud({ category }: { category: ServiceCategory }) {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMobileLayout();

  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-heading`}
      className="relative isolate overflow-hidden border-t border-blue-300/15 py-10 first:border-t-0 first:pt-6 sm:py-24 sm:first:pt-16"
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
        initial={reducedMotion ? false : isMobile ? { opacity: 0, x: 100 } : { opacity: 0, y: 28, rotateX: 8, scale: 0.96 }}
        whileInView={{ opacity: 1, x: 0, y: 0, rotateX: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: reducedMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 900 }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <span className="mx-auto grid size-12 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
          <ServiceIcon icon={category.icon} />
        </span>
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {category.label}
        </p>
        <h2 id={`${category.id}-heading`} className="mt-4 text-[clamp(2rem,4.6vw,3.75rem)] max-md:text-[var(--color-navy-900)]">
          {category.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted max-md:text-[var(--color-navy-800)] sm:text-lg">
          {category.description}
        </p>
      </motion.div>

      <MobileServiceWheel category={category} />

      <ul className="relative -mx-2 mt-10 hidden grid-cols-2 items-start gap-x-2 gap-y-10 md:mx-0 md:mt-14 md:grid md:grid-cols-3 md:gap-x-5 md:gap-y-8 lg:grid-cols-6">
        {category.services.map((service, index) => (
          <ServiceCard key={service.title} index={index} service={service} />
        ))}
      </ul>
    </section>
  );
}

export function ServicesShowcase() {
  return (
    <section
      aria-labelledby="services-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-navy-950),var(--color-navy-900))] max-md:bg-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_78%_14%,color-mix(in_srgb,var(--color-blue-500)_15%,transparent),transparent_31rem),radial-gradient(circle_at_20%_24%,color-mix(in_srgb,var(--accent)_7%,transparent),transparent_25rem)]"
      />
      <Container size="wide" className="relative">
 

        <div>
          {serviceCategories.map((category) => (
            <ServiceCategoryCloud key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
