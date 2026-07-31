"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";
import { motion } from "motion/react";

import { InfrastructureScrollObject } from "@/components/motion/infrastructure-scroll-object";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { SceneSection } from "@/components/three/scene-section";
import { Container } from "@/components/ui/container";
import { HomeLogoMarquee } from "@/components/sections/clients/trusted-clients-directory";
import type { TrustedClient } from "@/config/trusted-clients";

type HomeHeroProps = {
  description: string;
  eyebrow: string;
  title: string;
};

const heroEase = [0.16, 1, 0.3, 1] as const;

const mobileClients: readonly TrustedClient[] = [
  { name: "McDonald's", logoPath: "/clients%20logos/McDonalds_Logo.png" },
  { name: "CMS", logoPath: "/clients%20logos/cms.png" },
  { name: "Rolls Royce", logoPath: "/clients%20logos/rolls_royals.png" },
  { name: "Fantco", logoPath: "/clients%20logos/fantco-logo.png" },
] as const;

function useMobileViewport() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 1023px)",
    );

    const updateViewport = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateViewport();

    mediaQuery.addEventListener(
      "change",
      updateViewport,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateViewport,
      );
    };
  }, []);

  return isMobile;
}

export function HomeHero({
  description,
  eyebrow,
  title,
}: HomeHeroProps) {
  const reducedMotion =
    usePrefersReducedMotion();

  const isMobile = useMobileViewport();

  return (
    <SceneSection
      sceneId="home-hero"
      className="
        relative
        isolate
        min-h-[calc(100dvh-5rem)]
        overflow-hidden
        bg-[#071423]
        text-white
      "
    >
      {/* Mobile background image */}
      <motion.div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-0
          bg-cover
          bg-center
          bg-no-repeat
          lg:hidden
        "
        style={{
          backgroundImage:
            "url('/home_hero_bg.jpg')",
        }}
        animate={
          isMobile && !reducedMotion
            ? {
              scale: [1, 1.025, 1],
            }
            : {
              scale: 1,
            }
        }
        transition={
          isMobile && !reducedMotion
            ? {
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }
            : {
              duration: 0,
            }
        }
      />

      {/* Desktop background video */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-0
          hidden
          overflow-hidden
          lg:block
        "
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero_bg_image.png"
          className="
            h-full
            w-full
            object-cover
            object-center
          "
        >
          <source
            src="/hero_bg_video.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Overall navy overlay */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-[1]
          bg-[#071423]/30
          lg:bg-[#071423]/15
        "
      />

      {/* Mobile text readability overlay */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-[2]
          bg-[linear-gradient(180deg,rgba(7,20,35,0.48)_0%,rgba(7,20,35,0.68)_58%,rgba(7,20,35,0.88)_100%)]
          lg:hidden
        "
      />

      {/* Desktop left-side gradient */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-[2]
          hidden
          bg-[linear-gradient(90deg,rgba(7,20,35,0.88)_0%,rgba(7,20,35,0.64)_34%,rgba(7,20,35,0.22)_66%,rgba(7,20,35,0.06)_100%)]
          lg:block
        "
      />

      {/* Technical grid */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-[3]
          opacity-15
          [background-image:linear-gradient(rgb(87_154_239_/_8%)_1px,transparent_1px),linear-gradient(90deg,rgb(87_154_239_/_8%)_1px,transparent_1px)]
          [background-size:54px_54px]
          lg:opacity-20
        "
      />

      {/* Blue atmospheric glow */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-[3]
          bg-[radial-gradient(circle_at_78%_43%,rgb(25_107_210_/_20%),transparent_29rem),radial-gradient(circle_at_14%_90%,rgb(9_66_137_/_16%),transparent_33rem)]
        "
      />

      {/* Small particles */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-[3]
          opacity-20
          [background-image:radial-gradient(circle_at_16%_24%,rgb(113_197_255_/_9%)_0_1px,transparent_1.5px),radial-gradient(circle_at_74%_72%,rgb(113_197_255_/_10%)_0_1px,transparent_1.5px)]
          [background-size:88px_88px,116px_116px]
          lg:opacity-25
        "
      />

      <Container
        size="wide"
        className="
          relative
          z-10
          grid
          min-h-[calc(100dvh-5rem)]
          items-center
          gap-8
          pb-16
          pt-12
          lg:grid-cols-[minmax(0,45%)_minmax(0,55%)]
          lg:py-16
        "
      >
        {/* Left hero content */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                opacity: 0,
                x: isMobile ? 0 : -32,
                y: isMobile ? 22 : 30,
              }
          }
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.7,
            ease: heroEase,
          }}
          className="max-w-xl"
        >
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.22em]
              text-blue-300
              hidden
            "
          >
            {eyebrow}
          </p>

          <h1
            className="
              mt-4
              max-w-[11ch]
              text-balance
              font-[family-name:var(--font-outfit)]
              text-[clamp(2.35rem,5.2vw,4.9rem)]
              font-semibold
              leading-[0.92]
              tracking-[-0.065em]
              text-white
              lg:mt-5
            "
          >
            {title ? (
              (() => {
                const lowerTitle = title.toLowerCase();
                const index = lowerTitle.indexOf('secure digital');
                if (index === -1) {
                  return title;
                }
                const before = title.substring(0, index);
                const match = title.substring(index, index + 14);
                const after = title.substring(index + 14);
                return (
                  <>
                    {before}
                    <span className="text-blue-400">{match}</span>
                    {after}
                  </>
                );
              })()
            ) : (
              <>
                <span className="block">
                  Enterprise IT
                </span>

                <span className="block">
                  infrastructure
                </span>

                <span className="mt-[0.08em] block text-blue-400">
                  Built for modern business.
                </span>
              </>
            )}
          </h1>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/consultation"
              className="
                inline-flex
                min-h-12
                items-center
                gap-3
                rounded-full
                bg-[var(--color-blue-600)]
                px-5
                text-sm
                font-semibold
                text-white
                shadow-[0_14px_32px_rgb(31_111_235_/_28%)]
                transition
                hover:-translate-y-0.5
                hover:bg-[var(--color-blue-500)]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-blue-300
              "
            >
              Our Services

              <ArrowRight
                className="size-4"
                aria-hidden="true"
              />
            </Link>

            {/* <Link
              href="/services"
              className="
                inline-flex
                min-h-12
                items-center
                gap-3
                rounded-full
                border
                border-blue-200/30
                bg-white/[0.06]
                px-5
                text-sm
                font-semibold
                text-white
                backdrop-blur-sm
                transition
                hover:border-blue-200/55
                hover:bg-white/[0.1]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-blue-300
              "
            >
              Our Services

              <ArrowRight
                className="size-4"
                aria-hidden="true"
              />
            </Link> */}
          </div>

          <p
            className="
              mt-6
              flex
              items-center
              gap-2
              text-sm
              text-blue-100/75
            "
          >
            <Check
              className="size-4 text-blue-300"
              aria-hidden="true"
            />

            Trusted by enterprises across UAE
          </p>

          <div className="relative mt-8 lg:hidden overflow-hidden">
            <HomeLogoMarquee clients={mobileClients} />
          </div>
        </motion.div>

        {/* Desktop right-side 3D object */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                opacity: 0,
                y: 28,
                scale: 0.96,
              }
          }
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.9,
            delay: 0.12,
            ease: heroEase,
          }}
          className="
            pointer-events-none
            relative
            hidden
            min-w-0
            lg:absolute
            lg:inset-y-0
            lg:right-0
            lg:flex
            lg:w-[55%]
            lg:items-center
            lg:justify-center
          "
        >
          <InfrastructureScrollObject className="w-full max-w-[44rem]" />
        </motion.div>
      </Container>
    </SceneSection>
  );
}