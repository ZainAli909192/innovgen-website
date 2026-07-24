"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { CanvasErrorBoundary } from "@/components/three/canvas-error-boundary";
import { CanvasFallback } from "@/components/three/canvas-fallback";
import { useSceneActivation } from "@/components/three/scene-section";
import { WebGLDetector } from "@/components/three/webgl-detector";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { threeConfig } from "@/config/three";
import { useDocumentVisibility } from "@/hooks/use-document-visibility";
import type {
  ThreePauseReason,
  ThreeQualityLevel,
  WebGLSupport,
} from "@/types/three";
import { cn } from "@/lib/utils";

const SceneCanvas = dynamic(
  () => import("@/components/three/scene-canvas"),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[22rem] animate-pulse rounded-xl border border-border bg-surface md:h-[30rem]"
        aria-label="Loading 3D preview"
      />
    ),
  },
);

export type GlobalCanvasStatus = {
  isDocumentVisible: boolean;
  isSceneVisible: boolean;
  pauseReason: ThreePauseReason;
  quality: ThreeQualityLevel;
  webgl: WebGLSupport;
};

function StatusReporter({
  onStatusChange,
  status,
}: {
  onStatusChange?: (status: GlobalCanvasStatus) => void;
  status: GlobalCanvasStatus;
}) {
  const {
    isDocumentVisible,
    isSceneVisible,
    pauseReason,
    quality,
    webgl,
  } = status;

  useEffect(() => {
    onStatusChange?.({
      isDocumentVisible,
      isSceneVisible,
      pauseReason,
      quality,
      webgl,
    });
  }, [
    isDocumentVisible,
    isSceneVisible,
    onStatusChange,
    pauseReason,
    quality,
    webgl,
  ]);

  return null;
}

export function GlobalCanvas({
  className,
  fallbackDescription,
  fallbackPosterSrc,
  fallbackTitle,
  forceFallback = threeConfig.forceFallback,
  onStatusChange,
  qualityOverride = null,
  reducedMotionBehavior = "fallback",
}: {
  className?: string;
  fallbackDescription?: string;
  fallbackPosterSrc?: string;
  fallbackTitle?: string;
  forceFallback?: boolean;
  onStatusChange?: (status: GlobalCanvasStatus) => void;
  qualityOverride?: ThreeQualityLevel | null;
  reducedMotionBehavior?: "fallback" | "minimal";
}) {
  const { interactionId, sceneId, isSceneVisible, progress } =
    useSceneActivation();
  const isDocumentVisible = useDocumentVisibility();
  const reducedMotion = usePrefersReducedMotion();
  const [automaticQuality, setAutomaticQuality] = useState<ThreeQualityLevel>(
    threeConfig.performance.initialQuality,
  );
  const handleQualityChange = useCallback((quality: ThreeQualityLevel) => {
    setAutomaticQuality(quality);
  }, []);

  return (
    <WebGLDetector forceFallback={forceFallback || !threeConfig.enabled}>
      {(webgl) => {
        const pauseReason: ThreePauseReason = forceFallback
          ? "forced-fallback"
          : webgl === "unsupported"
            ? "webgl-unavailable"
            : reducedMotion && reducedMotionBehavior === "fallback"
              ? "reduced-motion"
              : !isDocumentVisible
                ? "document-hidden"
                : !isSceneVisible
                  ? "offscreen"
                  : "none";
        const active = pauseReason === "none";
        const status = {
          isDocumentVisible,
          isSceneVisible,
          pauseReason,
          quality: qualityOverride ?? automaticQuality,
          webgl,
        } satisfies GlobalCanvasStatus;

        if (
          pauseReason === "forced-fallback" ||
          pauseReason === "webgl-unavailable" ||
          pauseReason === "reduced-motion"
        ) {
          return (
            <>
              <StatusReporter
                onStatusChange={onStatusChange}
                status={status}
              />
              <CanvasFallback
                className={className}
                description={fallbackDescription}
                posterSrc={fallbackPosterSrc}
                reason={pauseReason}
                title={fallbackTitle}
              />
            </>
          );
        }

        if (webgl === "checking") {
          return (
            <>
              <StatusReporter
                onStatusChange={onStatusChange}
                status={status}
              />
              <div
                className="h-[22rem] animate-pulse rounded-xl border border-border bg-surface md:h-[30rem]"
                aria-label="Checking 3D support"
              />
            </>
          );
        }

        return (
          <>
            <StatusReporter onStatusChange={onStatusChange} status={status} />
            <div
              className={cn(
                "h-[22rem] overflow-hidden rounded-xl border border-border bg-surface md:h-[30rem]",
                className,
              )}
              data-canvas-active={String(active)}
              data-canvas-quality={status.quality}
              data-canvas-pause-reason={pauseReason}
              data-low-motion={String(reducedMotion)}
              data-webgl-status={webgl}
            >
              <CanvasErrorBoundary>
                <SceneCanvas
                  active={active}
                  interactionId={interactionId}
                  lowMotion={reducedMotion}
                  progress={progress}
                  qualityOverride={qualityOverride}
                  sceneId={sceneId}
                  onQualityChange={handleQualityChange}
                />
              </CanvasErrorBoundary>
            </div>
          </>
        );
      }}
    </WebGLDetector>
  );
}
