"use client";

import { useEffect, useState } from "react";
import type { WebGLSupport } from "@/types/three";

export function useWebGLSupport(forceFallback = false) {
  const [support, setSupport] = useState<WebGLSupport>("checking");

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;
      if (forceFallback) {
        setSupport("unsupported");
        return;
      }

      const canvas = document.createElement("canvas");
      const context =
        canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ??
        canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true });

      setSupport(context ? "supported" : "unsupported");

      const extension = context?.getExtension("WEBGL_lose_context");
      extension?.loseContext();
    });

    return () => {
      cancelled = true;
    };
  }, [forceFallback]);

  return support;
}
