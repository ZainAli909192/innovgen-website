"use client";

import type { ReactNode } from "react";
import { SpatialProgressItem } from "@/components/motion/spatial-section";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { useSceneActivation } from "@/components/three/scene-section";
import { useMobileLayout } from "@/hooks/use-mobile-layout";

export function SceneSpatialItem({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  const { progress } = useSceneActivation();
  const reduced = usePrefersReducedMotion();
  const mobile = useMobileLayout();

  return (
    <SpatialProgressItem
      className={className}
      index={index}
      progress={progress}
      reduced={reduced || mobile}
    >
      {children}
    </SpatialProgressItem>
  );
}
