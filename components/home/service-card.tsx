"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BrainCircuit,
  Building2,
  CloudCog,
  Code2,
  Compass,
  Layers3,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { HomeService, HomeServiceIcon } from "@/config/home-services";
import { cn } from "@/lib/utils";

const serviceIcons: Record<HomeServiceIcon, LucideIcon> = {
  brain: BrainCircuit,
  building: Building2,
  cloud: CloudCog,
  code: Code2,
  compass: Compass,
  layers: Layers3,
  shield: ShieldCheck,
};

export function ServiceCard({
  active = false,
  onActiveChange,
  service,
}: {
  active?: boolean;
  onActiveChange?: (serviceId: string | null) => void;
  service: HomeService;
}) {
  const Icon = serviceIcons[service.icon];

  return (
    <Link
      href={service.href}
      data-service-active={String(active)}
      onBlur={() => onActiveChange?.(null)}
      onFocus={() => onActiveChange?.(service.id)}
      onMouseEnter={() => onActiveChange?.(service.id)}
      onMouseLeave={() => onActiveChange?.(null)}
      className={cn(
        "group relative flex min-h-56 flex-col overflow-hidden rounded-xl border border-border bg-surface p-6 transition-[transform,border-color,background-color,box-shadow] duration-[var(--duration-standard)] hover:-translate-y-1 hover:border-blue-300/35 hover:bg-surface-elevated hover:shadow-[0_24px_70px_rgb(0_0_0_/_20%)] motion-reduce:transform-none md:p-7",
        service.featured &&
          "min-h-72 bg-[linear-gradient(145deg,var(--color-navy-800),var(--color-navy-900))] lg:row-span-2 lg:min-h-full lg:p-9",
        active &&
          "border-blue-300/45 bg-surface-elevated shadow-[0_24px_70px_rgb(0_0_0_/_20%)]",
      )}
    >
      <div
        className={cn(
          "flex size-11 items-center justify-center rounded-lg border border-blue-300/20 bg-blue-500/10 text-blue-300",
          service.accent === "gold" &&
            "border-gold-300/20 bg-gold-300/10 text-accent",
        )}
      >
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.7} />
      </div>

      <div className="mt-auto pt-10">
        {service.featured ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Featured capability
          </p>
        ) : null}
        <div className="flex items-start justify-between gap-4">
          <h3
            className={cn(
              "text-xl font-semibold",
              service.featured && "max-w-sm text-2xl md:text-3xl",
            )}
          >
            {service.title}
          </h3>
          <ArrowUpRight
            aria-hidden="true"
            className="mt-1 size-5 shrink-0 text-muted transition-[color,transform] duration-[var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground motion-reduce:transform-none"
          />
        </div>
        <p
          className={cn(
            "mt-3 max-w-[48ch] text-sm leading-relaxed text-muted",
            service.featured && "text-base md:text-lg",
          )}
        >
          {service.shortDescription}
        </p>
      </div>
    </Link>
  );
}
