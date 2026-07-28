"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { HeroLogoVideo } from "@/components/home/hero-logo-video";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { SceneSection } from "@/components/three/scene-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import styles from "./home-hero.module.css";

type HomeHeroProps = {
  description: string;
  eyebrow: string;
  primaryAction: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  title: string;
};

const emphasisWords = new Set(["digital", "systems"]);

export function HomeHero({
  description,
  eyebrow,
  primaryAction,
  secondaryAction,
  title,
}: HomeHeroProps) {
  const words = title.split(" ");
  const reducedMotion = usePrefersReducedMotion();

  return (
    <SceneSection
      className="relative isolate overflow-hidden bg-[var(--color-navy-950)]"
      sceneId="home-hero"
    >
      <video
        aria-hidden="true"
        autoPlay={!reducedMotion}
        loop
        muted
        playsInline
        preload="metadata"
        poster="/home-hero-3d-poster.svg"
        src="/hero_background.mp4"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-65 saturate-[1.08]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgb(47_130_245_/_20%),transparent_29rem),radial-gradient(circle_at_60%_75%,rgb(13_32_58_/_58%),transparent_34rem),linear-gradient(100deg,rgb(5_11_24_/_88%)_0%,rgb(5_11_24_/_58%)_50%,rgb(5_11_24_/_76%)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgb(131_185_255_/_16%)_1px,transparent_1px),linear-gradient(90deg,rgb(131_185_255_/_16%)_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(circle_at_78%_48%,black,transparent_63%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_48%,rgb(5_11_24_/_72%)_100%)]"
      />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 top-[15%] size-32 rounded-[42%] border border-accent/30 bg-accent/[0.07] shadow-[inset_10px_10px_28px_rgb(255_255_255_/_10%),inset_-12px_-12px_32px_rgb(83_50_4_/_28%),0_0_48px_rgb(201_154_50_/_16%)] md:-left-6 md:size-44"
        animate={reducedMotion ? undefined : { x: [0, 26, 0], y: [0, 18, 0], rotate: [0, 14, 0] }}
        transition={{ duration: 8.5, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute right-[7%] top-[10%] size-20 rounded-full border border-accent/35 bg-[radial-gradient(circle_at_32%_28%,rgb(255_239_184_/_22%),rgb(201_154_50_/_6%)_48%,transparent_72%)] md:size-28"
        animate={reducedMotion ? undefined : { x: [0, -16, 0], y: [0, 24, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 7.5, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 1200 360"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 text-accent/35 md:h-56"
      >
        <motion.path
          d="M0 262C164 262 208 138 388 162s268 145 442 38 238-48 370-92"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reducedMotion ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.svg>

      <Container
        size="wide"
        className="relative grid items-center gap-8 py-14 md:gap-10 md:py-16 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:gap-12 lg:py-20 xl:gap-16"
      >
        <motion.div
          className="relative z-10 order-2 max-w-[40rem] lg:order-1 lg:py-10"
        >
          <motion.p
            initial={false}
            className={`${styles.fade} text-xs font-semibold uppercase tracking-[0.24em] text-accent sm:text-sm`}
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            aria-label={title}
            className="mt-5 max-w-[15ch] text-[clamp(2.5rem,4.7vw,4.5rem)] font-semibold leading-[0.99] tracking-[-0.035em]"
          >
            {words.map((word, index) => (
              <motion.span
                aria-hidden="true"
                className={
                  emphasisWords.has(word.toLowerCase().replace(/[.,]/g, ""))
                    ? `${styles.word} mr-[0.22em] inline-block text-accent`
                    : `${styles.word} mr-[0.22em] inline-block`
                }
                key={`${word}-${index}`}
                initial={false}
                style={{ animationDelay: `${50 + index * 45}ms` }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={false}
            style={{ animationDelay: "180ms" }}
            className={`${styles.rise} mt-6 max-w-[59ch] text-base leading-relaxed text-muted sm:text-lg md:text-xl`}
          >
            {description}
          </motion.p>

          <motion.div
            initial={false}
            style={{ animationDelay: "260ms" }}
            className={`${styles.rise} mt-8 flex flex-row items-stretch gap-2 sm:gap-3`}
          >
            <Button
              href={primaryAction.href}
              size="lg"
              className="group flex-1 px-3 text-center text-xs leading-tight sm:flex-none sm:px-7 sm:text-lg border border-blue-300/20 bg-[linear-gradient(110deg,var(--color-blue-600),var(--color-blue-500))] shadow-[0_14px_34px_rgb(23_105_224_/_28%),inset_0_1px_0_rgb(228_196_119_/_25%)] transition-transform hover:-translate-y-0.5 hover:bg-[linear-gradient(110deg,var(--color-blue-500),#5c9cf7)]"
            >
              {primaryAction.label}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
              />
            </Button>
            {secondaryAction ? (
              <Button
                href={secondaryAction.href}
                variant="secondary"
                size="lg"
                className="flex-1 px-3 text-center text-xs leading-tight sm:flex-none sm:px-7 sm:text-lg border-white/15 bg-white/[0.035] shadow-none transition-transform hover:-translate-y-0.5 hover:border-blue-300/35 hover:bg-white/[0.07]"
              >
                {secondaryAction.label}
              </Button>
            ) : null}
          </motion.div>

          <motion.p
            initial={false}
            style={{ animationDelay: "340ms" }}
            className={`${styles.rise} mt-6 text-sm font-medium tracking-[0.01em] text-muted`}
          >
            Secure by design <span aria-hidden="true">·</span> Built to scale{" "}
            <span aria-hidden="true">·</span> Ready to evolve
          </motion.p>
        </motion.div>

        <motion.div
          className={`${styles.scene} relative z-0 order-1 h-[18rem] w-full overflow-hidden sm:h-[22rem] md:h-[27rem] lg:order-2 lg:ml-auto lg:h-[34rem] lg:max-w-[50rem] xl:h-[36rem]`}
          initial={false}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgb(47_130_245_/_13%),transparent_67%)] blur-2xl"
          />
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[8%] left-[5%] size-14 rounded-2xl border border-accent/35 bg-accent/[0.08] shadow-[inset_7px_7px_16px_rgb(255_255_255_/_9%),inset_-8px_-8px_18px_rgb(83_50_4_/_28%)] md:size-20"
            animate={reducedMotion ? undefined : { y: [0, -16, 0], rotate: [0, -12, 0] }}
            transition={{ duration: 6.6, ease: "easeInOut", repeat: Infinity }}
          />
          <div className={styles.logoVideoFrame}>
            <HeroLogoVideo />
          </div>
        </motion.div>
      </Container>
    </SceneSection>
  );
}
