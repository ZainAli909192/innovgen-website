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
        initial={false}
        animate={
          reducedMotion
            ? undefined
            : {
                opacity: 1,
                scale: [1, 1.025, 1],
              }
        }
        transition={{ duration: reducedMotion ? 0 : 7, ease: "easeInOut", repeat: Infinity }}
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home_hero_bg.jpg')" }}
      />
      <motion.div
        aria-hidden="true"
        initial={reducedMotion ? false : { opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reducedMotion ? 0 : 1.8, ease: entranceEase }}
        className="pointer-events-none absolute left-1/2 top-[46%] h-[88%] w-[80%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] bg-[var(--color-navy-950)] opacity-55 shadow-[0_28px_80px_rgb(5_11_24_/_20%)] mix-blend-multiply md:inset-0 md:h-full md:w-full md:translate-x-0 md:translate-y-0 md:rounded-none md:shadow-none"
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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255_/_42%),transparent_65%)]" />
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgb(255_255_255_/_92%)_0%,rgb(255_255_255_/_72%)_32%,rgb(255_255_255_/_12%)_67%,transparent_100%),linear-gradient(to_top,rgb(255_255_255_/_82%)_0%,transparent_48%)]"
      />

      <Container
        size="wide"
        className="relative z-20 flex min-h-[calc(88svh-5rem)] items-end py-8 sm:py-10 md:items-center md:py-12"
      >
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reducedMotion ? 0 : 0.5, duration: reducedMotion ? 0 : 1, ease: entranceEase }}
          className="flex w-full flex-col gap-7 md:flex-row md:items-center md:justify-between md:gap-12"
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
              className="max-w-none whitespace-nowrap text-[clamp(1.05rem,5.4vw,1.4rem)] font-medium leading-none tracking-[-0.055em] text-[var(--color-navy-950)] md:max-w-[12ch] md:whitespace-normal md:text-[clamp(2.5rem,5.5vw,4.5rem)]"
            >
              <span className="md:hidden">
                Build secure <span className="text-[var(--color-blue-600)]">digital systems</span>
              </span>
              <span className="hidden md:inline">
                {titleParts.map((part, index) =>
                  part.toLowerCase() === "digital systems" ? (
                    <span key={`${part}-${index}`} className="text-[var(--color-blue-600)]">
                      {part}
                    </span>
                  ) : (
                    part
                  ),
                )}
              </span>
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
