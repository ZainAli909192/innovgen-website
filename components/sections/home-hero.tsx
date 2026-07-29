"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { SceneSection } from "@/components/three/scene-section";
import { Container } from "@/components/ui/container";

type HomeHeroProps = {
  description: string;
  eyebrow: string;
  title: string;
};

const entranceEase = [0.16, 1, 0.3, 1] as const;
const heroVideoUrl =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4";

export function HomeHero({
  description,
  eyebrow,
  title,
}: HomeHeroProps) {
  const reducedMotion = usePrefersReducedMotion();
  const titleParts = title.split(/(digital systems)/i);

  return (
    <SceneSection
      className="relative isolate min-h-[calc(88svh-5rem)] overflow-hidden bg-white"
      sceneId="home-hero"
    >
      <motion.div
        aria-hidden="true"
        initial={reducedMotion ? false : { opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reducedMotion ? 0 : 1.8, ease: entranceEase }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] bg-[var(--color-navy-950)] shadow-[0_28px_80px_rgb(5_11_24_/_20%)] md:inset-0 md:h-full md:w-full md:translate-x-0 md:translate-y-0 md:rounded-none md:shadow-none"
      >
        <video
          autoPlay={!reducedMotion}
          loop
          muted
          playsInline
          preload="metadata"
          src={heroVideoUrl}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(5_11_24_/_22%),transparent_60%)]" />
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[72%] bg-[linear-gradient(to_top,#ffffff_0%,rgb(255_255_255_/_92%)_45%,rgb(255_255_255_/_12%)_82%,transparent_100%)]"
      />

      <Container
        size="wide"
        className="relative z-20 flex min-h-[calc(88svh-5rem)] items-end py-8 sm:py-10 md:py-12"
      >
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reducedMotion ? 0 : 0.5, duration: reducedMotion ? 0 : 1, ease: entranceEase }}
          className="flex w-full flex-col gap-7 md:flex-row md:items-end md:justify-between md:gap-12"
        >
          <div className="max-w-4xl">
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 0.6, duration: reducedMotion ? 0 : 0.8, ease: entranceEase }}
              className="hidden items-center gap-2 text-[0.8125rem] font-medium text-[rgb(5_11_24_/_62%)]"
            >
              <span aria-hidden="true" className="size-2 rounded-full bg-[var(--color-navy-950)]" />
              {eyebrow}
            </motion.p>

            <motion.h1
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 0.8, duration: reducedMotion ? 0 : 0.8, ease: entranceEase }}
              className="max-w-[15ch] text-balance text-[clamp(1.9rem,7vw,2.75rem)] font-light leading-none tracking-[-0.045em] text-[var(--color-navy-950)] md:text-[clamp(2.5rem,5.5vw,4.5rem)]"
            >
              {titleParts.map((part, index) =>
                part.toLowerCase() === "digital systems" ? (
                  <span key={`${part}-${index}`} className="text-[var(--color-blue-600)]">
                    {part}
                  </span>
                ) : (
                  part
                ),
              )}
            </motion.h1>

            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 0.9, duration: reducedMotion ? 0 : 0.8, ease: entranceEase }}
              className="hidden mt-5 max-w-2xl text-base leading-relaxed text-[rgb(5_11_24_/_68%)] md:text-lg"
            >
              {description}
            </motion.p>

          </div>

          <div className="hidden flex-wrap gap-2 md:max-w-64 md:justify-end">
            {['Strategy', 'Engineering', 'Security'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/12 bg-white/85 px-3 py-1.5 text-[11px] font-medium text-[rgb(5_11_24_/_72%)] shadow-[0_4px_16px_rgb(5_11_24_/_6%)] backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </SceneSection>
  );
}
