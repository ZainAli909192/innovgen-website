import type {
  ThreeQualityLevel,
  ThreeQualityPreset,
  ThreeSceneDefinition,
} from "@/types/three";

export const threeConfig = {
  enabled: true,
  forceFallback: false,
  camera: {
    fov: 42,
    near: 0.1,
    far: 100,
    position: [0, 0.2, 6] as const,
  },
  visibility: {
    threshold: 0.18,
    rootMargin: "120px 0px",
  },
  performance: {
    initialQuality: "medium" as ThreeQualityLevel,
    cooldownMs: 4_000,
    declineFps: 42,
    inclineFps: 56,
  },
  fallback: {
    posterSrc: "/three-system-placeholder.svg",
    title: "InnovGen 3D system preview",
    description:
      "Temporary static poster for reduced-motion, unsupported, or paused 3D experiences. Final artwork requires client approval.",
  },
} as const;

export const threeQualityPresets = {
  low: {
    dpr: [0.75, 1],
    antialias: false,
    shadows: false,
    particleLimit: 120,
    postProcessing: false,
    lightingComplexity: 1,
    modelDetail: "low",
    environmentQuality: "flat",
  },
  medium: {
    dpr: [1, 1.5],
    antialias: true,
    shadows: false,
    particleLimit: 260,
    postProcessing: false,
    lightingComplexity: 2,
    modelDetail: "medium",
    environmentQuality: "neutral",
  },
  high: {
    dpr: [1, 2],
    antialias: true,
    shadows: true,
    particleLimit: 480,
    postProcessing: false,
    lightingComplexity: 3,
    modelDetail: "high",
    environmentQuality: "hdri-ready",
  },
} satisfies Record<ThreeQualityLevel, ThreeQualityPreset>;

export const threeSceneRegistry = {
  placeholder: {
    id: "placeholder",
    label: "Foundation placeholder",
    description:
      "A lightweight abstract geometry used only to validate the shared 3D architecture.",
  },
  "home-hero": {
    id: "home-hero",
    label: "InnovGen technology core",
    description:
      "A procedural gold core reveals a connected enterprise technology ecosystem.",
  },
  "services-ecosystem": {
    id: "services-ecosystem",
    label: "Connected services ecosystem",
    description:
      "A procedural technology core links InnovGen's service capabilities through restrained data pathways.",
  },
} satisfies Record<string, ThreeSceneDefinition>;

export function getLowerQuality(
  quality: ThreeQualityLevel,
): ThreeQualityLevel {
  if (quality === "high") return "medium";
  return "low";
}

export function getHigherQuality(
  quality: ThreeQualityLevel,
): ThreeQualityLevel {
  if (quality === "low") return "medium";
  return "high";
}
