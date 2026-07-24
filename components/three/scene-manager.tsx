import { PlaceholderScene } from "@/components/three/scenes/placeholder-scene";
import { HomeHeroScene } from "@/components/three/scenes/home-hero-scene";
import { ServicesEcosystemScene } from "@/components/three/scenes/services-ecosystem-scene";
import type { MotionValue } from "motion/react";
import type { ThreeQualityLevel, ThreeSceneId } from "@/types/three";

export function SceneManager({
  active,
  interactionId,
  lowMotion,
  progress,
  quality,
  sceneId,
}: {
  active: boolean;
  interactionId: string | null;
  lowMotion: boolean;
  progress: MotionValue<number>;
  quality: ThreeQualityLevel;
  sceneId: ThreeSceneId;
}) {
  if (sceneId === "placeholder") {
    return <PlaceholderScene active={active} quality={quality} />;
  }

  if (sceneId === "home-hero") {
    return (
      <HomeHeroScene
        active={active}
        lowMotion={lowMotion}
        progress={progress}
        quality={quality}
      />
    );
  }

  if (sceneId === "services-ecosystem") {
    return (
      <ServicesEcosystemScene
        active={active}
        interactionId={interactionId}
        lowMotion={lowMotion}
        progress={progress}
        quality={quality}
      />
    );
  }

  return null;
}
