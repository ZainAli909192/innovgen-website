"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { SceneSection } from "@/components/three/scene-section";
import { Container } from "@/components/ui/container";

type HomeHeroProps = {
  description: string;
  eyebrow: string;
  title: string;
};

const heroVideoUrl =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4";

const heroEase = [0.16, 1, 0.3, 1] as const;

export function HomeHero({ description, eyebrow, title }: HomeHeroProps) {
  const reducedMotion = usePrefersReducedMotion();
  const titleParts = title.split(/(digital systems)/i);

  function handleHeroVideoMetadata(
    event: React.SyntheticEvent<HTMLVideoElement>,
  ) {
    event.currentTarget.playbackRate = 1.5;
  }

  return (
    <SceneSection
      className="relative isolate min-h-[calc(88svh-5rem)] overflow-hidden bg-[#f6faff]"
      sceneId="home-hero"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_78%_48%,rgb(224_245_255_/_58%)_0%,transparent_34%),linear-gradient(120deg,rgb(246_250_255)_0%,rgb(255_255_255)_48%,rgb(243_250_255)_100%)]"
      />
      <motion.div
        aria-hidden="true"
        initial={reducedMotion ? false : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 0.58, scale: 1.02 }}
        transition={{ duration: 1.35, ease: heroEase }}
        className="pointer-events-none absolute -inset-6 z-[1] bg-cover bg-center bg-no-repeat brightness-90 contrast-110 saturate-125"
        style={{ backgroundImage: "url('/home_hero_bg.jpg')" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgb(247_251_255_/_76%)_0%,rgb(250_253_255_/_45%)_36%,rgb(255_255_255_/_12%)_66%,rgb(246_251_255_/_26%)_100%)]"
      />
      <motion.div
        aria-hidden="true"
        initial={reducedMotion ? false : { opacity: 0, scale: 1.08, x: 28 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.08, ease: heroEase }}
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden mix-blend-multiply md:[mask-image:linear-gradient(90deg,transparent_0%,black_34%,black_100%)] md:[-webkit-mask-image:linear-gradient(90deg,transparent_0%,black_34%,black_100%)]"
      >
        <video
          autoPlay={!reducedMotion}
          loop
          muted
          playsInline
          preload="auto"
          src={heroVideoUrl}
          onLoadedMetadata={handleHeroVideoMetadata}
          className="h-full w-full origin-[52%_52%] scale-[1.58] object-cover object-center opacity-95 brightness-[0.88] contrast-[1.28] saturate-110 md:relative md:left-[3%] md:scale-[1.08] md:object-[72%_50%]"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[11%] right-[8%] z-[11] h-28 w-44 rounded-full bg-[radial-gradient(ellipse,rgba(5,11,24,0.28),transparent_68%)] blur-xl md:bottom-[8%] md:right-[15%] md:h-40 md:w-64"
      />
      <motion.div
        aria-hidden="true"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.8, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.85, delay: 0.34, ease: heroEase }}
        className="pointer-events-none absolute left-1/2 top-[43%] z-[13] size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgb(31_111_235_/_34%)] shadow-[0_0_42px_rgb(31_111_235_/_22%),inset_0_0_32px_rgb(31_111_235_/_12%)] md:left-[72%] md:top-[50%] md:size-64"
      >
        <motion.span
          animate={reducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border border-[rgb(111_201_255_/_24%)]"
        />
        <span className="absolute -left-1 top-[18%] size-2 rounded-full bg-[var(--color-blue-600)] shadow-[0_0_14px_rgb(31_111_235_/_92%)] motion-safe:animate-pulse" />
        <span className="absolute right-3 top-[34%] size-1.5 rounded-full bg-[#6fc9ff] shadow-[0_0_12px_rgb(111_201_255_/_95%)] motion-safe:animate-pulse" />
        <span className="absolute bottom-[22%] left-[16%] size-1.5 rounded-full bg-[var(--color-blue-600)] shadow-[0_0_12px_rgb(31_111_235_/_92%)] motion-safe:animate-pulse" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: heroEase }}
        className="pointer-events-none absolute left-[8%] top-[22%] z-[12] hidden size-16 rotate-12 rounded-[1.5rem] border border-[rgb(31_111_235_/_22%)] bg-[linear-gradient(145deg,rgb(255_255_255_/_76%),rgb(221_240_255_/_22%))] shadow-[0_16px_28px_rgb(31_111_235_/_10%)] md:block"
      />

      <Container
        size="wide"
        className="relative z-20 flex min-h-[calc(88svh-5rem)] items-end py-8 sm:py-10 md:items-center md:py-12"
      >
        <div className="flex w-full flex-col gap-7 md:flex-row md:items-center md:justify-between md:gap-12">
          <div className="max-w-4xl">
            <p className="hidden items-center gap-2 text-[0.8125rem] font-medium text-[rgb(5_11_24_/_62%)]">
              <span aria-hidden="true" className="size-2 rounded-full bg-[var(--color-navy-950)]" />
              {eyebrow}
            </p>

            <h1 className="absolute left-1/2 top-5 z-30 w-max max-w-[calc(100%-2rem)] -translate-x-1/2 whitespace-nowrap text-[clamp(1.3rem,6.3vw,1.85rem)] font-semibold italic leading-none tracking-[-0.065em] text-[var(--color-navy-950)] [text-shadow:0_1px_0_rgb(255_255_255_/_88%)] md:static md:w-auto md:max-w-[12ch] md:translate-x-0 md:whitespace-normal md:text-[clamp(2.5rem,5.5vw,4.5rem)]">
              <span className="md:hidden">
                Build secure{" "}
                <span className="text-[var(--color-blue-600)]">digital systems</span>
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
            </h1>

            <Link
              href="/services"
              className="group relative mx-auto mt-5 flex min-h-12 w-fit items-center gap-3 overflow-hidden rounded-full border border-[rgb(31_111_235_/_58%)] bg-[linear-gradient(135deg,var(--color-navy-950)_0%,rgb(9_30_62)_100%)] py-1 pl-5 pr-1 text-sm font-semibold text-white shadow-[0_12px_28px_rgb(5_11_24_/_28%),inset_0_1px_0_rgb(255_255_255_/_16%)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgb(5_11_24_/_38%)] active:translate-y-px active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-blue-600)] [&>span:last-child]:hidden md:hidden"
            >
              <span className="relative z-10">Explore services</span>
              <span
                aria-hidden="true"
                className="relative z-10 grid size-10 place-items-center rounded-full border border-white/50 bg-white text-[var(--color-blue-600)] shadow-[0_4px_12px_rgb(5_11_24_/_16%)] transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-active:scale-95"
              >
                <ArrowUpRight
                  className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2.25}
                />
              </span>
              <span aria-hidden="true" className="relative z-10 grid size-9 place-items-center rounded-full bg-white text-lg leading-none text-[var(--color-blue-600)] shadow-[0_3px_10px_rgb(5_11_24_/_18%)] transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Link>

            <p className="hidden mt-5 max-w-2xl text-base leading-relaxed text-[rgb(5_11_24_/_68%)] md:text-lg">
              {description}
            </p>
          </div>

          <div className="hidden flex-wrap gap-2 md:max-w-64 md:justify-end">
            {["Strategy", "Engineering", "Security"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/12 bg-white/85 px-3 py-1.5 text-[11px] font-medium text-[rgb(5_11_24_/_72%)] shadow-[0_4px_16px_rgb(5_11_24_/_6%)] backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </SceneSection>
  );
}
