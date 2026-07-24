"use client";

import { useRef } from "react";
import { PerformanceMonitor } from "@react-three/drei";
import {
  getHigherQuality,
  getLowerQuality,
  threeConfig,
} from "@/config/three";
import type { ThreeQualityLevel } from "@/types/three";

export function PerformanceController({
  enabled,
  quality,
  setQuality,
}: {
  enabled: boolean;
  quality: ThreeQualityLevel;
  setQuality: (quality: ThreeQualityLevel) => void;
}) {
  const lastChangeAt = useRef(0);

  const canChange = () => {
    const now = performance.now();
    if (now - lastChangeAt.current < threeConfig.performance.cooldownMs) {
      return false;
    }
    lastChangeAt.current = now;
    return true;
  };

  return (
    <PerformanceMonitor
      bounds={() => [
        threeConfig.performance.declineFps,
        threeConfig.performance.inclineFps,
      ]}
      onDecline={() => {
        if (!enabled || !canChange()) return;
        setQuality(getLowerQuality(quality));
      }}
      onIncline={() => {
        if (!enabled || !canChange()) return;
        setQuality(getHigherQuality(quality));
      }}
    />
  );
}
