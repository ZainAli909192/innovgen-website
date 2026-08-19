"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  motion,
  useMotionValue,
} from "framer-motion";
import { MobileStackCarousel } from "@/components/motion/mobile-stack-carousel";
import {
  CylindricalItem,
  CylindricalStage,
  useContinuousCylinder,
} from "@/components/motion/cylindrical-stage";
import { useSectionProgress } from "@/hooks/use-section-progress";
import { useSceneVisibility } from "@/hooks/use-scene-visibility";
import { IconButton } from "@/components/ui/icon-button";
import { partnerEcosystem } from "@/config/partner-ecosystem";

type PartnerBrand = {
  id: string;
  name: string;
  wordmark: string;
  logoPath?: string;
  logoTheme?: "light" | "dark";
  tone: "blue" | "orange" | "red";
};

const homePartnerBrands: readonly PartnerBrand[] = partnerEcosystem.map(
  ({ id, name, shortName, logoPath, logoTheme }) => ({
    id,
    name,
    wordmark: shortName,
    logoPath,
    logoTheme,
    tone: "blue",
  }),
);

function PartnerBrandCard({ partner }: { partner: PartnerBrand }) {
  return (
    <motion.article
      className="relative flex h-full overflow-hidden rounded-[1.4rem] border border-blue-200 bg-[linear-gradient(145deg,#ffffff,#e6f1ff)] p-5 shadow-[inset_0_1px_0_rgb(255_255_255_/_95%),0_22px_52px_rgb(8_44_84_/_22%)] [transform-style:preserve-3d]"
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <span aria-hidden="true" className="absolute -right-10 -top-10 size-36 rounded-full border border-blue-300/35 bg-blue-500/[0.1]" />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,transparent,rgb(131_185_255_/_18%))]" />
      <div className="relative flex w-full flex-col items-center justify-center text-center">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-blue-600)]">Technology partner</p>
        {partner.logoPath ? (
          <span
            className={`relative mt-6 block h-24 w-[88%] max-w-[22rem] rounded-2xl p-2 sm:h-28 sm:p-3 ${partner.logoTheme === "dark" ? "bg-navy-950" : "bg-white/80"}`}
          >
            <Image
              src={partner.logoPath}
              alt={`${partner.name} logo`}
              fill
              sizes="(max-width: 639px) 16rem, 22rem"
              className="object-contain p-2 sm:p-3"
            />
          </span>
        ) : (
          <span
            className={`mt-5 font-semibold tracking-[-0.06em] text-[var(--color-navy-900)] ${
              partner.tone === "orange"
                ? "text-5xl lowercase"
                : partner.tone === "red"
                  ? "text-4xl tracking-[0.04em] text-red-400"
                  : "text-4xl"
            }`}
          >
            {partner.wordmark}
          </span>
        )}
        <span className="mt-7 h-px w-12 bg-[var(--color-blue-500)]" />
        <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.13em] text-[var(--color-navy-900)]">{partner.name}</h3>
      </div>
    </motion.article>
  );
}

function MobileClientStack() {
  return (
    <MobileStackCarousel
      compact
      items={homePartnerBrands}
      label="InnovGen technology partners"
      renderCard={(partner) => <PartnerBrandCard partner={partner} />}
    />
  );
}

export function ClientLogoGrid() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const { ref: visibilityRef, isVisible } =
    useSceneVisibility<HTMLDivElement>();
  const [paused, setPaused] = useState(false);
  const manualOffset = useMotionValue(0);
  const cursor = useContinuousCylinder(
    progress,
    homePartnerBrands.length,
    isVisible && !paused,
    5400,
    manualOffset,
  );

  function shift(direction: 1 | -1) {
    manualOffset.set(manualOffset.get() + direction);
  }

  return (
    <div ref={visibilityRef}>
      <MobileClientStack />
      <div
        ref={ref}
        className="relative hidden [perspective:1400px] md:block"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <CylindricalStage
          className="md:h-[29rem] lg:h-[31rem]"
          label="InnovGen technology partners"
        >
          {homePartnerBrands.map((partner, index) => (
            <CylindricalItem
              key={partner.id}
              count={homePartnerBrands.length}
              cursor={cursor}
              index={index}
              progress={progress}
            >
              <PartnerBrandCard partner={partner} />
            </CylindricalItem>
          ))}
        </CylindricalStage>
        <div className="mt-3 flex items-center justify-center gap-3">
          <IconButton
            label="Show previous technology partner"
            onClick={() => shift(-1)}
            className="border-accent/30 text-accent hover:border-accent/60 hover:bg-accent/10"
          >
            <ArrowLeft aria-hidden="true" className="size-5" />
          </IconButton>
          <IconButton
            label="Show next technology partner"
            onClick={() => shift(1)}
            className="border-accent/30 text-accent hover:border-accent/60 hover:bg-accent/10"
          >
            <ArrowRight aria-hidden="true" className="size-5" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
