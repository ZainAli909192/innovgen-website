"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { BasicShadowMap } from "three";
import type { MotionValue } from "motion/react";
import { AdaptiveDpr } from "@/components/three/adaptive-dpr";
import { AssetLoader } from "@/components/three/asset-loader";
import { CameraRig } from "@/components/three/camera-rig";
import { PerformanceController } from "@/components/three/performance-controller";
import { SceneEnvironment } from "@/components/three/scene-environment";
import { SceneLighting } from "@/components/three/scene-lighting";
import { SceneManager } from "@/components/three/scene-manager";
import { VisibilityController } from "@/components/three/visibility-controller";
import { threeConfig, threeQualityPresets } from "@/config/three";
import type { ThreeQualityLevel, ThreeSceneId } from "@/types/three";

export default function SceneCanvas({
  active,
  interactionId,
  lowMotion,
  onQualityChange,
  progress,
  qualityOverride,
  sceneId,
}: {
  active: boolean;
  interactionId: string | null;
  lowMotion: boolean;
  onQualityChange?: (quality: ThreeQualityLevel) => void;
  progress: MotionValue<number>;
  qualityOverride: ThreeQualityLevel | null;
  sceneId: ThreeSceneId;
}) {
  const [automaticQuality, setAutomaticQuality] = useState<ThreeQualityLevel>(
    threeConfig.performance.initialQuality,
  );
  const quality = qualityOverride ?? automaticQuality;
  const preset = threeQualityPresets[quality];

  useEffect(() => {
    onQualityChange?.(quality);
  }, [onQualityChange, quality]);

  return (
    <Canvas
      aria-hidden="true"
      camera={threeConfig.camera}
      dpr={preset.dpr}
      frameloop={active ? "always" : "never"}
      gl={{
        alpha: true,
        antialias: preset.antialias,
        powerPreference: quality === "low" ? "low-power" : "high-performance",
      }}
      shadows={preset.shadows ? { type: BasicShadowMap } : false}
    >
      <CameraRig
        active={active}
        lowMotion={lowMotion}
        progress={progress}
        quality={quality}
        sceneId={sceneId}
      />
      <SceneEnvironment />
      <SceneLighting quality={quality} />
      <AdaptiveDpr quality={quality} />
      <PerformanceController
        enabled={qualityOverride === null && active}
        quality={automaticQuality}
        setQuality={setAutomaticQuality}
      />
      <VisibilityController active={active} />
      <AssetLoader>
        <SceneManager
          active={active}
          interactionId={interactionId}
          lowMotion={lowMotion}
          progress={progress}
          quality={quality}
          sceneId={sceneId}
        />
      </AssetLoader>
    </Canvas>
  );
}
