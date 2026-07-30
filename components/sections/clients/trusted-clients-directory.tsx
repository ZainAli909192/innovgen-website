"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import {
  featuredTrustedClients,
  trustedClientsWithLogos,
  type TrustedClient,
} from "@/config/trusted-clients";

const clientMosaicPlacements = [
  "col-span-2 sm:row-span-2 sm:col-span-2 md:row-span-2 md:col-span-2",
  "col-span-1 sm:col-span-1 md:col-span-1",
  "col-span-1 sm:col-span-2 md:col-span-2",
  "col-span-2 sm:col-span-1 md:col-span-1",
  "col-span-1 sm:col-span-2 md:col-span-2",
  "col-span-1 sm:col-span-1 md:col-span-1",
  "col-span-2 sm:row-span-2 sm:col-span-2 md:row-span-2 md:col-span-2",
  "col-span-1 sm:col-span-1 md:col-span-1",
  "col-span-1 sm:col-span-1 md:col-span-1",
  "col-span-2 sm:col-span-2 md:col-span-2",
  "col-span-1 sm:col-span-1 md:col-span-1",
  "col-span-1 sm:col-span-2 md:col-span-2",
  "col-span-2 sm:row-span-2 sm:col-span-2 md:row-span-2 md:col-span-2",
  "col-span-1 sm:col-span-1 md:col-span-1",
  "col-span-1 sm:col-span-2 md:col-span-2",
  "col-span-2 sm:col-span-1 md:col-span-1",
  "col-span-1 sm:col-span-1 md:col-span-1",
  "col-span-1 sm:col-span-2 md:col-span-2",
] as const;

const clientEntranceOffsets = [
  { x: -78, y: -36, rotateZ: -2.5 },
  { x: 54, y: -52, rotateZ: 2.5 },
  { x: -42, y: 62, rotateZ: -1.75 },
  { x: 76, y: 34, rotateZ: 2 },
  { x: -66, y: 48, rotateZ: -2.25 },
  { x: 40, y: -66, rotateZ: 1.5 },
  { x: -54, y: -58, rotateZ: -2 },
  { x: 68, y: 58, rotateZ: 2.25 },
] as const;

function ClientLogoMark({
  client,
  marquee = false,
  className,
}: {
  client: TrustedClient;
  marquee?: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative grid shrink-0 place-items-center overflow-hidden border border-blue-200/90 bg-[linear-gradient(145deg,#ffffff_0%,#f7fbff_60%,#eaf4ff_100%)] shadow-[0_18px_36px_rgb(15_56_105_/_14%),inset_0_1px_0_rgb(255_255_255_/_95%)] transition-[border-color,box-shadow] duration-300 group-hover:border-blue-400 group-hover:shadow-[0_24px_42px_rgb(15_56_105_/_20%),inset_0_1px_0_rgb(255_255_255_/_95%)]",
        marquee ? "h-20 w-40 rounded-2xl px-5" : "h-full min-h-0 rounded-[1.5rem] p-6 sm:rounded-[1.75rem] sm:p-8",
        className,
      )}
    >
      <span aria-hidden="true" className="absolute -right-10 -top-10 size-24 rounded-full border border-blue-200/80 bg-blue-50/80 transition-transform duration-500 group-hover:scale-110" />
      <span aria-hidden="true" className="absolute inset-x-5 top-0 h-px bg-white/90" />
      {client.logoPath ? (
        <span className={`relative block w-full ${marquee ? "h-10" : "h-[clamp(3.5rem,7vw,6.75rem)]"}`}>
          <Image
            src={client.logoPath}
            alt={`${client.name} logo`}
            fill
            sizes={marquee ? "10rem" : "(max-width: 639px) 45vw, (max-width: 1023px) 22vw, 16vw"}
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
        </span>
      ) : (
        <span className={`relative text-center font-semibold leading-tight text-[var(--color-navy-900)] ${marquee ? "text-sm" : "text-base sm:text-lg"}`}>
          {client.name}
        </span>
      )}
      <span className="sr-only">{client.name}</span>
    </article>
  );
}

