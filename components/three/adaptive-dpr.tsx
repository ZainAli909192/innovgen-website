"use client";

import { AdaptiveDpr as DreiAdaptiveDpr } from "@react-three/drei";
import type { ThreeQualityLevel } from "@/types/three";

export function AdaptiveDpr({ quality }: { quality: ThreeQualityLevel }) {
  return <DreiAdaptiveDpr pixelated={quality === "low"} />;
}
