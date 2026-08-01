"use client";

import { useEffect, useRef, useState } from "react";
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
  type LucideIcon,
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

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || !isVisible) return;

    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % serviceCount), 2000);
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
      className="relative mx-auto mt-10 max-w-[25rem]"
    >
      <div className="relative rounded-[2.25rem] border border-blue-200/80 bg-white/55 p-3 shadow-[0_18px_50px_rgb(26_93_175_/_10%),inset_0_1px_0_rgb(255_255_255_/_92%)]">
        <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-[radial-gradient(circle_at_50%_45%,rgb(221_237_255)_0%,rgb(244_249_255)_48%,rgb(232_242_255)_100%)]">
          <div aria-hidden="true" className="absolute inset-[7%] rounded-full border border-blue-300/60 bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-blue-500)_10%,transparent)_0%,transparent_66%)] shadow-[inset_0_0_30px_rgb(47_130_245_/_9%)]" />
          <div aria-hidden="true" className="absolute inset-[18%] rounded-full border border-blue-300/50" />
          <div aria-hidden="true" className="absolute inset-[31%] rounded-full border border-blue-400/70 bg-[radial-gradient(circle_at_35%_27%,rgb(81_156_255),var(--color-navy-900)_66%)] shadow-[0_14px_28px_rgb(13_32_58_/_28%),inset_0_1px_10px_rgb(255_255_255_/_24%)]" />
          <motion.ol aria-label={`${category.label} services`} animate={{ rotate: reducedMotion ? 0 : -activeIndex * step }} transition={{ duration: reducedMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 m-0 list-none p-0">
            {category.services.map((service, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={service.title} className="absolute left-1/2 top-1/2" style={{ transform: `translate(-50%, -50%) rotate(${index * step}deg) translateY(-9rem)` }}>
                  <motion.button
                    type="button"
                    aria-label={`Show ${service.title}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => selectService(index)}
                    animate={reducedMotion ? undefined : { rotate: activeIndex * step }}
                    transition={{ duration: reducedMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}
                    className={`grid size-12 cursor-pointer place-items-center rounded-2xl border shadow-lg transition-[transform,border-color,background-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 ${isActive ? "scale-110 border-blue-300 bg-blue-600 text-white shadow-[0_12px_24px_rgb(21_105_224_/_38%),inset_0_1px_0_rgb(255_255_255_/_28%)]" : "border-blue-200 bg-white text-blue-600 shadow-[0_8px_18px_rgb(35_94_163_/_15%)]"}`}
                  >
                    <ServiceIcon icon={service.icon} />
                  </motion.button>
                </li>
              );
            })}
          </motion.ol>
          <div className="pointer-events-none absolute inset-[31%] z-10 grid place-items-center rounded-full px-3 text-center">
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-blue-100/75">Active</p>
              <p aria-live="polite" className="mt-1 text-xs font-semibold leading-snug text-white">{activeService.title}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 px-2">
        <button type="button" onClick={() => selectService(activeIndex - 1)} className="grid size-11 cursor-pointer place-items-center rounded-full border border-blue-200 bg-white text-blue-600 shadow-[0_6px_16px_rgb(35_94_163_/_10%)] transition-colors hover:border-blue-500 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" aria-label="Previous service">
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <p className="max-w-40 text-center text-xs font-semibold leading-4 text-[var(--color-navy-700)]">Rotates every 2 seconds — tap an icon to explore</p>
        <button type="button" onClick={() => selectService(activeIndex + 1)} className="grid size-11 cursor-pointer place-items-center rounded-full border border-blue-200 bg-white text-blue-600 shadow-[0_6px_16px_rgb(35_94_163_/_10%)] transition-colors hover:border-blue-500 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" aria-label="Next service">
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeService.title}
          initial={reducedMotion ? false : { opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 overflow-hidden rounded-[1.5rem] border border-blue-200 bg-white p-5 shadow-[0_18px_36px_rgb(35_94_163_/_14%),inset_0_1px_0_rgb(255_255_255_/_90%)]"
        >
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-blue-600">Selected service</p>
          <h3 className="mt-2 text-xl font-semibold leading-tight text-[var(--color-navy-900)]">{activeService.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--color-navy-700)]">{activeService.description}</p>
          <Button href="/consultation" variant="secondary" size="sm" className="mt-4 border-blue-600 bg-blue-600 text-white shadow-[0_10px_22px_rgb(21_105_224_/_24%)] hover:bg-blue-500">
            Let&apos;s discuss
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function MobileImageServiceCards({ category }: { category: ServiceCategory }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <ul className="relative mt-10 grid grid-cols-2 gap-3" aria-label={`${category.label} services`}>
      {category.services.map((service, index) => {
        const featured = index === 0;
        return (
          <motion.li
            key={service.title}
            initial={reducedMotion ? false : { opacity: 0, x: index % 2 === 0 ? -28 : 28, y: 18, scale: 0.94 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : Math.min(index * 0.035, 0.2), ease: [0.22, 1, 0.36, 1] }}
            className={featured ? "col-span-2" : ""}
          >
            <article className={`group relative isolate flex overflow-hidden rounded-[1.45rem] border border-blue-200 bg-[var(--color-navy-900)] shadow-[0_16px_32px_rgb(28_78_141_/_18%)] ${featured ? "min-h-[17.5rem]" : "min-h-[13.5rem]"}`}>
              <Image
                src={category.id === "managed-services" && service.title === "Managed Services" ? "/managed.webp" : serviceImageByIcon[service.icon]}
                alt=""
                fill
                sizes={featured ? "100vw" : "50vw"}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(4_18_40_/_12%)_0%,rgb(4_18_40_/_28%)_38%,rgb(4_18_40_/_94%)_100%)]" />
              <div className="relative z-10 mt-auto w-full p-4">
                <span className="mb-3 grid size-9 place-items-center rounded-xl border border-blue-200/60 bg-white/90 text-blue-600 shadow-[0_6px_18px_rgb(4_18_40_/_20%)]"><ServiceIcon icon={service.icon} /></span>
                <h3 className={`font-semibold leading-tight text-white ${featured ? "text-2xl" : "text-base"}`}>{service.title}</h3>
                <p className={`mt-1.5 max-w-[28ch] leading-5 text-blue-100 ${featured ? "text-sm" : "text-xs"}`}>{service.description}</p>
                <Button href="/consultation" variant="secondary" size="sm" className={`mt-3 border-blue-300/50 bg-blue-600 text-white shadow-[0_8px_18px_rgb(21_105_224_/_26%)] hover:bg-blue-500 ${featured ? "" : "px-3 text-xs"}`}>
                  Let&apos;s discuss
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </Button>
              </div>
            </article>
          </motion.li>
        );
      })}
    </ul>
  );
}

function MobileCategory({ category }: { category: ServiceCategory }) {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMobileLayout();

  return (
    <section id={category.id} aria-labelledby={`${category.id}-mobile-heading`} className="relative isolate overflow-hidden border-t border-blue-300/15 py-10 first:border-t-0 first:pt-6">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-8 size-72 rounded-full border border-blue-300/15 bg-blue-500/[0.035]" />
      <motion.div
        initial={reducedMotion ? false : isMobile ? { opacity: 0, x: 100 } : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: reducedMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <span className="mx-auto grid size-12 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-accent"><ServiceIcon icon={category.icon} /></span>
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-accent">{category.label}</p>
        <h2 id={`${category.id}-mobile-heading`} className="mt-4 text-[clamp(2rem,4.6vw,3.75rem)] text-[var(--color-navy-900)]">{category.title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-navy-800)]">{category.description}</p>
      </motion.div>
      {category.id === "industry-solutions" || category.id === "managed-services" ? <MobileImageServiceCards category={category} /> : <MobileServiceWheel category={category} />}
    </section>
  );
}

export function LegacyMobileServices() {
  return (
    <div className="relative bg-[linear-gradient(160deg,#f8fbff,#e8f3ff)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_78%_14%,color-mix(in_srgb,var(--color-blue-500)_15%,transparent),transparent_31rem),radial-gradient(circle_at_20%_24%,color-mix(in_srgb,var(--accent)_7%,transparent),transparent_25rem)]" />
      <Container size="wide" className="relative">
        {serviceCategories.map((category) => <MobileCategory key={category.id} category={category} />)}
      </Container>
    </div>
  );
}