function HomeLogoMarquee({ clients, reverse = false }: { clients: readonly TrustedClient[]; reverse?: boolean }) {
  const reducedMotion = usePrefersReducedMotion();
  const loopedClients = [...clients, ...clients];

  return (
    <div className="overflow-hidden py-2" aria-label="Selected InnovGen clients">
      <motion.div
        className="flex w-max gap-4 pr-4 will-change-transform"
        animate={reducedMotion ? { x: 0 } : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={reducedMotion ? { duration: 0 } : { duration: reverse ? 32 : 28, ease: "linear", repeat: Infinity }}
      >
        {loopedClients.map((client, index) => (
          <ClientLogoMark key={`${client.name}-${index}`} client={client} marquee />
        ))}
      </motion.div>
    </div>
  );
}

export function TrustedClientsDirectory({ variant }: { variant: "home" | "page" }) {
  const reducedMotion = usePrefersReducedMotion();

  if (variant === "home") {
    const firstRow = featuredTrustedClients.slice(0, Math.ceil(featuredTrustedClients.length / 2));
    const secondRow = featuredTrustedClients.slice(Math.ceil(featuredTrustedClients.length / 2));

    return (
      <Section aria-labelledby="trusted-clients-heading" className="relative isolate overflow-hidden bg-white py-16 md:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_12%,rgb(47_130_245_/_10%),transparent_24rem),radial-gradient(circle_at_90%_80%,rgb(47_130_245_/_7%),transparent_26rem)]" />
        <Container size="standard" className="relative max-w-[90rem] bg-blue-50 p-9 rounded rounded-2xl">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: reducedMotion ? 0 : 0.56, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between gap-5 md:flex-row md:items-end"
          >
            <div className="max-w-[34rem]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-blue-600)]">Trusted clients</p>
              <h2 id="trusted-clients-heading" className="mt-4 text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-[var(--color-navy-900)]">Organizations that count on InnovGen.</h2>
            </div>
            <Link
              href="/clients"
              className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--color-blue-600)] px-5 font-semibold text-white shadow-[0_10px_22px_rgb(47_130_245_/_24%)] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-blue-700)] hover:shadow-[0_14px_28px_rgb(47_130_245_/_30%)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
            >
              View all clients
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.16 }}
            transition={{ duration: reducedMotion ? 0 : 0.56, delay: reducedMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-9 space-y-2"
          >
            <HomeLogoMarquee clients={firstRow} />
            <HomeLogoMarquee clients={secondRow} reverse />
          </motion.div>
        </Container>
      </Section>
    );
  }

  return (
    <Section aria-labelledby="client-directory-heading" className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-navy-950),var(--color-navy-900))]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_0%,rgb(47_130_245_/_18%),transparent_30rem),radial-gradient(circle_at_10%_100%,rgb(228_196_119_/_8%),transparent_26rem)]" />
      <Container size="wide" className="relative">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 28, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: reducedMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 1000 }}
          className="flex max-w-5xl flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              <Sparkles aria-hidden="true" className="size-4" />
              Trusted clients
            </p>
            <h2 id="client-directory-heading" className="mt-4 text-[length:var(--text-h2)]">One collective network of trusted organizations.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-blue-100/75 md:text-right">
            {trustedClientsWithLogos.length} organizations represented through approved client marks.
          </p>
        </motion.div>

        <motion.ul
          initial={reducedMotion ? false : { opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.12 }}
          transition={{ duration: reducedMotion ? 0 : 0.56, delay: reducedMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[8rem] sm:grid-cols-4 sm:gap-4 md:mt-14 md:auto-rows-[9rem] md:grid-cols-5 lg:auto-rows-[10.5rem] lg:grid-cols-6 lg:gap-5 xl:auto-rows-[11.5rem]"
          aria-label="InnovGen trusted clients"
        >
          {trustedClientsWithLogos.map((client, index) => {
            const entrance = clientEntranceOffsets[index % clientEntranceOffsets.length];

            return (
              <motion.li
                key={client.name}
                initial={reducedMotion ? false : { opacity: 0, x: entrance.x, y: entrance.y, scale: 0.86, rotateX: 9, rotateY: index % 2 === 0 ? -5 : 5, rotateZ: entrance.rotateZ }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0 }}
                whileHover={reducedMotion ? undefined : { y: -8, scale: 1.018, rotateX: -1.5, rotateY: index % 2 === 0 ? -2 : 2, rotateZ: index % 2 === 0 ? -0.35 : 0.35, zIndex: 1 }}
                whileTap={reducedMotion ? undefined : { scale: 0.985, y: -2 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: reducedMotion ? 0 : 0.48, delay: reducedMotion ? 0 : Math.min(index * 0.04, 0.4), ease: [0.22, 1, 0.36, 1] }}
                style={{ transformPerspective: 1100, transformStyle: "preserve-3d" }}
                className={cn("relative will-change-transform", clientMosaicPlacements[index % clientMosaicPlacements.length])}
              >
                <ClientLogoMark client={client} className="h-full" />
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </Section>
  );
}
