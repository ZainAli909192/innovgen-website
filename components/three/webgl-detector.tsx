"use client";

import type { ReactNode } from "react";
import { useWebGLSupport } from "@/hooks/use-webgl-support";
import type { WebGLSupport } from "@/types/three";

export function WebGLDetector({
  children,
  forceFallback = false,
}: {
  children: (support: WebGLSupport) => ReactNode;
  forceFallback?: boolean;
}) {
  return children(useWebGLSupport(forceFallback));
}
