"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import { GoldenDepthShapes } from "@/components/motion/cylindrical-stage";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { Container } from "@/components/ui/container";
import { IconButton } from "@/components/ui/icon-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { leadershipProfiles } from "@/config/leadership";
import { useSectionProgress } from "@/hooks/use-section-progress";
import { useMobileLayout } from "@/hooks/use-mobile-layout";

export function LeadershipSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const mobile = useMobileLayout();
  const reduced = prefersReducedMotion || !hasMounted || mobile;
  const { ref, progress } = useSectionProgress<HTMLElement>();
  const smoothProgress = useSpring(progress, {
    stiffness: 82,
    damping: 24,
    mass: 0.65,
    restDelta: 0.001,
  });
  const profile = leadershipProfiles[activeIndex];
  const sectionOpacity = useTransform(
    smoothProgress,
    [0.02, 0.18, 0.8, 1],
    [0, 1, 1, 0],
  );
  const sectionScale = useTransform(
    smoothProgress,
    [0.02, 0.21, 0.8, 1],
    [0.92, 1, 1, 0.92],
  );
  const headingOpacity = useTransform(
    smoothProgress,
    [0.03, 0.15, 0.82, 0.96],
    [0, 1, 1, 0],
  );
  const headingY = useTransform(
    smoothProgress,
    [0.03, 0.18, 0.82, 1],
    [34, 0, 0, -28],
  );
  const headingZ = useTransform(
    smoothProgress,
    [0.03, 0.18, 0.82, 1],
    [-90, 0, 0, -70],
  );
  const imageX = useTransform(
    smoothProgress,
    [0.06, 0.27, 0.78, 1],
    [-82, 0, 0, -66],
  );
  const imageZ = useTransform(
    smoothProgress,
    [0.06, 0.27, 0.78, 1],
    [-210, 0, 0, -170],
  );
  const imageRotateY = useTransform(
    smoothProgress,
    [0.06, 0.27, 0.78, 1],
    [-16, 0, 0, 12],
  );
  const copyX = useTransform(
    smoothProgress,
    [0.1, 0.31, 0.76, 1],
    [82, 0, 0, 66],
  );
  const copyZ = useTransform(
    smoothProgress,
    [0.1, 0.31, 0.76, 1],
    [-190, 0, 0, -150],
  );
  const copyRotateY = useTransform(
    smoothProgress,
    [0.1, 0.31, 0.76, 1],
    [14, 0, 0, -11],
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setHasMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const showPrevious = () => {
    setActiveIndex(
      (current) =>
        (current - 1 + leadershipProfiles.length) % leadershipProfiles.length,
    );
  };
  const showNext = () => {
    setActiveIndex((current) => (current + 1) % leadershipProfiles.length);
  };

  useEffect(() => {
    if (prefersReducedMotion) return;
    const intervalId = window.setInterval(() => {
      setActiveIndex(
        (current) => (current + 1) % leadershipProfiles.length,
      );
    }, 2000);
    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion]);

  return (
    <motion.section
      ref={ref}
      aria-labelledby="leadership-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-navy-950),rgb(10_28_50),var(--color-navy-900))] py-20 md:py-28"
      style={
        reduced
          ? {
              opacity: 1,
              scale: 1,
            }
          : {
              opacity: sectionOpacity,
              scale: sectionScale,
              transformPerspective: 1500,
              transformOrigin: "50% 50%",
              willChange: "opacity, transform",
            }
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_52%,rgb(47_130_245_/_8%),transparent_30rem),radial-gradient(circle_at_72%_44%,rgb(228_196_119_/_7%),transparent_28rem)]"
      />
      <GoldenDepthShapes className="opacity-60" />

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 34, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ amount: 0.16, once: false }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.56, ease: [0.22, 1, 0.36, 1] }}
      >
      <Container size="wide" className="relative">
        <motion.div
          className="flex flex-col items-center [transform-style:preserve-3d]"
          style={
            reduced
              ? undefined
              : { opacity: headingOpacity, y: headingY, z: headingZ }
          }
        >
          <SectionHeading
            id="leadership-heading"
            eyebrow="The people guiding InnovGen"
            title="Meet our leadership team."
            description="Experienced leaders bringing strategy, technology, and delivery together."
            align="center"
          />
        </motion.div>

        <div className="mt-12 grid items-center gap-10 [perspective:1500px] md:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
          <motion.div
            className="relative mx-auto w-full max-w-lg [transform-style:preserve-3d]"
            style={
              reduced
                ? undefined
                : { x: imageX, z: imageZ, rotateY: imageRotateY }
            }
          >
            <span
              aria-hidden="true"
              className="absolute -right-5 -top-5 size-20 rounded-2xl border border-accent/35 bg-[linear-gradient(145deg,rgb(228_196_119_/_18%),rgb(201_154_50_/_3%))] shadow-[inset_8px_8px_18px_rgb(255_255_255_/_7%),inset_-9px_-9px_20px_rgb(73_44_2_/_28%),0_20px_50px_rgb(201_154_50_/_12%)] md:-right-8 md:-top-8 md:size-28"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-6 -left-5 size-16 rounded-2xl border border-accent/30 bg-[linear-gradient(145deg,rgb(228_196_119_/_14%),rgb(201_154_50_/_2%))] shadow-[inset_7px_7px_16px_rgb(255_255_255_/_6%),inset_-8px_-8px_18px_rgb(73_44_2_/_26%),0_18px_44px_rgb(201_154_50_/_10%)] md:-bottom-9 md:-left-8 md:size-24"
            />
            <div className="relative aspect-square overflow-hidden rounded-[1.75rem] border border-accent/25 bg-surface-elevated p-2 shadow-[inset_8px_8px_24px_rgb(255_255_255_/_4%),inset_-12px_-12px_28px_rgb(0_0_0_/_25%),0_36px_100px_rgb(0_0_0_/_32%),0_0_46px_rgb(201_154_50_/_8%)] md:aspect-[4/5]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={profile.id}
                  className="relative h-full overflow-hidden rounded-[1.3rem]"
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94, rotateY: -7 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.97, rotateY: 6 }}
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={profile.imageUrl}
                    alt={profile.imageAlt}
                    fill
                    sizes="(max-width: 1023px) 90vw, 42vw"
                    className="object-cover object-center saturate-[0.78]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_54%,rgb(5_11_24_/_70%)_100%)]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            className="relative [transform-style:preserve-3d]"
            style={
              reduced
                ? undefined
                : { x: copyX, z: copyZ, rotateY: copyRotateY }
            }
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={profile.id}
                aria-live="polite"
                initial={prefersReducedMotion ? false : { opacity: 0, x: 22, z: -40 }}
                animate={{ opacity: 1, x: 0, z: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, x: -16, z: -30 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Leadership profile {String(activeIndex + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 text-4xl md:text-5xl">{profile.name}</h3>
                <p className="mt-3 text-lg font-medium text-blue-300">
                  {profile.title}
                </p>
                <div className="my-7 h-px w-full bg-[linear-gradient(90deg,var(--color-gold-300),rgb(228_196_119_/_8%),transparent)]" />
                <p className="max-w-xl text-lg leading-relaxed text-muted">
                  {profile.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-9 flex items-center gap-3">
              <IconButton
                label="Show previous leadership profile"
                onClick={showPrevious}
                className="border-accent/30 text-accent hover:border-accent/60 hover:bg-accent/10"
              >
                <ArrowLeft aria-hidden="true" className="size-5" />
              </IconButton>
              <IconButton
                label="Show next leadership profile"
                onClick={showNext}
                className="border-accent/30 text-accent hover:border-accent/60 hover:bg-accent/10"
              >
                <ArrowRight aria-hidden="true" className="size-5" />
              </IconButton>
              <span className="ml-2 text-sm text-muted">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(leadershipProfiles.length).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </div>
      </Container>
      </motion.div>
    </motion.section>
  );
}
