"use client";

import Image from "next/image";
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
        "mobile-service-card group relative flex h-full min-h-72 flex-col overflow-hidden rounded-[1.6rem] border border-blue-300/20 bg-[linear-gradient(145deg,rgb(22_54_89),rgb(10_31_56))] p-6 shadow-[inset_8px_8px_24px_rgb(255_255_255_/_5%),inset_-12px_-12px_30px_rgb(0_0_0_/_18%),0_28px_80px_rgb(0_0_0_/_22%),0_0_40px_rgb(201_154_50_/_5%)] transition-[transform,border-color,background-color,box-shadow] duration-[var(--duration-standard)] hover:-translate-y-1 hover:border-accent/40 hover:bg-surface-elevated hover:shadow-[inset_8px_8px_24px_rgb(255_255_255_/_7%),inset_-12px_-12px_30px_rgb(0_0_0_/_20%),0_32px_90px_rgb(0_0_0_/_26%),0_0_52px_rgb(201_154_50_/_11%)] motion-reduce:transform-none md:p-7",
        service.featured &&
          "min-h-72 lg:min-h-full lg:p-9",
        active &&
          "border-accent/45 bg-surface-elevated shadow-[inset_8px_8px_24px_rgb(255_255_255_/_4%),inset_-12px_-12px_30px_rgb(0_0_0_/_24%),0_32px_90px_rgb(0_0_0_/_30%),0_0_52px_rgb(201_154_50_/_11%)]",
      )}
    >
      <div className="service-card-media relative -mx-3 -mt-3 h-40 overflow-hidden rounded-[1.15rem] border border-white/[0.1] md:h-44">
        <Image
          src={service.imageUrl}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 767px) 100vw, 30vw"
          className="object-cover opacity-72 saturate-[0.82] transition duration-500 group-hover:scale-105 group-hover:opacity-88 group-focus-visible:scale-105 group-focus-visible:opacity-88 motion-reduce:transform-none"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_18%,rgb(5_11_24_/_10%)_55%,rgb(5_11_24_/_60%)_100%)]"
        />
        <div
          className={cn(
            "service-card-icon absolute bottom-3 left-3 flex size-11 items-center justify-center rounded-xl border border-blue-300/20 bg-[rgb(8_20_38_/_82%)] text-blue-300 shadow-[inset_3px_3px_9px_rgb(255_255_255_/_4%),0_12px_30px_rgb(0_0_0_/_28%)] backdrop-blur-sm",
            service.accent === "gold" &&
              "border-gold-300/30 bg-[rgb(38_29_10_/_78%)] text-accent",
          )}
        >
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.7} />
        </div>
      </div>

      <div className="service-card-copy pt-5">
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
