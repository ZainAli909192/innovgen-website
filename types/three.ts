export type ThreeQualityLevel = "low" | "medium" | "high";

export type ThreeQualityPreset = {
  dpr: readonly [minimum: number, maximum: number];
  antialias: boolean;
  shadows: boolean;
  particleLimit: number;
  postProcessing: boolean;
  lightingComplexity: 1 | 2 | 3;
  modelDetail: "low" | "medium" | "high";
  environmentQuality: "flat" | "neutral" | "hdri-ready";
};

export type ThreeSceneId = "placeholder" | "home-hero" | "services-ecosystem";

export type ThreeSceneDefinition = {
  id: ThreeSceneId;
  label: string;
  description: string;
};

export type WebGLSupport = "checking" | "supported" | "unsupported";

export type ThreePauseReason =
  | "none"
  | "offscreen"
  | "document-hidden"
  | "reduced-motion"
  | "webgl-unavailable"
  | "forced-fallback";
