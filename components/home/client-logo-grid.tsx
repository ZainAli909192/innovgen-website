"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { clientMarks, type ClientMark } from "@/config/clients";
import { useSectionProgress } from "@/hooks/use-section-progress";

function IndustryCard({
  client,
  index,
  progress,
}: {
  client: ClientMark;
  index: number;
  progress: MotionValue<number>;
}) {
  const reduced = usePrefersReducedMotion();
  const delay = index * 0.022;
  const opacity = useTransform(
    progress,
    [0.06 + delay, 0.22 + delay, 0.76, 0.94],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [0.06 + delay, 0.25 + delay, 0.74, 0.96],
    [54, 0, 0, -46],
  );
  const z = useTransform(
    progress,
    [0.06 + delay, 0.27 + delay, 0.72, 0.96],
    [-180, 0, 0, -150],
  );
  const rotateX = useTransform(
    progress,
    [0.06 + delay, 0.27 + delay, 0.72, 0.96],
    [28, 0, 0, -24],
  );
  const desktopArc = [13, 8, 3, -3, -8, -13][index] ?? 0;
  const rotateY = useTransform(
    progress,
    [0.08 + delay, 0.28 + delay, 0.74, 0.95],
    [desktopArc * 1.8, desktopArc, desktopArc, desktopArc * 1.6],
  );

  return (
    <motion.li
      className="group relative min-h-56 overflow-hidden border-b border-r border-border bg-[var(--color-navy-950)] [transform-style:preserve-3d] sm:min-h-64 lg:min-h-72"
      style={
        reduced
          ? undefined
          : { opacity, y, z, rotateX, rotateY, transformPerspective: 1200 }
      }
      whileHover={reduced ? undefined : { z: 24, scale: 1.025 }}
      whileFocus={reduced ? undefined : { z: 24, scale: 1.025 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
    >
      <a
        href={client.imageSourceUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`${client.name} visual reference on Unsplash`}
        className="relative flex h-full min-h-56 flex-col justify-end overflow-hidden p-5 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:min-h-64 lg:min-h-72"
      >
        <Image
          src={client.imageUrl}
          alt={client.imageAlt}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 17vw"
          className="object-cover opacity-48 saturate-[0.72] transition duration-500 group-hover:scale-105 group-hover:opacity-62 group-focus-within:scale-105 group-focus-within:opacity-62 motion-reduce:transform-none"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_14%,rgb(3_12_28_/_24%)_44%,rgb(3_12_28_/_96%)_100%)]"
        />
        <span className="relative flex items-end justify-between gap-4">
          <span>
            <span className="mb-3 block h-px w-8 bg-accent/80" />
            <span className="block text-sm font-semibold uppercase tracking-[0.12em] text-foreground">
              {client.name}
            </span>
          </span>
          <ExternalLink
            aria-hidden="true"
            className="size-4 shrink-0 text-accent opacity-70 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-within:-translate-y-1 group-focus-within:translate-x-1 motion-reduce:transform-none"
          />
        </span>
      </a>
    </motion.li>
  );
}

export function ClientLogoGrid() {
  const clients = [...clientMarks].sort(
    (left, right) => left.displayPriority - right.displayPriority,
  );
  const { ref, progress } = useSectionProgress<HTMLDivElement>();

  return (
    <div ref={ref} className="relative [perspective:1400px]">
      <ul
        aria-label="Industries served by InnovGen; imagery links to its online source"
        className="grid grid-cols-1 border-l border-t border-border [transform-style:preserve-3d] sm:grid-cols-2 lg:grid-cols-6"
      >
        {clients.map((client, index) => (
          <IndustryCard
            key={client.id}
            client={client}
            index={index}
            progress={progress}
          />
        ))}
      </ul>
    </div>
  );
}
