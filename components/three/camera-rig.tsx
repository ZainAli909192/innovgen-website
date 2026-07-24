"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import { MathUtils } from "three";
import { threeConfig } from "@/config/three";
import type { ThreeQualityLevel, ThreeSceneId } from "@/types/three";

export function CameraRig({
  active,
  lowMotion,
  progress,
  quality,
  sceneId,
}: {
  active: boolean;
  lowMotion: boolean;
  progress: MotionValue<number>;
  quality: ThreeQualityLevel;
  sceneId: ThreeSceneId;
}) {
  const camera = useThree((state) => state.camera);
  const cameraRef = useRef(camera);
  const pointer = useThree((state) => state.pointer);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    cameraRef.current = camera;
    camera.position.set(...threeConfig.camera.position);
    camera.lookAt(0, 0, 0);
    if ("updateProjectionMatrix" in camera) {
      camera.updateProjectionMatrix();
    }
    invalidate();
  }, [camera, invalidate]);

  useFrame((_, delta) => {
    if (!active) return;
    const activeCamera = cameraRef.current;

    const sectionProgress = MathUtils.clamp(progress.get(), 0, 1);
    if (sceneId === "services-ecosystem") {
      const servicesPointerEnabled =
        !lowMotion &&
        quality !== "low" &&
        typeof window !== "undefined" &&
        window.matchMedia("(pointer: fine)").matches;
      const targetZ = lowMotion
        ? 7.2
        : MathUtils.lerp(
            6.7,
            7.45,
            MathUtils.smoothstep(sectionProgress, 0.12, 0.82),
          );
      activeCamera.position.x = MathUtils.damp(
        activeCamera.position.x,
        servicesPointerEnabled ? pointer.x * 0.07 : 0,
        2.8,
        delta,
      );
      activeCamera.position.y = MathUtils.damp(
        activeCamera.position.y,
        0.05 + (servicesPointerEnabled ? pointer.y * 0.045 : 0),
        2.8,
        delta,
      );
      activeCamera.position.z = MathUtils.damp(
        activeCamera.position.z,
        targetZ,
        2.2,
        delta,
      );
      activeCamera.lookAt(0, 0, 0);
      return;
    }
    if (sceneId !== "home-hero") return;
    const pointerEnabled =
      !lowMotion &&
      quality !== "low" &&
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;
    const targetX = pointerEnabled ? pointer.x * 0.08 : 0;
    const targetY = 0.12 + (pointerEnabled ? pointer.y * 0.06 : 0);
    const targetZ = lowMotion
      ? 5.9
      : MathUtils.lerp(5.55, 6.1, MathUtils.smoothstep(sectionProgress, 0.1, 0.85));

    activeCamera.position.x = MathUtils.damp(
      activeCamera.position.x,
      targetX,
      3.2,
      delta,
    );
    activeCamera.position.y = MathUtils.damp(
      activeCamera.position.y,
      targetY,
      3.2,
      delta,
    );
    activeCamera.position.z = MathUtils.damp(
      activeCamera.position.z,
      targetZ,
      2.4,
      delta,
    );
    activeCamera.lookAt(0, 0, 0);
  });

  return null;
}
