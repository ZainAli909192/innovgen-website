"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  featuredTrustedClients,
  trustedClientGroupsWithLogos,
  type TrustedClient,
} from "@/config/trusted-clients";

function ClientLogoMark({
  client,
  marquee = false,
}: {
  client: TrustedClient;
  marquee?: boolean;
}) {
  return (
    <article
      className={`group relative grid shrink-0 place-items-center overflow-hidden border border-blue-200 bg-white shadow-[0_10px_26px_rgb(25_79_143_/_9%)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-[0_14px_30px_rgb(25_79_143_/_14%)] ${marquee ? "h-20 w-40 rounded-2xl px-5" : "h-28 rounded-[1.35rem] p-5 sm:h-32"}`}
    >
      <span aria-hidden="true" className="absolute -right-9 -top-9 size-20 rounded-full border border-blue-200 bg-blue-50" />
      {client.logoPath ? (
        <span className={`relative block w-full ${marquee ? "h-10" : "h-14"}`}>
          <Image src={client.logoPath} alt={`${client.name} logo`} fill sizes={marquee ? "10rem" : "14rem"} className="object-contain" />
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
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_8%,rgb(47_130_245_/_15%),transparent_28rem),radial-gradient(circle_at_8%_72%,rgb(228_196_119_/_6%),transparent_23rem)]" />
      <Container size="wide" className="relative">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 28, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: reducedMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 1000 }}
          className="max-w-3xl"
        >
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            <Sparkles aria-hidden="true" className="size-4" />
            Trusted clients
          </p>
          <h2 id="client-directory-heading" className="mt-4 text-[length:var(--text-h2)]">Trusted across essential industries.</h2>
        </motion.div>
        <div className="mt-12 space-y-12 md:mt-16 md:space-y-16">
          {trustedClientGroupsWithLogos.map((group, groupIndex) => (
            <motion.section
              key={group.title}
              aria-labelledby={`client-group-${groupIndex}`}
              initial={reducedMotion ? false : { opacity: 0, x: groupIndex % 2 === 0 ? -42 : 42, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.12 }}
              transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformPerspective: 1000 }}
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="h-px w-10 bg-[var(--color-blue-500)]" />
                <h3 id={`client-group-${groupIndex}`} className="text-xl font-semibold text-foreground md:text-2xl">{group.title}</h3>
                <span className="text-sm font-medium text-blue-200/70">{group.clients.length}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {group.clients.map((client) => <ClientLogoMark key={client.name} client={client} />)}
              </div>
            </motion.section>
          ))}
        </div>
      </Container>
    </Section>
  );
}
