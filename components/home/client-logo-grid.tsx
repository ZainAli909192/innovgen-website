"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import {
  motion,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import {
  CylindricalItem,
  CylindricalStage,
  useContinuousCylinder,
} from "@/components/motion/cylindrical-stage";
import { clientMarks, type ClientMark } from "@/config/clients";
import { useSectionProgress } from "@/hooks/use-section-progress";
import { useSceneVisibility } from "@/hooks/use-scene-visibility";

function IndustryCard({
  client,
}: {
  client: ClientMark;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className="group relative h-full min-h-64 overflow-hidden rounded-[1.6rem] border border-accent/20 bg-[var(--color-navy-950)] p-2 shadow-[inset_8px_8px_24px_rgb(255_255_255_/_3%),inset_-10px_-10px_28px_rgb(0_0_0_/_24%),0_28px_80px_rgb(0_0_0_/_28%),0_0_42px_rgb(201_154_50_/_5%)] [transform-style:preserve-3d] lg:min-h-[27rem]"
      whileHover={reduced ? undefined : { z: 24, scale: 1.025 }}
      whileFocus={reduced ? undefined : { z: 24, scale: 1.025 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
    >
      <a
        href={client.imageSourceUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`${client.name} visual reference on Unsplash`}
        className="relative flex h-full min-h-60 flex-col justify-end overflow-hidden rounded-[1.2rem] p-5 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent lg:min-h-[25.9rem]"
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
    </motion.div>
  );
}

export function ClientLogoGrid() {
  const clients = [...clientMarks].sort(
    (left, right) => left.displayPriority - right.displayPriority,
  );
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const { ref: visibilityRef, isVisible } =
    useSceneVisibility<HTMLDivElement>();
  const cursor = useContinuousCylinder(progress, clients.length, isVisible);

  return (
    <div ref={visibilityRef}>
      <div ref={ref} className="relative [perspective:1400px]">
        <CylindricalStage label="Industries served by InnovGen; imagery links to its online source">
          {clients.map((client, index) => (
            <CylindricalItem
              key={client.id}
              count={clients.length}
              cursor={cursor}
              index={index}
              progress={progress}
            >
              <IndustryCard client={client} />
            </CylindricalItem>
          ))}
        </CylindricalStage>
      </div>
    </div>
  );
}
