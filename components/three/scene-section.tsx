"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import {
  motionValue,
  useScroll,
  type MotionValue,
  type UseScrollOptions,
} from "motion/react";
import { useSceneVisibility } from "@/hooks/use-scene-visibility";
import type { ThreeSceneId } from "@/types/three";

type SceneActivation = {
  interactionId: string | null;
  sceneId: ThreeSceneId;
  isSceneVisible: boolean;
  progress: MotionValue<number>;
};

const SceneActivationContext = createContext<SceneActivation>({
  sceneId: "placeholder",
  isSceneVisible: false,
  interactionId: null,
  progress: motionValue(0),
});

export function SceneSection({
  children,
  className,
  onVisibilityChange,
  interactionId = null,
  sceneId,
  scrollOffset = ["start start", "end start"],
  ...sectionProps
}: {
  children: ReactNode;
  className?: string;
  onVisibilityChange?: (visible: boolean) => void;
  interactionId?: string | null;
  sceneId: ThreeSceneId;
  scrollOffset?: UseScrollOptions["offset"];
} & Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children" | "className"
>) {
  const { ref, isVisible } = useSceneVisibility<HTMLElement>();
  const { scrollYProgress: progress } = useScroll({
    target: ref,
    offset: scrollOffset,
  });
  const value = useMemo(
    () => ({ interactionId, sceneId, isSceneVisible: isVisible, progress }),
    [interactionId, isVisible, progress, sceneId],
  );

  useEffect(() => {
    onVisibilityChange?.(isVisible);
  }, [isVisible, onVisibilityChange]);

  return (
    <SceneActivationContext.Provider value={value}>
      <section
        ref={ref}
        className={className}
        data-scene-id={sceneId}
        data-scene-visible={String(isVisible)}
        {...sectionProps}
      >
        {children}
      </section>
    </SceneActivationContext.Provider>
  );
}

export function useSceneActivation() {
  return useContext(SceneActivationContext);
}
