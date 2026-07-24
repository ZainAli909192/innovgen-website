"use client";

import { useEffect, useState } from "react";
import { GlobalCanvas } from "@/components/three/global-canvas";
import { MotionPreferenceOverride } from "@/components/providers/motion-provider";
import type { ThreeQualityLevel } from "@/types/three";

export function HomeHeroCanvas() {
  const [forceFallback, setForceFallback] = useState(false);
  const [qualityOverride, setQualityOverride] =
    useState<ThreeQualityLevel | null>(null);
  const [simulateReducedMotion, setSimulateReducedMotion] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const parameters = new URLSearchParams(window.location.search);
      setForceFallback(parameters.get("forceWebGLFallback") === "1");
      setSimulateReducedMotion(parameters.get("reduceHeroMotion") === "1");
      const quality = parameters.get("threeQuality");
      setQualityOverride(
        quality === "low" || quality === "medium" || quality === "high"
          ? quality
          : null,
      );
    });
  }, []);

  const canvas = (
    <GlobalCanvas
      className="!h-full !rounded-none !border-0 !bg-transparent !shadow-none [&_figcaption]:hidden"
      fallbackPosterSrc="/home-hero-3d-poster.svg"
      fallbackTitle="InnovGen connected technology core"
      fallbackDescription="A static representation of the connected InnovGen technology ecosystem."
      forceFallback={forceFallback}
      qualityOverride={qualityOverride}
      reducedMotionBehavior="minimal"
    />
  );

  return simulateReducedMotion ? (
    <MotionPreferenceOverride reduced>{canvas}</MotionPreferenceOverride>
  ) : (
    canvas
  );
}
